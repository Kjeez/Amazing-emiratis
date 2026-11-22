import Link from 'next/link';
import Portrait from '@/components/Portrait';
import { emirateName } from '@/lib/content/emirates';
import { collectionPeople, type Collection } from '@/lib/content/people';
import styles from './CollectionPage.module.css';

/** Page listing one curated collection of profiles. */
export default function CollectionPage({ collection }: { collection: Collection }) {
  const people = collectionPeople(collection);
  return (
    <main className="container">
      <header className={styles.header}>
        <span className="eyebrow">A COLLECTION</span>
        <h1 className={styles.title}>{collection.title} <em className="gold">{collection.titleEm}</em></h1>
        <p className={styles.intro}>{collection.intro}</p>
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
        <h2 className={styles.ctaTitle}>Who belongs here?</h2>
        <p className={styles.ctaText}>{collection.cta}</p>
        <Link href="/join" className="btn btnTeal">Put someone forward →</Link>
      </section>
    </main>
  );
}
