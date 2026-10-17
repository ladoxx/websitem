import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin parolası yapılandırılmamış.' }, { status: 503 });
    }

    const { password } = await request.json();

    if (password === adminPassword) {
      const sessionToken = createAdminSessionToken();
      if (!sessionToken) {
        return NextResponse.json({ error: 'Admin oturumu oluşturulamadı.' }, { status: 503 });
      }

      const cookieStore = await cookies();
      cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true, message: 'Giriş başarılı.' });
    }

    return NextResponse.json(
      { error: 'Geçersiz şifre! Lütfen tekrar deneyin.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
