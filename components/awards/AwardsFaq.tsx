'use client';

import { useId, useState } from 'react';
import styles from './AwardsFaq.module.css';

/** Single-open accordion; the first question starts open, as in the design. */
export default function AwardsFaq({ items }: { items: [q: string, a: string][] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div className={styles.list}>
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.button}
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{q}</span>
                <span className={styles.sign} data-open={isOpen} aria-hidden="true" />
              </button>
            </h3>
            {/* Grid rows animate from 0fr to 1fr, so the answer opens to its natural height. */}
            <div id={`${id}-${i}`} className={styles.panel} data-open={isOpen} inert={!isOpen}>
              <div className={styles.panelInner}>
                <p className={styles.answer}>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
