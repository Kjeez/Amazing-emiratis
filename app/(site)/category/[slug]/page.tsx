import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Placeholder from '@/components/Placeholder';
import { storyPhoto } from '@/lib/content/photos';
import { authorName } from '@/lib/content/authors';
import { CATEGORIES, CATEGORY_PEOPLE, getCategory } from '@/lib/content/categories';
import { LETTERS, type LetterKey } from '@/lib/content/newsletters';
import { personHref } from '@/lib/content/people';
import { MOST_READ, shortDate, storiesInCategory, storyHref } from '@/lib/content/stories';
import CategoryNewsletter from './CategoryNewsletter';
import CategoryStories, { type GridStory } from './CategoryStories';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: cat.label, description: cat.dek };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const n = String(CATEGORIES.indexOf(cat) + 1).padStart(2, '0');
  const all = storiesInCategory(cat.key);
  const lead = all.find((s) => s.dek) ?? all[0];
  const rest = all.filter((s) => s !== lead);

  // "Most read" is a deterministic order: the site-wide most-read list first, then the rest by date.
  const popRank = (storySlug: string) => {
    const i = MOST_READ.indexOf(storySlug);
    return i === -1 ? MOST_READ.length : i;
  };
  const grid: GridStory[] = rest.map((s, i) => ({
    photo: storyPhoto(s.slug),
    slug: s.slug,
    href: storyHref(s.slug),
    sub: s.sub,
    title: s.title,
    date: shortDate(s.date),
    read: `${s.readMins} min read`,
    latestRank: i,
    popRank: popRank(s.slug) * 1000 + i,
  }));

  const letter: LetterKey = LETTERS.some((l) => l.key === cat.key) ? (cat.key as LetterKey) : 'monthly';
  const letterName = LETTERS.find((l) => l.key === letter)!.name;

  return (
    <main className="container">
      <section className={styles.header}>
        <div className={styles.topRow}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className={styles.crumbCurrent}>{cat.label}</span>
          </nav>
          <nav aria-label="Categories" className={styles.tabs}>
            {CATEGORIES.map((c) => (
              <Link key={c.key} href={`/category/${c.key}`} className={styles.tab} aria-current={c.key === cat.key ? 'page' : undefined}>
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.titleRow}>
          <div className={styles.titleCol}>
            <span className={styles.kicker}>
              {n} — <span lang="ar">{cat.ar}</span>
            </span>
            <h1 className={styles.title}>{cat.label}</h1>
          </div>
          <div className={styles.dekCol}>
            <p className={styles.dek}>{cat.dek}</p>
            <span className={styles.counts}>{cat.count} stories · {cat.people} profiles</span>
          </div>
        </div>
      </section>

      <CategoryStories label={cat.label} subs={cat.subs} stories={grid}>
        {lead && (
          <section className={styles.lead}>
            <Link href={storyHref(lead.slug)} className={styles.leadImage} tabIndex={-1} aria-hidden="true">
              <Placeholder label="lead story image 16:10" ratio="16/10" className={styles.leadPh} photo={storyPhoto(lead.slug)} sizes="(max-width: 768px) 100vw, 60vw" priority />
            </Link>
            <div className={styles.leadText}>
              <span className="eyebrow">{lead.sub}</span>
              <Link href={storyHref(lead.slug)} className={styles.leadTitle}>{lead.title}</Link>
              {lead.dek && <p className={styles.leadDek}>{lead.dek}</p>}
              <span className={styles.leadMeta}>By {authorName(lead.author)} · {lead.readMins} min read</span>
            </div>
          </section>
        )}
      </CategoryStories>

      <section className={styles.people}>
        <div className={styles.peopleHead}>
          <h2 className={styles.peopleTitle}>People in <em>{cat.label}</em></h2>
          <Link href={`/profiles?cat=${cat.label}`} className="underlineLink">All {cat.people} profiles</Link>
        </div>
        <div className={styles.peopleGrid}>
          {CATEGORY_PEOPLE[cat.key].map(([name, role]) => (
            <Link key={name} href={personHref(name)} className={styles.person}>
              <Placeholder label="portrait 3:4" ratio="3/4" className={styles.smallPh} />
              <span className={styles.personName}>{name}</span>
              <span className={styles.personRole}>{role}</span>
            </Link>
          ))}
        </div>
      </section>

      <CategoryNewsletter
        categoryKey={cat.key}
        letter={letter}
        name={letter === 'monthly' ? letterName : `The ${cat.label} Letter`}
        description={
          letter === 'monthly'
            ? `The best of the archive, including new ${cat.label.toLowerCase()} stories, once a month.`
            : `New ${cat.label.toLowerCase()} stories from the archive, every second Sunday.`
        }
      />
    </main>
  );
}
