import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'ae_admin';
const MAX_AGE_S = 60 * 60 * 12;

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);
}

function sign(value: string): string {
  return crypto.createHmac('sha256', process.env.ADMIN_SECRET!).update(value).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function passwordMatches(input: string): boolean {
  return adminConfigured() && safeEqual(input, process.env.ADMIN_PASSWORD!);
}

export async function startSession() {
  const expires = String(Date.now() + MAX_AGE_S * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: MAX_AGE_S,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: '/admin' });
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [expires, sig] = raw.split('.');
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, sign(expires));
}
