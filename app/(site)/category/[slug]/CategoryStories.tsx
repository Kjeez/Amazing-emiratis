'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import Placeholder from '@/components/Placeholder';
import type { Photo } from '@/lib/content/photos';
import styles from './CategoryStories.module.css';

export type GridStory = {
  slug: string;
  href: string;
  sub: string;
  title: string;
  date: string;
  read: string;
  latestRank: number;
  popRank: number;
  photo?: Photo;
};

const PAGE = 6;
const SORTS = ['Latest', 'Most read'] as const;
type Sort = (typeof SORTS)[number];

/** Sub-topic chips, the lead story (children) and the filterable, sortable story grid. */
export default function CategoryStories({ label, subs, stories, children }: {
  label: string;
  subs: string[];
  stories: GridStory[];
  children: ReactNode;
}) {
  const [sub, setSub] = useState('All');
  const [sort, setSort] = useState<Sort>('Latest');
  const [shown, setShown] = useState(PAGE);

  let list = sub === 'All' ? stories : stories.filter((s) => s.sub === sub);
  list = [...list].sort((a, b) => (sort === 'Latest' ? a.latestRank - b.latestRank : a.popRank - b.popRank));
  const visible = list.slice(0, shown);

  return (
    <>
      <div className={styles.chips} role="group" aria-label={`Filter ${label} stories by topic`}>
        {['All', ...subs].map((l) => (
          <button
            key={l}
            type="button"
            className={styles.chip}
            aria-pressed={l === sub}
            onClick={() => { setSub(l); setShown(PAGE); }}
          >
            {l}
          </button>
        ))}
      </div>

      {children}

      <section className={styles.grid} aria-labelledby="category-grid-title">
        <div className="ruleHeading">
          <h2 id="category-grid-title">{sub === 'All' ? `ALL ${label.toUpperCase()} STORIES` : sub.toUpperCase()}</h2>
          <div className={styles.sorts} role="group" aria-label="Sort stories">
            {SORTS.map((l) => (
              <button key={l} type="button" className={styles.sort} aria-pressed={l === sort} onClick={() => setSort(l)}>{l}</button>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div key={`${sub}|${sort}`} className={`${styles.cards} swapIn`}>
            {visible.map((s) => (
              <Link key={s.slug} href={s.href} className={styles.card}>
                <Placeholder label="story image 3:2" ratio="3/2" className={styles.cardPh} photo={s.photo} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className={styles.cardSub}>{s.sub.toUpperCase()}</span>
                <span className={styles.cardTitle}>{s.title}</span>
                <span className={styles.cardMeta}>{s.date} · {s.read}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No stories in this topic yet.</p>
        )}

        {list.length > shown && (
          <div className={styles.more}>
            <button type="button" className={styles.moreBtn} onClick={() => setShown((n) => n + PAGE)}>Load more stories</button>
          </div>
        )}
      </section>
    </>
  );
}
