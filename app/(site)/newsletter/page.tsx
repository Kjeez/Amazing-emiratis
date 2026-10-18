import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import Placeholder from '@/components/Placeholder';
import { storyPhoto } from '@/lib/content/photos';
import { ISSUES } from '@/lib/content/newsletters';
import { findStory, storyHref } from '@/lib/content/stories';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Newsletters',
  description: 'Choose the letters you want. No more than one email a week, and you can leave at any time.',
};

export default function NewsletterPage() {
  const [latestNo, latestTitle] = ISSUES[0];

  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="newsletter-title">
        <div className={styles.heroText}>
          <span className={styles.kicker}>NEWSLETTERS</span>
          <h1 id="newsletter-title" className={styles.title}>Stories worth <em>keeping</em></h1>
          <p className={styles.lede}>Choose the letters you want. No more than one email a week, and you can leave at any time.</p>
          <NewsletterSignup />
        </div>
        <div className={styles.sampleWrap}>
          <article className={styles.sample} aria-label={`Sample issue: The Monthly, No. ${latestNo}`}>
            <span className={styles.sampleTop}><span>THE MONTHLY</span><span>NO. {latestNo}</span></span>
            <span className={styles.sampleMast}>Amazing <em>Emiratis</em></span>
            <Placeholder label="issue cover image" ratio="16/10" className={styles.samplePh} photo={storyPhoto(findStory(latestTitle)?.slug ?? '')} sizes="(max-width: 768px) 100vw, 480px" />
            <Link href={storyHref(latestTitle)} className={styles.sampleTitle}>{latestTitle}</Link>
            <span className={styles.sampleDek}>This month: three designers taking the abaya to Paris, a poet’s archive of 6,000 verses, and the team steering a rover on the Moon.</span>
            <span className={styles.sampleRule} aria-hidden="true" />
            <span className={styles.sampleAlso}>Also inside: Most Read · Awards update · Events</span>
          </article>
        </div>
      </section>

      <section className={styles.past} aria-labelledby="past-title">
        <div className="ruleHeading"><h2 id="past-title">PAST ISSUES OF THE MONTHLY</h2></div>
        <ul className={styles.issues}>
          {ISSUES.map(([n, title, date]) => (
            <li key={n}>
              <Link href={storyHref(title)} className={styles.issue}>
                <span className={styles.issueNo}>No. {n}</span>
                <span className={styles.issueTitle}>{title}</span>
                <span className={styles.issueDate}>{date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
