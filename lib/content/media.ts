export type MediaKind = 'video' | 'podcast';

export type MediaItem = {
  slug: string;
  kind: MediaKind;
  title: string;
  summary: string;
  /** Who made it, e.g. "Dubai Media Office". */
  source: string;
  /** YouTube video id; without one the item is shown as coming soon. */
  youtubeId?: string;
  /** Audio file for podcast episodes, once recorded. */
  audioSrc?: string;
  /** Poster photo slot from photos.json, used when there is no YouTube thumbnail. */
  poster?: string;
  /** Profile slugs of the people featured. */
  people?: string[];
  /** Related story slugs. */
  stories?: string[];
  /** Short label such as "Episode 1" or "Archive, 2011". */
  label?: string;
};

export const MEDIA: MediaItem[] = [
  {
    slug: 'fazza-dubai-poetry-forum',
    kind: 'video',
    title: 'Sheikh Hamdan bin Mohammed recites his poem at the Dubai Poetry Forum',
    summary: 'The Crown Prince of Dubai, who writes as Fazza, reads one of his poems at the Dubai Poetry Forum in 2011.',
    source: 'Dubai Media Office',
    youtubeId: 'Yhzm8XF9Oec',
    people: ['hamdan-bin-mohammed'],
    stories: ['hamdan-bin-mohammed-crown-prince-poet-rider'],
    label: 'Archive, 2011',
  },
  {
    slug: 'dubai-future-solutions',
    kind: 'video',
    title: 'Hamdan bin Mohammed approves the next phase of Dubai Future Solutions',
    summary: 'News footage from the Dubai Media Office on the next phase of the Dubai Future Solutions initiative.',
    source: 'Dubai Media Office',
    youtubeId: 'diJyRDopF38',
    people: ['hamdan-bin-mohammed'],
    label: 'News',
  },
  {
    slug: 'majlis-podcast-1-oral-archive',
    kind: 'podcast',
    title: 'The Majlis Podcast, Episode 1: Keeping a Poem Alive',
    summary: 'Saeed Al Shamsi on three decades of recording Nabati poetry from elders across the Emirates.',
    source: 'Amazing Emiratis',
    poster: 'story/poet-recording-nabati-verse',
    people: ['saeed-al-shamsi'],
    stories: ['poet-recording-nabati-verse'],
    label: 'Episode 1',
  },
  {
    slug: 'majlis-podcast-2-founders',
    kind: 'podcast',
    title: 'The Majlis Podcast, Episode 2: Patient Money',
    summary: 'Aisha Al Marri on backing first-time founders and why the region’s best companies take time.',
    source: 'Amazing Emiratis',
    poster: 'story/family-offices-funding-next-generation-of-founders',
    people: ['aisha-al-marri'],
    label: 'Episode 2',
  },
  {
    slug: 'majlis-podcast-3-young-women-founders',
    kind: 'podcast',
    title: 'The Majlis Podcast, Episode 3: Young Women Founders',
    summary: 'Alia Al Shamsi and Mahra Al Ameri on starting companies in their twenties.',
    source: 'Amazing Emiratis',
    poster: 'story/coffee-roasters-of-al-quoz',
    people: ['alia-al-shamsi', 'mahra-al-ameri'],
    label: 'Episode 3',
  },
];

export function getMedia(slug: string): MediaItem | undefined {
  return MEDIA.find((m) => m.slug === slug);
}

/** Published means it can be played now; the rest are announced as coming soon. */
export const isPublished = (m: MediaItem) => Boolean(m.youtubeId || m.audioSrc);

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
