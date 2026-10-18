import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RsvpCard from '@/components/events/RsvpCard';
import Placeholder from '@/components/Placeholder';
import { eventPhoto } from '@/lib/content/photos';
import { placesTaken } from '@/lib/db';
import { EVENT_AGENDA, eventDateParts, getEvent } from '@/lib/content/events';
import { findPersonByName, personHref } from '@/lib/content/people';
import styles from './page.module.css';

// Seats left come from the database on every request.
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return { title: 'Event not found' };
  return { title: e.title, description: e.about };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  const d = eventDateParts(e.date);
  const placesLeft = e.capacity > 0 ? Math.max(0, e.capacity - placesTaken(e.slug)) : 0;
  const facts: [k: string, v: string][] = [
    ['DATE', `${d.weekday}, ${d.day} ${d.month}`],
    ['TIME', e.time],
    ['VENUE', e.venue],
  ];

  return (
    <main className="container">
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/events">← All events</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className={styles.crumbHere}>{e.title}</span>
      </nav>

      <Placeholder label="event photograph — venue" ratio="21/8" dark className={styles.photo} photo={eventPhoto(e.slug)} sizes="100vw" priority />

      <div className={styles.layout}>
        <div className={styles.content}>
          <span className={styles.kicker}>{e.type.toUpperCase()} · {e.city.toUpperCase()}</span>
          <h1 className={styles.title}>{e.title}</h1>
          <p className={styles.about}>{e.about}</p>

          <section className={styles.block} aria-labelledby="speakers-title">
            <div className="ruleHeading"><h2 id="speakers-title">SPEAKERS</h2></div>
            <ul className={styles.speakers}>
              {e.speakers.map(([name, role]) => {
                const inArchive = Boolean(findPersonByName(name));
                return (
                  <li key={name} className={styles.speaker}>
                    <span className={styles.speakerPh} aria-hidden="true" />
                    <span className={styles.speakerText}>
                      {inArchive
                        ? <Link href={personHref(name)} className={styles.speakerName}>{name}</Link>
                        : <span className={styles.speakerName}>{name}</span>}
                      <span className={styles.speakerRole}>{role}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={styles.block} aria-labelledby="programme-title">
            <div className="ruleHeading"><h2 id="programme-title">PROGRAMME</h2></div>
            <ol className={styles.agenda}>
              {EVENT_AGENDA.map(([t, what]) => (
                <li key={t} className={styles.agendaRow}>
                  <span className={styles.agendaTime}>{t}</span>
                  <span className={styles.agendaWhat}>{what}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className={styles.aside} aria-label="Event details and RSVP">
          <dl className={styles.facts}>
            {facts.map(([k, v]) => (
              <div key={k} className={styles.fact}>
                <dt className={styles.factKey}>{k}</dt>
                <dd className={styles.factVal}>{v}</dd>
              </div>
            ))}
          </dl>
          <RsvpCard eventSlug={e.slug} capacity={e.capacity} initialPlacesLeft={placesLeft} />
        </aside>
      </div>
    </main>
  );
}
