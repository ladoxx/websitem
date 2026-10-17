import { NextResponse } from 'next/server';
import { getAdminSetupState, isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  const isAuthenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated: isAuthenticated, ...getAdminSetupState() }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
