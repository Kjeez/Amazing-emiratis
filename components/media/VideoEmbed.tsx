'use client';

import { useState } from 'react';
import styles from './VideoEmbed.module.css';

/**
 * Click-to-play YouTube player. Shows the video's thumbnail and only loads YouTube
 * (privacy-enhanced youtube-nocookie.com) once the visitor presses play.
 */
export default function VideoEmbed({ id, title, className }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')}>
      {playing ? (
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.poster} onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className={styles.thumb} loading="lazy" />
          <span className={styles.play} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
