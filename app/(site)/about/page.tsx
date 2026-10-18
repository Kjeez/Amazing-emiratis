import type { Metadata } from 'next';
import Link from 'next/link';
import Placeholder from '@/components/Placeholder';
import { photo } from '@/lib/content/photos';
import { AUTHORS } from '@/lib/content/authors';
import { CONTACTS } from '@/lib/content/site';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'Amazing Emiratis records the lives and work of the people building the UAE, so that their stories are kept, read and passed on.',
};

const PRINCIPLES = [
  ['01', 'Reported, not sourced', 'Every profile begins with a conversation in person. We do not publish press releases or paid features.'],
  ['02', 'Verified', 'Facts, dates and achievements are checked against records and at least two independent sources.'],
  ['03', 'Kept', 'Profiles are updated as lives change, and nothing is removed from the archive without the subject’s request.'],
] as const;

const SELECTION = [
  ['Nomination', 'Anyone can nominate someone, including themselves. Editors also research candidates directly.'],
  ['Research', 'A researcher verifies the nominee’s work, impact and public record.'],
  ['Editorial review', 'The editorial board meets monthly to decide which profiles to commission.'],
  ['Interview and publication', 'A writer interviews the subject, and the profile is fact-checked before it is published.'],
] as const;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function AboutPage() {
  return (
    <>
      <section className={`container ${s.headerWrap}`}>
        <div className={s.header}>
          <div className={s.headerTitle}>
            <span className={s.kicker}>ABOUT US</span>
            <h1 className={s.title}>An archive of <em className="gold">people</em></h1>
          </div>
          <div className={s.headerAside}>
            <p className={s.intro}>Amazing Emiratis records the lives and work of the people building the UAE, so that their stories are kept, read and passed on.</p>
            <span className={s.meta}>Founded 2022 · Abu Dhabi</span>
          </div>
        </div>
      </section>

      <main className="container">
        <section className={s.mission}>
          <div className={s.missionImage}>
            <Placeholder label="editorial photograph — team in the archive room" ratio="4/5" dark className={s.missionPh} photo={photo('page/about')} sizes="(max-width: 768px) 100vw, 45vw" priority />
          </div>
          <div className={s.missionText}>
            <p className={s.missionLead}>We started with a simple question: where would a child in Fujairah go to read about the people who came before them?</p>
            <p>Most of the remarkable people in this country are known only to those who work beside them. Their stories live in family memory, in local newspapers and in conversations that are never written down.</p>
            <p>Amazing Emiratis is a curated archive and an editorial magazine. Every profile is researched, verified and written by our editors. Every story is reported in person.</p>
          </div>
        </section>

        <section className={s.section}>
          <div className="ruleHeading"><h2>HOW WE WORK</h2></div>
          <div className={s.principles}>
            {PRINCIPLES.map(([n, title, body]) => (
              <div key={n} className={s.principle}>
                <span className={s.principleNum}>{n}</span>
                <h3 className={s.principleTitle}>{title}</h3>
                <p className={s.principleBody}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${s.section} ${s.selection}`}>
          <div className={s.selectionHead}>
            <h2 className={s.selectionTitle}>How people are <em className="gold">selected</em></h2>
            <Link href="/legal/editorial" className={`underlineLink ${s.policyLink}`}>Read the editorial policy</Link>
          </div>
          <ol className={s.steps}>
            {SELECTION.map(([title, body], i) => (
              <li key={title} className={s.step}>
                <span className={s.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={s.stepText}>
                  <span className={s.stepTitle}>{title}</span>
                  <span className={s.stepBody}>{body}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.section}>
          <div className="ruleHeading"><h2>THE EDITORS</h2></div>
          <div className={s.team}>
            {AUTHORS.map((a) => (
              <Link key={a.slug} href={`/authors/${a.slug}`} className={s.editor}>
                <Placeholder label="portrait 4:5" ratio="4/5" className={s.editorPh} />
                <span className={s.editorName}>{a.name}</span>
                <span className={s.editorRole}>{a.role}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={s.contact}>
          <h2 className={s.contactTitle}>Get in touch</h2>
          <div className={s.contacts}>
            {CONTACTS.map((c) => (
              <div key={c.k} className={s.contactItem}>
                <span className={s.contactKey}>{c.k}</span>
                {isEmail(c.v) ? (
                  <a href={`mailto:${c.v}`} className={s.contactValue}>{c.v}</a>
                ) : (
                  <span className={s.contactValue}>{c.v}</span>
                )}
                <span className={s.contactNote}>{c.note}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
