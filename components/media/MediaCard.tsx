import Link from 'next/link';
import Placeholder from '@/components/Placeholder';
import { isPublished, type MediaItem } from '@/lib/content/media';
import { photo } from '@/lib/content/photos';
import styles from './MediaCard.module.css';

/** Card for a video or podcast episode, linking to its page under /watch. */
export default function MediaCard({ item, dark, sizes = '(max-width: 768px) 100vw, 33vw' }: { item: MediaItem; dark?: boolean; sizes?: string }) {
  const live = isPublished(item);
  const poster = item.poster ? photo(item.poster) : undefined;

  return (
    <Link href={`/watch/${item.slug}`} className={styles.card} data-dark={dark}>
      <span className={styles.media}>
        {item.youtubeId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" className={styles.thumb} loading="lazy" />
        ) : (
          <Placeholder label={item.kind === 'podcast' ? 'podcast artwork' : 'video still'} ratio="16/9" photo={poster} sizes={sizes} className={styles.ph} />
        )}
        <span className={styles.badge}>
          {item.kind === 'video' ? (
            <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor" /></svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm-7 9a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2a5 5 0 0 1-10 0z" fill="currentColor" /></svg>
          )}
          {item.kind === 'video' ? 'VIDEO' : 'PODCAST'}
        </span>
        {!live && <span className={styles.soon}>COMING SOON</span>}
      </span>
      <span className={styles.meta}>{[item.label, item.source].filter(Boolean).join(' · ').toUpperCase()}</span>
      <span className={styles.title}>{item.title}</span>
    </Link>
  );
}
