'use client';

import { useEffect, useState } from 'react';
import s from './FollowShare.module.css';

const KEY = 'ae:follows';

function readFollows(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const v: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeFollows(list: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable: the toggle still works for this visit */
  }
}

/** Follow toggle (remembered in this browser) and Share button for a profile. */
export default function FollowShare({ slug, name }: { slug: string; name: string }) {
  const [following, setFollowing] = useState(false);
  const [shareNote, setShareNote] = useState('');

  useEffect(() => {
    setFollowing(readFollows().includes(slug));
  }, [slug]);

  useEffect(() => {
    if (!shareNote) return;
    const t = window.setTimeout(() => setShareNote(''), 2500);
    return () => window.clearTimeout(t);
  }, [shareNote]);

  function toggle() {
    const next = !following;
    setFollowing(next);
    const list = readFollows().filter((x) => x !== slug);
    writeFollows(next ? [...list, slug] : list);
  }

  async function share() {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: `${name} · Amazing Emiratis`, url });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareNote('Link copied');
    } catch {
      setShareNote('Copy the address bar to share');
    }
  }

  return (
    <div className={s.actions}>
      <button type="button" className={s.follow} aria-pressed={following} onClick={toggle}>
        {following ? 'Following' : 'Follow'}
      </button>
      <button type="button" className={s.share} onClick={share}>
        {shareNote === 'Link copied' ? 'Link copied' : 'Share profile'}
      </button>
      <span className="srOnly" role="status">{shareNote}</span>
    </div>
  );
}
