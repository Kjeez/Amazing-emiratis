'use client';

import Link from 'next/link';
import { useState } from 'react';
import Placeholder from '@/components/Placeholder';
import type { Photo } from '@/lib/content/photos';
import styles from './EmiratesSwitcher.module.css';

export type SwitcherEmirate = { slug: string; name: string; ar: string; landmark: string; short: string; count: number; photo?: Photo };

/** Homepage "Seven Emirates": hovering or clicking an emirate shows its landmark and blurb. */
export default function EmiratesSwitcher({ emirates }: { emirates: SwitcherEmirate[] }) {
  const [active, setActive] = useState(0);
  const a = emirates[active];
  if (!a) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        {emirates.map((e, i) => (
          <button
            key={e.slug}
            type="button"
            className={styles.item}
            aria-pressed={i === active}
            aria-controls="emirate-panel"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className={styles.n}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.name}>{e.name}</span>
            <span className={styles.ar} lang="ar">{e.ar}</span>
          </button>
        ))}
      </div>
      <div id="emirate-panel" className={styles.panel} aria-live="polite">
        <Placeholder key={a.slug} label={a.landmark} className={`${styles.landmark} swapIn`} photo={a.photo} sizes="(max-width: 768px) 100vw, 55vw" />
        <div key={`${a.slug}-foot`} className={`${styles.foot} swapIn`}>
          <span className={styles.blurb}>{a.short}</span>
          <Link href={`/emirates/${a.slug}`} className="underlineLink">{a.count} profiles from {a.name}</Link>
        </div>
      </div>
    </div>
  );
}
