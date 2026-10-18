import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
