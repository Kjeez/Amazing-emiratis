import 'server-only';
import { db } from './db';
import { getEvent } from './content/events';

export type AdminTable = 'nominations' | 'applications' | 'rsvps' | 'subscribers';

export const ADMIN_TABLES: { key: AdminTable; label: string }[] = [
  { key: 'nominations', label: 'Nominations' },
  { key: 'applications', label: 'Applications' },
  { key: 'rsvps', label: 'RSVPs' },
  { key: 'subscribers', label: 'Subscribers' },
];

/** Columns shown in the admin table and CSV export: [column, heading]. */
export const COLUMNS: Record<AdminTable, [string, string][]> = {
  nominations: [['created_at', 'Received'], ['ref', 'Ref'], ['category', 'Category'], ['nominee_name', 'Nominee'], ['nominee_role', 'Role'], ['nominee_emirate', 'Emirate'], ['nominee_link', 'Link'], ['self_nomination', 'Self'], ['why', 'Why'], ['achievement', 'Achievement'], ['evidence', 'Supporting link'], ['nominator_name', 'Nominated by'], ['nominator_email', 'Email'], ['nominator_phone', 'Phone'], ['relation', 'Relationship']],
  applications: [['created_at', 'Received'], ['mode', 'For'], ['name', 'Name'], ['email', 'Email'], ['emirate', 'Emirate'], ['field', 'Field'], ['story', 'Story'], ['links', 'Links'], ['photo', 'Photo'], ['source', 'Form']],
  rsvps: [['created_at', 'Received'], ['event_title', 'Event'], ['name', 'Name'], ['email', 'Email'], ['guests', 'Places']],
  subscribers: [['created_at', 'Joined'], ['email', 'Email'], ['letters', 'Letters'], ['source', 'Form'], ['updated_at', 'Updated']],
};

export function isAdminTable(t: string): t is AdminTable {
  return ADMIN_TABLES.some((x) => x.key === t);
}

export function countAll(): Record<AdminTable, number> {
  const conn = db();
  const out = {} as Record<AdminTable, number>;
  for (const { key } of ADMIN_TABLES) {
    out[key] = Number((conn.prepare(`SELECT COUNT(*) AS n FROM ${key}`).get() as { n: number }).n);
  }
  return out;
}

export function rows(table: AdminTable): Record<string, unknown>[] {
  const list = db().prepare(`SELECT * FROM ${table} ORDER BY id DESC`).all() as Record<string, unknown>[];
  if (table === 'rsvps') {
    return list.map((r) => ({ ...r, event_title: getEvent(String(r.event_slug))?.title ?? r.event_slug }));
  }
  return list;
}

export function toCsv(table: AdminTable): string {
  const cols = COLUMNS[table];
  const esc = (v: unknown) => {
    let s = v == null ? '' : String(v);
    // Neutralise spreadsheet formulas in user-supplied text.
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [cols.map((c) => esc(c[1])).join(',')];
  for (const r of rows(table)) lines.push(cols.map(([k]) => esc(r[k])).join(','));
  return '﻿' + lines.join('\r\n');
}
