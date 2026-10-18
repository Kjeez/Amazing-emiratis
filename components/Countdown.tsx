'use client';

import { useEffect, useState } from 'react';
import { NOMINATION_DEADLINE } from '@/lib/content/awards';

const pad = (n: number) => String(n).padStart(2, '0');

function parts(now: number) {
  const diff = Math.max(0, new Date(NOMINATION_DEADLINE).getTime() - now);
  return [
    { v: pad(Math.floor(diff / 864e5)), l: 'DAYS' },
    { v: pad(Math.floor(diff / 36e5) % 24), l: 'HOURS' },
    { v: pad(Math.floor(diff / 6e4) % 60), l: 'MINUTES' },
  ];
}

/**
 * Days / hours / minutes until nominations close. Renders "--" on the server and fills in after
 * hydration so the markup never mismatches. Style each unit via the class names passed in.
 */
export default function Countdown({ className, unitClassName, valueClassName, labelClassName }: {
  className?: string;
  unitClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const units = now === null ? parts(new Date(NOMINATION_DEADLINE).getTime()).map((u) => ({ ...u, v: '--' })) : parts(now);

  return (
    <div className={className} role="timer" aria-label="Time until nominations close">
      {units.map((u) => (
        <div key={u.l} className={unitClassName}>
          <span className={valueClassName}>
            {/* Keyed by value so a changed number re-mounts and plays its drop-in. */}
            <span key={u.v} className={u.v === '--' ? undefined : 'cdTick'}>{u.v}</span>
          </span>
          <span className={labelClassName}>{u.l}</span>
        </div>
      ))}
    </div>
  );
}
