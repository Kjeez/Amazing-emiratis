import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Placeholder from '@/components/Placeholder';
import { photo as photoBySlot, storyPhoto, type Photo } from '@/lib/content/photos';
import { getAuthor } from '@/lib/content/authors';
import { getCategory } from '@/lib/content/categories';
import { emirateName } from '@/lib/content/emirates';
import { personHref } from '@/lib/content/people';
import { getStoryBody, type StoryBlock } from '@/lib/content/story-bodies';
import { categoryLabel, getStory, longDate, STORIES, storiesByDate, storiesInCategory, type Story } from '@/lib/content/stories';
import { ReadingProgress, StoryActions } from './StoryTools';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.dek,
    openGraph: { type: 'article', title: story.title, description: story.dek, publishedTime: story.date },
  };
}

const href = (s: Story) => `/stories/${s.slug}`;

function categoryHref(s: Story): string {
  return getCategory(s.category) ? `/category/${s.category}` : `/search?q=${encodeURIComponent(categoryLabel(s))}`;
}

function related(story: Story): Story[] {
  const same = storiesInCategory(story.category).filter((s) => s.slug !== story.slug);
  const fill = storiesByDate().filter((s) => s.slug !== story.slug && !same.includes(s));
  return [...same, ...fill].slice(0, 4);
}

function nextStory(story: Story): Story {
  const all = storiesByDate();
  const i = all.findIndex((s) => s.slug === story.slug);
  return all[(i + 1) % all.length];
}

/** Caption for a stock photograph: what it shows and who took it, never a claim about the story's subjects. */
function PhotoCaption({ photo }: { photo: Photo }) {
  return (
    <>
      <span>{photo.alt}.</span>
      <span>Photograph: <a href={photo.creditHref} target="_blank" rel="noopener noreferrer">{photo.credit}</a> / Unsplash</span>
    </>
  );
}

function Block({ block, figurePhoto }: { block: StoryBlock; figurePhoto?: Photo }) {
  switch (block.type) {
    case 'p':
      if (block.dropCap) {
        return (
          <p className={styles.p}>
            <span className={styles.dropCap}>{block.text.charAt(0)}</span>{block.text.slice(1)}
          </p>
        );
      }
      return <p className={styles.p}>{block.text}</p>;
    case 'quote':
      return (
        <figure className={styles.quote}>
          <blockquote className={styles.quoteText}>{block.text}</blockquote>
          <figcaption className={styles.quoteCite}>{block.cite.toUpperCase()}</figcaption>
        </figure>
      );
    case 'h2':
      return <h2 className={styles.h2}>{block.text}</h2>;
    case 'figure':
      return (
        <figure className={styles.figure}>
          <Placeholder label={block.label} ratio={block.ratio} className={styles.figurePh} photo={figurePhoto} sizes="(max-width: 768px) 100vw, 680px" />
          <figcaption className={styles.figureCaption}>{figurePhoto ? <PhotoCaption photo={figurePhoto} /> : block.caption}</figcaption>
        </figure>
      );
  }
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const body = getStoryBody(story.slug);
  const author = getAuthor(story.author);
  const label = categoryLabel(story);
  const firstName = author ? author.name.replace(/^Dr\.\s+/, '').split(' ')[0] : '';
  const more = related(story);
  const hero = storyPhoto(story.slug);
  const figurePhoto = photoBySlot(`story/${story.slug}/figure`);
  const next = nextStory(story);

  const em = body?.titleEm && story.title.endsWith(body.titleEm) ? body.titleEm : undefined;
  const tags = body?.tags ?? [story.sub, ...(story.emirate ? [emirateName(story.emirate)] : [])];

  return (
    <>
      <ReadingProgress />
      <article>
        <header className={styles.header}>
          <div className={styles.kicker}>
            <Link href={categoryHref(story)} className={styles.kickerLink}>{label.toUpperCase()}</Link>
            <span aria-hidden="true">·</span>
            <span>{story.sub.toUpperCase()}</span>
            {story.cover && (
              <>
                <span aria-hidden="true">·</span>
                <span>COVER STORY</span>
              </>
            )}
          </div>
          <h1 className={styles.title}>
            {em ? <>{story.title.slice(0, -em.length)}<em>{em}</em></> : story.title}
          </h1>
          {story.dek && <p className={styles.dek}>{story.dek}</p>}
          <div className={styles.meta}>
            <span className={styles.byline}>
              <span className={styles.avatar} aria-hidden="true" />
              <span>
                By{' '}
                {author ? (
                  <Link href={`/authors/${author.slug}`} className={styles.authorLink}>{author.name}</Link>
                ) : (
                  <span className={styles.authorLink}>The Editors</span>
                )}
              </span>
            </span>
            <time dateTime={story.date}>{longDate(story.date)}</time>
            <span>{story.readMins} min read</span>
          </div>
          <StoryActions slug={story.slug} title={story.title} />
        </header>

        <figure className={styles.hero}>
          <Placeholder dark label={body?.heroLabel ?? 'hero photograph 21:10'} ratio="21/10" className={styles.heroPh} photo={hero} sizes="100vw" priority />
          {hero ? (
            <figcaption className={styles.heroCaption}>
              <PhotoCaption photo={hero} />
            </figcaption>
          ) : body && (
            <figcaption className={styles.heroCaption}>
              <span>{body.heroCaption}</span>
              <span>{body.heroCredit}</span>
            </figcaption>
          )}
        </figure>

        <section className={styles.body}>
          {body && body.subjects.length > 0 && (
            <aside className={styles.subjects} aria-labelledby="in-this-story">
              <span id="in-this-story" className={styles.subjectsTitle}>IN THIS STORY</span>
              {body.subjects.map((p) => (
                <Link key={p.name} href={personHref(p.name)} className={styles.subject}>
                  <span className={styles.subjectPh} aria-hidden="true" />
                  <span className={styles.subjectText}>
                    <span className={styles.subjectName}>{p.name}</span>
                    <span className={styles.subjectRole}>{p.role}</span>
                  </span>
                </Link>
              ))}
            </aside>
          )}

          <div className={styles.text} data-no-rv="text">
            {body ? (
              body.blocks.map((b, i) => <Block key={i} block={b} figurePhoto={figurePhoto} />)
            ) : (
              <div className={styles.pending}>
                <p className={styles.p}>
                  The full text of this story is still being prepared by our editors and will be published here soon.
                </p>
                <p className={styles.pendingNote}>
                  Want to know when it goes live? <Link href="/newsletter" className={styles.pendingLink}>Subscribe to the newsletter</Link> and
                  we’ll send it to you.
                </p>
              </div>
            )}

            <div className={styles.tags}>
              {tags.map((t) => (
                <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className={styles.tag}>{t}</Link>
              ))}
            </div>

            <div className={styles.authorBox}>
              <span className={styles.authorAvatar} aria-hidden="true" />
              <div className={styles.authorText}>
                <span className={styles.authorName}>{author ? author.name : 'The Editors'}</span>
                <span className={styles.authorBio}>
                  {author ? author.bio : 'Stories credited to the editors are reported and written by the Amazing Emiratis editorial team.'}
                </span>
                {author ? (
                  <Link href={`/authors/${author.slug}`} className={styles.authorMore}>More from {firstName} →</Link>
                ) : (
                  <Link href="/about" className={styles.authorMore}>About the archive →</Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </article>

      <section className={styles.related} aria-labelledby="related-title">
        <div className="ruleHeading">
          <h2 id="related-title">MORE FROM {label.toUpperCase()}</h2>
          <Link href={categoryHref(story)} className={styles.relatedAll}>All {label} stories →</Link>
        </div>
        <div className={styles.relatedGrid}>
          {more.map((s) => (
            <Link key={s.slug} href={href(s)} className={styles.card}>
              <Placeholder label="story image 3:2" ratio="3/2" className={styles.cardPh} photo={storyPhoto(s.slug)} sizes="(max-width: 768px) 50vw, 25vw" />
              <span className={styles.cardSub}>{s.sub.toUpperCase()}</span>
              <span className={styles.cardTitle}>{s.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <Link href={href(next)} className={`${styles.next} flushFooter`}>
        <span className={styles.nextInner}>
          <span className={styles.nextText}>
            <span className={styles.nextEyebrow}>NEXT STORY</span>
            <span className={styles.nextTitle}>{next.title}</span>
          </span>
          <span className={styles.nextArrow} aria-hidden="true">→</span>
        </span>
      </Link>
    </>
  );
}
