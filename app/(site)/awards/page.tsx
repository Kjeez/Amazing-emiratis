import type { Metadata } from 'next';
import Link from 'next/link';
import AwardsFaq from '@/components/awards/AwardsFaq';
import NominationCta from '@/components/awards/NominationCta';
import Countdown from '@/components/Countdown';
import Placeholder from '@/components/Placeholder';
import { AWARD_CATEGORIES, AWARDS_FAQ, AWARDS_TIMELINE, JURY_2026, WINNERS_2025 } from '@/lib/content/awards';
import { getPerson } from '@/lib/content/people';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Awards 2026',
  description: 'Fourteen categories. An independent jury. One evening in Abu Dhabi to honour the people shaping the nation.',
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function AwardsPage() {
  const winners = WINNERS_2025.flatMap(([cat, slug]) => {
    const p = getPerson(slug);
    return p ? [{ cat, name: p.name, role: p.role, href: `/profiles/${p.slug}` }] : [];
  });

  return (
    <main>
      <section className={styles.hero} aria-labelledby="awards-title">
        <span className={styles.heroDots} aria-hidden="true" />
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <span className={styles.heroKicker}>The Amazing Emiratis</span>
            <h1 id="awards-title" className={styles.heroTitle}>Awards <em>2026</em></h1>
            <p className={styles.heroLede}>Fourteen categories. An independent jury. One evening in Abu Dhabi to honour the people shaping the nation.</p>
            <div className={styles.heroActions}>
              <NominationCta className={styles.heroPrimary} closedClassName={styles.heroClosed}>Submit a nomination</NominationCta>
              <a href="#how" className={styles.heroSecondary}>How it works</a>
            </div>
          </div>
          <div className={styles.heroCountdown}>
            <span className={styles.closeLabel}>NOMINATIONS CLOSE 15 DECEMBER 2026</span>
            <Countdown className={styles.countdown} unitClassName={styles.unit} valueClassName={styles.unitValue} labelClassName={styles.unitLabel} />
          </div>
        </div>
      </section>

      <div className="container">
        <section id="how" className={styles.timelineSection} aria-labelledby="how-title">
          <div className="ruleHeading"><h2 id="how-title">HOW IT WORKS</h2></div>
          <ol className={styles.timeline}>
            {AWARDS_TIMELINE.map((t) => (
              <li key={t.title} className={styles.step} aria-current={t.now ? 'step' : undefined}>
                <span className={t.now ? `${styles.dot} ${styles.dotNow}` : styles.dot} aria-hidden="true" />
                <span className={styles.stepDate}>{t.date}</span>
                <span className={styles.stepTitle}>{t.title}</span>
                <span className={styles.stepBody}>{t.body}</span>
                {t.now && <span className={styles.nowBadge}>NOW</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="cats-title">
          <div className={styles.catsHead}>
            <h2 id="cats-title" className={styles.catsTitle}>Fourteen <em>categories</em></h2>
            <span className={styles.catsNote}>Choose one when you nominate.</span>
          </div>
          <div className={styles.cats}>
            {AWARD_CATEGORIES.map(([name, desc], i) => (
              <Link key={name} href={`/nominate?cat=${encodeURIComponent(name)}`} className={styles.cat}>
                <span className={styles.catNum}>{pad(i + 1)}</span>
                <span className={styles.catName}>{name}</span>
                <span className={styles.catDesc}>{desc}</span>
                <span className={styles.catCta}>Nominate in this category →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="winners-title">
          <div className="ruleHeading">
            <h2 id="winners-title">2025 WINNERS</h2>
            <Link href="/profiles" className={styles.headLink}>All past winners →</Link>
          </div>
          <div className={styles.winners}>
            {winners.map((w) => (
              <Link key={w.href} href={w.href} className={styles.winner}>
                <Placeholder label="winner portrait 3:4" ratio="3/4" className={styles.winnerPh} />
                <span className={styles.winnerCat}>{w.cat}</span>
                <span className={styles.winnerName}>{w.name}</span>
                <span className={styles.winnerRole}>{w.role}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="jury-title">
          <div className="ruleHeading"><h2 id="jury-title">THE 2026 JURY</h2></div>
          <ul className={styles.jury}>
            {JURY_2026.map(([name, role]) => (
              <li key={name} className={styles.juror}>
                <span className={styles.jurorPh} aria-hidden="true" />
                <span className={styles.jurorName}>{name}</span>
                <span className={styles.jurorRole}>{role}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title">
          <h2 id="faq-title" className={styles.faqTitle}>Questions</h2>
          <AwardsFaq items={AWARDS_FAQ} />
        </section>

        <section className={styles.cta} aria-labelledby="cta-title">
          <h2 id="cta-title" className={styles.ctaTitle}>Who deserves to be <em>recognised</em> this year?</h2>
          <NominationCta className={styles.ctaBtn} closedClassName={styles.ctaClosed}>Start a nomination →</NominationCta>
        </section>
      </div>
    </main>
  );
}
