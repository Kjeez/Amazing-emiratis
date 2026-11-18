import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPressRelease, PRESS_CONTACT, PRESS_RELEASES } from '@/lib/content/press';
import { longDate } from '@/lib/content/stories';
import styles from '../press.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRESS_RELEASES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPressRelease((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function PressReleasePage({ params }: Props) {
  const p = getPressRelease((await params).slug);
  if (!p) notFound();
  const others = PRESS_RELEASES.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <main className="container">
      <article className={styles.article}>
        <Link href="/press" className={styles.back}>← All press releases</Link>
        <span className="eyebrow">PRESS RELEASE · <time dateTime={p.date}>{longDate(p.date).toUpperCase()}</time></span>
        <h1 className={styles.articleTitle}>{p.title}</h1>
        <p className={styles.lede}>{p.summary}</p>
        {p.body.map((para, i) => <p key={i} className={styles.para}>{para}</p>)}
        <p className={styles.contact}>
          Media enquiries: {PRESS_CONTACT.name}, <a href={`mailto:${PRESS_CONTACT.email}`}>{PRESS_CONTACT.email}</a>
        </p>
      </article>
      <section className={styles.others}>
        <div className="ruleHeading"><h2>MORE RELEASES</h2></div>
        <ol className={styles.list}>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/press/${o.slug}`} className={styles.item}>
                <time dateTime={o.date} className={styles.date}>{longDate(o.date)}</time>
                <span className={styles.itemText}><span className={styles.itemTitle}>{o.title}</span></span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
