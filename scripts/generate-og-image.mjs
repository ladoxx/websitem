import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Background SVG with studio lighting, dots, and borders
  const bgSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="30%" cy="30%" r="55%">
          <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#070a12" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="75%" cy="70%" r="50%">
          <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#070a12" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#1e293b" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0.6"/>
        </linearGradient>
        <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#334155" fill-opacity="0.35"/>
        </pattern>
      </defs>

      <!-- Deep studio dark base -->
      <rect width="100%" height="100%" fill="#070a12"/>

      <!-- Dots pattern -->
      <rect width="100%" height="100%" fill="url(#dots)"/>

      <!-- Glow auras -->
      <rect width="100%" height="100%" fill="url(#glow1)"/>
      <rect width="100%" height="100%" fill="url(#glow2)"/>

      <!-- Inner sleek border -->
      <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="24" fill="none" stroke="url(#borderGrad)" stroke-width="1.5"/>

      <!-- Top Badge -->
      <g transform="translate(600, 95)">
        <rect x="-170" y="-18" width="340" height="36" rx="18" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1"/>
        <circle cx="-142" cy="0" r="4.5" fill="#3b82f6"/>
        <text x="5" y="5" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="#94a3b8" text-anchor="middle">
          BAĞIMSIZ DİJİTAL STÜDYO
        </text>
      </g>

      <!-- Bottom Subtitle -->
      <text x="600" y="505" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="19" font-weight="500" letter-spacing="1" fill="#cbd5e1" text-anchor="middle">
        Modern Web Mimarisi  •  4K AI Video Prodüksiyon  •  Özel Bulut
      </text>

      <!-- Bottom URL pill -->
      <g transform="translate(600, 550)">
        <rect x="-85" y="-14" width="170" height="28" rx="14" fill="#0284c7" fill-opacity="0.15" stroke="#0284c7" stroke-opacity="0.4" stroke-width="1"/>
        <text x="0" y="5" font-family="ui-monospace, SFMono-Regular, monospace" font-size="13" font-weight="700" letter-spacing="2.5" fill="#38bdf8" text-anchor="middle">
          FMKAL.COM
        </text>
      </g>
    </svg>
  `);

  const logoFile = path.join(__dirname, '..', 'public', 'logo-full-white.png');
  const outFile = path.join(__dirname, '..', 'public', 'og-image.png');

  // Resize the white logo
  const logoBuffer = await sharp(logoFile)
    .resize({ width: 420, fit: 'inside' })
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();
  const logoLeft = Math.round((width - logoMeta.width) / 2);
  const logoTop = Math.round(285 - logoMeta.height / 2);

  await sharp(bgSvg)
    .composite([
      {
        input: logoBuffer,
        top: logoTop,
        left: logoLeft,
      },
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outFile);

  console.log('Successfully created public/og-image.png!');
}

createOgImage().catch(console.error);
