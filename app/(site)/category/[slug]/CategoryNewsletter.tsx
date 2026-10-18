'use client';

import { useId, useState, useTransition } from 'react';
import { subscribe } from '@/app/actions';
import styles from './CategoryNewsletter.module.css';

export default function CategoryNewsletter({ categoryKey, letter, name, description }: {
  categoryKey: string;
  letter: string;
  name: string;
  description: string;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [pending, start] = useTransition();

  return (
    <section className={styles.box} aria-labelledby={`${id}-title`}>
      <div className={styles.text}>
        <h3 id={`${id}-title`} className={styles.title}>{name}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
      {done ? (
        <p className={styles.success} role="status">You’re subscribed to {name}.</p>
      ) : (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            setError('');
            start(async () => {
              const res = await subscribe({ email, letters: [letter], source: `category-${categoryKey}` });
              if (res.ok) setDone(true);
              else setError(res.error);
            });
          }}
        >
          <label htmlFor={`${id}-email`} className="srOnly">Email address</label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <button type="submit" className={styles.button} disabled={pending}>{pending ? 'Sending…' : 'Subscribe'}</button>
          {error && <p id={`${id}-error`} className={`formError ${styles.error}`} role="alert">{error}</p>}
        </form>
      )}
    </section>
  );
}
