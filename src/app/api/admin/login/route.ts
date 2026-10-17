import { NextResponse } from 'next/server';
import { setAdminSessionCookie, verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (typeof password !== 'string' || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Geçersiz şifre! Lütfen tekrar deneyin.' },
        { status: 401 }
      );
    }

    if (!(await setAdminSessionCookie())) {
      return NextResponse.json({ error: 'Admin oturumu oluşturulamadı.' }, { status: 503 });
    }

    return NextResponse.json({ success: true, message: 'Giriş başarılı.' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
