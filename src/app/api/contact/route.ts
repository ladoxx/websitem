import { NextResponse } from 'next/server';
import { saveContactMessage, getSetting } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Lütfen isim, e-posta ve mesaj alanlarını eksiksiz doldurun.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir e-posta adresi girin.' },
        { status: 400 }
      );
    }

    // Save to SQLite Database
    try {
      saveContactMessage({ name, email, service, message });
    } catch (dbErr) {
      console.error('Failed to save message to SQLite:', dbErr);
    }

    // In a configured environment (Coolify/Docker), check for webhook or smtp
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const recipientEmail = process.env.CONTACT_EMAIL || getSetting('contact_email', 'iletisim@fmkal.com');

    if (webhookUrl) {
      // Forward to Discord / Telegram / n8n webhook
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📬 Yeni Proje Talebi (fmkal.com)\n**İsim:** ${name}\n**E-Posta:** ${email}\n**Hizmet:** ${service || 'Belirtilmedi'}\n**Mesaj:** ${message}`,
        }),
      });
    }

    // Log internally
    console.log(`[Contact Form Received] From: ${name} (${email}), Service: ${service}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğim.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      { error: 'Mesaj iletilirken bir sorun oluştu. Lütfen doğrudan e-posta ile iletişime geçin.' },
      { status: 500 }
    );
  }
}
