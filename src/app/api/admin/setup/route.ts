import { NextResponse } from 'next/server';
import { setAdminSessionCookie, setInitialAdminPassword } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { setupToken, password } = await request.json();
    if (typeof password !== 'string' || password.length < 10 || password.length > 128) {
      return NextResponse.json(
        { error: 'Parola en az 10, en fazla 128 karakter olmalıdır.' },
        { status: 400 }
      );
    }
    if (typeof setupToken !== 'string') {
      return NextResponse.json({ error: 'Kurulum anahtarı geçersiz.' }, { status: 400 });
    }

    const result = setInitialAdminPassword(password, setupToken);
    if (result === 'unavailable') {
      return NextResponse.json({ error: 'Kurulum anahtarı sunucuda ayarlanmamış.' }, { status: 503 });
    }
    if (result === 'invalid-token') {
      return NextResponse.json({ error: 'Kurulum anahtarı hatalı.' }, { status: 403 });
    }
    if (result === 'configured') {
      return NextResponse.json({ error: 'Admin parolası zaten belirlenmiş.' }, { status: 409 });
    }
    if (!(await setAdminSessionCookie())) {
      return NextResponse.json({ error: 'Oturum oluşturulamadı. Lütfen giriş yapın.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Admin parolası oluşturuldu.' });
  } catch (error) {
    console.error('Admin setup failed:', error);
    return NextResponse.json({ error: 'Kurulum tamamlanamadı.' }, { status: 500 });
  }
}