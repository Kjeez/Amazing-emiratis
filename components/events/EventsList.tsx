'use client';

import Link from 'next/link';
import { useState } from 'react';
import Placeholder from '@/components/Placeholder';
import type { Photo } from '@/lib/content/photos';
import styles from './EventsList.module.css';

export type EventRow = {
  slug: string;
  type: string;
  day: string;
  month: string;
  weekday: string;
  typeU: string;
  cityU: string;
  title: string;
  venue: string;
  time: string;
  photo?: Photo;
};

export default function EventsList({ events, types }: { events: EventRow[]; types: string[] }) {
  const [type, setType] = useState('All');
  const shown = events.filter((e) => type === 'All' || e.type === type);

  return (
    <>
      <div className={styles.chips} role="group" aria-label="Filter by type">
        {['All', ...types].map((t) => (
          <button key={t} type="button" className={`chip ${styles.chip}`} aria-pressed={t === type} onClick={() => setType(t)}>{t}</button>
        ))}
      </div>
      <ul key={type} className={`${styles.list} swapIn`}>
        {shown.map((e) => (
          <li key={e.slug}>
            <Link href={`/events/${e.slug}`} className={styles.row}>
              <span className={styles.date}>
                <span className={styles.day}>{e.day}</span>
                <span className={styles.month}>{e.month}</span>
                <span className={styles.weekday}>{e.weekday}</span>
              </span>
              <span className={styles.body}>
                <span className={styles.meta}>{e.typeU} · {e.cityU}</span>
                <span className={styles.title}>{e.title}</span>
                <span className={styles.where}>{e.venue} · {e.time}</span>
              </span>
              <Placeholder label="event image" ratio="3/2" className={styles.ph} photo={e.photo} sizes="(max-width: 720px) 100vw, 260px" />
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className={styles.empty}>No upcoming events of this type.</li>}
      </ul>
    </>
  );
}
