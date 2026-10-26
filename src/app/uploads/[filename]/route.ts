import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
};

export async function GET(
  request: Request,
  props: { params: Promise<{ filename: string }> }
) {
  const { filename } = await props.params;

  // Path traversal protection
  const safeFilename = path.basename(filename);
  if (!safeFilename || safeFilename === '.' || safeFilename === '..') {
    return new NextResponse('Invalid filename', { status: 400 });
  }

  const ext = path.extname(safeFilename).toLowerCase();
  const contentType = MIME_MAP[ext] || 'application/octet-stream';

  // 1. Check persistent uploads dir (volume)
  const dbPath = process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'data', 'fmkal.db');
  const dataDir = path.dirname(dbPath);
  const uploadsDir = path.join(dataDir, 'uploads');
  const primaryPath = path.join(uploadsDir, safeFilename);

  // 2. Check public/uploads fallback
  const publicUploadsPath = path.join(process.cwd(), 'public', 'uploads', safeFilename);

  let targetPath: string | null = null;
  if (fs.existsSync(primaryPath)) {
    targetPath = primaryPath;
  } else if (fs.existsSync(publicUploadsPath)) {
    targetPath = publicUploadsPath;
  }

  if (!targetPath) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(targetPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(fileBuffer.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Error reading image', { status: 500 });
  }
}
