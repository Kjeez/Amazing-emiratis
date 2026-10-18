'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './RouteProgress.module.css';

type Phase = 'idle' | 'loading' | 'done';

/**
 * Thin gold bar across the top of the window while a page is on its way, so a click always gets
 * instant feedback. Starts on clicks on internal links and finishes when the URL changes.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !a.href || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      clear();
      setPhase('loading');
      // Safety net if a navigation never completes (e.g. it was cancelled).
      timers.current.push(window.setTimeout(() => setPhase('idle'), 10_000));
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;
    clear();
    setPhase('done');
    timers.current.push(window.setTimeout(() => setPhase('idle'), 450));
    // Only a URL change should finish the bar, not the phase change itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  useEffect(() => clear, []);

  return <div className={styles.bar} data-phase={phase} aria-hidden="true" />;
}
