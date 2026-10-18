'use client';

import { useEffect, useState } from 'react';

/** Today's Hijri (Umm al-Qura) date in Arabic. Filled in after mount so server and client markup match. */
export default function HijriDate({ className }: { className?: string }) {
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      setText(new Intl.DateTimeFormat('ar-AE-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dubai' }).format(new Date()));
    } catch {
      setText('');
    }
  }, []);

  return <span className={className}>{text}</span>;
}
