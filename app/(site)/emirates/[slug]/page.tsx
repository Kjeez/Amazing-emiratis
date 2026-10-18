import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Placeholder from '@/components/Placeholder';
import { emiratePhoto, placePhoto, storyPhoto } from '@/lib/content/photos';
import { EMIRATES, getEmirate } from '@/lib/content/emirates';
import { PEOPLE, peopleInEmirate } from '@/lib/content/people';
import { categoryLabel, storiesByDate, storiesInEmirate, storyHref } from '@/lib/content/stories';
import s from './page.module.css';

export function generateStaticParams() {
  return EMIRATES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEmirate(slug);
  if (!e) return { title: 'Emirate not found' };
  return { title: e.name, description: e.blurb, openGraph: { title: e.name, description: e.blurb } };
}

export default async function EmiratePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEmirate(slug);
  if (!e) notFound();

  const i = EMIRATES.indexOf(e);
  const prev = EMIRATES[(i + EMIRATES.length - 1) % EMIRATES.length];
  const next = EMIRATES[(i + 1) % EMIRATES.length];

  // People from this emirate first, topped up with others so the row always has four.
  const people = [...peopleInEmirate(e.slug)];
  for (const p of PEOPLE) {
    if (people.length >= 4) break;
    if (!people.includes(p)) people.push(p);
  }

  // Stories set in this emirate, topped up with the latest stories.
  const stories = storiesInEmirate(e.slug).slice(0, 3);
  for (const st of storiesByDate()) {
    if (stories.length >= 3) break;
    if (!stories.includes(st)) stories.push(st);
  }

  const heroPhoto = emiratePhoto(e.slug);

  return (
    <main>
      <section className={s.hero}>
        {heroPhoto ? <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="100vw" className={s.heroImg} /> : <span className={s.heroLabel}>landscape photograph — {e.landmark}</span>}
        <span className={s.heroShade} aria-hidden="true" />
        <div className={s.heroInner}>
          <div className={s.heroTitle}>
            <span className={s.heroKicker}>{String(i + 1).padStart(2, '0')} OF {String(EMIRATES.length).padStart(2, '0')} · THE EMIRATES</span>
            <h1 className={s.name}>{e.name}</h1>
            <span className={s.ar} lang="ar" dir="rtl">{e.ar}</span>
          </div>
          <p className={s.blurb}>{e.blurb}</p>
        </div>
      </section>

      <nav className={s.switcher} aria-label="The Emirates">
        <div className={`container ${s.switcherInner}`}>
          {EMIRATES.map((x) => (
            <Link
              key={x.slug}
              href={`/emirates/${x.slug}`}
              className={s.switchLink}
              aria-current={x.slug === e.slug ? 'page' : undefined}
            >
              {x.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container">
        <section className={s.people}>
          <div className={s.peopleHead}>
            <h2 className={s.peopleTitle}>People from <em className="gold">{e.name}</em></h2>
            <Link href={`/profiles?emirate=${encodeURIComponent(e.name)}`} className="underlineLink">{e.count} profiles</Link>
          </div>
          <div className={s.peopleGrid}>
            {people.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/profiles/${p.slug}`} className={s.card}>
                <Placeholder label="portrait 3:4" ratio="3/4" className={s.cardPh} />
                <span className={s.cardEyebrow}>{p.category.toUpperCase()}</span>
                <span className={s.personName}>{p.name}</span>
                <span className={s.personRole}>{p.role}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <div className="ruleHeading"><h2>PLACES TO KNOW</h2></div>
          <div className={s.places}>
            {e.places.map(([name, note], j) => (
              <div key={name} className={j === 0 ? `${s.place} ${s.placeWide}` : s.place}>
                <Placeholder label={name} className={s.placePh} photo={placePhoto(e.slug, j)} sizes={j === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"} />
                <span className={s.placeName}>{name}</span>
                <span className={s.placeNote}>{note}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={s.section}>
          <div className="ruleHeading"><h2>STORIES FROM {e.name.toUpperCase()}</h2></div>
          <div className={s.stories}>
            {stories.map((st) => (
              <Link key={st.slug} href={storyHref(st.slug)} className={s.card}>
                <Placeholder label="story image 3:2" ratio="3/2" className={s.cardPh} photo={storyPhoto(st.slug)} sizes="(max-width: 768px) 100vw, 33vw" />
                <span className={s.cardEyebrow}>{categoryLabel(st).toUpperCase()}</span>
                <span className={s.storyTitle}>{st.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <nav className={s.prevNext} aria-label="Previous and next emirate">
          <Link href={`/emirates/${prev.slug}`} className={s.pn} rel="prev">
            <span className={s.pnLabel}>← PREVIOUS</span>
            <span className={s.pnName}>{prev.name}</span>
          </Link>
          <Link href={`/emirates/${next.slug}`} className={`${s.pn} ${s.pnNext}`} rel="next">
            <span className={s.pnLabel}>NEXT →</span>
            <span className={s.pnName}>{next.name}</span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
