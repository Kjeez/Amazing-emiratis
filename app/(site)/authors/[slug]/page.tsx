import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Placeholder from '@/components/Placeholder';
import { storyPhoto } from '@/lib/content/photos';
import { AUTHORS, getAuthor } from '@/lib/content/authors';
import { categoryLabel, shortDate, storiesByAuthor } from '@/lib/content/stories';
import FollowButton from './FollowButton';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return { title: author.name, description: author.bio };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const first = author.name.replace(/^Dr\.\s+/, '').split(' ')[0];
  const stories = storiesByAuthor(author.slug);
  const others = AUTHORS.filter((a) => a.slug !== author.slug);

  return (
    <main className={`container ${styles.main}`}>
      <section className={styles.header}>
        <span className={styles.portrait} aria-hidden="true" />
        <div className={styles.intro}>
          <span className={styles.role}>{author.role.toUpperCase()}</span>
          <h1 className={styles.name}>{author.name}</h1>
          <p className={styles.bio}>{author.bio}</p>
          <div className={styles.actions}>
            <FollowButton slug={author.slug} name={author.name} />
            <span className={styles.stat}>
              {author.storyCount} stories · <a href={`mailto:${author.email}`} className={styles.email}>{author.email}</a>
            </span>
          </div>
        </div>
      </section>

      <section className={styles.stories} aria-labelledby="author-stories">
        <div className="ruleHeading">
          <h2 id="author-stories">STORIES BY {first.toUpperCase()}</h2>
        </div>
        <div className={styles.list}>
          {stories.map((s) => (
            <Link key={s.slug} href={`/stories/${s.slug}`} className={styles.row}>
              <Placeholder label="story image" ratio="3/2" className={styles.rowPh} photo={storyPhoto(s.slug)} sizes="(max-width: 768px) 40vw, 280px" />
              <span className={styles.rowText}>
                <span className={styles.rowCat}>{categoryLabel(s).toUpperCase()}</span>
                <span className={styles.rowTitle}>{s.title}</span>
              </span>
              <time dateTime={s.date} className={styles.rowDate}>{shortDate(s.date)}</time>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.others} aria-labelledby="other-editors">
        <div className="ruleHeading">
          <h2 id="other-editors">OTHER EDITORS</h2>
        </div>
        <div className={styles.otherList}>
          {others.map((o) => (
            <Link key={o.slug} href={`/authors/${o.slug}`} className={styles.other}>
              <span className={styles.otherPh} aria-hidden="true" />
              <span className={styles.otherText}>
                <span className={styles.otherName}>{o.name}</span>
                <span className={styles.otherRole}>{o.role}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
