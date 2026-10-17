import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { getDb, getSetting } from '@/lib/db';

const ADMIN_SESSION_COOKIE = 'fmkal_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const ADMIN_PASSWORD_HASH_KEY = 'admin_password_hash';
const PASSWORD_HASH_BYTES = 64;

function safeEqual(leftValue: string, rightValue: string): boolean {
  const left = Buffer.from(leftValue);
  const right = Buffer.from(rightValue);
  return left.length === right.length && timingSafeEqual(left, right);
}

function getStoredPasswordHash(): string {
  return getSetting(ADMIN_PASSWORD_HASH_KEY);
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD || getStoredPasswordHash());
}

export function getAdminSetupState() {
  const needsSetup = !isAdminPasswordConfigured();
  const setupToken = process.env.ADMIN_SETUP_TOKEN;

  return {
    needsSetup,
    setupAvailable: needsSetup && Boolean(setupToken && setupToken.length >= 32),
  };
}

export function verifyAdminPassword(password: string): boolean {
  const environmentPassword = process.env.ADMIN_PASSWORD;
  if (environmentPassword) return safeEqual(password, environmentPassword);

  const storedHash = getStoredPasswordHash();
  const [algorithm, salt, expectedHash] = storedHash.split('$');
  if (
    algorithm !== 'scrypt' ||
    !salt ||
    !/^[a-f0-9]{32}$/.test(salt) ||
    !/^[a-f0-9]{128}$/.test(expectedHash || '')
  ) {
    return false;
  }

  const actualHash = scryptSync(password, salt, PASSWORD_HASH_BYTES).toString('hex');
  return safeEqual(actualHash, expectedHash);
}

export function setInitialAdminPassword(password: string, setupToken: string): 'created' | 'configured' | 'invalid-token' | 'unavailable' {
  if (process.env.ADMIN_PASSWORD || getStoredPasswordHash()) return 'configured';

  const expectedSetupToken = process.env.ADMIN_SETUP_TOKEN;
  if (!expectedSetupToken || expectedSetupToken.length < 32) return 'unavailable';
  if (!safeEqual(setupToken, expectedSetupToken)) return 'invalid-token';

  const salt = randomBytes(16).toString('hex');
  const passwordHash = scryptSync(password, salt, PASSWORD_HASH_BYTES).toString('hex');
  const result = getDb().prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO NOTHING'
  ).run(ADMIN_PASSWORD_HASH_KEY, `scrypt$${salt}$${passwordHash}`);

  return result.changes === 1 ? 'created' : 'configured';
}

export function createAdminSessionToken(): string | null {
  const sessionSecret = process.env.ADMIN_PASSWORD || getStoredPasswordHash();
  if (!sessionSecret) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const signature = createHmac('sha256', sessionSecret).update(String(expiresAt)).digest('hex');
  return `${expiresAt}.${signature}`;
}

export async function setAdminSessionCookie(): Promise<boolean> {
  const sessionToken = createAdminSessionToken();
  if (!sessionToken) return false;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return true;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const sessionSecret = process.env.ADMIN_PASSWORD || getStoredPasswordHash();
  if (!sessionSecret) return false;

  const actual = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const [expiresAt, signature] = actual?.split('.') || [];
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  if (!/^[a-f0-9]{64}$/.test(signature)) return false;

  const expected = createHmac('sha256', sessionSecret).update(expiresAt).digest('hex');

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export { ADMIN_SESSION_COOKIE };