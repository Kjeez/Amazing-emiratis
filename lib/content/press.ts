export type PressRelease = {
  slug: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: string;
  summary: string;
  body: string[];
};

/** Sample press releases issued by Amazing Emiratis (newest first). */
export const PRESS_RELEASES: PressRelease[] = [
  {
    slug: 'watch-and-listen-launch',
    date: '2026-11-17',
    title: 'Amazing Emiratis launches Watch & Listen, a new home for video and podcasts',
    summary: 'Films, archive footage and The Majlis Podcast now sit alongside the written archive.',
    body: [
      'Amazing Emiratis today launched Watch & Listen, a section of the archive dedicated to video and audio.',
      'The section opens with archive footage of Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum, Crown Prince of Dubai, reciting his poetry, published by the Dubai Media Office, and announces The Majlis Podcast, a conversation series with people profiled in the archive.',
      'The first podcast episodes will be released over the coming weeks.',
    ],
  },
  {
    slug: 'awards-2026-jury',
    date: '2026-11-10',
    title: 'Amazing Emiratis announces the jury for the 2026 Awards',
    summary: 'Six jurors drawn from education, publishing, hospitality, engineering, the arts and medicine will choose winners in fourteen categories.',
    body: [
      'Amazing Emiratis has announced the independent jury for the Amazing Emiratis Awards 2026, chaired by Dr. Amna Al Dahak.',
      'The jury will review the shortlist, interview each finalist and select one winner in each of the fourteen categories. Jurors do not judge categories in which they have a conflict of interest.',
      'Nominations remain open until 15 December 2026. Winners will be announced at a ceremony in Abu Dhabi on 21 February 2027.',
    ],
  },
  {
    slug: 'young-women-entrepreneurs-collection',
    date: '2026-11-03',
    title: 'New collection celebrates young women entrepreneurs',
    summary: 'The archive opens a dedicated collection of profiles of young Emirati women building companies.',
    body: [
      'Amazing Emiratis has opened a new collection in its archive dedicated to young women entrepreneurs, from fashion and specialty coffee to payments and reforestation technology.',
      'Readers can nominate founders for the collection through the Join the Archive form. Every nomination is reviewed by the editors.',
    ],
  },
  {
    slug: 'majlis-series-sharjah',
    date: '2026-10-20',
    title: 'The Majlis Series returns to Sharjah in November',
    summary: 'An evening on heritage and the digital archive at the House of Wisdom on 12 November.',
    body: [
      'The Majlis Series, the archive’s programme of evening conversations, returns to Sharjah on 12 November 2026 at the House of Wisdom.',
      'Places are free but limited, and can be reserved on the Events page.',
    ],
  },
  {
    slug: 'awards-2026-nominations-open',
    date: '2026-09-01',
    title: 'Nominations open for the Amazing Emiratis Awards 2026',
    summary: 'Fourteen categories, open to Emiratis in the UAE and abroad, until 15 December.',
    body: [
      'Nominations are now open for the Amazing Emiratis Awards 2026 across fourteen categories, from Business and Technology to Young Achiever and Lifetime Achievement.',
      'Anyone may nominate an Emirati, including themselves. Nominating is free, and each person may submit up to three nominations in different categories.',
    ],
  },
];

export function getPressRelease(slug: string): PressRelease | undefined {
  return PRESS_RELEASES.find((p) => p.slug === slug);
}

export const PRESS_CONTACT = { name: 'Press office', email: 'press@amazingemiratis.ae' };
