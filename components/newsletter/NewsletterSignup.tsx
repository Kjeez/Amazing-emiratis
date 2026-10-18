'use client';

import { useState, useTransition } from 'react';
import { subscribe } from '@/app/actions';
import { LETTERS, type LetterKey } from '@/lib/content/newsletters';
import styles from './NewsletterSignup.module.css';

export default function NewsletterSignup() {
  const [sel, setSel] = useState<Record<LetterKey, boolean>>({ monthly: true, business: false, culture: false, awards: false });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  const chosen = LETTERS.filter((l) => sel[l.key]).map((l) => l.key);
  const n = chosen.length;

  if (done) {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneTitle}>You’re subscribed.</span>
        <span className={styles.doneText}>Your first letter arrives at {email.trim()} with the next issue.</span>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!n || pending) return;
        setError('');
        start(async () => {
          const res = await subscribe({ email, letters: chosen, source: 'newsletter' });
          if (res.ok) setDone(true);
          else setError(res.error);
        });
      }}
    >
      <div className={styles.letters} role="group" aria-label="Choose your letters">
        {LETTERS.map((l) => {
          const on = sel[l.key];
          return (
            <button
              key={l.key}
              type="button"
              className={styles.letter}
              aria-pressed={on}
              onClick={() => setSel((s) => ({ ...s, [l.key]: !s[l.key] }))}
            >
              <span className={styles.tick} aria-hidden="true">{on ? '✓' : ''}</span>
              <span className={styles.letterText}>
                <span className={styles.letterName}>{l.name}</span>
                <span className={styles.letterDesc}>{l.desc}</span>
              </span>
              <span className={styles.freq}>{l.freq}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.row}>
        <label htmlFor="newsletter-email" className="srOnly">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          placeholder="Email address"
          className={styles.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className={styles.submit} disabled={!n || pending}>
          {pending ? 'Subscribing…' : `Subscribe to ${n === 1 ? '1 letter' : `${n} letters`}`}
        </button>
      </div>
      {error && <p className="formError" role="alert">{error}</p>}
    </form>
  );
}
