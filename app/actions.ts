'use server';

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { db, placesTaken, UPLOAD_DIR } from '@/lib/db';
import { AWARD_CATEGORY_NAMES, NOMINATION_DEADLINE, RELATION_OPTIONS, WHY_MAX, WHY_MIN } from '@/lib/content/awards';
import { getEvent } from '@/lib/content/events';
import { LETTER_KEYS, type LetterKey } from '@/lib/content/newsletters';
import { EMIRATE_OPTIONS } from '@/lib/content/site';

export type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JOIN_FIELDS = ['Business', 'Culture', 'Health', 'Lifestyle', 'Technology', 'Community', 'Other'];

function clean(v: unknown, max = 500): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function validEmail(email: string) {
  return email.length <= 254 && EMAIL_RE.test(email);
}

/* ------------------------------------------------------------------ newsletter */

export async function subscribe(input: { email: string; letters?: string[]; source?: string }): Promise<ActionResult> {
  const email = clean(input.email, 254).toLowerCase();
  if (!validEmail(email)) return { ok: false, error: 'Please enter a valid email address.' };
  const letters = (input.letters?.length ? input.letters : ['monthly']).filter((l): l is LetterKey => LETTER_KEYS.includes(l as LetterKey));
  if (!letters.length) return { ok: false, error: 'Choose at least one newsletter.' };
  const source = clean(input.source, 60) || 'site';

  const conn = db();
  const existing = conn.prepare('SELECT letters FROM subscribers WHERE email = ?').get(email) as { letters: string } | undefined;
  if (existing) {
    const merged = Array.from(new Set([...existing.letters.split(','), ...letters])).join(',');
    conn.prepare("UPDATE subscribers SET letters = ?, updated_at = datetime('now') WHERE email = ?").run(merged, email);
  } else {
    conn.prepare('INSERT INTO subscribers (email, letters, source) VALUES (?, ?, ?)').run(email, letters.join(','), source);
  }
  return { ok: true };
}

/* ------------------------------------------------------------- join the archive */

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES: Record<string, string> = { 'image/jpeg': '.jpg', 'image/png': '.png' };

export async function applyToArchive(form: FormData): Promise<ActionResult> {
  const mode = form.get('mode') === 'someone-else' ? 'someone-else' : 'myself';
  const name = clean(form.get('name'), 120);
  const email = clean(form.get('email'), 254).toLowerCase();
  const emirate = clean(form.get('emirate'), 40) || 'Abu Dhabi';
  const field = clean(form.get('field'), 40) || 'Other';
  const story = clean(form.get('story'), 3000);
  const links = clean(form.get('links'), 1000);
  const consent = form.get('consent') === 'on' || form.get('consent') === 'true';
  const source = clean(form.get('source'), 40) || 'join';

  if (!name) return { ok: false, error: 'Please enter a full name.' };
  if (!validEmail(email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (!EMIRATE_OPTIONS.includes(emirate)) return { ok: false, error: 'Please choose an emirate.' };
  if (!JOIN_FIELDS.includes(field)) return { ok: false, error: 'Please choose a field.' };
  // The short homepage form only collects name and email.
  if (source === 'join') {
    if (!story) return { ok: false, error: 'Please tell us the story in a few sentences.' };
    if (!consent) return { ok: false, error: 'Please agree to be contacted by the editorial team.' };
  }

  let photo: string | null = null;
  const file = form.get('photo');
  if (file instanceof File && file.size > 0) {
    const ext = PHOTO_TYPES[file.type];
    if (!ext) return { ok: false, error: 'The photograph must be a JPG or PNG.' };
    if (file.size > MAX_PHOTO_BYTES) return { ok: false, error: 'The photograph must be smaller than 5 MB.' };
    photo = crypto.randomUUID() + ext;
    await fs.writeFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, photo), Buffer.from(await file.arrayBuffer()));
  }

  db().prepare('INSERT INTO applications (mode, name, email, emirate, field, story, links, photo, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(mode, name, email, emirate, field, story, links || null, photo, source);
  return { ok: true };
}

/* ------------------------------------------------------------------ nominations */

export type NominationInput = {
  nomName: string; nomEmirate: string; nomRole: string; nomLink?: string; self?: boolean;
  category: string; why: string; achievement?: string; evidence?: string;
  yourName: string; yourEmail: string; yourPhone?: string; relation: string; consent: boolean;
};

export async function submitNomination(input: NominationInput): Promise<ActionResult<{ ref: string }>> {
  if (Date.now() > new Date(NOMINATION_DEADLINE).getTime()) return { ok: false, error: 'Nominations for Awards 2026 have closed.' };

  const f = {
    nomName: clean(input.nomName, 120), nomEmirate: clean(input.nomEmirate, 40), nomRole: clean(input.nomRole, 160),
    nomLink: clean(input.nomLink, 500), category: clean(input.category, 60), why: clean(input.why, WHY_MAX),
    achievement: clean(input.achievement, 500), evidence: clean(input.evidence, 500),
    yourName: clean(input.yourName, 120), yourEmail: clean(input.yourEmail, 254).toLowerCase(),
    yourPhone: clean(input.yourPhone, 40), relation: clean(input.relation, 40),
  };
  if (!f.nomName || !f.nomRole) return { ok: false, error: 'Nominee name and role are required.' };
  if (!EMIRATE_OPTIONS.includes(f.nomEmirate)) return { ok: false, error: 'Please choose the nominee’s emirate.' };
  if (!AWARD_CATEGORY_NAMES.includes(f.category)) return { ok: false, error: 'Please choose a category.' };
  if (f.why.length < WHY_MIN) return { ok: false, error: `Please write at least ${WHY_MIN} characters about why they deserve this award.` };
  if (!f.yourName || !validEmail(f.yourEmail)) return { ok: false, error: 'Your name and a valid email are required.' };
  if (!RELATION_OPTIONS.includes(f.relation)) return { ok: false, error: 'Please choose your relationship to the nominee.' };
  if (!input.consent) return { ok: false, error: 'Please confirm the information is accurate.' };

  const conn = db();
  const count = conn.prepare('SELECT COUNT(*) AS n FROM nominations WHERE nominator_email = ?').get(f.yourEmail) as { n: number };
  if (Number(count.n) >= 3) return { ok: false, error: 'Each person can submit up to three nominations.' };

  const ref = 'AE26-' + crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase();
  conn.prepare(`INSERT INTO nominations (ref, nominee_name, nominee_emirate, nominee_role, nominee_link, self_nomination, category, why, achievement, evidence, nominator_name, nominator_email, nominator_phone, relation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(ref, f.nomName, f.nomEmirate, f.nomRole, f.nomLink || null, input.self ? 1 : 0, f.category, f.why, f.achievement || null, f.evidence || null, f.yourName, f.yourEmail, f.yourPhone || null, f.relation);
  return { ok: true, ref };
}

/* ------------------------------------------------------------------------ RSVPs */

export async function rsvp(input: { eventSlug: string; name: string; email: string; guests: number }): Promise<ActionResult<{ placesLeft: number }>> {
  const event = getEvent(clean(input.eventSlug, 80));
  if (!event) return { ok: false, error: 'This event could not be found.' };
  const name = clean(input.name, 120);
  const email = clean(input.email, 254).toLowerCase();
  const guests = input.guests === 2 ? 2 : 1;
  if (!name) return { ok: false, error: 'Please enter your name.' };
  if (!validEmail(email)) return { ok: false, error: 'Please enter a valid email address.' };

  const conn = db();
  if (conn.prepare('SELECT 1 FROM rsvps WHERE event_slug = ? AND email = ?').get(event.slug, email)) {
    return { ok: false, error: 'You are already on the list for this event.' };
  }
  // Invitation-only events (capacity 0) take requests without a limit.
  if (event.capacity > 0 && placesTaken(event.slug) + guests > event.capacity) {
    return { ok: false, error: 'Sorry, there are not enough places left.' };
  }
  conn.prepare('INSERT INTO rsvps (event_slug, name, email, guests) VALUES (?, ?, ?, ?)').run(event.slug, name, email, guests);
  return { ok: true, placesLeft: event.capacity > 0 ? event.capacity - placesTaken(event.slug) : 0 };
}
