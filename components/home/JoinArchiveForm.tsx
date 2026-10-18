'use client';

import { useId, useState, useTransition, type FormEvent } from 'react';
import { applyToArchive } from '@/app/actions';
import styles from './JoinArchiveForm.module.css';

/** Short "Join the Archive" form on the homepage: name and email only. */
export default function JoinArchiveForm() {
  const id = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState<{ name: string; email: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set('name', name);
    data.set('email', email);
    data.set('source', 'home');
    setError('');
    startTransition(async () => {
      try {
        const res = await applyToArchive(data);
        if (res.ok) setDone({ name: name.trim(), email: email.trim() });
        else setError(res.error);
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  };

  if (done) {
    return <p role="status" className={`formSuccess ${styles.thanks}`}>Thank you, {done.name}. We’ll write to {done.email} within ten working days.</p>;
  }

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor={`${id}-name`} className="srOnly">Full name</label>
        <input
          id={`${id}-name`}
          name="name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          autoComplete="name"
          required
        />
        <label htmlFor={`${id}-email`} className="srOnly">Email address</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
          required
        />
        <button type="submit" className={styles.submit} disabled={pending}>{pending ? 'Sending…' : 'Apply Now →'}</button>
      </form>
      {error && <p role="alert" className={`formError ${styles.error}`}>{error}</p>}
    </>
  );
}
