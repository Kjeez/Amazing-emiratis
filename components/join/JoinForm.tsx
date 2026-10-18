'use client';

import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';
import { applyToArchive } from '@/app/actions';
import { EMIRATE_OPTIONS } from '@/lib/content/site';
import styles from './JoinForm.module.css';

const FIELDS = ['Business', 'Culture', 'Health', 'Lifestyle', 'Technology', 'Community', 'Other'];
const MODES = [
  { value: 'myself', label: 'I’m applying for myself' },
  { value: 'someone-else', label: 'For someone else' },
] as const;
type Mode = (typeof MODES)[number]['value'];

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES = ['image/jpeg', 'image/png'];

export default function JoinForm() {
  const [mode, setMode] = useState<Mode>('myself');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emirate, setEmirate] = useState('Abu Dhabi');
  const [field, setField] = useState('Business');
  const [story, setStory] = useState('');
  const [links, setLinks] = useState('');
  const [consent, setConsent] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <span className={styles.diamond} aria-hidden="true" />
        <span className={styles.doneTitle}>Thank you, {name.trim().split(/\s+/)[0]}.</span>
        <span className={styles.doneText}>Your application is with the editors. We’ll write to {email.trim()} within ten working days.</span>
        <Link href="/profiles" className={styles.doneLink}>Browse the archive</Link>
      </div>
    );
  }

  /** Validates a chosen or dropped file; returns false (and shows why) when it is rejected. */
  function pickFile(file: File | null): boolean {
    setError('');
    if (file && !PHOTO_TYPES.includes(file.type)) {
      setError('The photograph must be a JPG or PNG.');
      setPhoto(null);
      return false;
    }
    if (file && file.size > MAX_PHOTO_BYTES) {
      setError('The photograph must be smaller than 5 MB.');
      setPhoto(null);
      return false;
    }
    setPhoto(file);
    return true;
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!pickFile(e.target.files?.[0] ?? null)) e.target.value = '';
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (fileRef.current) fileRef.current.value = '';
    pickFile(file);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    fd.set('mode', mode);
    fd.set('name', name);
    fd.set('email', email);
    fd.set('emirate', emirate);
    fd.set('field', field);
    fd.set('story', story);
    fd.set('links', links);
    if (consent) fd.set('consent', 'on');
    if (photo) fd.set('photo', photo);
    fd.set('source', 'join');
    start(async () => {
      const res = await applyToArchive(fd);
      if (res.ok) {
        setSent(true);
        window.scrollTo({ top: 0 });
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.modes} role="group" aria-label="Who is this application for?">
        {MODES.map((m) => (
          <button key={m.value} type="button" className={styles.mode} aria-pressed={mode === m.value} onClick={() => setMode(m.value)}>
            {m.label}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{mode === 'myself' ? 'YOUR FULL NAME *' : 'THEIR FULL NAME *'}</span>
          <input type="text" className="input" required maxLength={120} autoComplete={mode === 'myself' ? 'name' : 'off'} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>EMAIL *</span>
          <input type="email" className="input" required maxLength={254} autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>EMIRATE</span>
          <select className="select" value={emirate} onChange={(e) => setEmirate(e.target.value)}>
            {EMIRATE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>FIELD</span>
          <select className="select" value={field} onChange={(e) => setField(e.target.value)}>
            {FIELDS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>

      <label className={styles.fieldBlock}>
        <span className={styles.label}>THE STORY IN A FEW SENTENCES *</span>
        <textarea className={`textarea ${styles.textarea}`} rows={6} required maxLength={3000} placeholder="What have they done, and why does it matter?" value={story} onChange={(e) => setStory(e.target.value)} />
      </label>

      <label className={styles.fieldBlock}>
        <span className={styles.label}>LINKS (OPTIONAL)</span>
        <input type="text" className="input" maxLength={1000} placeholder="Website, LinkedIn, press coverage" value={links} onChange={(e) => setLinks(e.target.value)} />
      </label>

      <label className={styles.photo} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
        <span className={styles.label}>PHOTOGRAPH (OPTIONAL)</span>
        <span className={styles.drop}>{photo ? photo.name : 'Drop or choose a portrait (JPG or PNG)'}</span>
        <input ref={fileRef} type="file" name="photo" accept="image/jpeg,image/png" className={styles.fileInput} onChange={onFile} />
      </label>
      {photo && (
        <button
          type="button"
          className={styles.removePhoto}
          onClick={() => { setPhoto(null); if (fileRef.current) fileRef.current.value = ''; }}
        >
          Remove photograph
        </button>
      )}

      <label className={styles.check}>
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        I agree to be contacted by the editorial team about this application.
      </label>

      {error && <p className="formError" role="alert">{error}</p>}

      <button type="submit" className={styles.submit} disabled={pending}>{pending ? 'Sending…' : 'Apply Now →'}</button>
    </form>
  );
}
