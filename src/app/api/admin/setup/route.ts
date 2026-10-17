import { NextResponse } from 'next/server';
import { setAdminSessionCookie, setInitialAdminPassword } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { setupToken, password } = await request.json();
    if (typeof password !== 'string' || password.length < 6 || password.length > 128) {
      return NextResponse.json(
        { error: 'Parola en az 6, en fazla 128 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    const result = setInitialAdminPassword(password, typeof setupToken === 'string' ? setupToken : undefined);
    if (result === 'invalid-token') {
      return NextResponse.json({ error: 'Kurulum anahtarı hatalı.' }, { status: 403 });
    }
    if (result === 'configured') {
      return NextResponse.json({ error: 'Admin parolası zaten belirlenmiş.' }, { status: 409 });
    }
    if (!(await setAdminSessionCookie())) {
      return NextResponse.json({ error: 'Oturum oluşturulamadı. Lütfen giriş yapın.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Admin parolası başarıyla oluşturuldu.' });
  } catch (error) {
    console.error('Admin setup failed:', error);
    return NextResponse.json({ error: 'Kurulum tamamlanamadı.' }, { status: 500 });
  }
}