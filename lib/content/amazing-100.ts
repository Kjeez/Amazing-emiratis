import { PEOPLE, type Person } from './people';

/** Name used for alphabetical order, ignoring honorifics ("Sheikh", "Dr."). */
function sortName(p: Person): string {
  return p.name.replace(/^(Sheikh|Sheikha|Dr\.|Prof\.)\s+/i, '');
}

/**
 * The Amazing 100: the archive's signature list. Names are listed alphabetically — it is a
 * recognition, not a ranking — and the list fills up as profiles are published.
 */
export function amazing100(): Person[] {
  return [...PEOPLE].sort((a, b) => sortName(a).localeCompare(sortName(b)));
}

export const AMAZING_100 = { year: 2026, size: 100 };
