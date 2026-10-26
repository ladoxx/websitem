import { NextResponse } from 'next/server';
import { setSetting, getAllSettings } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  try {
    const settings = getAllSettings();
    const isAdmin = await isAdminAuthenticated();

    const response: Record<string, any> = {
      contactEmail: settings.contact_email || 'iletisim@fmkal.com',
      googleVerification: settings.google_verification || '',
      naverVerification: settings.naver_verification || '',
      ogImage: settings.og_image || '/og-image.png',
    };

    if (isAdmin) {
      response.smtpHost = settings.smtp_host || process.env.SMTP_HOST || '';
      response.smtpPort = settings.smtp_port || process.env.SMTP_PORT || '465';
      response.smtpUser = settings.smtp_user || process.env.SMTP_USER || '';
      response.smtpSecure = settings.smtp_secure !== undefined ? settings.smtp_secure === 'true' : (process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true);
      response.smtpFrom = settings.smtp_from || process.env.SMTP_FROM || '';
      response.smtpTo = settings.smtp_to || process.env.SMTP_TO || '';
      response.hasSmtpPass = Boolean(settings.smtp_pass || process.env.SMTP_PASS);
    }

    return NextResponse.json(response);
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
    const {
      contactEmail,
      googleVerification,
      naverVerification,
      ogImage,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      smtpSecure,
      smtpFrom,
      smtpTo,
    } = body;

    if (contactEmail && !contactEmail.includes('@')) {
      return NextResponse.json({ error: 'Geçerli bir resmi iletişim e-posta adresi giriniz.' }, { status: 400 });
    }

    if (contactEmail) {
      setSetting('contact_email', contactEmail.trim());
    }
    if (typeof googleVerification === 'string') {
      setSetting('google_verification', googleVerification.trim());
    }
    if (typeof naverVerification === 'string') {
      setSetting('naver_verification', naverVerification.trim());
    }
    if (typeof ogImage === 'string') {
      setSetting('og_image', ogImage.trim());
    }

    // SMTP Settings
    if (typeof smtpHost === 'string') {
      setSetting('smtp_host', smtpHost.trim());
    }
    if (smtpPort !== undefined && smtpPort !== null) {
      setSetting('smtp_port', String(smtpPort).trim());
    }
    if (typeof smtpUser === 'string') {
      setSetting('smtp_user', smtpUser.trim());
    }
    if (typeof smtpPass === 'string' && smtpPass.length > 0) {
      setSetting('smtp_pass', smtpPass.trim());
    }
    if (smtpSecure !== undefined) {
      setSetting('smtp_secure', smtpSecure === true || smtpSecure === 'true' ? 'true' : 'false');
    }
    if (typeof smtpFrom === 'string') {
      setSetting('smtp_from', smtpFrom.trim());
    }
    if (typeof smtpTo === 'string') {
      setSetting('smtp_to', smtpTo.trim());
    }

    return NextResponse.json({
      success: true,
      message: 'Tüm site, SEO ve SMTP ayarları başarıyla güncellendi.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Ayarlar kaydedilemedi.' }, { status: 500 });
  }
}
