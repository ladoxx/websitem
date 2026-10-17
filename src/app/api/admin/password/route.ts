import { NextResponse } from 'next/server';
import { isAdminAuthenticated, verifyAdminPassword, updateAdminPassword, setAdminSessionCookie } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen giriş yapın.' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (typeof newPassword !== 'string' || newPassword.length < 6 || newPassword.length > 128) {
      return NextResponse.json(
        { error: 'Yeni şifre en az 6 karakter uzunluğunda olmalıdır.' },
        { status: 400 }
      );
    }

    // Verify current password if provided
    if (currentPassword && !verifyAdminPassword(currentPassword)) {
      return NextResponse.json(
        { error: 'Mevcut şifreniz hatalı.' },
        { status: 400 }
      );
    }

    const success = updateAdminPassword(newPassword);
    if (!success) {
      return NextResponse.json({ error: 'Şifre kaydedilemedi.' }, { status: 500 });
    }

    // Refresh the session cookie with the new secret
    await setAdminSessionCookie();

    return NextResponse.json({ success: true, message: 'Yönetici şifreniz başarıyla güncellendi.' });
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json({ error: 'Şifre güncellenirken bir hata oluştu.' }, { status: 500 });
  }
}
