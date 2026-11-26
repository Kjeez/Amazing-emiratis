import type { Metadata } from 'next';
import CollectionPage from '@/components/collections/CollectionPage';
import { COLLECTIONS } from '@/lib/content/people';

export const metadata: Metadata = {
  title: 'People Beyond Borders',
  description: 'Emiratis building careers and companies abroad.',
};

export default function Page() {
  return <CollectionPage collection={COLLECTIONS.beyond} />;
}
