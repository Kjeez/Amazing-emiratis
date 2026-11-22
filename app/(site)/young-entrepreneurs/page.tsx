import type { Metadata } from 'next';
import CollectionPage from '@/components/collections/CollectionPage';
import { COLLECTIONS } from '@/lib/content/people';

export const metadata: Metadata = {
  title: 'Young Entrepreneurs',
  description: 'Emirati founders who started their companies in their twenties.',
};

export default function Page() {
  return <CollectionPage collection={COLLECTIONS.young} />;
}
