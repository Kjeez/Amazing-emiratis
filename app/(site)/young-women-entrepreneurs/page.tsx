import type { Metadata } from 'next';
import Link from 'next/link';
import Portrait from '@/components/Portrait';
import { emirateName } from '@/lib/content/emirates';
import { getPerson, YOUNG_WOMEN_ENTREPRENEURS, type Person } from '@/lib/content/people';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Young Women Entrepreneurs',
  description: 'Young Emirati women building companies, from fashion and coffee to payments and reforestation.',
};

export default function YoungWomenEntrepreneursPage() {
  const people = YOUNG_WOMEN_ENTREPRENEURS.map(getPerson).filter((p): p is Person => Boolean(p));

  return (
    <main className="container">
      <header className={styles.header}>
        <span className="eyebrow">A COLLECTION</span>
        <h1 className={styles.title}>Young Women <em className="gold">Entrepreneurs</em></h1>
        <p className={styles.intro}>
          Founders in their twenties and thirties building companies in the Emirates, from heritage fashion and specialty
          coffee to digital payments and reforestation technology.
        </p>
      </header>

      <ul className={styles.grid}>
        {people.map((p) => (
          <li key={p.slug}>
            <Link href={`/profiles/${p.slug}`} className={styles.card}>
              <Portrait name={p.name} nameAr={p.nameAr} field={p.category} ratio="4/5" />
              <span className={styles.meta}>{p.category.toUpperCase()} · {emirateName(p.emirate).toUpperCase()}</span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.role}>{p.role}</span>
              <span className={styles.short}>{p.short}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Know a founder who belongs here?</h2>
        <p className={styles.ctaText}>Tell us about her. The editors review every application.</p>
        <Link href="/join" className="btn btnTeal">Put her forward →</Link>
      </section>
    </main>
  );
}
