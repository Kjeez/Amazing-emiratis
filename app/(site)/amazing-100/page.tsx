import type { Metadata } from 'next';
import Link from 'next/link';
import Portrait from '@/components/Portrait';
import { AMAZING_100, amazing100 } from '@/lib/content/amazing-100';
import { emirateName } from '@/lib/content/emirates';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: `The Amazing 100, ${AMAZING_100.year}`,
  description: 'The archive’s signature list of Emiratis shaping the country, in alphabetical order.',
};

export default function Amazing100Page() {
  const people = amazing100();

  return (
    <main>
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.eyebrow}>THE LIST · {AMAZING_100.year}</span>
          <h1 className={styles.title}>
            <span className={styles.bar}>The Amazing</span>
            <span className={styles.big}>100</span>
          </h1>
          <p className={styles.intro}>
            Emiratis whose work is shaping the country, chosen by the editors from across the seven Emirates.
            Names appear in alphabetical order: this is a recognition, not a ranking.
          </p>
          <span className={styles.count}><strong>{people.length}</strong> of {AMAZING_100.size} named so far</span>
        </div>
      </header>

      <div className="container">
        <ol className={styles.list}>
          {people.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/profiles/${p.slug}`} className={styles.row}>
                <span className={styles.n}>{String(i + 1).padStart(3, '0')}</span>
                <Portrait name={p.name} field={p.category} ratio="1/1" size="sm" className={styles.ph} />
                <span className={styles.who}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.role}>{p.role}</span>
                </span>
                <span className={styles.short}>{p.short}</span>
                <span className={styles.tags}>
                  <span>{p.category}</span>
                  <span>{emirateName(p.emirate)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Who belongs on the list?</h2>
          <p className={styles.ctaText}>The remaining names are announced through the year. Put someone forward and the editors will review them.</p>
          <Link href="/join" className="btn btnTeal">Nominate someone →</Link>
        </section>
      </div>
    </main>
  );
}
