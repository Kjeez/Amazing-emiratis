import Image from 'next/image';

/**
 * The site logo, used in the masthead, side menu and admin header.
 *
 * To switch to the new logo: put the file in public/brand/ (SVG preferred) and fill in LOGO below,
 * e.g. { light: '/brand/logo.svg', dark: '/brand/logo-white.svg', width: 220, height: 40 }.
 * `dark` is the version for dark backgrounds (the side menu); it falls back to `light`.
 * Until then the wordmark is set in type.
 */
const LOGO: { light: string; dark?: string; width: number; height: number } | null = null;

export default function Logo({ onDark = false }: { onDark?: boolean }) {
  if (LOGO) {
    return (
      <Image
        src={onDark ? LOGO.dark ?? LOGO.light : LOGO.light}
        alt="Amazing Emiratis"
        width={LOGO.width}
        height={LOGO.height}
        priority
        style={{ height: '1.4em', width: 'auto', display: 'block' }}
      />
    );
  }
  return <>Amazing <em>Emiratis</em></>;
}
