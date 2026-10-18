import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { Suspense } from 'react';
import RouteProgress from '@/components/motion/RouteProgress';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-playfair', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: { default: 'Amazing Emiratis', template: '%s · Amazing Emiratis' },
  description: 'A curated archive and editorial magazine recording the lives and work of the people building the UAE.',
  openGraph: { siteName: 'Amazing Emiratis', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#F8F6F1' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior lets Next.js jump (not glide) to the top on page changes while keeping smooth in-page scrolling.
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
