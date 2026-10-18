import type { MetadataRoute } from 'next';
import { AUTHORS } from '@/lib/content/authors';
import { CATEGORIES } from '@/lib/content/categories';
import { EMIRATES } from '@/lib/content/emirates';
import { EVENTS } from '@/lib/content/events';
import { LEGAL_DOCS } from '@/lib/content/legal';
import { PEOPLE } from '@/lib/content/people';
import { STORIES } from '@/lib/content/stories';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const paths = [
    '/', '/ar', '/about', '/awards', '/nominate', '/join', '/newsletter', '/events', '/profiles', '/search', '/credits',
    ...CATEGORIES.map((c) => `/category/${c.key}`),
    ...STORIES.map((s) => `/stories/${s.slug}`),
    ...PEOPLE.map((p) => `/profiles/${p.slug}`),
    ...EMIRATES.map((e) => `/emirates/${e.slug}`),
    ...AUTHORS.map((a) => `/authors/${a.slug}`),
    ...EVENTS.map((e) => `/events/${e.slug}`),
    ...LEGAL_DOCS.map((d) => `/legal/${d.key}`),
  ];
  return paths.map((p) => ({ url: base + p }));
}
