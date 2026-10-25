import nodemailer from 'nodemailer';
import { getSetting, getAllSettings } from '@/lib/db';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

export function getSmtpConfig(): SmtpConfig {
  const settings = getAllSettings();

  const host = settings.smtp_host || process.env.SMTP_HOST || '';
  const portStr = settings.smtp_port || process.env.SMTP_PORT || '465';
  const port = parseInt(portStr, 10) || 465;
  const secureSetting = settings.smtp_secure || process.env.SMTP_SECURE;
  // If port is 465 default to secure true, otherwise false unless explicitly 'true'
  const secure = secureSetting ? secureSetting === 'true' : port === 465;
  const user = settings.smtp_user || process.env.SMTP_USER || '';
  const pass = settings.smtp_pass || process.env.SMTP_PASS || '';
  const from = settings.smtp_from || process.env.SMTP_FROM || (user ? `"FMKAL İletişim" <${user}>` : '"FMKAL İletişim" <iletisim@fmkal.com>');
  const to = settings.smtp_to || process.env.SMTP_TO || process.env.NOTIFICATION_EMAIL || settings.contact_email || 'iletisim@fmkal.com';

  return { host, port, secure, user, pass, from, to };
}

export function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(config.host && config.user && config.pass);
}

export function createTransporter() {
  const config = getSmtpConfig();
  if (!config.host || !config.user || !config.pass) {
    throw new Error('SMTP ayarları eksik. Lütfen host, kullanıcı adı ve şifre bilgilerini girin.');
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      // Do not fail on invalid certs in internal docker/custom mail environments
      rejectUnauthorized: false,
    },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  service?: string;
  message: string;
}) {
  const config = getSmtpConfig();
  if (!isSmtpConfigured()) {
    console.log('[SMTP] Bilgiler yapılandırılmadığı için e-posta bildirimi gönderilmedi.');
    return { sent: false, reason: 'not_configured' };
  }

  const transporter = createTransporter();
  const dateFormatted = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Europe/Istanbul',
  }).format(new Date());

  const serviceLabel = data.service || 'Belirtilmedi';

  const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yeni İletişim Formu Mesajı</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(37, 99, 235, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #60a5fa; letter-spacing: 0.05em; text-transform: uppercase;">
                      🔔 Web Sitesi Bildirimi
                    </span>
                    <h1 style="margin: 12px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                      Yeni Bir Proje Talebi / Mesajınız Var
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">
                      fmkal.com üzerinden bir ziyaretçi sizinle iletişime geçti.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Sender Info Cards -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; width: 35%; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    👤 Gönderen Kişi
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a;">
                    ${escapeHtml(data.name)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    ✉️ E-Posta Adresi
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #2563eb;">
                    <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: underline;">
                      ${escapeHtml(data.email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    💼 İlgilenilen Hizmet
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #0f172a;">
                    <span style="display: inline-block; padding: 2px 8px; background-color: #e0e7ff; color: #3730a3; border-radius: 6px; font-size: 12px;">
                      ${escapeHtml(serviceLabel)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
                    🕒 Gönderim Tarihi
                  </td>
                  <td style="padding: 14px 18px; font-size: 13px; color: #475569;">
                    ${escapeHtml(dateFormatted)}
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <div style="margin-bottom: 24px;">
                <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                  💬 İletilen Mesaj
                </label>
                <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #2563eb; border-radius: 8px; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
${escapeHtml(data.message)}
                </div>
              </div>

              <!-- Quick Action Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td style="border-radius: 8px; background-color: #2563eb;">
                    <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: fmkal.com İletişim — ${data.name}`)}" style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px;">
                      ↩️ E-posta ile Doğrudan Yanıtla
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0;">
                Bu e-posta, <strong>fmkal.com</strong> sitesindeki iletişim formundan otomatik olarak iletilmiştir.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px;">
                Mesaj sitenizin SQLite veri tabanına ve Yönetim Paneline de kaydedilmiştir.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Yeni İletişim Formu Mesajı (fmkal.com)
=====================================
Gönderen: ${data.name}
E-posta: ${data.email}
Hizmet: ${serviceLabel}
Tarih: ${dateFormatted}

Mesaj:
${data.message}

---
Bu bildirim fmkal.com sitesinden otomatik olarak gönderilmiştir.
  `.trim();

  const info = await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `🔔 Yeni İletişim Mesajı: ${data.name} (${serviceLabel})`,
    text,
    html,
  });

  console.log(`[SMTP] E-posta bildirimi gönderildi: ${info.messageId} -> ${config.to}`);
  return { sent: true, messageId: info.messageId };
}

export async function sendTestEmail(customTo?: string) {
  const config = getSmtpConfig();
  const transporter = createTransporter();
  const targetEmail = customTo || config.to;

  if (!targetEmail) {
    throw new Error('Alıcı e-posta adresi belirlenmemiş.');
  }

  const info = await transporter.sendMail({
    from: config.from,
    to: targetEmail,
    subject: '✅ fmkal.com — SMTP Test E-Postası Başarılı!',
    text: `Tebrikler! SMTP sunucu yapılandırmanız sorunsuz çalışıyor.\n\nZiyaretçiler iletişim formunu doldurduğunda bildirimler bu adrese (${targetEmail}) iletilecektir.\n\nTarih: ${new Date().toLocaleString('tr-TR')}`,
    html: `
      <div style="font-family: sans-serif; padding: 24px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #059669; margin-top: 0;">✅ SMTP Bağlantısı Başarılı!</h2>
        <p style="font-size: 14px; color: #334155;">
          Tebrikler! <strong>fmkal.com</strong> üzerindeki SMTP ayarlarınız başarıyla doğrulandı.
        </p>
        <p style="font-size: 13px; color: #64748b;">
          Artık bir ziyaretçi iletişim formundan teklif veya mesaj gönderdiğinde, anında bu e-posta adresine detaylı bildirim gelecektir.
        </p>
        <div style="background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px; font-family: monospace; color: #0f172a; margin-top: 16px;">
          Sunucu: ${escapeHtml(config.host)}:${config.port}<br>
          Kullanıcı: ${escapeHtml(config.user)}<br>
          Alıcı: ${escapeHtml(targetEmail)}
        </div>
      </div>
    `,
  });

  return { success: true, messageId: info.messageId, to: targetEmail };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
