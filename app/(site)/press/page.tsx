import type { Metadata } from 'next';
import Link from 'next/link';
import { PRESS_CONTACT, PRESS_RELEASES } from '@/lib/content/press';
import { longDate } from '@/lib/content/stories';
import styles from './press.module.css';

export const metadata: Metadata = {
  title: 'Press releases',
  description: 'Announcements from Amazing Emiratis: awards, events, collections and new sections.',
};

export default function PressPage() {
  return (
    <main className="container">
      <header className={styles.header}>
        <span className="eyebrow">NEWSROOM</span>
        <h1 className={styles.title}>Press <em className="gold">releases</em></h1>
        <p className={styles.intro}>
          Announcements from Amazing Emiratis. For interviews and images, write to{' '}
          <a href={`mailto:${PRESS_CONTACT.email}`}>{PRESS_CONTACT.email}</a>.
        </p>
      </header>
      <ol className={styles.list}>
        {PRESS_RELEASES.map((p) => (
          <li key={p.slug}>
            <Link href={`/press/${p.slug}`} className={styles.item}>
              <time dateTime={p.date} className={styles.date}>{longDate(p.date)}</time>
              <span className={styles.itemText}>
                <span className={styles.itemTitle}>{p.title}</span>
                <span className={styles.itemSummary}>{p.summary}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
