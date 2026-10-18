'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import type { Photo } from '@/lib/content/photos';
import styles from './HeroCarousel.module.css';

export type HeroSlide = {
  href: string;
  eyebrow: string;
  title: string;
  dek?: string;
  byline: string;
  photo?: Photo;
};

const INTERVAL_MS = 7000;

/**
 * Homepage hero: featured stories crossfade one after another every few seconds, also under the
 * mouse. Swipe or use the arrow keys to move between them. It holds still while someone is
 * tabbing through it, and does not autoplay for people who prefer reduced motion.
 */
export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  // The slide we are leaving stays fully visible underneath while the new one fades in on top.
  const [prev, setPrev] = useState<number | null>(null);
  const shown = useRef(0);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const swipeX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const count = slides.length;
  const go = (i: number) => setActive(((i % count) + count) % count);

  useEffect(() => {
    if (shown.current === active) return;
    setPrev(shown.current);
    shown.current = active;
  }, [active]);
  const running = !focused && !reduced && count > 1;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % count), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [active, running, count]);
  const s = slides[active];
  if (!s) return null;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };
  const onPointerDown = (e: PointerEvent) => { if (e.pointerType !== 'mouse') swipeX.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Featured stories"
      data-no-rv
      onKeyDown={onKey}
      // Hold still only for keyboard focus, so a click on the headline link doesn't freeze it.
      onFocus={(e) => setFocused(e.target.matches(':focus-visible'))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {slides.map((slide, i) => (
        <div key={slide.href} className={styles.media} data-state={i === active ? 'active' : i === prev ? 'prev' : undefined} aria-hidden="true">
          {slide.photo
            ? <Image src={slide.photo.src} alt="" fill priority={i === 0} sizes="100vw" className={styles.img} />
            : <span className={styles.stripes} />}
        </div>
      ))}
      <span className={styles.shade} aria-hidden="true" />

      {/* Re-keyed per slide so the eyebrow, headline words and dek replay their entrance. */}
      <div
        key={active}
        className={styles.inner}
        role="group"
        aria-roledescription="slide"
        aria-label={`${active + 1} of ${count}`}
        aria-live={running ? 'off' : 'polite'}
      >
        <span className={styles.eyebrow}>{s.eyebrow}</span>
        <h1 className={styles.title}>
          <Link href={s.href} aria-label={s.title}>
            {s.title.split(' ').map((w, i) => (
              <span key={i} aria-hidden="true">
                {i > 0 && ' '}
                <span className={styles.word}><span style={{ '--i': i, '--base': active === 0 ? '300ms' : '120ms' } as CSSProperties}>{w}</span></span>
              </span>
            ))}
          </Link>
        </h1>
        <div className={styles.foot}>
          {s.dek && <p className={styles.dek}>{s.dek}</p>}
          <span className={styles.byline}>{s.byline}</span>
        </div>
      </div>

    </section>
  );
}
