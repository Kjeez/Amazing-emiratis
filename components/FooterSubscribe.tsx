'use client';

import { useState, useTransition } from 'react';
import { subscribe } from '@/app/actions';
import styles from './SiteFooter.module.css';

export default function FooterSubscribe() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [pending, start] = useTransition();

  if (done) return <p className={styles.thanks} role="status">You’re subscribed to The Monthly. Your first letter arrives with the next issue.</p>;

  return (
    <form
      className={styles.subscribe}
      onSubmit={(e) => {
        e.preventDefault();
        setError('');
        start(async () => {
          const res = await subscribe({ email, letters: ['monthly'], source: 'footer' });
          if (res.ok) setDone(true);
          else setError(res.error);
        });
      }}
    >
      <div className={styles.subscribeRow}>
        <label htmlFor="footer-email" className="srOnly">Your email</label>
        <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className={styles.subscribeInput} />
        <button type="submit" disabled={pending} className={styles.subscribeBtn}>{pending ? 'Sending…' : 'Subscribe'}</button>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  );
}
