import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MediaCard from '@/components/media/MediaCard';
import FollowShare from '@/components/profiles/FollowShare';
import Placeholder from '@/components/Placeholder';
import Portrait from '@/components/Portrait';
import { storyPhoto } from '@/lib/content/photos';
import { getCategory, type StoryCategory } from '@/lib/content/categories';
import { getMedia, type MediaItem } from '@/lib/content/media';
import { emirateName } from '@/lib/content/emirates';
import { getPerson, PEOPLE, type PersonCategory } from '@/lib/content/people';
import { getStory, storiesInCategory, storyHref, type Story } from '@/lib/content/stories';
import s from './page.module.css';

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPerson(slug);
  if (!p) return { title: 'Profile not found' };
  return {
    title: p.name,
    description: p.bio,
    openGraph: { title: p.name, description: p.bio, type: 'profile' },
  };
}

/** Link to the field's section page, or a search for fields without one (Leadership, Community). */
function categoryHref(c: PersonCategory): string {
  return getCategory(c.toLowerCase()) ? `/category/${c.toLowerCase()}` : `/search?q=${encodeURIComponent(c)}`;
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPerson(slug);
  if (!p) notFound();

  const emirate = emirateName(p.emirate);
  const emirateHref = `/emirates/${p.emirate}`;
  const catHref = categoryHref(p.category);
  // Stories about this person come first, then the latest from their field.
  const own = (p.stories ?? []).map(getStory).filter((x): x is Story => Boolean(x));
  const stories = [...own, ...storiesInCategory(p.category.toLowerCase() as StoryCategory).filter((x) => !own.includes(x))].slice(0, 3);
  const media = (p.media ?? []).map(getMedia).filter((x): x is MediaItem => Boolean(x));
  const related = PEOPLE.filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 4);

  const facts: { k: string; v: string; href?: string }[] = [
    { k: 'BORN', v: String(p.born) },
    ...(p.basedIn
      ? [{ k: 'BASED IN', v: p.basedIn }, { k: 'FROM', v: emirate, href: emirateHref }]
      : [{ k: 'BASED IN', v: emirate, href: emirateHref }]),
    { k: 'FIELD', v: p.category, href: catHref },
    { k: 'KNOWN FOR', v: p.knownFor },
  ];

  return (
    <main className="container">
      <nav className={s.crumbs} aria-label="Breadcrumb">
        <Link href="/profiles" className={s.crumbLink}>← All profiles</Link>
        <span aria-hidden="true">/</span>
        <span className={s.crumbCurrent} aria-current="page">{p.name}</span>
      </nav>

      <section className={s.hero}>
        <div className={s.portrait}>
          <Portrait name={p.name} nameAr={p.nameAr} field={p.category} ratio="4/5" size="lg" className={s.portraitPh} />
          {p.winner && <span className={s.badge}>AWARDS 2025 WINNER</span>}
        </div>
        <div className={s.heroText}>
          <span className={s.eyebrow}>
            <Link href={catHref}>{p.category.toUpperCase()}</Link> · <Link href={emirateHref}>{emirate.toUpperCase()}</Link>
          </span>
          <h1 className={s.name}>{p.name}</h1>
          <span className={s.role}>{p.role}</span>
          <dl className={s.facts}>
            {facts.map((f) => (
              <div key={f.k} className={s.fact}>
                <dt className={s.factKey}>{f.k}</dt>
                <dd className={s.factValue}>{f.href ? <Link href={f.href}>{f.v}</Link> : f.v}</dd>
              </div>
            ))}
          </dl>
          <FollowShare slug={p.slug} name={p.name} />
        </div>
      </section>

      <section className={s.body}>
        <div className={s.bio}>
          {p.quote && <blockquote className={s.quote}>“{p.quote}”</blockquote>}
          <p className={s.para}>{p.bio}</p>
          <p className={s.para}>{p.bio2}</p>
          {p.source && <p className={s.source}>{p.source}</p>}
        </div>
        <div className={s.milestones}>
          <h2 className={s.milestonesTitle}>MILESTONES</h2>
          <ol className={s.timeline}>
            {p.milestones.map(([y, t]) => (
              <li key={y + t} className={s.milestone}>
                <span className={s.year}>{y}</span>
                <span className={s.milestoneText}>{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {stories.length > 0 && (
        <section className={s.section}>
          <div className={s.rule}>
            <h2>FEATURED IN</h2>
          </div>
          <div className={s.stories}>
            {stories.map((st) => (
              <Link key={st.slug} href={storyHref(st.slug)} className={s.story}>
                <Placeholder label="story image 3:2" ratio="3/2" className={s.storyPh} photo={storyPhoto(st.slug)} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className={s.storySub}>{st.sub.toUpperCase()}</span>
                <span className={s.storyTitle}>{st.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {media.length > 0 && (
        <section className={s.section}>
          <div className={s.rule}>
            <h2>WATCH &amp; LISTEN</h2>
          </div>
          <div className={s.stories}>
            {media.map((m) => <MediaCard key={m.slug} item={m} />)}
          </div>
        </section>
      )}

      <section className={s.section}>
        <div className={s.moreHead}>
          <h2 className={s.moreTitle}>More in <em className="gold">{p.category}</em></h2>
          <Link href="/profiles" className="underlineLink">All profiles</Link>
        </div>
        <div className={s.related}>
          {related.map((r) => (
            <Link key={r.slug} href={`/profiles/${r.slug}`} className={s.relCard}>
              <Portrait name={r.name} field={r.category} ratio="1/1" size="sm" className={s.relPh} />
              <span className={s.relName}>{r.name}</span>
              <span className={s.relRole}>{r.role}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
