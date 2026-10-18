'use client';

import Link from 'next/link';
import { useNominationsClosed } from './useNominationsClosed';

/** A link to the nomination form that turns into a "Nominations closed" note after the deadline. */
export default function NominationCta({ href = '/nominate', className, closedClassName, children }: {
  href?: string;
  className?: string;
  closedClassName?: string;
  children: React.ReactNode;
}) {
  const closed = useNominationsClosed();
  if (closed) return <span className={closedClassName} role="status">Nominations closed</span>;
  return <Link href={href} className={className}>{children}</Link>;
}
