import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Photo } from '@/lib/content/photos';

/**
 * Image box. With a photo it shows the optimised picture; without one it falls back to the
 * striped stand-in with its label (portraits stay as stand-ins until real ones are commissioned).
 */
export default function Placeholder({ label, ratio, dark, className, style, photo, sizes = '(max-width: 768px) 100vw, 50vw', priority }: {
  label: string;
  /** CSS aspect-ratio, e.g. "3/4". Omit to size the box with className/style. */
  ratio?: string;
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
  photo?: Photo;
  /** Rendered width hint for responsive images. */
  sizes?: string;
  /** Load immediately (use for the first large image on a page). */
  priority?: boolean;
}) {
  const classes = ['ph', dark && 'phDark', photo && 'hasPhoto', className].filter(Boolean).join(' ');

  if (photo) {
    return (
      <span className={classes} style={{ aspectRatio: ratio, ...style }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="phImg" />
      </span>
    );
  }

  return (
    <span role="img" aria-label={label} className={classes} style={{ aspectRatio: ratio, ...style }}>
      {label}
    </span>
  );
}
