import type { Metadata } from 'next';
import Link from 'next/link';
import NominationForm from '@/components/nominate/NominationForm';
import { AWARD_CATEGORY_NAMES, NOMINATION_DEADLINE } from '@/lib/content/awards';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Nominate · Awards 2026',
  description: 'Nominate an Emirati for the Amazing Emiratis Awards 2026 in one of fourteen categories.',
};

export default async function NominatePage({ searchParams }: { searchParams: Promise<{ cat?: string | string[] }> }) {
  const { cat } = await searchParams;
  const requested = Array.isArray(cat) ? cat[0] : cat;
  const category = requested && AWARD_CATEGORY_NAMES.includes(requested) ? requested : '';
  const closed = Date.now() > new Date(NOMINATION_DEADLINE).getTime();

  return (
    <main className={styles.main}>
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/awards">Awards 2026</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className={styles.crumbHere}>Nominate</span>
      </nav>
      {closed ? (
        <section className={styles.closed} role="status">
          <span className={styles.kicker}>AWARDS 2026 · NOMINATION</span>
          <h1 className={styles.closedTitle}>Nominations are <em>closed</em>.</h1>
          <p className={styles.closedText}>Nominations for Awards 2026 closed on 15 December 2026. The shortlist is announced on 20 January 2027.</p>
          <Link href="/awards" className={styles.closedLink}>Back to Awards 2026</Link>
        </section>
      ) : (
        <NominationForm initialCategory={category} />
      )}
    </main>
  );
}
