import Image from 'next/image';
import Link from 'next/link';
import { ISSUES } from '@/lib/content/newsletters';
import { storyPhoto } from '@/lib/content/photos';
import { findStory, getStory, type Story } from '@/lib/content/stories';
import styles from './IssueCover.module.css';

/** Stories in the latest issue of The Monthly, cover story first. */
const IN_THIS_ISSUE = ['poet-recording-nabati-verse', 'mission-control-lunar-rover', 'calligrapher-restoring-sharjah-manuscripts'];

/** Homepage "latest issue" block: a magazine cover with cover lines, and what's inside. */
export default function IssueCover() {
  const [no, title, month] = ISSUES[0];
  const cover = findStory(title);
  if (!cover) return null;
  const inside = IN_THIS_ISSUE.map(getStory).filter((s): s is Story => Boolean(s));
  const photo = storyPhoto(cover.slug);

  return (
    <section className={styles.issue} aria-labelledby="issue-title">
      <Link href={`/stories/${cover.slug}`} className={styles.cover} aria-label={`The Monthly No. ${no}, ${month}: ${cover.title}`}>
        {photo && <Image src={photo.src} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" className={styles.coverImg} />}
        <span className={styles.coverShade} aria-hidden="true" />
        <span className={styles.top} aria-hidden="true">
          <span className={styles.masthead}>Amazing <em>Emiratis</em></span>
          <span className={styles.issueNo}>NO. {no} · {month.toUpperCase()}</span>
        </span>
        <span className={styles.coverLines} aria-hidden="true">
          <span className={styles.bar}>{cover.title}</span>
          <span className={styles.lineSmall}>Also: {inside.map((s) => s.sub).join(' · ')}</span>
        </span>
      </Link>

      <div className={styles.inside}>
        <span className="eyebrow">THE MONTHLY · LATEST ISSUE</span>
        <h2 id="issue-title" className={styles.title}>In this <em>issue</em></h2>
        <ol className={styles.list}>
          {[cover, ...inside].map((s, i) => (
            <li key={s.slug}>
              <Link href={`/stories/${s.slug}`} className={styles.item}>
                <span className={styles.n}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.itemText}>
                  <span className={styles.itemCat}>{i === 0 ? 'COVER STORY' : s.sub.toUpperCase()}</span>
                  <span className={styles.itemTitle}>{s.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/newsletter" className="btn btnDark">Get The Monthly →</Link>
      </div>
    </section>
  );
}
