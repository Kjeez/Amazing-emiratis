import type { Metadata } from 'next';
import CollectionPage from '@/components/collections/CollectionPage';
import { COLLECTIONS } from '@/lib/content/people';

export const metadata: Metadata = {
  title: 'Women Entrepreneurs',
  description: 'Emirati women building companies, from venture capital and payments to fashion, coffee and craft.',
};

export default function Page() {
  return <CollectionPage collection={COLLECTIONS.women} />;
}
