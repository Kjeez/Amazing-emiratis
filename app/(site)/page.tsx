import type { Metadata } from 'next';
import Link from 'next/link';
import Countdown from '@/components/Countdown';
import EmiratesSwitcher, { type SwitcherEmirate } from '@/components/home/EmiratesSwitcher';
import HeroCarousel, { type HeroSlide } from '@/components/home/HeroCarousel';
import IssueCover from '@/components/home/IssueCover';
import MediaCard from '@/components/media/MediaCard';
import VideoEmbed from '@/components/media/VideoEmbed';
import Placeholder from '@/components/Placeholder';
import Portrait from '@/components/Portrait';
import { AMAZING_100, amazing100 } from '@/lib/content/amazing-100';
import { EMIRATES } from '@/lib/content/emirates';
import { MASTER_STORIES } from '@/lib/content/master';
import { MEDIA } from '@/lib/content/media';
import { collectionPeople, COLLECTIONS, getPerson, SPOTLIGHT, SPOTLIGHT_LEAD, type Collection, type Person } from '@/lib/content/people';
import { emiratePhoto, photo, storyPhoto } from '@/lib/content/photos';
import { getPressRelease, PRESS_RELEASES } from '@/lib/content/press';
import { getStory, shortDate, storiesByDate, type Story } from '@/lib/content/stories';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Amazing Emiratis — Stories of the people building the UAE' },
};

const href = (s: Story) => `/stories/${s.slug}`;

/**
 * Slides for the Master Stories hero, from lib/content/master.ts. Headline, summary and photo
 * only: no date, category, byline or read time.
 */
function masterSlides(): HeroSlide[] {
  return MASTER_STORIES.flatMap((m): HeroSlide[] => {
    const text = { subhead: m.subheadline };
    if (m.kind === 'story') {
      const st = getStory(m.story);
      return st ? [{ ...text, href: href(st), title: m.headline ?? st.title, dek: m.summary ?? st.dek, photo: storyPhoto(st.slug) }] : [];
    }
    if (m.kind === 'news') {
      const pr = getPressRelease(m.press);
      return pr ? [{ ...text, href: `/press/${pr.slug}`, title: m.headline ?? pr.title, dek: m.summary ?? pr.summary, photo: m.photo ? photo(m.photo) : undefined }] : [];
    }
    const person = getPerson(m.person);
    if (!person) return [];
    const st = m.story ? getStory(m.story) : undefined;
    const video = m.media ? MEDIA.find((x) => x.slug === m.media) : undefined;
    const links: NonNullable<HeroSlide['links']> = [{ label: 'Read the profile', href: `/profiles/${person.slug}` }];
    if (video) links.push({ label: 'Watch the video', href: `/watch/${video.slug}`, kind: 'video' });
    return [{
      ...text,
      href: st ? href(st) : `/profiles/${person.slug}`,
      title: m.headline ?? st?.title ?? person.name,
      dek: m.summary ?? person.short,
      photo: st ? storyPhoto(st.slug) : undefined,
      links,
    }];
  });
}

/** Homepage section for one curated collection of profiles. */
function CollectionSection({ collection, id }: { collection: Collection; id: string }) {
  const people = collectionPeople(collection);
  if (!people.length) return null;
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.sectionHead}>
        <h2 id={id} className={styles.h2}>{collection.title} <em className={styles.em}>{collection.titleEm}</em></h2>
        <Link href={`/${collection.slug}`} className="underlineLink">See more…</Link>
      </div>
      <div className={styles.collection}>
        {people.map((p) => (
          <Link key={p.slug} href={`/profiles/${p.slug}`} className={styles.card}>
            <Portrait name={p.name} nameAr={p.nameAr} field={p.category} ratio="3/4" className={styles.cardPh} />
            <span className={styles.cardCat}>{p.category.toUpperCase()}</span>
            <span className={styles.cardName}>{p.name}</span>
            <span className={styles.cardRole}>{p.role}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroSlides = masterSlides();
  const lead = getPerson(SPOTLIGHT_LEAD);
  const spotlight = SPOTLIGHT.map(getPerson).filter((p): p is Person => Boolean(p));
  const news = storiesByDate().slice(0, 6);
  const press = PRESS_RELEASES.slice(0, 4);
  const list = amazing100();
  const emirates: SwitcherEmirate[] = EMIRATES.map((e) => ({ slug: e.slug, name: e.name, ar: e.ar, landmark: e.landmark, short: e.short, count: e.count, photo: emiratePhoto(e.slug) }));
  const featuredVideo = MEDIA.find((m) => m.kind === 'video' && m.youtubeId);
  const moreMedia = MEDIA.filter((m) => m !== featuredVideo).slice(0, 3);

  return (
    <>
      {/* 1. Master Story */}
      <HeroCarousel slides={heroSlides} />

      <main className={styles.main}>
        {/* 2–3. In the Spotlight and Women Entrepreneurs, with News alongside */}
        <div className={styles.withRail}>
          <div className={styles.railMain}>
            <section className={styles.section} aria-labelledby="spotlight-title">
              <div className={styles.sectionHead}>
                <h2 id="spotlight-title" className={styles.h2}>In the <em className={styles.em}>Spotlight</em></h2>
                <Link href="/profiles" className="underlineLink">See more…</Link>
              </div>
              <div className={styles.spotlight}>
                {lead && (
                  <Link href={`/profiles/${lead.slug}`} className={styles.lead}>
                    <Portrait name={lead.name} nameAr={lead.nameAr} field={lead.category} ratio="4/5" size="lg" className={styles.leadPh} />
                    <span className="eyebrow">{lead.category.toUpperCase()}</span>
                    <span className={styles.leadName}>{lead.name}</span>
                    <span className={styles.leadBio}>{lead.short}</span>
                  </Link>
                )}
                <div className={styles.spotGrid}>
                  {spotlight.map((p) => (
                    <Link key={p.slug} href={`/profiles/${p.slug}`} className={styles.card}>
                      <Portrait name={p.name} nameAr={p.nameAr} field={p.category} ratio="3/4" className={styles.cardPh} />
                      <span className={styles.cardCat}>{p.category.toUpperCase()}</span>
                      <span className={styles.cardName}>{p.name}</span>
                      <span className={styles.cardRole}>{p.role}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <CollectionSection collection={COLLECTIONS.women} id="women-title" />
          </div>

          <aside className={styles.rail} aria-labelledby="news-title">
            <div className={styles.railHead}>
              <h2 id="news-title" className={styles.railTitle}><span className={styles.railDot} aria-hidden="true" />News</h2>
              <Link href="/search" className={styles.railAll}>All stories →</Link>
            </div>
            <ul className={styles.railList}>
              {news.map((s) => (
                <li key={s.slug}>
                  <Link href={href(s)} className={styles.newsItem}>
                    <Placeholder label="" ratio="1/1" photo={storyPhoto(s.slug)} sizes="72px" className={styles.newsThumb} />
                    <span className={styles.newsText}>
                      <time dateTime={s.date} className={styles.railDate}>{shortDate(s.date)}</time>
                      <span className={styles.railItemTitle}>{s.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* 4–5. Young Entrepreneurs and In this issue, with Press Releases alongside */}
        <div className={styles.withRail}>
          <div className={styles.railMain}>
            <CollectionSection collection={COLLECTIONS.young} id="young-title" />
            <IssueCover />
          </div>

          <aside className={styles.rail} aria-labelledby="press-title">
            <div className={styles.railHead}>
              <h2 id="press-title" className={styles.railTitle}><span className={styles.railDot} aria-hidden="true" />Press releases</h2>
              <Link href="/press" className={styles.railAll}>All releases →</Link>
            </div>
            <ul className={styles.railList}>
              {press.map((p) => (
                <li key={p.slug}>
                  <Link href={`/press/${p.slug}`} className={styles.pressItem}>
                    <time dateTime={p.date} className={styles.railDate}>{shortDate(p.date)}</time>
                    <span className={styles.railItemTitle}>{p.title}</span>
                    <span className={styles.pressSummary}>{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* 6. The Amazing 100 */}
        <section className={styles.list100} aria-labelledby="list100-title">
          <div className={styles.list100Head}>
            <span className="eyebrow">THE LIST · {AMAZING_100.year}</span>
            <h2 id="list100-title" className={styles.list100Title}>
              <span className={styles.list100Bar}>The Amazing</span> <span className={styles.list100Big}>100</span>
            </h2>
            <p className={styles.list100Text}>Emiratis shaping the country, named through the year. {list.length} of {AMAZING_100.size} named so far.</p>
            <Link href="/amazing-100" className="btn btnDark">See the list →</Link>
          </div>
          <ol className={styles.list100Names}>
            {list.slice(0, 8).map((p, i) => (
              <li key={p.slug}>
                <Link href={`/profiles/${p.slug}`} className={styles.list100Item}>
                  <span className={styles.list100N}>{String(i + 1).padStart(3, '0')}</span>
                  <span className={styles.list100Name}>{p.name}</span>
                  <span className={styles.list100Role}>{p.role}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. Emirates */}
        <section className={styles.section} aria-labelledby="emirates-title">
          <h2 id="emirates-title" className={`${styles.h2} ${styles.h2Block}`}>Seven <em className={styles.em}>Emirates</em></h2>
          <EmiratesSwitcher emirates={emirates} />
        </section>

        {/* 8. Videos */}
        <section className={styles.watch} aria-labelledby="watch-title">
          <div className={styles.watchHead}>
            <h2 id="watch-title" className={styles.watchTitle}>Videos <em>&amp;</em> Podcasts</h2>
            <Link href="/watch" className={styles.watchAll}>All videos and podcasts →</Link>
          </div>
          <div className={styles.watchBody}>
            {featuredVideo?.youtubeId && (
              <div className={styles.watchFeatured}>
                <VideoEmbed id={featuredVideo.youtubeId} title={featuredVideo.title} />
                <span className={styles.watchMeta}>{[featuredVideo.label, featuredVideo.source].filter(Boolean).join(' · ').toUpperCase()}</span>
                <Link href={`/watch/${featuredVideo.slug}`} className={styles.watchFeaturedTitle}>{featuredVideo.title}</Link>
              </div>
            )}
            <div className={styles.watchList}>
              {moreMedia.map((m) => <MediaCard key={m.slug} item={m} dark sizes="(max-width: 768px) 100vw, 30vw" />)}
            </div>
          </div>
        </section>

        {/* 9. Awards & nomination */}
        <section className={styles.awards} aria-labelledby="awards-title">
          <div className={styles.awardsMain}>
            <span className={styles.awardsEyebrow}>AWARDS &amp; NOMINATIONS</span>
            <h2 id="awards-title" className={styles.awardsTitle}>Awards <em className={styles.awardsEm}>2026</em></h2>
            <p className={styles.awardsText}>Fourteen categories. All seven Emirates. Tell us who is shaping the nation.</p>
            <Link href="/nominate" className={styles.awardsBtn}>Submit a nomination</Link>
          </div>
          <div className={styles.awardsSide}>
            <span className={styles.awardsCloses}>CLOSES 15 DECEMBER 2026</span>
            <Countdown className={styles.countdown} unitClassName={styles.unit} valueClassName={styles.unitValue} labelClassName={styles.unitLabel} />
          </div>
        </section>
      </main>
    </>
  );
}
