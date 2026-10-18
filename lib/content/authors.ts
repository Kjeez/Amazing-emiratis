export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Total stories written for the archive (the sample data holds only a selection). */
  storyCount: number;
  email: string;
};

export const AUTHORS: Author[] = [
  { slug: 'layla-al-hashimi', name: 'Layla Al Hashimi', role: 'Editor, Fashion & Culture', storyCount: 48, email: 'layla@amazingemiratis.ae',
    bio: 'Layla has covered fashion, design and culture in the Gulf for twelve years. Before joining Amazing Emiratis she was a features writer in Dubai and London.' },
  { slug: 'hamad-al-suwaidi', name: 'Hamad Al Suwaidi', role: 'Business Editor', storyCount: 36, email: 'hamad@amazingemiratis.ae',
    bio: 'Hamad writes about founders, family enterprises and the economy of the Emirates. He previously reported on markets for a regional business daily.' },
  { slug: 'omar-al-jaberi', name: 'Omar Al Jaberi', role: 'Science & Technology Editor', storyCount: 29, email: 'omar@amazingemiratis.ae',
    bio: 'Omar covers space, AI and climate science. He trained as an engineer before moving into journalism.' },
  { slug: 'salem-al-hammadi', name: 'Dr. Salem Al Hammadi', role: 'Health Editor', storyCount: 22, email: 'salem@amazingemiratis.ae',
    bio: 'Salem is a physician and writer. He edits the health section and reports on medicine, research and public health.' },
];

export function getAuthor(slug: string | undefined): Author | undefined {
  return slug ? AUTHORS.find((a) => a.slug === slug) : undefined;
}

export function authorName(slug: string | undefined): string {
  return getAuthor(slug)?.name ?? 'The Editors';
}

export function authorHrefByName(name: string): string | undefined {
  const a = AUTHORS.find((x) => x.name === name);
  return a ? `/authors/${a.slug}` : undefined;
}
