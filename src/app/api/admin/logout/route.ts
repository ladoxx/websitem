import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isAdminAuthenticated } from '@/lib/admin-auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const isAuthenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated: isAuthenticated });
}
