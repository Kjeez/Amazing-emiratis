'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StoryTools.module.css';

const SAVED_KEY = 'ae:saved-stories';

function readSaved(): string[] {
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeSaved(list: string[]) {
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable: the toggle still works for this visit */
  }
}

/** Thin gold bar under the masthead showing how far through the page the reader is. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={styles.progress}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className={styles.progressFill} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/** Save (persisted in localStorage) and Share (native share sheet, else copy link). */
export function StoryActions({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setSaved(readSaved().includes(slug));
  }, [slug]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const toggleSave = () => {
    const list = readSaved().filter((s) => s !== slug);
    const next = !saved;
    writeSaved(next ? [...list, slug] : list);
    setSaved(next);
  };

  const share = async () => {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch (e) {
        // The reader closed the share sheet: nothing more to do.
        if (e instanceof DOMException && e.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard blocked: still confirm so the button doesn't feel dead */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.actions}>
      <button type="button" className={styles.save} aria-pressed={saved} onClick={toggleSave}>
        {saved ? 'Saved' : 'Save'}
      </button>
      <button type="button" className={styles.share} onClick={share}>
        {copied ? 'Link copied' : 'Share'}
      </button>
      <span className="srOnly" role="status">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  );
}
