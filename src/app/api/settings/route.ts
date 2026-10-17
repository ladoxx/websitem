import { NextResponse } from 'next/server';
import { getSetting, setSetting, getAllSettings } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  try {
    const settings = getAllSettings();
    return NextResponse.json({
      contactEmail: settings.contact_email || 'iletisim@fmkal.com',
      googleVerification: settings.google_verification || '',
      naverVerification: settings.naver_verification || '',
    });
  } catch (error) {
    return NextResponse.json({
      contactEmail: 'iletisim@fmkal.com',
      googleVerification: '',
      naverVerification: '',
    });
  }
}

export async function POST(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { contactEmail, googleVerification, naverVerification } = body;

    if (!contactEmail || !contactEmail.includes('@')) {
      return NextResponse.json({ error: 'Geçerli bir e-posta adresi giriniz.' }, { status: 400 });
    }

    setSetting('contact_email', contactEmail.trim());
    if (typeof googleVerification === 'string') {
      setSetting('google_verification', googleVerification.trim());
    }
    if (typeof naverVerification === 'string') {
      setSetting('naver_verification', naverVerification.trim());
    }

    return NextResponse.json({
      success: true,
      contactEmail: contactEmail.trim(),
      googleVerification: typeof googleVerification === 'string' ? googleVerification.trim() : '',
      naverVerification: typeof naverVerification === 'string' ? naverVerification.trim() : '',
      message: 'Site ve SEO ayarları başarıyla güncellendi.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Ayar kaydedilemedi.' }, { status: 500 });
  }
}
