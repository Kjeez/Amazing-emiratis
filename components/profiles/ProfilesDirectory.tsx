'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import Placeholder from '@/components/Placeholder';
import { EMIRATES } from '@/lib/content/emirates';
import { PERSON_CATEGORIES, type PersonCategory } from '@/lib/content/people';
import s from './ProfilesDirectory.module.css';

export type DirectoryPerson = {
  slug: string;
  name: string;
  role: string;
  category: PersonCategory;
  /** Display name of the emirate, e.g. "Abu Dhabi". */
  emirate: string;
  winner: boolean;
};

type View = 'grid' | 'list';
type Filters = { q: string; emirate: string; cat: PersonCategory | ''; view: View };

/** Accepts an emirate name ("Abu Dhabi") or slug ("abu-dhabi") and returns the display name, or ''. */
function parseEmirate(v: string | null): string {
  if (!v) return '';
  const n = v.trim().toLowerCase();
  return EMIRATES.find((e) => e.name.toLowerCase() === n || e.slug === n)?.name ?? '';
}

function parseCat(v: string | null): PersonCategory | '' {
  if (!v) return '';
  const n = v.trim().toLowerCase();
  return PERSON_CATEGORIES.find((c) => c.toLowerCase() === n) ?? '';
}

export default function ProfilesDirectory({ people }: { people: DirectoryPerson[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const urlQ = params.get('q') ?? '';
  const emirate = parseEmirate(params.get('emirate'));
  const cat = parseCat(params.get('cat'));
  const view: View = params.get('view') === 'list' ? 'list' : 'grid';

  // The search box keeps its own state so typing never waits on the router.
  const [q, setQ] = useState(urlQ);
  const lastWrittenQ = useRef(urlQ);
  useEffect(() => {
    // The URL changed from outside (back button, a link to /profiles): follow it.
    if (urlQ !== lastWrittenQ.current) {
      lastWrittenQ.current = urlQ;
      setQ(urlQ);
    }
  }, [urlQ]);

  function write(next: Partial<Filters>) {
    const f: Filters = { q, emirate, cat, view, ...next };
    lastWrittenQ.current = f.q;
    const sp = new URLSearchParams();
    if (f.q) sp.set('q', f.q);
    if (f.emirate) sp.set('emirate', f.emirate);
    if (f.cat) sp.set('cat', f.cat);
    if (f.view === 'list') sp.set('view', 'list');
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return people.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!emirate || p.emirate === emirate) &&
        (!needle || `${p.name} ${p.role}`.toLowerCase().includes(needle)),
    );
  }, [people, q, cat, emirate]);

  return (
    <>
      <section className={s.filters}>
        <div className={s.row}>
          <div className={s.search}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <label htmlFor="profiles-q" className="srOnly">Search profiles</label>
            <input
              id="profiles-q"
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                write({ q: e.target.value });
              }}
              placeholder="Search by name or role"
              className={s.searchInput}
              autoComplete="off"
            />
          </div>
          <label htmlFor="profiles-emirate" className="srOnly">Emirate</label>
          <select
            id="profiles-emirate"
            value={emirate}
            onChange={(e) => write({ emirate: e.target.value })}
            className={s.select}
          >
            <option value="">All Emirates</option>
            {EMIRATES.map((e) => (
              <option key={e.slug} value={e.name}>{e.name}</option>
            ))}
          </select>
          <div className={s.views} role="group" aria-label="Layout">
            {(['grid', 'list'] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={s.viewBtn}
                aria-pressed={view === v}
                onClick={() => write({ view: v })}
              >
                {v === 'grid' ? 'Grid' : 'List'}
              </button>
            ))}
          </div>
        </div>
        <div className={s.chips} role="group" aria-label="Category">
          {(['', ...PERSON_CATEGORIES] as const).map((c) => (
            <button
              key={c || 'all'}
              type="button"
              className={`chip ${s.chip}`}
              aria-pressed={cat === c}
              onClick={() => write({ cat: c })}
            >
              {c || 'All'}
            </button>
          ))}
        </div>
      </section>

      <section className={s.results}>
        <span className={s.count} role="status">
          {results.length} {results.length === 1 ? 'profile' : 'profiles'} shown
        </span>

        {results.length > 0 && view === 'grid' && (
          <div key={`${cat}|${emirate}`} className={`${s.grid} swapIn`}>
            {results.map((p) => (
              <Link key={p.slug} href={`/profiles/${p.slug}`} className={s.card}>
                <span className={s.portrait}>
                  <Placeholder label="portrait 3:4" ratio="3/4" className={s.cardPh} />
                  {p.winner && <span className={s.badge}>AWARDS 2025</span>}
                </span>
                <span className={s.cardEyebrow}>
                  {p.category.toUpperCase()} · {p.emirate.toUpperCase()}
                </span>
                <span className={s.cardName}>{p.name}</span>
                <span className={s.cardRole}>{p.role}</span>
              </Link>
            ))}
          </div>
        )}

        {results.length > 0 && view === 'list' && (
          <div key={`${cat}|${emirate}`} className={`${s.list} swapIn`}>
            {results.map((p) => (
              <Link key={p.slug} href={`/profiles/${p.slug}`} className={s.listRow}>
                <span className={`ph ${s.listPh}`} aria-hidden="true" />
                <span className={s.listName}>{p.name}</span>
                <span className={s.listRole}>{p.role}</span>
                <span className={s.listCat}>{p.category.toUpperCase()}</span>
                <span className={s.listEmirate}>{p.emirate}</span>
              </Link>
            ))}
          </div>
        )}

        {results.length === 0 && (
          <div className={s.empty}>
            <span className={s.emptyTitle}>No profiles match those filters.</span>
            <button
              type="button"
              className={s.clear}
              onClick={() => {
                setQ('');
                write({ q: '', emirate: '', cat: '' });
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
