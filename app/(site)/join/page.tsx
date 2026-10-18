import type { Metadata } from 'next';
import JoinForm from '@/components/join/JoinForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Join the Archive',
  description: 'Share your story, or the story of someone who deserves to be remembered. Our editors review every application.',
};

const PROCESS: [n: string, t: string, d: string][] = [
  ['01', 'Apply', 'Tell us about yourself or the person you’re putting forward.'],
  ['02', 'Review', 'An editor reads every application and may ask follow-up questions.'],
  ['03', 'Interview', 'If selected, a writer arranges an interview in person.'],
];

export default function JoinPage() {
  return (
    <main className={styles.main}>
      <section className={styles.intro} aria-labelledby="join-title">
        <span className={styles.kicker}>BY APPLICATION</span>
        <h1 id="join-title" className={styles.title}>Join the <em>Archive</em></h1>
        <p className={styles.lede}>Share your story, or the story of someone who deserves to be remembered. Our editors review every application.</p>
        <ol className={styles.process} aria-label="How it works">
          {PROCESS.map(([n, t, d]) => (
            <li key={n} className={styles.processRow}>
              <span className={styles.processNum} aria-hidden="true">{n}</span>
              <span className={styles.processText}>
                <span className={styles.processTitle}>{t}</span>
                <span className={styles.processDesc}>{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.formCard} aria-label="Application form">
        <JoinForm />
      </section>
    </main>
  );
}
