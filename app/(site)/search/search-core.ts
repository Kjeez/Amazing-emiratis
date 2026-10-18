/** Search types and matching shared by the server page and the client view (no content imports here). */
export type ProfileHit = { key: string; name: string; role: string; href: string; text: string };
export type StoryHit = { key: string; cat: string; title: string; date: string; href: string; text: string };
export type PlaceHit = { key: string; name: string; ar: string; href: string; text: string };
export type SearchIndex = { profiles: ProfileHit[]; stories: StoryHit[]; places: PlaceHit[] };
export type SearchResults = SearchIndex;

export const POPULAR_SEARCHES = ['Heritage', 'Space', 'Fashion', 'Sharjah', 'Awards', 'Health'];

export function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2018\u2019`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every word of the query must appear somewhere in the entry. */
export function runSearch(index: SearchIndex, query: string): SearchResults {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (!terms.length) return { profiles: [], stories: [], places: [] };
  const match = (text: string) => terms.every((t) => text.includes(t));
  return {
    profiles: index.profiles.filter((p) => match(p.text)),
    stories: index.stories.filter((s) => match(s.text)),
    places: index.places.filter((e) => match(e.text)),
  };
}
