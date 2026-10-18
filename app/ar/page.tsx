import type { Metadata } from 'next';
import { Amiri, IBM_Plex_Sans_Arabic } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { getCategory } from '@/lib/content/categories';
import { EMIRATES } from '@/lib/content/emirates';
import { getPerson, SPOTLIGHT, SPOTLIGHT_LEAD, type Person } from '@/lib/content/people';
import { COVER_STORY_SLUG, getStory, type Story } from '@/lib/content/stories';
import { storyPhoto } from '@/lib/content/photos';
import HijriDate from './HijriDate';
import styles from './page.module.css';

const amiri = Amiri({ subsets: ['arabic', 'latin'], weight: ['400', '700'], variable: '--font-amiri', display: 'swap' });
const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600'], variable: '--font-plex-arabic', display: 'swap' });

export const metadata: Metadata = {
  title: { absolute: 'إماراتيون مُلهِمون — أرشيف الإماراتيين الذين يبنون الوطن' },
  description: 'أرشيف ومجلة تحريرية توثّق حياة وأعمال الإماراتيين الذين يبنون دولة الإمارات.',
  alternates: { canonical: '/ar', languages: { en: '/', ar: '/ar' } },
  openGraph: { locale: 'ar_AE' },
};

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const arDigits = (v: string | number) => String(v).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);

const NAV: { label: string; href: string }[] = [
  { label: 'أعمال', href: '/category/business' },
  { label: 'ثقافة', href: '/category/culture' },
  { label: 'صحة', href: '/category/health' },
  { label: 'أسلوب حياة', href: '/category/lifestyle' },
  { label: 'تقنية', href: '/category/tech' },
  { label: 'فعاليات', href: '/events' },
  { label: 'جوائز', href: '/awards' },
];

// Arabic headlines for the latest strip (copy from the design); the stories themselves come from lib/content.
const LATEST_AR: [slug: string, title: string][] = [
  ['calligrapher-restoring-sharjah-manuscripts', 'الخطّاط الذي يرمّم مخطوطات الشارقة المنسية'],
  ['arabic-first-language-model', 'بناء نموذج لغوي عربي أولاً من أبوظبي'],
  ['surgeons-fight-against-diabetes', 'جرّاحة في مواجهة السكري منذ عقدين'],
  ['falconry-reimagined', 'الصقارة بروح جيل جديد'],
];

const catAr = (key: string) => getCategory(key.toLowerCase())?.ar ?? (key.toLowerCase() === 'community' ? 'مجتمع' : key);

type ArPerson = Person & { nameAr: string; roleAr: string };

export default function ArabicHome() {
  const cover = getStory(COVER_STORY_SLUG);
  const coverPhoto = storyPhoto(COVER_STORY_SLUG);
  const latest = LATEST_AR.flatMap(([slug, title]): { story: Story; title: string }[] => {
    const story = getStory(slug);
    return story ? [{ story, title }] : [];
  });
  const spotlight = [SPOTLIGHT_LEAD, ...SPOTLIGHT]
    .map(getPerson)
    .filter((p): p is ArPerson => Boolean(p?.nameAr && p.roleAr))
    .slice(0, 4);

  return (
    <div dir="rtl" lang="ar" className={`${amiri.variable} ${plex.variable} ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/ar" className={styles.logo}>إماراتيون <span className={styles.goldText}>مُلهِمون</span></Link>
          <nav className={styles.nav} aria-label="الأقسام">
            {NAV.map((n) => <Link key={n.href} href={n.href} className={styles.navLink}>{n.label}</Link>)}
          </nav>
          <div className={styles.tools}>
            <HijriDate className={styles.hijri} />
            <Link href="/" lang="en" hrefLang="en" className={styles.en}>EN</Link>
            <Link href="/nominate" className={styles.nominate}>رشّح</Link>
          </div>
        </div>
      </header>

      <section className={styles.cover} aria-labelledby="ar-cover-title">
        {coverPhoto && <Image src={coverPhoto.src} alt="" fill priority sizes="100vw" className={styles.coverImg} />}
        <span className={styles.coverShade} aria-hidden="true" />
        <div className={styles.coverInner}>
          <span className={styles.coverEyebrow}>قصة الغلاف — أزياء</span>
          <h1 id="ar-cover-title" className={styles.coverTitle}>
            <Link href={`/stories/${COVER_STORY_SLUG}`}>الأزياء الراقية الجديدة في الصحراء</Link>
          </h1>
          <div className={styles.coverFoot}>
            <p className={styles.coverDek}>ثلاث مصممات إماراتيات يتحدثن عن الأقمشة التراثية والتفصيل الحديث ووصول العباءة إلى منصات باريس وميلانو.</p>
            <span className={styles.coverByline}>بقلم ليلى الهاشمي · {arDigits(cover?.readMins ?? 12)} دقيقة قراءة</span>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.latest} aria-label="أحدث القصص">
          {latest.map(({ story, title }) => (
            <Link key={story.slug} href={`/stories/${story.slug}`} className={styles.latestItem}>
              <span className={styles.latestCat}>{catAr(story.category)}</span>
              <span className={styles.latestTitle}>{title}</span>
            </Link>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="ar-spotlight-title">
          <div className={styles.sectionHead}>
            <h2 id="ar-spotlight-title" className={styles.h2}>في <span className={styles.goldText}>دائرة الضوء</span></h2>
            <Link href="/profiles" className={styles.underline}>جميع الملفات الشخصية</Link>
          </div>
          <div className={styles.spotGrid}>
            {spotlight.map((p) => (
              <Link key={p.slug} href={`/profiles/${p.slug}`} className={styles.card}>
                <span role="img" aria-label="صورة شخصية" className={styles.portrait} dir="ltr">PORTRAIT 3:4</span>
                <span className={styles.cardCat}>{catAr(p.category)}</span>
                <span className={styles.cardName}>{p.nameAr}</span>
                <span className={styles.cardRole}>{p.roleAr}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ar-emirates-title">
          <h2 id="ar-emirates-title" className={`${styles.h2} ${styles.h2Block}`}>الإمارات <span className={styles.goldText}>السبع</span></h2>
          <div className={styles.emirates}>
            {EMIRATES.map((e, i) => (
              <Link key={e.slug} href={`/emirates/${e.slug}`} className={styles.emirate}>
                <span className={styles.emirateN}>{arDigits(String(i + 1).padStart(2, '0'))}</span>
                <span className={styles.emirateName}>{e.ar}</span>
                <span className={styles.emirateEn} lang="en">{e.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.awards} aria-labelledby="ar-awards-title">
          <div className={styles.awardsMain}>
            <span className={styles.awardsEyebrow}>باب الترشيح مفتوح</span>
            <h2 id="ar-awards-title" className={styles.awardsTitle}>جوائز <span className={styles.goldLight}>٢٠٢٦</span></h2>
            <p className={styles.awardsText}>أربع عشرة فئة، والإمارات السبع جميعها. أخبرنا من يصنع مستقبل الوطن.</p>
          </div>
          <Link href="/nominate" className={styles.awardsBtn}>قدّم ترشيحاً</Link>
        </section>

        <section className={styles.quote}>
          <blockquote className={styles.blockquote}>«تحية إلى أصحاب الرؤى الذين يبنون مستقبلنا باستمرار.»</blockquote>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <nav className={styles.footerNav} aria-label="روابط التذييل">
            {NAV.map((n) => <Link key={n.href} href={n.href} className={styles.footerLink}>{n.label}</Link>)}
          </nav>
          <div className={styles.wordmark} aria-hidden="true">إماراتيون مُلهِمون</div>
          <div className={styles.bottom}>
            <span>© ٢٠٢٦ إماراتيون مُلهِمون</span>
            <div className={styles.legal}>
              <Link href="/legal/privacy" className={styles.legalLink}>الخصوصية</Link>
              <Link href="/legal/terms" className={styles.legalLink}>الشروط</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
