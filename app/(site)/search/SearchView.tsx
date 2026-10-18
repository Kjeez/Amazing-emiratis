'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { POPULAR_SEARCHES, runSearch, type SearchIndex } from './search-core';
import styles from './SearchView.module.css';

const TABS = ['All', 'Profiles', 'Stories', 'Emirates'] as const;
type Tab = (typeof TABS)[number];

const DEBOUNCE_MS = 300;

const searchHref = (q: string) => (q.trim() ? `/search?q=${encodeURIComponent(q)}` : '/search');

export default function SearchView({ initialQ, index, trending }: {
  initialQ: string;
  index: SearchIndex;
  trending: { href: string; title: string }[];
}) {
  const router = useRouter();
  const urlQ = useSearchParams().get('q') ?? '';
  const [q, setQ] = useState(initialQ);
  const [tab, setTab] = useState<Tab>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Queries we have written to the URL ourselves and not yet seen come back from the router.
  const pending = useRef<string[]>([]);

  const writeUrl = (value: string) => {
    clearTimeout(timer.current);
    pending.current.push(value);
    router.replace(searchHref(value), { scroll: false });
  };

  // Adopt the URL when it changes for any other reason (back/forward, a link to /search?q=…).
  useEffect(() => {
    const i = pending.current.indexOf(urlQ);
    if (i !== -1) {
      pending.current = pending.current.slice(i + 1);
      return;
    }
    clearTimeout(timer.current);
    setQ(urlQ);
    setTab('All');
  }, [urlQ]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const type = (value: string) => {
    setQ(value);
    setTab('All');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => writeUrl(value), DEBOUNCE_MS);
  };

  const pick = (value: string) => {
    setQ(value);
    setTab('All');
    writeUrl(value);
  };

  const results = useMemo(() => runSearch(index, q), [index, q]);
  const hasQ = q.trim().length > 0;
  const total = results.profiles.length + results.stories.length + results.places.length;
  const counts: Record<Tab, number> = {
    All: total,
    Profiles: results.profiles.length,
    Stories: results.stories.length,
    Emirates: results.places.length,
  };
  const show = (t: Tab) => tab === 'All' || tab === t;

  return (
    <main className={`container ${styles.main}`}>
      <section className={styles.bar}>
        <label htmlFor="search-q" className={styles.eyebrow}>SEARCH THE ARCHIVE</label>
        <form
          action="/search"
          method="get"
          role="search"
          className={styles.row}
          onSubmit={(e) => {
            e.preventDefault();
            writeUrl(q);
          }}
        >
          <input
            ref={inputRef}
            id="search-q"
            name="q"
            type="search"
            value={q}
            onChange={(e) => type(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            placeholder="People, stories, places…"
            className={styles.input}
          />
          {hasQ && (
            <button
              type="button"
              aria-label="Clear search"
              className={styles.clear}
              onClick={() => {
                pick('');
                inputRef.current?.focus();
              }}
            >
              ✕
            </button>
          )}
        </form>
      </section>

      {!hasQ ? (
        <section className={styles.suggestions}>
          <div className={styles.popular}>
            <h2 className={styles.label}>POPULAR SEARCHES</h2>
            <div className={styles.chips}>
              {POPULAR_SEARCHES.map((l) => (
                <Link
                  key={l}
                  href={searchHref(l)}
                  className={styles.chip}
                  onClick={(e) => {
                    e.preventDefault();
                    pick(l);
                  }}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.trending}>
            <h2 className={`${styles.label} ${styles.trendingLabel}`}>TRENDING THIS WEEK</h2>
            {trending.map((t, i) => (
              <Link key={t.href} href={t.href} className={styles.trend}>
                <span className={styles.trendN}>{i + 1}</span>
                <span className={styles.trendTitle}>{t.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className={styles.tabs} role="tablist" aria-label="Result types">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`search-tab-${t}`}
                aria-selected={tab === t}
                aria-controls="search-results"
                className={styles.tab}
                onClick={() => setTab(t)}
              >
                {t} <span className={styles.count}>{counts[t]}</span>
              </button>
            ))}
          </div>

          <div id="search-results" role="tabpanel" aria-labelledby={`search-tab-${tab}`}>
            <p className="srOnly" role="status" aria-live="polite">
              {total === 0 ? `Nothing found for “${q.trim()}”.` : `${total} result${total === 1 ? '' : 's'} for “${q.trim()}”.`}
            </p>

            {show('Profiles') && results.profiles.length > 0 && (
              <section className={styles.sectionProfiles} aria-labelledby="results-profiles">
                <div className="ruleHeading"><h2 id="results-profiles">PROFILES</h2></div>
                <div className={styles.profileGrid}>
                  {results.profiles.map((p) => (
                    <Link key={p.key} href={p.href} className={styles.profile}>
                      <span className={styles.profilePh} aria-hidden="true" />
                      <span className={styles.stack4}>
                        <span className={styles.profileName}>{p.name}</span>
                        <span className={styles.profileRole}>{p.role}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {show('Stories') && results.stories.length > 0 && (
              <section className={styles.section} aria-labelledby="results-stories">
                <div className="ruleHeading"><h2 id="results-stories">STORIES</h2></div>
                <div className={styles.storyList}>
                  {results.stories.map((s) => (
                    <Link key={s.key} href={s.href} className={styles.story}>
                      <span className={styles.storyPh} aria-hidden="true" />
                      <span className={styles.stack8}>
                        <span className={styles.storyCat}>{s.cat}</span>
                        <span className={styles.storyTitle}>{s.title}</span>
                        <span className={styles.storyDate}>{s.date}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {show('Emirates') && results.places.length > 0 && (
              <section className={styles.section} aria-labelledby="results-places">
                <div className="ruleHeading"><h2 id="results-places">EMIRATES</h2></div>
                <div className={styles.places}>
                  {results.places.map((e) => (
                    <Link key={e.key} href={e.href} className={styles.place}>
                      <span className={styles.placeName}>{e.name}</span>
                      <span className={styles.placeAr} lang="ar">{e.ar}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {total === 0 && (
              <section className={styles.empty}>
                <span className={styles.emptyTitle}>Nothing found for “{q.trim()}”.</span>
                <span className={styles.emptyText}>Try a name, an emirate, or a topic such as heritage or space.</span>
              </section>
            )}
          </div>
        </>
      )}
    </main>
  );
}
