export type LetterKey = 'monthly' | 'business' | 'culture' | 'awards';

export const LETTERS: { key: LetterKey; name: string; desc: string; freq: string }[] = [
  { key: 'monthly', name: 'The Monthly', desc: 'The best of the archive, edited.', freq: 'MONTHLY' },
  { key: 'business', name: 'The Business Letter', desc: 'Founders, investors and deals.', freq: 'FORTNIGHTLY' },
  { key: 'culture', name: 'The Culture Letter', desc: 'Art, heritage, books and film.', freq: 'FORTNIGHTLY' },
  { key: 'awards', name: 'Awards Alerts', desc: 'Deadlines, shortlists and winners.', freq: 'SEASONAL' },
];

export const LETTER_KEYS = LETTERS.map((l) => l.key);

/** Past issues of The Monthly: [number, cover story title, month]. */
export const ISSUES: [n: string, title: string, date: string][] = [
  ['47', 'The New Couture of the Desert', 'October 2026'],
  ['46', 'The Genome Programme Mapping a Nation’s Health', 'September 2026'],
  ['45', 'Mission Control', 'August 2026'],
  ['44', 'The Last Pearl Divers of Dubai Creek', 'July 2026'],
  ['43', 'Five Women Reshaping Boardrooms', 'June 2026'],
];
