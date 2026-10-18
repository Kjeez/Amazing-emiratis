'use server';

import { redirect } from 'next/navigation';
import { endSession, passwordMatches, startSession } from '@/lib/auth';

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const password = typeof form.get('password') === 'string' ? (form.get('password') as string) : '';
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 600));
    return 'That password is not correct.';
  }
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin');
}
