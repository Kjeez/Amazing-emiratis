import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { megaMenu } from '@/lib/mega-menu';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <SiteHeader mega={megaMenu()} />
      {children}
      <SiteFooter />
    </div>
  );
}
