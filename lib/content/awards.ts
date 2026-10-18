/** Nominations close at 23:59 Gulf Standard Time. */
export const NOMINATION_DEADLINE = '2026-12-15T23:59:00+04:00';

export const AWARD_CATEGORIES: [name: string, description: string][] = [
  ['Business', 'Leaders building enterprises that shape the economy.'],
  ['Entrepreneurship', 'Founders who started something from nothing.'],
  ['Technology', 'Engineers and builders of new tools and platforms.'],
  ['Science & Research', 'Discoveries and research with lasting impact.'],
  ['Health', 'Clinicians and researchers improving care.'],
  ['Education', 'Teachers and leaders opening doors for students.'],
  ['Culture & Heritage', 'Keepers of Emirati traditions, language and memory.'],
  ['Arts', 'Visual artists, designers, musicians and filmmakers.'],
  ['Literature', 'Poets, novelists, translators and publishers.'],
  ['Sport', 'Athletes and coaches representing the nation.'],
  ['Sustainability', 'Work that protects land, sea and climate.'],
  ['Community Service', 'Volunteers and organisers serving others.'],
  ['Young Achiever', 'Exceptional Emiratis aged 30 and under.'],
  ['Lifetime Achievement', 'A career of service to the nation.'],
];

export const AWARD_CATEGORY_NAMES = AWARD_CATEGORIES.map((c) => c[0]);

export const AWARDS_TIMELINE: { date: string; title: string; body: string; now?: boolean }[] = [
  { date: '1 SEP – 15 DEC 2026', title: 'Nominations', body: 'Anyone can nominate an Emirati in one of fourteen categories.', now: true },
  { date: '20 JANUARY 2027', title: 'Shortlist', body: 'Editors and researchers verify every nomination and publish five finalists per category.' },
  { date: 'JANUARY – FEBRUARY', title: 'Jury', body: 'An independent jury of seven reviews the finalists and interviews each one.' },
  { date: '21 FEBRUARY 2027', title: 'Ceremony', body: 'Winners are announced at an evening ceremony in Abu Dhabi.' },
];

export const AWARDS_FAQ: [q: string, a: string][] = [
  ['Who can be nominated?', 'Any Emirati citizen, living in the UAE or abroad, whose work has had a clear and lasting impact. Nominees in Young Achiever must be 30 or under on 15 December 2026.'],
  ['Can I nominate myself?', 'Yes. Self-nominations are reviewed in exactly the same way as any other.'],
  ['How many people can I nominate?', 'Up to three nominations per person, in different categories.'],
  ['How are winners chosen?', 'The editorial team verifies each nomination and prepares a shortlist. An independent jury then selects one winner per category. Jury members do not judge categories where they have a conflict of interest.'],
  ['Is there a fee?', 'No. Nominating and being nominated are free.'],
];

/** 2025 winners: [award category, profile slug]. */
export const WINNERS_2025: [category: string, slug: string][] = [
  ['BUSINESS', 'aisha-al-marri'],
  ['CULTURE & HERITAGE', 'saeed-al-shamsi'],
  ['HEALTH', 'noura-al-ketbi'],
  ['TECHNOLOGY', 'mariam-al-falasi'],
];

export const JURY_2026: [name: string, role: string][] = [
  ['Dr. Amna Al Dahak', 'Chair; former university president'],
  ['Khalifa Al Romaithi', 'Publisher and editor'],
  ['Shaikha Al Nowais', 'Hospitality executive'],
  ['Prof. Ali Al Hosani', 'Professor of engineering'],
  ['Meera Al Suwaidi', 'Curator and art historian'],
  ['Dr. Fahad Al Obaidli', 'Physician and researcher'],
];

export const RELATION_OPTIONS = ['Colleague', 'Family member', 'Friend', 'Employer', 'Student or mentee', 'Myself', 'Other'];

export const WHY_MIN = 150;
export const WHY_MAX = 1200;
