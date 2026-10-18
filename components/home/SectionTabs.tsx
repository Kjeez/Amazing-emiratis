'use client';

import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import Placeholder from '@/components/Placeholder';
import type { Photo } from '@/lib/content/photos';
import styles from './SectionTabs.module.css';

export type SectionTab = {
  label: string;
  img: string;
  lead: { href: string; cat: string; title: string; dek: string; photo?: Photo };
  items: { href: string; cat: string; title: string }[];
};

/** Homepage section switcher (Business / Health / Technology). */
export default function SectionTabs({ tabs }: { tabs: SectionTab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = tabs[active];
  if (!t) return null;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Sections" onKeyDown={onKey}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`section-tab-${i}`}
            aria-selected={i === active}
            aria-controls="section-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div key={active} id="section-panel" role="tabpanel" aria-labelledby={`section-tab-${active}`} className={`${styles.panel} swapIn`}>
        <Link href={t.lead.href} className={styles.lead}>
          <Placeholder label={t.img} ratio="4/3" className={styles.leadPh} photo={t.lead.photo} sizes="(max-width: 768px) 100vw, 40vw" />
          <span className={styles.leadCat}>{t.lead.cat}</span>
          <span className={styles.leadTitle}>{t.lead.title}</span>
          {t.lead.dek && <span className={styles.leadDek}>{t.lead.dek}</span>}
        </Link>
        <div className={styles.list}>
          {t.items.map((it) => (
            <Link key={it.href} href={it.href} className={styles.item}>
              <span className={styles.itemCat}>{it.cat}</span>
              <span className={styles.itemTitle}>{it.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
