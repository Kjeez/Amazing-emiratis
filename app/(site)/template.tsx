import MotionScope from '@/components/motion/MotionScope';

// A template (unlike a layout) re-mounts on every navigation, so each page gets its entrance.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <MotionScope>{children}</MotionScope>;
}
