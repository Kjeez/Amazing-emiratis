'use client';

import { useEffect, useState } from 'react';
import styles from './FollowButton.module.css';

const KEY = 'ae:followed-authors';

function readFollowed(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export default function FollowButton({ slug, name }: { slug: string; name: string }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(readFollowed().includes(slug));
  }, [slug]);

  const toggle = () => {
    const next = !following;
    const list = readFollowed().filter((s) => s !== slug);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next ? [...list, slug] : list));
    } catch {
      /* storage unavailable: keep the state for this visit only */
    }
    setFollowing(next);
  };

  return (
    <button type="button" className={styles.follow} aria-pressed={following} aria-label={`Follow ${name}`} onClick={toggle}>
      {following ? 'Following' : 'Follow'}
    </button>
  );
}
