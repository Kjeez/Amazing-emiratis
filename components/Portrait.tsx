import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Photo } from '@/lib/content/photos';

const HONORIFICS = /^(sheikh|sheikha|dr\.?|prof\.?|h\.?h\.?)$/i;

/** "Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum" → "HM"; "Dr. Noura Al Ketbi" → "NK". */
export function initials(name: string): string {
  const words = name.split(/\s+/).filter((w) => !HONORIFICS.test(w) && !/^(bin|bint|al)$/i.test(w));
  if (!words.length) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/**
 * Portrait for a person. With a photo it shows the photograph; until one is supplied it shows a
 * designed card: initials in gold over a geometric pattern tinted by the person's field, with
 * their Arabic name when known. Keeps the .ph class so reveals and hover zoom still apply.
 */
export default function Portrait({ name, nameAr, field, ratio = '3/4', photo, className, style, sizes = '(max-width: 768px) 50vw, 25vw', size = 'md' }: {
  name: string;
  nameAr?: string;
  /** Field/category, e.g. "Business"; sets the card's colour. */
  field?: string;
  ratio?: string;
  photo?: Photo;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  /** Text scale for very small or very large cards. */
  size?: 'sm' | 'md' | 'lg';
}) {
  if (photo) {
    return (
      <span className={['ph', 'hasPhoto', className].filter(Boolean).join(' ')} style={{ aspectRatio: ratio, ...style }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="phImg" />
      </span>
    );
  }
  return (
    <span
      className={['ph', 'portraitCard', className].filter(Boolean).join(' ')}
      data-field={field?.toLowerCase()}
      data-size={size}
      style={{ aspectRatio: ratio, ...style }}
      aria-hidden="true"
    >
      <span className="portraitInitials">{initials(name)}</span>
      {nameAr && size !== 'sm' && <span className="portraitAr" lang="ar" dir="rtl">{nameAr}</span>}
      {field && size !== 'sm' && <span className="portraitField">{field}</span>}
    </span>
  );
}
