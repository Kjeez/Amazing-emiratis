'use client';

import { useId, useState, useTransition } from 'react';
import { rsvp } from '@/app/actions';
import styles from './RsvpCard.module.css';

const INVITATION = 'By invitation. Request a place and we will reply by email.';
const seatsLabel = (n: number) => (n === 1 ? '1 place left' : `${n} places left`);

/** RSVP form for an event. capacity 0 means invitation only: requests are accepted without a limit. */
export default function RsvpCard({ eventSlug, capacity, initialPlacesLeft }: {
  eventSlug: string;
  capacity: number;
  initialPlacesLeft: number;
}) {
  const id = useId();
  const invitation = capacity === 0;
  const [placesLeft, setPlacesLeft] = useState(initialPlacesLeft);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState<1 | 2>(1);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  const label = invitation ? INVITATION : seatsLabel(placesLeft);

  if (done) {
    return (
      <div className={styles.doneWrap}>
        <div className={styles.done} role="status">
          <span className={styles.doneTitle}>You’re on the list.</span>
          <span className={styles.doneText}>
            {invitation
              ? `We have your request and will reply to ${email.trim()} by email.`
              : `We’ve saved your place and will send the details to ${email.trim()} before the evening.`}
          </span>
        </div>
        {!invitation && <span className={styles.seats}>{label}</span>}
      </div>
    );
  }

  if (!invitation && placesLeft <= 0) {
    return (
      <div className={styles.full} role="status">
        <span className={styles.fullTitle}>Fully booked</span>
        <span className={styles.fullText}>Every place for this event has been taken.</span>
      </div>
    );
  }

  const onlyOne = !invitation && placesLeft < 2;

  return (
    <form
      className={styles.form}
      aria-labelledby={`${id}-title`}
      onSubmit={(e) => {
        e.preventDefault();
        setError('');
        start(async () => {
          const res = await rsvp({ eventSlug, name, email, guests });
          if (res.ok) {
            setPlacesLeft(res.placesLeft);
            setDone(true);
          } else {
            setError(res.error);
          }
        });
      }}
    >
      <span id={`${id}-title`} className={styles.title}>Reserve a place</span>
      <label htmlFor={`${id}-name`} className="srOnly">Full name</label>
      <input id={`${id}-name`} type="text" className="input" required maxLength={120} autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor={`${id}-email`} className="srOnly">Email address</label>
      <input id={`${id}-email`} type="email" className="input" required maxLength={254} autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor={`${id}-guests`} className="srOnly">Number of places</label>
      <select id={`${id}-guests`} className="select" value={guests} onChange={(e) => setGuests(e.target.value === '2' ? 2 : 1)}>
        <option value="1">Just me</option>
        <option value="2" disabled={onlyOne}>Me + 1 guest</option>
      </select>
      {error && <p className="formError" role="alert">{error}</p>}
      <button type="submit" className={styles.submit} disabled={pending}>{pending ? 'Sending…' : 'RSVP →'}</button>
      <span className={styles.seats}>{label}</span>
    </form>
  );
}
