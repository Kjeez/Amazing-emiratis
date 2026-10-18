import { STORY_CATEGORY_LABEL } from '@/lib/content/categories';
import { EMIRATES, emirateName } from '@/lib/content/emirates';
import { PEOPLE } from '@/lib/content/people';
import { MOST_READ, getStory, shortDate, storiesByDate } from '@/lib/content/stories';
import { normalise, type SearchIndex } from './search-core';

/** Compact, serialisable index handed to the client so results update as the reader types. */
export function buildIndex(): SearchIndex {
  return {
    profiles: PEOPLE.map((p) => {
      const place = emirateName(p.emirate);
      return {
        key: p.slug,
        name: p.name,
        role: `${p.role} · ${place}`,
        href: `/profiles/${p.slug}`,
        text: normalise([p.name, p.role, place, p.category, p.knownFor].join(' ')),
      };
    }),
    stories: storiesByDate().map((s) => ({
      key: s.slug,
      cat: STORY_CATEGORY_LABEL[s.category].toUpperCase(),
      title: s.title,
      date: shortDate(s.date),
      href: `/stories/${s.slug}`,
      text: normalise([s.title, STORY_CATEGORY_LABEL[s.category], s.sub, s.dek ?? ''].join(' ')),
    })),
    places: EMIRATES.map((e) => ({
      key: e.slug,
      name: e.name,
      ar: e.ar,
      href: `/emirates/${e.slug}`,
      text: normalise(`${e.name} ${e.ar}`),
    })),
  };
}

/** "Trending this week": the first four most-read stories. */
export function trending(): { href: string; title: string }[] {
  return MOST_READ.slice(0, 4).flatMap((slug) => {
    const s = getStory(slug);
    return s ? [{ href: `/stories/${s.slug}`, title: s.title }] : [];
  });
}
