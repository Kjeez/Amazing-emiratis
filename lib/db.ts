import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export const DATA_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR || path.join(process.cwd(), 'data'));
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  letters TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mode TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  emirate TEXT NOT NULL,
  field TEXT NOT NULL,
  story TEXT NOT NULL,
  links TEXT,
  photo TEXT,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS nominations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT NOT NULL UNIQUE,
  nominee_name TEXT NOT NULL,
  nominee_emirate TEXT NOT NULL,
  nominee_role TEXT NOT NULL,
  nominee_link TEXT,
  self_nomination INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  why TEXT NOT NULL,
  achievement TEXT,
  evidence TEXT,
  nominator_name TEXT NOT NULL,
  nominator_email TEXT NOT NULL,
  nominator_phone TEXT,
  relation TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  guests INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (event_slug, email)
);
`;

const globalForDb = globalThis as unknown as { aeDb?: DatabaseSync };

export function db(): DatabaseSync {
  if (!globalForDb.aeDb) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const conn = new DatabaseSync(path.join(DATA_DIR, 'amazing-emiratis.db'));
    conn.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
    conn.exec(SCHEMA);
    globalForDb.aeDb = conn;
  }
  return globalForDb.aeDb;
}

/** Places already taken for an event (each RSVP counts the person plus guests). */
export function placesTaken(eventSlug: string): number {
  const row = db().prepare('SELECT COALESCE(SUM(guests), 0) AS n FROM rsvps WHERE event_slug = ?').get(eventSlug) as { n: number };
  return Number(row.n);
}
