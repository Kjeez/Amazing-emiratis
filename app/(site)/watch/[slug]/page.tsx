import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MediaCard from '@/components/media/MediaCard';
import VideoEmbed from '@/components/media/VideoEmbed';
import Placeholder from '@/components/Placeholder';
import { getMedia, isPublished, MEDIA } from '@/lib/content/media';
import { getPerson } from '@/lib/content/people';
import { photo } from '@/lib/content/photos';
import { getStory } from '@/lib/content/stories';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MEDIA.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getMedia((await params).slug);
  return m ? { title: m.title, description: m.summary } : {};
}

export default async function MediaPage({ params }: Props) {
  const m = getMedia((await params).slug);
  if (!m) notFound();

  const people = (m.people ?? []).map(getPerson).filter((p) => p !== undefined);
  const stories = (m.stories ?? []).map(getStory).filter((s) => s !== undefined);
  const more = MEDIA.filter((x) => x.slug !== m.slug).slice(0, 3);
  const live = isPublished(m);

  return (
    <main>
      <section className={styles.stage}>
        <div className={`container ${styles.stageInner}`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/watch">← Watch &amp; Listen</Link>
          </nav>
          {m.youtubeId ? (
            <VideoEmbed id={m.youtubeId} title={m.title} />
          ) : m.audioSrc ? (
            <audio controls src={m.audioSrc} className={styles.audio} />
          ) : (
            <div className={styles.soonWrap}>
              <Placeholder label="coming soon" ratio="16/9" photo={m.poster ? photo(m.poster) : undefined} sizes="100vw" />
              <span className={styles.soon}>{m.kind === 'podcast' ? 'Episode coming soon' : 'Video coming soon'}</span>
            </div>
          )}
        </div>
      </section>

      <div className={`container ${styles.layout}`}>
        <div className={styles.main}>
          <span className={styles.meta}>{[m.kind === 'video' ? 'VIDEO' : 'PODCAST', m.label?.toUpperCase()].filter(Boolean).join(' · ')}</span>
          <h1 className={styles.title}>{m.title}</h1>
          <p className={styles.summary}>{m.summary}</p>
          {live && m.youtubeId && (
            <p className={styles.credit}>
              Video: {m.source}, on <a href={`https://www.youtube.com/watch?v=${m.youtubeId}`} target="_blank" rel="noopener noreferrer">YouTube</a>.
            </p>
          )}
          {!live && <p className={styles.credit}>Subscribe to <Link href="/newsletter">The Monthly</Link> to hear when it is released.</p>}
        </div>
        {(people.length > 0 || stories.length > 0) && (
          <aside className={styles.aside}>
            {people.length > 0 && (
              <div className={styles.block}>
                <span className={styles.blockTitle}>IN THIS {m.kind === 'podcast' ? 'EPISODE' : 'VIDEO'}</span>
                {people.map((p) => (
                  <Link key={p.slug} href={`/profiles/${p.slug}`} className={styles.person}>
                    <span className={styles.personName}>{p.name}</span>
                    <span className={styles.personRole}>{p.role}</span>
                  </Link>
                ))}
              </div>
            )}
            {stories.length > 0 && (
              <div className={styles.block}>
                <span className={styles.blockTitle}>READ</span>
                {stories.map((s) => (
                  <Link key={s.slug} href={`/stories/${s.slug}`} className={styles.story}>{s.title}</Link>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>

      <section className="container">
        <div className="ruleHeading"><h2>MORE TO WATCH &amp; LISTEN</h2></div>
        <div className={styles.more}>
          {more.map((x) => <MediaCard key={x.slug} item={x} />)}
        </div>
      </section>
    </main>
  );
}
