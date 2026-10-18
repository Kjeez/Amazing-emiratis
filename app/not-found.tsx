import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.main}>
        <span className={styles.code} aria-hidden="true">404</span>
        <h1 className={styles.title}>This page isn’t in the archive.</h1>
        <p className={styles.text}>It may have moved, or the link may be mistyped. Try searching for the person or story you were looking for.</p>
        <form action="/search" method="get" role="search" className={styles.search}>
          <label htmlFor="not-found-q" className="srOnly">Search the archive</label>
          <input id="not-found-q" name="q" type="search" placeholder="Search the archive" className={styles.input} />
          <button type="submit" className={styles.submit}>Search →</button>
        </form>
        <nav className={styles.links} aria-label="Suggested pages">
          <Link href="/" className={`underlineLink ${styles.link}`}>Homepage</Link>
          <Link href="/profiles" className={`underlineLink ${styles.link}`}>Profiles</Link>
          <Link href="/awards" className={`underlineLink ${styles.link}`}>Awards 2026</Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
