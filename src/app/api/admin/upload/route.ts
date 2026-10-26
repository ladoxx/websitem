import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import path from 'path';
import fs from 'fs';

function getUploadsDir() {
  const dbPath = process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'data', 'fmkal.db');
  const dataDir = path.dirname(dbPath);
  const uploadsDir = path.join(dataDir, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  return uploadsDir;
}

function getPublicUploadsDir() {
  const publicDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(publicDir)) {
    try {
      fs.mkdirSync(publicDir, { recursive: true });
    } catch {
      // Read-only filesystem in some containers
    }
  }
  return publicDir;
}

export async function POST(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen admin girişi yapın.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Lütfen yüklenecek bir resim dosyası seçin.' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    const fileType = file.type?.toLowerCase() || '';
    const originalName = file.name || 'image.jpg';
    const ext = path.extname(originalName).toLowerCase();

    const isImageExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'].includes(ext);
    const isImageMime = validTypes.includes(fileType) || fileType.startsWith('image/');

    if (!isImageMime && !isImageExt) {
      return NextResponse.json(
        { error: 'Geçersiz dosya türü. Yalnızca JPG, PNG, WEBP, GIF veya SVG resimleri yükleyebilirsiniz.' },
        { status: 400 }
      );
    }

    // Max 15MB size check
    const maxSizeBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json(
        { error: 'Dosya boyutu çok büyük. Lütfen 15 MB veya daha küçük bir resim seçin.' },
        { status: 400 }
      );
    }

    const uploadsDir = getUploadsDir();
    const publicUploadsDir = getPublicUploadsDir();

    // Sanitize base name
    const rawBase = path.basename(originalName, ext);
    const cleanBase = rawBase
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30);

    const safeExt = ext || (fileType === 'image/png' ? '.png' : fileType === 'image/webp' ? '.webp' : '.jpg');
    const filename = `work-${Date.now()}-${cleanBase || 'img'}${safeExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write to persistent directory (volume)
    fs.writeFileSync(path.join(uploadsDir, filename), buffer);

    // Also attempt writing to public/uploads if accessible
    try {
      fs.writeFileSync(path.join(publicUploadsDir, filename), buffer);
    } catch {
      // Ignored if public is read-only
    }

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: fileType || 'image/jpeg',
    });
  } catch (error: any) {
    console.error('[Upload Error]:', error);
    return NextResponse.json({ error: error?.message || 'Resim yüklenirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function GET() {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }

  try {
    const uploadsDir = getUploadsDir();
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ files: [] });
    }

    const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'];
    const filenames = fs.readdirSync(uploadsDir);

    const files = filenames
      .filter((name) => validExts.includes(path.extname(name).toLowerCase()))
      .map((name) => {
        try {
          const stat = fs.statSync(path.join(uploadsDir, name));
          return {
            filename: name,
            url: `/uploads/${name}`,
            size: stat.size,
            mtime: stat.mtimeMs,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => b.mtime - a.mtime);

    return NextResponse.json({ files });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Görseller listelenemedi.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    if (!filename) {
      return NextResponse.json({ error: 'Dosya adı belirtilmedi.' }, { status: 400 });
    }

    const safeFilename = path.basename(filename);
    const uploadsDir = getUploadsDir();
    const publicUploadsDir = getPublicUploadsDir();

    const target1 = path.join(uploadsDir, safeFilename);
    const target2 = path.join(publicUploadsDir, safeFilename);

    let deleted = false;
    if (fs.existsSync(target1)) {
      fs.unlinkSync(target1);
      deleted = true;
    }
    if (fs.existsSync(target2)) {
      try {
        fs.unlinkSync(target2);
        deleted = true;
      } catch {}
    }

    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Görsel silinemedi.' }, { status: 500 });
  }
}
