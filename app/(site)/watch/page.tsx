import type { Metadata } from 'next';
import Link from 'next/link';
import MediaCard from '@/components/media/MediaCard';
import VideoEmbed from '@/components/media/VideoEmbed';
import { MEDIA, type MediaKind } from '@/lib/content/media';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Watch & Listen',
  description: 'Films, archive footage and The Majlis Podcast from Amazing Emiratis.',
};

const FILTERS: { key: '' | MediaKind; label: string }[] = [
  { key: '', label: 'All' },
  { key: 'video', label: 'Videos' },
  { key: 'podcast', label: 'Podcasts' },
];

export default async function WatchPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind } = await searchParams;
  const active = kind === 'video' || kind === 'podcast' ? kind : '';
  const featured = MEDIA.find((m) => m.kind === 'video' && m.youtubeId);
  const items = MEDIA.filter((m) => (!active || m.kind === active) && (active || m !== featured));

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>VIDEO · PODCASTS</span>
            <h1 className={styles.title}>Watch <em>&amp;</em> Listen</h1>
            <p className={styles.intro}>Films, archive footage and conversations with the people in the archive.</p>
          </div>
          {featured?.youtubeId && !active && (
            <div className={styles.featured}>
              <VideoEmbed id={featured.youtubeId} title={featured.title} />
              <div className={styles.featuredText}>
                <span className={styles.featuredMeta}>{[featured.label, featured.source].filter(Boolean).join(' · ').toUpperCase()}</span>
                <Link href={`/watch/${featured.slug}`} className={styles.featuredTitle}>{featured.title}</Link>
                <p className={styles.featuredSummary}>{featured.summary}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="container">
        <nav className={styles.filters} aria-label="Filter">
          {FILTERS.map((f) => (
            <Link key={f.label} href={f.key ? `/watch?kind=${f.key}` : '/watch'} className="chip" aria-pressed={f.key === active} scroll={false}>{f.label}</Link>
          ))}
        </nav>
        <div className={styles.grid}>
          {items.map((m) => <MediaCard key={m.slug} item={m} />)}
        </div>
      </div>
    </main>
  );
}
