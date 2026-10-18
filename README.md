# Amazing Emiratis — website

Next.js 16 (App Router) build of the Amazing Emiratis design pages in the parent folder.

## Run it

```bash
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD and ADMIN_SECRET
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`. Requires Node 22.13 or newer (uses the built-in `node:sqlite`).

## Where things live

| Path | What |
|---|---|
| `lib/content/*.ts` | All site content (stories, people, emirates, events, awards, newsletters, legal). Edit here to change copy. |
| `lib/content/story-bodies.ts` | Full text of stories that have a body. Stories without one show an "in preparation" note. |
| `app/(site)/…` | Public pages. The shared side menu, masthead and footer are in `app/(site)/layout.tsx`. |
| `app/ar` | Arabic homepage (right-to-left). |
| `app/actions.ts` | Server actions behind every form, with server-side validation. |
| `lib/db.ts` | SQLite database (`data/amazing-emiratis.db`) and uploaded portraits (`data/uploads/`). |
| `app/admin` | Password-protected desk listing nominations, applications, RSVPs and subscribers, with CSV export. |

## Forms

| Form | Page | Stored in |
|---|---|---|
| Newsletter (footer, category pages, /newsletter) | many | `subscribers` |
| Join the Archive (homepage, /join, with optional portrait) | `/join` | `applications` |
| Awards nomination (5 steps, max 3 per nominator) | `/nominate` | `nominations` |
| Event RSVP (live places left) | `/events/[slug]` | `rsvps` |

No emails are sent yet. Confirmation emails can be added in `app/actions.ts` once an email provider is chosen.

## Hosting notes

The database is a file, so host on a server with a persistent disk (a VPS, Railway, Render, Fly.io with a volume, etc.) and point `DATA_DIR` at that disk. Serverless hosts with read-only file systems (e.g. Vercel) would need the storage swapped for a hosted database.

## Photography

79 photographs from Unsplash (free Unsplash License) illustrate stories, emirates, places and events. They live in `public/images/<slot>.jpg`, are listed with alt text and photographer in `lib/content/photos.json`, and are credited on `/credits`. To swap one, change its entry in `photos.json`, delete the old file and run `node scripts/fetch-photos.mjs`.

Rules followed: no recognisable faces, and captions describe what a photo actually shows (never presenting a stock image as one of the people in a story). Portraits of profiled people remain styled placeholders until real commissioned portraits replace them; pass a `photo` to `<Placeholder>` to use one.
