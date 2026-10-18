import type { Metadata } from 'next';
import { Suspense } from 'react';
import { buildIndex, trending } from './search-index';
import SearchView from './SearchView';

type Props = { searchParams: Promise<{ q?: string | string[] }> };

function firstParam(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? '';
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = firstParam((await searchParams).q).trim();
  return {
    title: q ? `Search: ${q}` : 'Search',
    description: 'Search the archive for people, stories and places across the seven Emirates.',
    robots: q ? { index: false } : undefined,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const q = firstParam((await searchParams).q).slice(0, 200);
  const index = buildIndex();
  const trend = trending();

  // The page is rendered per request, so the initial results are in the server HTML and work without JavaScript.
  return (
    <Suspense fallback={null}>
      <SearchView initialQ={q} index={index} trending={trend} />
    </Suspense>
  );
}
