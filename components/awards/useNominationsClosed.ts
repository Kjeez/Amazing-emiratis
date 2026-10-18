'use client';

import { useEffect, useState } from 'react';
import { NOMINATION_DEADLINE } from '@/lib/content/awards';

const deadline = new Date(NOMINATION_DEADLINE).getTime();

/**
 * True once the nomination deadline has passed. Starts as "open" on the server and during hydration,
 * then re-checks on the client every minute.
 */
export function useNominationsClosed(): boolean {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    const check = () => setClosed(Date.now() > deadline);
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return closed;
}
