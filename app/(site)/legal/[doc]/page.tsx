import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLegalDoc, LEGAL_DOCS } from '@/lib/content/legal';
import s from './page.module.css';

const LEGAL_EMAIL = 'legal@amazingemiratis.ae';

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ doc: d.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  const d = getLegalDoc(doc);
  if (!d) return { title: 'Not found' };
  return { title: d.title, description: d.intro };
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = getLegalDoc(doc);
  if (!d) notFound();

  return (
    <main className={s.wrap}>
      <nav className={s.nav} aria-label="Legal">
        {LEGAL_DOCS.map((x) => (
          <Link
            key={x.key}
            href={`/legal/${x.key}`}
            className={s.navLink}
            aria-current={x.key === d.key ? 'page' : undefined}
          >
            {x.nav}
          </Link>
        ))}
      </nav>

      <article className={s.article}>
        <span className={s.updated}>LAST UPDATED {d.updated}</span>
        <h1 className={s.title}>{d.title}</h1>
        <p className={s.intro}>{d.intro}</p>
        {d.sections.map(([h, p], i) => (
          <section key={h} className={s.section}>
            <h2 className={s.sectionTitle}>{i + 1}. {h}</h2>
            <p className={s.sectionBody}>{p}</p>
          </section>
        ))}
        <p className={s.closing}>
          Questions about this policy? Write to <a href={`mailto:${LEGAL_EMAIL}`} className={s.mail}>{LEGAL_EMAIL}</a>.
        </p>
      </article>
    </main>
  );
}
