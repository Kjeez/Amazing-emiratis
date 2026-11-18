import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '@/components/Countdown';
import Placeholder from '@/components/Placeholder';
import EmiratesSwitcher, { type SwitcherEmirate } from '@/components/home/EmiratesSwitcher';
import HeroCarousel, { type HeroSlide } from '@/components/home/HeroCarousel';
import JoinArchiveForm from '@/components/home/JoinArchiveForm';
import MediaCard from '@/components/media/MediaCard';
import VideoEmbed from '@/components/media/VideoEmbed';
import SectionTabs, { type SectionTab } from '@/components/home/SectionTabs';
import { authorName } from '@/lib/content/authors';
import { STORY_CATEGORY_LABEL, type StoryCategory } from '@/lib/content/categories';
import { EMIRATES } from '@/lib/content/emirates';
import { MASTER_STORIES } from '@/lib/content/master';
import { MEDIA } from '@/lib/content/media';
import { emiratePhoto, photo, storyPhoto } from '@/lib/content/photos';
import { getPressRelease, PRESS_RELEASES } from '@/lib/content/press';
import { ARCHIVE_TOTALS, getPerson, SPOTLIGHT, SPOTLIGHT_LEAD, YOUNG_WOMEN_ENTREPRENEURS, type Person } from '@/lib/content/people';
import { COVER_STORY_SLUG, getStory, MOST_READ, shortDate, storiesByDate, storiesInCategory, type Story } from '@/lib/content/stories';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Amazing Emiratis — Stories of the people building the UAE' },
};

const href = (s: Story) => `/stories/${s.slug}`;

function storySlide(st: Story): HeroSlide {
  return {
    href: href(st),
    eyebrow: st.cover ? `COVER STORY — ${st.sub.toUpperCase()}` : `${STORY_CATEGORY_LABEL[st.category].toUpperCase()} — ${st.sub.toUpperCase()}`,
    title: st.title,
    dek: st.dek,
    byline: `By ${authorName(st.author)} · ${st.readMins} min read`,
    photo: storyPhoto(st.slug),
  };
}

/** Slides for the Master Stories hero, from lib/content/master.ts. */
function masterSlides(): HeroSlide[] {
  return MASTER_STORIES.flatMap((m): HeroSlide[] => {
    if (m.kind === 'story') {
      const st = getStory(m.story);
      return st ? [storySlide(st)] : [];
    }
    if (m.kind === 'news') {
      const pr = getPressRelease(m.press);
      if (!pr) return [];
      return [{
        href: `/press/${pr.slug}`,
        eyebrow: `NEWS — ${shortDate(pr.date).toUpperCase()}`,
        title: pr.title,
        dek: pr.summary,
        byline: 'Press release',
        photo: m.photo ? photo(m.photo) : undefined,
      }];
    }
    const person = getPerson(m.person);
    if (!person) return [];
    const st = m.story ? getStory(m.story) : undefined;
    const video = m.media ? MEDIA.find((x) => x.slug === m.media) : undefined;
    const links: NonNullable<HeroSlide['links']> = [{ label: 'Read the profile', href: `/profiles/${person.slug}` }];
    if (video) links.push({ label: 'Watch the video', href: `/watch/${video.slug}`, kind: 'video' });
    return [{
      href: st ? href(st) : `/profiles/${person.slug}`,
      eyebrow: `MASTER STORY — PROFILE · ${person.category.toUpperCase()}`,
      title: st?.title ?? person.name,
      dek: person.short,
      byline: st ? `${st.readMins} min read` : person.role,
      photo: st ? storyPhoto(st.slug) : undefined,
      links,
    }];
  });
}

const TABS: { label: string; category: StoryCategory; img: string }[] = [
  { label: 'Business', category: 'business', img: 'business feature 4:3' },
  { label: 'Culture', category: 'culture', img: 'culture feature 4:3' },
  { label: 'Technology', category: 'tech', img: 'tech feature 4:3' },
];

function buildTabs(): SectionTab[] {
  return TABS.flatMap((t) => {
    const all = storiesInCategory(t.category);
    const lead = all.find((s) => s.dek) ?? all[0];
    if (!lead) return [];
    return [{
      label: t.label,
      img: t.img,
      lead: { href: href(lead), cat: lead.sub.toUpperCase(), title: lead.title, dek: lead.dek ?? '', photo: storyPhoto(lead.slug) },
      items: all.filter((s) => s !== lead).slice(0, 3).map((s) => ({ href: href(s), cat: s.sub.toUpperCase(), title: s.title })),
    }];
  });
}

export default function HomePage() {
  const latest = storiesByDate().filter((s) => s.slug !== COVER_STORY_SLUG).slice(0, 4);
  const lead = getPerson(SPOTLIGHT_LEAD);
  const spotlight = SPOTLIGHT.map(getPerson).filter((p): p is Person => Boolean(p));
  const mostRead = MOST_READ.map(getStory).filter((s): s is Story => Boolean(s));
  const emirates: SwitcherEmirate[] = EMIRATES.map((e) => ({ slug: e.slug, name: e.name, ar: e.ar, landmark: e.landmark, short: e.short, count: e.count, photo: emiratePhoto(e.slug) }));
  const heroSlides = masterSlides();
  const press = PRESS_RELEASES.slice(0, 3);
  const women = YOUNG_WOMEN_ENTREPRENEURS.map(getPerson).filter((p): p is Person => Boolean(p));
  const featuredVideo = MEDIA.find((m) => m.kind === 'video' && m.youtubeId);
  const moreMedia = MEDIA.filter((m) => m !== featuredVideo).slice(0, 3);
  const dunes = photo('page/home-dunes');

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className={styles.press} aria-labelledby="press-title">
        <div className={styles.pressInner}>
          <h2 id="press-title" className={styles.pressLabel}>
            <span className={styles.pressDot} aria-hidden="true" />PRESS RELEASES
          </h2>
          <ul className={styles.pressList}>
            {press.map((p) => (
              <li key={p.slug}>
                <Link href={`/press/${p.slug}`} className={styles.pressItem}>
                  <time dateTime={p.date} className={styles.pressDate}>{shortDate(p.date)}</time>
                  <span className={styles.pressTitle}>{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/press" className={styles.pressAll}>All releases →</Link>
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.latest} aria-label="Latest stories">
          {latest.map((s) => (
            <Link key={s.slug} href={href(s)} className={styles.latestItem}>
              <span className={styles.latestCat}>{STORY_CATEGORY_LABEL[s.category].toUpperCase()}</span>
              <span className={styles.latestTitle}>{s.title}</span>
            </Link>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="spotlight-title">
          <div className={styles.sectionHead}>
            <h2 id="spotlight-title" className={styles.h2}>In the <em className={styles.em}>Spotlight</em></h2>
            <Link href="/profiles" className="underlineLink">All {ARCHIVE_TOTALS.profiles} profiles</Link>
          </div>
          <div className={styles.spotlight}>
            {lead && (
              <Link href={`/profiles/${lead.slug}`} className={styles.lead}>
                <Placeholder label="lead portrait 4:5" ratio="4/5" className={styles.leadPh} />
                <span className="eyebrow">{lead.category.toUpperCase()}</span>
                <span className={styles.leadName}>{lead.name}</span>
                <span className={styles.leadBio}>{lead.short}</span>
              </Link>
            )}
            <div className={styles.spotGrid}>
              {spotlight.map((p) => (
                <Link key={p.slug} href={`/profiles/${p.slug}`} className={styles.card}>
                  <Placeholder label="portrait 3:4" ratio="3/4" className={styles.cardPh} />
                  <span className={styles.cardCat}>{p.category.toUpperCase()}</span>
                  <span className={styles.cardName}>{p.name}</span>
                  <span className={styles.cardRole}>{p.role}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {women.length > 0 && (
          <section className={styles.section} aria-labelledby="women-title">
            <div className={styles.sectionHead}>
              <h2 id="women-title" className={styles.h2}>Young Women <em className={styles.em}>Entrepreneurs</em></h2>
              <Link href="/young-women-entrepreneurs" className="underlineLink">See the collection</Link>
            </div>
            <div className={styles.women}>
              {women.map((p) => (
                <Link key={p.slug} href={`/profiles/${p.slug}`} className={styles.card}>
                  <Placeholder label="portrait 3:4" ratio="3/4" className={styles.cardPh} />
                  <span className={styles.cardCat}>{p.category.toUpperCase()}</span>
                  <span className={styles.cardName}>{p.name}</span>
                  <span className={styles.cardRole}>{p.role}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="emirates-title">
          <h2 id="emirates-title" className={`${styles.h2} ${styles.h2Block}`}>Seven <em className={styles.em}>Emirates</em></h2>
          <EmiratesSwitcher emirates={emirates} />
        </section>

        <section className={`${styles.section} ${styles.sections}`}>
          <div className={styles.tabsCol}>
            <SectionTabs tabs={buildTabs()} />
          </div>
          <aside className={styles.mostRead} aria-labelledby="most-read-title">
            <h3 id="most-read-title" className={styles.mostReadTitle}>MOST READ</h3>
            <ol className={styles.mostReadList}>
              {mostRead.map((s, i) => (
                <li key={s.slug}>
                  <Link href={href(s)} className={styles.mostReadItem}>
                    <span className={styles.mostReadN}>{i + 1}</span>
                    <span className={styles.mostReadText}>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className={styles.watch} aria-labelledby="watch-title">
          <div className={styles.watchHead}>
            <h2 id="watch-title" className={styles.watchTitle}>Watch <em>&amp;</em> Listen</h2>
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

        <section className={styles.awards} aria-labelledby="awards-title">
          <div className={styles.awardsMain}>
            <span className={styles.awardsEyebrow}>NOMINATIONS OPEN</span>
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

      <section className={styles.quote} aria-labelledby="join-title">
        {dunes && <Image src={dunes.src} alt="" fill sizes="100vw" className={styles.quoteImg} />}
        <span className={styles.quoteShade} aria-hidden="true" />
        <div className={styles.quoteInner}>
          <blockquote className={styles.blockquote}>“A tribute to the visionaries who continually build our future.”</blockquote>
          <div className={styles.joinCard}>
            <h2 id="join-title" className={styles.joinTitle}>Join the <em className={styles.em}>Archive</em></h2>
            <p className={styles.joinText}>Share your story, or the story of someone who deserves to be remembered. Our editors review every application.</p>
            <JoinArchiveForm />
          </div>
        </div>
      </section>
    </>
  );
}
