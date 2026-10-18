import data from './photos.json';

/** A licensed photograph stored in public/images (see scripts/fetch-photos.mjs). */
export type Photo = {
  src: string;
  alt: string;
  /** Photographer's Unsplash username. */
  credit: string;
  creditHref: string;
};

type Entry = [unsplashId: string, alt: string, handle: string];
const PHOTOS = data as unknown as Record<string, Entry>;

/** Look up a photo by its slot, e.g. "story/digital-dirhams" or "emirate/dubai". */
export function photo(slot: string): Photo | undefined {
  const e = PHOTOS[slot];
  if (!e) return undefined;
  return { src: `/images/${slot}.jpg`, alt: e[1], credit: e[2], creditHref: `https://unsplash.com/@${e[2]}` };
}

export const storyPhoto = (slug: string) => photo(`story/${slug}`);
export const emiratePhoto = (slug: string) => photo(`emirate/${slug}`);
export const placePhoto = (emirate: string, index: number) => photo(`place/${emirate}/${index}`);
export const eventPhoto = (slug: string) => photo(`event/${slug}`);
export const recapPhoto = (index: number) => photo(`recap/${index}`);

/** Every photo with its slot, for the credits page. */
export function allPhotos(): (Photo & { slot: string })[] {
  return Object.keys(PHOTOS).map((slot) => ({ slot, ...photo(slot)! }));
}
