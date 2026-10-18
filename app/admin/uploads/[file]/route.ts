import fs from 'node:fs/promises';
import path from 'node:path';
import { isAdmin } from '@/lib/auth';
import { UPLOAD_DIR } from '@/lib/db';

export const dynamic = 'force-dynamic';

const TYPES: Record<string, string> = { '.jpg': 'image/jpeg', '.png': 'image/png' };

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  if (!(await isAdmin())) return new Response('Not found', { status: 404 });
  const { file } = await params;
  // Uploaded names are always <uuid>.<ext>; reject anything else (including path traversal).
  if (!/^[0-9a-f-]{36}\.(jpg|png)$/.test(file)) return new Response('Not found', { status: 404 });
  try {
    const data = await fs.readFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, file));
    return new Response(new Uint8Array(data), { headers: { 'Content-Type': TYPES[path.extname(file)], 'Cache-Control': 'private, no-store' } });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
