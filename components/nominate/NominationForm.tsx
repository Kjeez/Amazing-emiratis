'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useTransition } from 'react';
import { submitNomination } from '@/app/actions';
import { AWARD_CATEGORY_NAMES, RELATION_OPTIONS, WHY_MAX, WHY_MIN } from '@/lib/content/awards';
import { EMIRATE_OPTIONS } from '@/lib/content/site';
import styles from './NominationForm.module.css';

type Fields = {
  nomName: string; nomEmirate: string; nomRole: string; nomLink: string; self: boolean;
  category: string; why: string; achievement: string; evidence: string;
  yourName: string; yourEmail: string; yourPhone: string; relation: string; consent: boolean;
};

const blank = (category = ''): Fields => ({
  nomName: '', nomEmirate: 'Abu Dhabi', nomRole: '', nomLink: '', self: false,
  category, why: '', achievement: '', evidence: '',
  yourName: '', yourEmail: '', yourPhone: '', relation: 'Colleague', consent: false,
});

const STEPS = ['Nominee', 'Category', 'Why', 'You', 'Review'];
const TITLES = ['Who are you nominating?', 'Choose a category', 'Tell us why', 'Your details', 'Review and submit'];
const HINTS = ['Name and role are required.', 'Select one category.', `Write at least ${WHY_MIN} characters.`, 'Name, valid email and consent are required.', ''];
const pad = (n: number) => String(n).padStart(2, '0');

function valid(f: Fields, i: number): boolean {
  if (i === 0) return Boolean(f.nomName.trim() && f.nomRole.trim());
  if (i === 1) return Boolean(f.category);
  if (i === 2) return f.why.length >= WHY_MIN;
  if (i === 3) return Boolean(f.yourName.trim() && /.+@.+\..+/.test(f.yourEmail) && f.consent);
  return true;
}

export default function NominationForm({ initialCategory }: { initialCategory: string }) {
  const [f, setF] = useState<Fields>(() => blank(initialCategory));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<{ ref: string; nomName: string; yourEmail: string; category: string } | null>(null);
  const [error, setError] = useState('');
  const [pending, start] = useTransition();

  // Scroll to the top whenever the step (or the confirmation) changes, but not on first render.
  // Move focus to the new heading so screen readers announce the step.
  const mounted = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((s) => ({ ...s, [k]: v }));
  const text = (k: keyof Fields) => ({
    value: f[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(k, e.target.value as never),
  });

  const ok = valid(f, step);
  const firstInvalid = [0, 1, 2, 3, 4].findIndex((i) => !valid(f, i));
  const reach = firstInvalid === -1 ? 4 : firstInvalid;

  const goTo = (i: number) => { setError(''); setStep(i); };

  function next() {
    if (!ok || pending) return;
    if (step < 4) { goTo(step + 1); return; }
    setError('');
    start(async () => {
      const res = await submitNomination({ ...f });
      if (res.ok) setDone({ ref: res.ref, nomName: f.nomName.trim(), yourEmail: f.yourEmail.trim(), category: f.category });
      else setError(res.error);
    });
  }

  function restart() {
    setF(blank());
    setStep(0);
    setError('');
    setDone(null);
  }

  if (done) {
    return (
      <section className={styles.confirm} role="status" aria-labelledby="nomination-done">
        <span className={styles.diamond} aria-hidden="true" />
        <h1 id="nomination-done" ref={headingRef} tabIndex={-1} className={styles.confirmTitle}>Thank you. <em>{done.nomName}</em> has been nominated.</h1>
        <p className={styles.confirmText}>
          We’ll write to {done.yourEmail} if we need anything more. Our editors will review the nomination for {done.category} and may be in touch before the shortlist is announced on 20 January 2027.
        </p>
        <span className={styles.ref}>Reference {done.ref}</span>
        <div className={styles.confirmActions}>
          <button type="button" className={styles.again} onClick={restart}>Nominate someone else</button>
          <Link href="/awards" className={styles.toAwards}>Back to Awards 2026</Link>
        </div>
      </section>
    );
  }

  const review: [k: string, v: string, step: number][] = [
    ['NOMINEE', f.nomName + (f.self ? ' (self-nomination)' : ''), 0],
    ['ROLE', `${f.nomRole}, ${f.nomEmirate}`, 0],
    ['CATEGORY', f.category, 1],
    ['WHY', f.why, 2],
    ['ACHIEVEMENT', f.achievement || '—', 2],
    ['NOMINATED BY', `${f.yourName} · ${f.yourEmail} · ${f.relation}`, 3],
  ];

  return (
    <form
      noValidate
      onSubmit={(e) => { e.preventDefault(); next(); }}
      aria-labelledby="nominate-title"
    >
      <div className={styles.head}>
        <span className={styles.kicker}>AWARDS 2026 · NOMINATION</span>
        <h1 id="nominate-title" ref={headingRef} tabIndex={-1} className={styles.title}>{TITLES[step]}</h1>
      </div>

      <div className={styles.steps} role="list" aria-label="Nomination steps">
        {STEPS.map((label, i) => (
          <div role="listitem" key={label}>
            <button
              type="button"
              className={styles.stepBtn}
              disabled={i > reach}
              aria-current={i === step ? 'step' : undefined}
              onClick={() => goTo(i)}
            >
              <span className={i <= step ? `${styles.bar} ${styles.barOn}` : styles.bar} />
              <span className={i === step ? `${styles.stepLabel} ${styles.stepLabelOn}` : styles.stepLabel}>{pad(i + 1)} {label}</span>
            </button>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className={styles.stack}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>NOMINEE FULL NAME *</span>
              <input type="text" className="input" required autoComplete="off" placeholder="e.g. Fatima Al Qasimi" maxLength={120} {...text('nomName')} />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>EMIRATE *</span>
              <select className="select" required {...text('nomEmirate')}>
                {EMIRATE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          </div>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>CURRENT ROLE *</span>
              <input type="text" className="input" required placeholder="e.g. Founder, Bayt Interiors" maxLength={160} {...text('nomRole')} />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>WEBSITE OR PROFILE LINK</span>
              <input type="text" inputMode="url" className="input" placeholder="https://" maxLength={500} {...text('nomLink')} />
            </label>
          </div>
          <label className={styles.checkInline}>
            <input type="checkbox" checked={f.self} onChange={(e) => set('self', e.target.checked)} />
            I am nominating myself
          </label>
        </div>
      )}

      {step === 1 && (
        <div className={styles.cats} role="group" aria-label="Award category">
          {AWARD_CATEGORY_NAMES.map((c, i) => (
            <button key={c} type="button" className={styles.cat} aria-pressed={f.category === c} onClick={() => set('category', c)}>
              <span className={styles.catNum}>{pad(i + 1)}</span>
              <span className={styles.catName}>{c}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className={styles.stack}>
          <label className={styles.fieldBlock}>
            <span className={styles.label}>WHY DO THEY DESERVE THIS AWARD? *</span>
            <textarea
              className={`textarea ${styles.textarea}`}
              rows={8}
              required
              minLength={WHY_MIN}
              maxLength={WHY_MAX}
              placeholder={`Describe their work, its impact, and why now. At least ${WHY_MIN} characters.`}
              aria-describedby="why-count"
              {...text('why')}
            />
            <span id="why-count" className={f.why.length >= WHY_MIN ? `${styles.count} ${styles.countOk}` : styles.count}>
              {f.why.length} / {WHY_MAX} · minimum {WHY_MIN}
            </span>
          </label>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>ONE KEY ACHIEVEMENT</span>
              <input type="text" className="input" placeholder="e.g. Built the first rural clinic network in Fujairah" maxLength={500} {...text('achievement')} />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>SUPPORTING LINK</span>
              <input type="text" className="input" placeholder="Article, video or report" maxLength={500} {...text('evidence')} />
            </label>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stack}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>YOUR FULL NAME *</span>
              <input type="text" className="input" required autoComplete="name" placeholder="Your name" maxLength={120} {...text('yourName')} />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>EMAIL *</span>
              <input type="email" className="input" required autoComplete="email" placeholder="you@example.com" maxLength={254} {...text('yourEmail')} />
            </label>
          </div>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>PHONE</span>
              <input type="tel" className="input" autoComplete="tel" placeholder="+971" maxLength={40} {...text('yourPhone')} />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>RELATIONSHIP TO NOMINEE</span>
              <select className="select" {...text('relation')}>
                {RELATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          </div>
          <label className={styles.checkBlock}>
            <input type="checkbox" required checked={f.consent} onChange={(e) => set('consent', e.target.checked)} />
            I confirm the information is accurate and agree that the editorial team may contact me and the nominee. *
          </label>
        </div>
      )}

      {step === 4 && (
        <dl className={styles.review}>
          {review.map(([k, v, s]) => (
            <div key={k} className={styles.reviewRow}>
              <dt className={styles.reviewKey}>{k}</dt>
              <dd className={styles.reviewVal}>{v}</dd>
              <dd className={styles.reviewEdit}>
                <button type="button" className={styles.edit} onClick={() => goTo(s)} aria-label={`Edit ${k.toLowerCase()}`}>Edit</button>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {error && <p className={`formError ${styles.error}`} role="alert">{error}</p>}

      <div className={styles.nav}>
        <button
          type="button"
          className={styles.back}
          onClick={() => step > 0 && goTo(step - 1)}
          disabled={step === 0}
          style={step === 0 ? { visibility: 'hidden' } : undefined}
        >
          ← Back
        </button>
        <div className={styles.navRight}>
          <span className={styles.hint} aria-live="polite">{ok ? '' : HINTS[step]}</span>
          <button type="submit" className={styles.next} disabled={!ok || pending}>
            {step === 4 ? (pending ? 'Submitting…' : 'Submit nomination') : 'Continue →'}
          </button>
        </div>
      </div>
    </form>
  );
}
