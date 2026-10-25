import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { sendTestEmail } from '@/lib/email';

export async function POST(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }

  try {
    let customTo: string | undefined = undefined;
    try {
      const body = await request.json();
      if (body && body.to && typeof body.to === 'string' && body.to.includes('@')) {
        customTo = body.to.trim();
      }
    } catch {
      // Body may be empty, uses default target
    }

    const result = await sendTestEmail(customTo);
    return NextResponse.json({
      success: true,
      message: `Test e-postası başarıyla gönderildi! (${result.to})`,
    });
  } catch (error: any) {
    console.error('[SMTP Test Error]:', error);
    let friendlyError = error?.message || 'SMTP test e-postası gönderilemedi.';
    if (friendlyError.includes('EAUTH') || friendlyError.includes('Invalid login')) {
      friendlyError = 'Kimlik doğrulama hatası (EAUTH): Kullanıcı adı veya şifre hatalı. (Gmail kullanıyorsanız 2 adımlı doğrulama açıkken aldığınız 16 haneli Uygulama Şifresini girmelisiniz).';
    } else if (friendlyError.includes('ETIMEDOUT') || friendlyError.includes('timeout')) {
      friendlyError = 'Zaman aşımı hatası (ETIMEDOUT): Sunucuya bağlanılamadı. Port veya Host adresini kontrol edin.';
    } else if (friendlyError.includes('ECONNREFUSED')) {
      friendlyError = 'Bağlantı reddedildi (ECONNREFUSED): SMTP portu veya sunucu adresi yanlış.';
    }

    return NextResponse.json({ error: friendlyError }, { status: 400 });
  }
}
