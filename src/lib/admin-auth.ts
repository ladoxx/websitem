import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'fmkal_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function createAdminSessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const signature = createHmac('sha256', password).update(String(expiresAt)).digest('hex');
  return `${expiresAt}.${signature}`;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const actual = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const [expiresAt, signature] = actual?.split('.') || [];
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  if (!/^[a-f0-9]{64}$/.test(signature)) return false;

  const expected = createHmac('sha256', password).update(expiresAt).digest('hex');

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export { ADMIN_SESSION_COOKIE };