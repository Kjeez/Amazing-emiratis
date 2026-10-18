import Link from 'next/link';
import { FOOTER_COLUMNS } from '@/lib/content/site';
import FooterSubscribe from './FooterSubscribe';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.lead}>
            <span className={styles.tagline}>Stories worth keeping, once a month.</span>
            <FooterSubscribe />
            <Link href="/newsletter" className={styles.more}>Choose your newsletters →</Link>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className={styles.col}>
              <span className={styles.colTitle}>{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className={styles.link} lang={l.href === '/ar' ? 'ar' : undefined}>{l.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.wordmark} aria-hidden="true">Amazing <em>Emiratis</em></div>
        <div className={styles.bottom}>
          <span>© 2026 Amazing Emiratis</span>
          <span>Abu Dhabi · Dubai · Sharjah · Ajman · Umm Al Quwain · Ras Al Khaimah · Fujairah</span>
        </div>
      </div>
    </footer>
  );
}
