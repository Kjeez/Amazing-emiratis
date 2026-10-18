import type { Metadata } from 'next';
import Image from 'next/image';
import { allPhotos } from '@/lib/content/photos';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'The photographers whose work illustrates Amazing Emiratis.',
};

export default function CreditsPage() {
  const photos = allPhotos();
  return (
    <main className={`container ${styles.page}`}>
      <header className={styles.header}>
        <span className="eyebrow">PHOTOGRAPHY</span>
        <h1 className={styles.title}>Photo <em className="gold">credits</em></h1>
        <p className={styles.intro}>
          Photographs on this site are by the photographers below, used under the{' '}
          <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">Unsplash License</a>.
          They illustrate places and subjects; they are not pictures of the people named in our stories.
          Portraits of profiled Emiratis will be our own commissioned photography.
        </p>
      </header>
      <ul className={styles.grid}>
        {photos.map((p) => (
          <li key={p.slot} className={styles.item}>
            <span className={styles.thumb}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 600px) 50vw, 200px" className={styles.img} />
            </span>
            <span className={styles.alt}>{p.alt}</span>
            <a href={p.creditHref} target="_blank" rel="noopener noreferrer" className={styles.credit}>@{p.credit}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
