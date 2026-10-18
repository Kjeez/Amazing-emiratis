import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import ProfilesDirectory, { type DirectoryPerson } from '@/components/profiles/ProfilesDirectory';
import { emirateName } from '@/lib/content/emirates';
import { ARCHIVE_TOTALS, PEOPLE } from '@/lib/content/people';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Profiles',
  description: 'Every person in the archive, chosen by our editors and the Awards jury, across all seven Emirates.',
};

export default function ProfilesPage() {
  const people: DirectoryPerson[] = PEOPLE.map((p) => ({
    slug: p.slug,
    name: p.name,
    role: p.role,
    category: p.category,
    emirate: emirateName(p.emirate),
    winner: p.winner,
  }));

  return (
    <main className="container">
      <section className={s.header}>
        <div className={s.headerTitle}>
          <span className={s.kicker}>THE ARCHIVE</span>
          <h1 className={s.title}>Profiles</h1>
        </div>
        <div className={s.headerAside}>
          <p className={s.intro}>Every person in the archive, chosen by our editors and the Awards jury, across all seven Emirates.</p>
          <span className={s.totals}>{ARCHIVE_TOTALS.profiles} profiles · {ARCHIVE_TOTALS.industries} industries</span>
        </div>
      </section>

      <Suspense fallback={<div className={s.fallback} />}>
        <ProfilesDirectory people={people} />
      </Suspense>

      <section className={s.nominate}>
        <div className={s.nominateText}>
          <h2 className={s.nominateTitle}>Know someone who belongs here?</h2>
          <p className={s.nominateBody}>Nominate them for the archive or for the Awards 2026.</p>
        </div>
        <Link href="/nominate" className={s.nominateBtn}>Nominate someone</Link>
      </section>
    </main>
  );
}
