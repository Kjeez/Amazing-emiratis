export type EventType = 'Talk' | 'Salon' | 'Workshop' | 'Ceremony';

export type ArchiveEvent = {
  slug: string;
  /** ISO date (YYYY-MM-DD), local to the UAE. */
  date: string;
  type: EventType;
  city: string;
  title: string;
  venue: string;
  time: string;
  /** Places available. 0 means invitation only. */
  capacity: number;
  about: string;
  speakers: [name: string, role: string][];
};

export const EVENT_TYPES: EventType[] = ['Talk', 'Salon', 'Workshop', 'Ceremony'];

export const EVENTS: ArchiveEvent[] = [
  { slug: 'majlis-sharjah', date: '2026-11-12', type: 'Salon', city: 'Sharjah', title: 'The Majlis Series: Heritage and the Digital Archive', venue: 'House of Wisdom, Sharjah', time: '7:00 – 9:30 pm', capacity: 48,
    about: 'An evening on how families, libraries and museums are preserving Emirati memory, from oral poetry to private photograph collections.',
    speakers: [['Saeed Al Shamsi', 'Poet & Archivist'], ['Shamma Al Kaabi', 'Museum Curator'], ['Layla Al Hashimi', 'Moderator']] },
  { slug: 'lunar-rover', date: '2026-11-20', type: 'Talk', city: 'Dubai', title: 'An Evening with the Lunar Rover Team', venue: 'Mohammed Bin Rashid Library, Dubai', time: '6:30 – 8:30 pm', capacity: 112,
    about: 'Engineers from the next Emirati lunar mission talk through how the rover will be guided on the Moon, followed by questions from the audience.',
    speakers: [['Hazza Al Mansouri', 'Mission Engineer'], ['Omar Al Jaberi', 'Moderator']] },
  { slug: 'women-leadership', date: '2026-12-03', type: 'Salon', city: 'Abu Dhabi', title: 'Women in Leadership: A Dinner Conversation', venue: 'Qasr Al Hosn, Abu Dhabi', time: '7:30 – 10:00 pm', capacity: 24,
    about: 'A small dinner with founders and executives on building companies and careers in the Emirates.',
    speakers: [['Aisha Al Marri', 'Managing Partner, Wadi Capital'], ['Alia Al Shamsi', 'Founder, Raqam Pay'], ['Hamad Al Suwaidi', 'Moderator']] },
  { slug: 'young-achievers', date: '2026-12-10', type: 'Workshop', city: 'Ras Al Khaimah', title: 'Young Achievers Workshop: Telling Your Story', venue: 'RAK Academy, Ras Al Khaimah', time: '10:00 am – 1:00 pm', capacity: 35,
    about: 'A hands-on morning for students and young professionals preparing a nomination or application to the archive.',
    speakers: [['Omar Al Zaabi', 'Youth Mentor'], ['Layla Al Hashimi', 'Editor']] },
  { slug: 'awards-ceremony', date: '2027-02-21', type: 'Ceremony', city: 'Abu Dhabi', title: 'Amazing Emiratis Awards 2026 Ceremony', venue: 'Emirates Palace, Abu Dhabi', time: '7:00 pm onwards', capacity: 0,
    about: 'The annual ceremony announcing winners in all fourteen categories. Attendance is by invitation; the evening will be streamed live.',
    speakers: [['The Jury', 'Fourteen categories'], ['The Editors', 'Hosts']] },
];

export const PAST_EVENTS: [date: string, title: string][] = [
  ['18 SEP 2026', 'What We Heard at the Culture Forum'],
  ['22 MAY 2026', 'Photographs from the Spring Salon'],
  ['14 MAR 2026', 'The 2025 Awards Night, in Pictures'],
];

export const EVENT_AGENDA: [time: string, what: string][] = [
  ['Arrival', 'Arabic coffee and dates'],
  ['+30 min', 'Welcome from the editors'],
  ['+45 min', 'Conversation with the speakers'],
  ['+90 min', 'Questions and majlis'],
];

export function getEvent(slug: string): ArchiveEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function eventDateParts(iso: string) {
  const d = new Date(iso + 'T12:00:00Z');
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: `${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
    weekday: WD[d.getUTCDay()],
  };
}
