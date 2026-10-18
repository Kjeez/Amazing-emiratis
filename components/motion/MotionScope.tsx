'use client';

import { useLayoutEffect, useRef } from 'react';

type Kind = 'rise' | 'curtain';

/** Elements that animate on their own when they are not part of a card grid. */
const BLOCKS = 'h1, h2, h3, p, blockquote, form, ul, ol, dl, figure, table';
const EASE_OUT = 'cubic-bezier(.2, .7, .2, 1)';
const EASE_CURTAIN = 'cubic-bezier(.7, 0, .2, 1)';
const STAGGER_MS = 80;
const MAX_DELAY_MS = 480;

// The first mount happens during hydration, after the server HTML is already on screen.
let hydrated = false;

/**
 * Wraps a page: fades the route in, then reveals content as it scrolls into view.
 * Cards in grids rise in a staggered wave, headings and paragraphs rise, image placeholders open
 * like a curtain. Add data-no-rv to opt a subtree out (data-no-rv="text" to keep only its image
 * curtains, as in story bodies). Does nothing with prefers-reduced-motion.
 */
export default function MotionScope({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const initialLoad = useRef(!hydrated);

  useLayoutEffect(() => {
    const root = ref.current;
    hydrated = true;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = collect(root);
    const timers: number[] = [];
    const kinds = new Map(targets);
    const vh = window.innerHeight;
    const inView: HTMLElement[] = [];
    const hidden: HTMLElement[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        const shown = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        shown.forEach((el) => io.unobserve(el));
        revealBatch(shown, kinds, timers);
      },
      { rootMargin: '0px 0px -6% 0px' },
    );

    for (const [el] of targets) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const visible = r.top < vh && r.bottom > 0;
      // On first load, what the reader already sees stays put; on client navigations the new page
      // has not been painted yet, so everything can start hidden and animate in.
      if (visible && initialLoad.current) continue;
      hide(el, kinds.get(el)!);
      hidden.push(el);
      if (visible) inView.push(el);
      else io.observe(el);
    }

    const raf = requestAnimationFrame(() => requestAnimationFrame(() => revealBatch(inView, kinds, timers)));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      timers.forEach(clearTimeout);
      // Never leave anything invisible behind (React re-runs effects in development).
      hidden.forEach(restore);
    };
  }, []);

  return <div ref={ref} className="pageEnter">{children}</div>;
}

function collect(root: HTMLElement): [HTMLElement, Kind][] {
  const out: [HTMLElement, Kind][] = [];
  const risen = new Set<Element>();
  const isGridCache = new Map<Element, boolean>();

  const isGrid = (el: Element) => {
    let v = isGridCache.get(el);
    if (v === undefined) {
      const cs = getComputedStyle(el);
      v = el.children.length >= 2 && (cs.display === 'grid' || cs.display === 'inline-grid' || (cs.display.endsWith('flex') && cs.flexWrap === 'wrap'));
      isGridCache.set(el, v);
    }
    return v;
  };
  const insideRisen = (el: Element) => {
    for (let p = el.parentElement; p && p !== root; p = p.parentElement) if (risen.has(p)) return true;
    return false;
  };

  for (const el of root.querySelectorAll<HTMLElement>('*')) {
    // data-no-rv opts a subtree out entirely; data-no-rv="text" keeps its image curtains.
    const optOut = el.closest('[data-no-rv]');
    if (optOut && !(optOut.getAttribute('data-no-rv') === 'text' && el.classList.contains('ph'))) continue;
    if (el.classList.contains('ph')) {
      out.push([el, 'curtain']);
      continue;
    }
    if (insideRisen(el)) continue;
    const pos = getComputedStyle(el).position;
    if (pos === 'fixed' || pos === 'sticky') continue;
    // A grid of cards should ripple card by card, not rise as one block.
    if (el.children.length >= 3 && isGrid(el)) continue;
    const parent = el.parentElement;
    if ((parent && parent !== root && isGrid(parent) && el.offsetHeight >= 24) || el.matches(BLOCKS)) {
      risen.add(el);
      out.push([el, 'rise']);
    }
  }
  return out;
}

const saved = new WeakMap<HTMLElement, { opacity: string; transform: string; transition: string; clipPath: string }>();

function hide(el: HTMLElement, kind: Kind) {
  const s = el.style;
  saved.set(el, { opacity: s.opacity, transform: s.transform, transition: s.transition, clipPath: s.clipPath });
  s.transition = 'none';
  if (kind === 'curtain') s.clipPath = 'inset(0 0 100% 0)';
  else {
    s.opacity = '0';
    s.transform = 'translate3d(0, 28px, 0)';
  }
  el.setAttribute('data-rv', '');
}

/** Reveal elements that became visible together, staggered top-to-bottom, left-to-right. */
function revealBatch(els: HTMLElement[], kinds: Map<HTMLElement, Kind>, timers: number[]) {
  if (!els.length) return;
  const order = els
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left);
  // Curtains and the content that sits on them share a slot, so a card opens as one piece.
  let slot = -1;
  let lastTop = -Infinity;
  let lastLeft = -Infinity;
  for (const { el, r } of order) {
    if (Math.abs(r.top - lastTop) > 4 || Math.abs(r.left - lastLeft) > 4) slot++;
    lastTop = r.top;
    lastLeft = r.left;
    reveal(el, kinds.get(el)!, Math.min(slot * STAGGER_MS, MAX_DELAY_MS), timers);
  }
}

function reveal(el: HTMLElement, kind: Kind, delay: number, timers: number[]) {
  const s = el.style;
  s.setProperty('--rv-delay', `${delay}ms`);
  if (kind === 'curtain') {
    s.transition = `clip-path 1.15s ${EASE_CURTAIN} ${delay}ms`;
    s.clipPath = 'inset(0)';
  } else {
    s.transition = `opacity .9s ${EASE_OUT} ${delay}ms, transform .9s ${EASE_OUT} ${delay}ms`;
    s.opacity = '1';
    s.transform = 'none';
  }
  el.setAttribute('data-rv', 'in');
  timers.push(window.setTimeout(() => restore(el), delay + 1700));
}

function restore(el: HTMLElement) {
  const prev = saved.get(el);
  const s = el.style;
  if (prev) {
    s.opacity = prev.opacity;
    s.transform = prev.transform;
    s.transition = prev.transition;
    s.clipPath = prev.clipPath;
  }
  s.removeProperty('--rv-delay');
  el.removeAttribute('data-rv');
}
