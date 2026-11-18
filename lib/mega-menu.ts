import { CATEGORIES } from './content/categories';
import { MEDIA } from './content/media';
import { storyPhoto } from './content/photos';
import { storiesInCategory } from './content/stories';

export type MegaCard = { href: string; kicker: string; title: string; img?: string };
export type MegaPanel = { label: string; href: string; links: { label: string; href: string }[]; cards: MegaCard[] };

/** Desktop mega-menu panels keyed by nav href; built on the server and passed to SiteHeader. */
export function megaMenu(): Record<string, MegaPanel> {
  const out: Record<string, MegaPanel> = {};
  for (const c of CATEGORIES) {
    const href = `/category/${c.key}`;
    out[href] = {
      label: c.label,
      href,
      links: c.subs.map((s) => ({ label: s, href })),
      cards: storiesInCategory(c.key).slice(0, 2).map((s) => ({
        href: `/stories/${s.slug}`,
        kicker: s.sub,
        title: s.title,
        img: storyPhoto(s.slug)?.src,
      })),
    };
  }
  out['/watch'] = {
    label: 'Watch & Listen',
    href: '/watch',
    links: [
      { label: 'All', href: '/watch' },
      { label: 'Videos', href: '/watch?kind=video' },
      { label: 'Podcasts', href: '/watch?kind=podcast' },
    ],
    cards: MEDIA.filter((m) => m.youtubeId).slice(0, 2).map((m) => ({
      href: `/watch/${m.slug}`,
      kicker: m.label ?? 'Video',
      title: m.title,
      img: `https://i.ytimg.com/vi/${m.youtubeId}/mqdefault.jpg`,
    })),
  };
  return out;
}
