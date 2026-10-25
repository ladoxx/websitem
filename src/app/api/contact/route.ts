import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/db';
import { sendContactNotification } from '@/lib/email';

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

    // Send SMTP Email Notification to Admin
    try {
      await sendContactNotification({ name, email, service, message });
    } catch (smtpErr) {
      console.error('[Contact Form] SMTP e-posta bildirimi gönderilemedi:', smtpErr);
    }

    // Optional Webhook forwarding (Discord / Telegram / n8n)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 Yeni Proje Talebi (fmkal.com)\n**İsim:** ${name}\n**E-Posta:** ${email}\n**Hizmet:** ${service || 'Belirtilmedi'}\n**Mesaj:** ${message}`,
          }),
        });
      } catch (webhookErr) {
        console.error('[Contact Form] Webhook gönderilemedi:', webhookErr);
      }
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
