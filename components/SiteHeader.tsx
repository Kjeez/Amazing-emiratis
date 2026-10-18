'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ARCHIVE_LINKS, NAV, SOCIALS } from '@/lib/content/site';
import styles from './SiteHeader.module.css';

function hijriToday() {
  try {
    return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dubai' }).format(new Date());
  } catch {
    return '';
  }
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [hijri, setHijri] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => setHijri(hijriToday()), []);
  useEffect(() => {
    setOpen(false);
    setTucked(false);
  }, [pathname]);

  // Publish the masthead height so sticky sidebars and the reading bar can sit just below it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--mast-h', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Shadow once the page moves; tuck the masthead away while reading down, bring it back on the way up.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      setScrolled(y > 8);
      if (y < 240) setTucked(false);
      else if (dy > 6) setTucked(true);
      else if (dy < -6) setTucked(false);
      if (Math.abs(dy) > 6) lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const hidden = tucked && !open;
  useEffect(() => {
    document.documentElement.toggleAttribute('data-mast-hidden', hidden);
  }, [hidden]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <div className={styles.menuRoot} data-open={open} aria-hidden={!open}>
        <div className={styles.scrim} onClick={() => setOpen(false)} />
        <aside className={styles.menu} aria-label="Site menu" inert={!open}>
          <div className={styles.menuTop}>
            <span className={styles.menuLogo}>Amazing <em>Emiratis</em></span>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <nav className={styles.menuNav}>
            {NAV.map((n, i) => (
              <Link key={n.href} href={n.href} className={styles.menuItem} style={{ '--i': i } as CSSProperties} aria-current={isActive(n.href) ? 'page' : undefined}>
                <span className={styles.menuNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.menuLabel}>{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className={styles.menuArchive}>
            <span className={styles.menuEyebrow}>THE ARCHIVE</span>
            {ARCHIVE_LINKS.map((l, i) => (
              <Link key={l.href} href={l.href} className={styles.menuLink} style={{ '--i': NAV.length + i } as CSSProperties} lang={l.href === '/ar' ? 'ar' : undefined}>{l.label}</Link>
            ))}
          </div>
          <div className={styles.menuBottom}>
            {!isHome && <Link href="/" className={styles.menuLink}>← Back to homepage</Link>}
            <Link href="/nominate" className="btn btnGold">Nominate for Awards 2026</Link>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.menuSocial}>{s.label}</a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <header
        ref={headerRef}
        className={styles.masthead}
        data-scrolled={scrolled}
        data-hidden={hidden}
        onFocusCapture={() => setTucked(false)}
      >
        <div className={styles.mastInner}>
          <div className={styles.brandRow}>
            <button className={styles.burger} onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <span /><span /><span />
            </button>
            <Link href="/" className={styles.logo}>Amazing <em>Emiratis</em></Link>
          </div>
          <nav className={styles.nav} aria-label="Sections">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={styles.navLink} aria-current={isActive(n.href) ? 'page' : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className={styles.tools}>
            {isHome && (
              <>
                <span className={styles.hijri} suppressHydrationWarning>{hijri}</span>
                <span className={styles.lang}>
                  <span className={styles.langOn}>EN</span>
                  <span>/</span>
                  <Link href="/ar" lang="ar" className={styles.langOff}>عربي</Link>
                </span>
              </>
            )}
            <Link href="/search" aria-label="Search" className={styles.search}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </Link>
            <Link href="/nominate" className={styles.nominate}>Nominate</Link>
          </div>
        </div>
      </header>
    </>
  );
}
