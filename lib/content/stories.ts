import { STORY_CATEGORY_LABEL, type StoryCategory } from './categories';
import type { EmirateSlug } from './emirates';

export type Story = {
  slug: string;
  title: string;
  category: StoryCategory;
  /** Sub-topic within the category, e.g. "Finance". */
  sub: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readMins: number;
  /** Author slug from authors.ts, or undefined for "The Editors". */
  author?: string;
  dek?: string;
  emirate?: EmirateSlug;
  cover?: boolean;
};

// Sample catalogue gathered from the design pages. Stories with a full body live in story-bodies.ts.
export const STORIES: Story[] = [
  // Business
  { slug: 'family-offices-funding-next-generation-of-founders', title: 'The Family Offices Quietly Funding the Next Generation of Founders', category: 'business', sub: 'Finance', date: '2026-10-12', readMins: 11, author: 'hamad-al-suwaidi', dek: 'How second-generation investors are moving capital from real estate into climate tech, logistics and AI.', emirate: 'abu-dhabi' },
  { slug: 'from-souk-stall-to-series-b', title: 'From Souk Stall to Series B: A Spice Brand’s Long Road', category: 'business', sub: 'Entrepreneurship', date: '2026-10-02', readMins: 6, author: 'hamad-al-suwaidi', emirate: 'dubai' },
  { slug: 'engineers-behind-the-largest-solar-park', title: 'The Engineers Behind the Region’s Largest Solar Park', category: 'business', sub: 'Energy', date: '2026-09-29', readMins: 8, author: 'hamad-al-suwaidi', emirate: 'abu-dhabi' },
  { slug: 'five-women-reshaping-boardrooms', title: 'Five Women Reshaping Boardrooms Across the Emirates', category: 'business', sub: 'Leadership', date: '2026-06-11', readMins: 9, author: 'hamad-al-suwaidi' },
  { slug: 'ras-al-khaimah-new-class-of-developer', title: 'Why Ras Al Khaimah Is Drawing a New Class of Developer', category: 'business', sub: 'Real Estate', date: '2026-09-27', readMins: 5, author: 'hamad-al-suwaidi', emirate: 'ras-al-khaimah' },
  { slug: 'first-islamic-venture-fund', title: 'Inside the Region’s First Islamic Venture Fund', category: 'business', sub: 'Finance', date: '2026-09-21', readMins: 7, author: 'hamad-al-suwaidi' },
  { slug: 'perfume-house-built-on-oud-and-patience', title: 'A Perfume House Built on Oud and Patience', category: 'business', sub: 'Entrepreneurship', date: '2026-09-15', readMins: 4, author: 'hamad-al-suwaidi', emirate: 'ajman' },

  // Culture
  { slug: 'calligrapher-restoring-sharjah-manuscripts', title: 'The Calligrapher Restoring Sharjah’s Forgotten Manuscripts', category: 'culture', sub: 'Heritage', date: '2026-10-16', readMins: 9, author: 'layla-al-hashimi', dek: 'A decade-long effort to rescue handwritten texts from private collections across the Gulf.', emirate: 'sharjah' },
  { slug: 'poet-recording-nabati-verse', title: 'The Poet Recording Nabati Verse Before It Disappears', category: 'culture', sub: 'Literature', date: '2026-10-02', readMins: 8, author: 'layla-al-hashimi', emirate: 'sharjah' },
  { slug: 'painters-return-to-the-colours-of-liwa', title: 'A Painter’s Return to the Colours of Liwa', category: 'culture', sub: 'Art', date: '2026-09-14', readMins: 5, author: 'layla-al-hashimi', emirate: 'abu-dhabi' },
  { slug: 'reviving-the-oud', title: 'Reviving the Oud for a Streaming Generation', category: 'culture', sub: 'Music', date: '2026-09-09', readMins: 9, author: 'layla-al-hashimi' },
  { slug: 'director-shooting-first-desert-western', title: 'The Director Shooting the UAE’s First Desert Western', category: 'culture', sub: 'Film', date: '2026-09-04', readMins: 7, author: 'layla-al-hashimi', emirate: 'sharjah' },
  { slug: 'restoration-of-al-jahili-fort', title: 'Inside the Restoration of Al Jahili Fort', category: 'culture', sub: 'Heritage', date: '2026-10-05', readMins: 6, author: 'layla-al-hashimi', emirate: 'abu-dhabi' },
  { slug: 'sculptors-working-in-salt-and-sand', title: 'Sculptors Working in Salt and Sand', category: 'culture', sub: 'Art', date: '2026-08-30', readMins: 4, author: 'layla-al-hashimi', emirate: 'umm-al-quwain' },
  { slug: 'last-pearl-divers-of-dubai-creek', title: 'The Last Pearl Divers of Dubai Creek', category: 'culture', sub: 'Heritage', date: '2026-09-18', readMins: 10, author: 'layla-al-hashimi', emirate: 'dubai' },

  // Health
  { slug: 'genome-programme-mapping-a-nations-health', title: 'The Genome Programme Mapping a Nation’s Health', category: 'health', sub: 'Research', date: '2026-10-08', readMins: 13, author: 'salem-al-hammadi', dek: 'Inside the lab sequencing hundreds of thousands of Emirati genomes, and what it has found so far.', emirate: 'abu-dhabi' },
  { slug: 'surgeons-fight-against-diabetes', title: 'A Surgeon’s Two-Decade Fight Against Diabetes in the Gulf', category: 'health', sub: 'Medicine', date: '2026-10-14', readMins: 8, author: 'salem-al-hammadi' },
  { slug: 'desert-running-clubs', title: 'Desert Running Clubs Are Changing Weekend Culture', category: 'health', sub: 'Wellness', date: '2026-09-30', readMins: 5, author: 'salem-al-hammadi' },
  { slug: 'counsellor-breaking-stigma', title: 'The Counsellor Breaking Stigma, One Majlis at a Time', category: 'health', sub: 'Mental Health', date: '2026-09-24', readMins: 7, author: 'salem-al-hammadi', emirate: 'umm-al-quwain' },
  { slug: 'dates-data-ramadan-fasting', title: 'Dates, Data and the Science of Ramadan Fasting', category: 'health', sub: 'Nutrition', date: '2026-09-05', readMins: 6, author: 'salem-al-hammadi' },
  { slug: 'new-approach-to-childhood-asthma', title: 'A New Approach to Childhood Asthma', category: 'health', sub: 'Research', date: '2026-08-28', readMins: 7, author: 'salem-al-hammadi' },
  { slug: 'nurses-rural-clinic-network', title: 'The Nurses Who Built a Rural Clinic Network', category: 'health', sub: 'Medicine', date: '2026-08-21', readMins: 4, author: 'salem-al-hammadi', emirate: 'fujairah' },

  // Lifestyle
  { slug: 'new-couture-of-the-desert', title: 'The New Couture of the Desert', category: 'lifestyle', sub: 'Fashion', date: '2026-10-16', readMins: 12, author: 'layla-al-hashimi', dek: 'Three Emirati designers on heritage textiles, modern tailoring and taking the abaya to the runways of Paris and Milan.', emirate: 'dubai', cover: true },
  { slug: 'falconry-reimagined', title: 'Falconry, Reimagined for a New Generation', category: 'lifestyle', sub: 'Sport', date: '2026-10-13', readMins: 6, author: 'layla-al-hashimi', emirate: 'ras-al-khaimah' },
  { slug: 'return-of-traditional-harees', title: 'A Chef’s Case for the Return of Traditional Harees', category: 'lifestyle', sub: 'Food', date: '2026-09-27', readMins: 5, author: 'layla-al-hashimi', emirate: 'fujairah' },
  { slug: 'architect-designing-homes-around-the-majlis', title: 'The Architect Designing Homes Around the Majlis', category: 'lifestyle', sub: 'Design', date: '2026-08-28', readMins: 9, author: 'layla-al-hashimi' },
  { slug: 'seven-days-along-the-hajar-mountains', title: 'Seven Days Along the Hajar Mountains', category: 'lifestyle', sub: 'Travel', date: '2026-09-11', readMins: 7, author: 'layla-al-hashimi', emirate: 'ras-al-khaimah' },
  { slug: 'jewellers-reworking-bedouin-silver', title: 'Jewellers Reworking Bedouin Silver', category: 'lifestyle', sub: 'Fashion', date: '2026-09-30', readMins: 6, author: 'layla-al-hashimi', emirate: 'ajman' },
  { slug: 'coffee-roasters-of-al-quoz', title: 'The Coffee Roasters of Al Quoz', category: 'lifestyle', sub: 'Food', date: '2026-08-19', readMins: 4, author: 'layla-al-hashimi', emirate: 'dubai' },

  // Tech
  { slug: 'mission-control-lunar-rover', title: 'Mission Control: The Team Guiding the Next Lunar Rover', category: 'tech', sub: 'Space', date: '2026-10-10', readMins: 10, author: 'omar-al-jaberi', dek: 'A young engineering team on building for the Moon from an office in Dubai.', emirate: 'dubai' },
  { slug: 'arabic-first-language-model', title: 'Building an Arabic-First Language Model from Abu Dhabi', category: 'tech', sub: 'AI', date: '2026-10-15', readMins: 8, author: 'omar-al-jaberi', emirate: 'abu-dhabi' },
  { slug: 'machines-that-read-arabic-handwriting', title: 'The Start-up Teaching Machines to Read Arabic Handwriting', category: 'tech', sub: 'AI', date: '2026-10-06', readMins: 5, author: 'omar-al-jaberi' },
  { slug: 'digital-dirhams', title: 'Digital Dirhams and the Future of Payments', category: 'tech', sub: 'Fintech', date: '2026-09-25', readMins: 9, author: 'omar-al-jaberi', emirate: 'sharjah' },
  { slug: 'autonomous-taxis-dubai', title: 'Testing Autonomous Taxis on Dubai’s Streets', category: 'tech', sub: 'Mobility', date: '2026-09-17', readMins: 7, author: 'omar-al-jaberi', emirate: 'dubai' },
  { slug: 'cloud-seeding-explained', title: 'Cloud Seeding, Explained by Its Scientists', category: 'tech', sub: 'Climate', date: '2026-09-03', readMins: 4, author: 'omar-al-jaberi' },
  { slug: 'quiet-rise-of-emirati-space-engineers', title: 'The Quiet Rise of Emirati Space Engineers', category: 'tech', sub: 'Space', date: '2026-09-21', readMins: 8, author: 'omar-al-jaberi' },

  // Community
  { slug: '30-under-30-2026', title: 'The 30 Under 30 Emiratis to Watch in 2026', category: 'community', sub: 'Youth', date: '2026-10-01', readMins: 15 },
  { slug: 'fujairah-fisherman-conservation-movement', title: 'How a Fujairah Fisherman Built a Conservation Movement', category: 'community', sub: 'Conservation', date: '2026-09-08', readMins: 8, emirate: 'fujairah' },
  { slug: 'coding-bootcamps-in-every-emirate', title: 'Coding Bootcamps Opening in Every Emirate', category: 'community', sub: 'Education', date: '2026-09-12', readMins: 5, emirate: 'ajman' },
  { slug: 'volunteers-who-plant-ghaf-trees', title: 'Volunteers Who Plant Ghaf Trees Every Winter', category: 'community', sub: 'Volunteering', date: '2026-08-24', readMins: 4, emirate: 'umm-al-quwain' },
];

export const COVER_STORY_SLUG = 'new-couture-of-the-desert';

export const MOST_READ = [
  '30-under-30-2026',
  'restoration-of-al-jahili-fort',
  'fujairah-fisherman-conservation-movement',
  'quiet-rise-of-emirati-space-engineers',
  'return-of-traditional-harees',
];

const bySlug = new Map(STORIES.map((s) => [s.slug, s]));

export function getStory(slug: string): Story | undefined {
  return bySlug.get(slug);
}

/** Look up a story by slug or by (the start of) its title, as the design pages sometimes shorten titles. */
export function findStory(slugOrTitle: string): Story | undefined {
  const hit = bySlug.get(slugOrTitle);
  if (hit) return hit;
  const t = normalise(slugOrTitle);
  return STORIES.find((s) => normalise(s.title) === t) ?? STORIES.find((s) => normalise(s.title).startsWith(t));
}

function normalise(s: string) {
  return s.toLowerCase().replace(/[’']/g, '').replace(/^(the|a) /, '').trim();
}

export function storyHref(slugOrTitle: string): string {
  const s = findStory(slugOrTitle);
  return s ? `/stories/${s.slug}` : `/search?q=${encodeURIComponent(slugOrTitle)}`;
}

export function storiesByDate(): Story[] {
  return [...STORIES].sort((a, b) => b.date.localeCompare(a.date));
}

export function storiesInCategory(category: StoryCategory): Story[] {
  return storiesByDate().filter((s) => s.category === category);
}

export function storiesByAuthor(author: string): Story[] {
  return storiesByDate().filter((s) => s.author === author);
}

export function storiesInEmirate(emirate: EmirateSlug): Story[] {
  return storiesByDate().filter((s) => s.emirate === emirate);
}

export function categoryLabel(s: Story): string {
  return STORY_CATEGORY_LABEL[s.category];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "16 Oct 2026" */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "16 October 2026" */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
}
