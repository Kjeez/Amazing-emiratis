import type { Metadata } from 'next';
import Link from 'next/link';
import EventsList, { type EventRow } from '@/components/events/EventsList';
import Placeholder from '@/components/Placeholder';
import { eventPhoto, recapPhoto } from '@/lib/content/photos';
import { eventDateParts, EVENT_TYPES, EVENTS, PAST_EVENTS } from '@/lib/content/events';
import { storyHref } from '@/lib/content/stories';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Talks, salons and evenings hosted by the archive across the seven Emirates.',
};

export default function EventsPage() {
  const rows: EventRow[] = EVENTS.map((e) => ({
    photo: eventPhoto(e.slug),
    slug: e.slug,
    type: e.type,
    ...eventDateParts(e.date),
    typeU: e.type.toUpperCase(),
    cityU: e.city.toUpperCase(),
    title: e.title,
    venue: e.venue,
    time: e.time,
  }));

  return (
    <main>
      <section className={styles.header} aria-labelledby="events-title">
        <div className={styles.headerInner}>
          <div className={styles.headerTitle}>
            <span className={styles.kicker}>GATHERINGS</span>
            <h1 id="events-title" className={styles.title}>Events</h1>
          </div>
          <div className={styles.headerText}>
            <p className={styles.lede}>Talks, salons and evenings hosted by the archive across the seven Emirates. Most are free; places are limited.</p>
            <span className={styles.count}>{EVENTS.length} upcoming</span>
          </div>
        </div>
      </section>

      <div className="container">
        <EventsList events={rows} types={EVENT_TYPES} />

        <section className={styles.past} aria-labelledby="past-title">
          <div className="ruleHeading"><h2 id="past-title">PAST EVENTS</h2></div>
          <div className={styles.pastGrid}>
            {PAST_EVENTS.map(([date, title], i) => (
              <Link key={title} href={storyHref(title)} className={styles.recap}>
                <Placeholder label="recap photograph" ratio="3/2" className={styles.recapPh} photo={recapPhoto(i)} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className={styles.recapDate}>{date} · RECAP</span>
                <span className={styles.recapTitle}>{title}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
