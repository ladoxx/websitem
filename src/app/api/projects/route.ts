import { NextResponse } from 'next/server';
import { getAllProjects, saveProject, deleteProject, toggleProjectFeatured } from '@/lib/db';
import { SHOWCASE_PROJECTS } from '@/data/showcaseWebsites';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyFeatured = searchParams.get('featured') === 'true';
    const projects = getAllProjects();

    const featured = projects.filter((p) => p.isFeatured);

    if (onlyFeatured) {
      return NextResponse.json({ projects: featured.length > 0 ? featured : projects });
    }

    return NextResponse.json({ projects, featured });
  } catch (error) {
    console.error('Failed to get projects from SQLite:', error);
    // Fallback to static data if SQLite error
    const featured = SHOWCASE_PROJECTS.filter((p) => p.isFeatured);
    return NextResponse.json({ projects: SHOWCASE_PROJECTS, featured });
  }
}

export async function POST(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen giriş yapın.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const saved = saveProject(body);
    return NextResponse.json({ success: true, project: saved });
  } catch (error: any) {
    console.error('Failed to save project:', error);
    return NextResponse.json({ error: error.message || 'Proje kaydedilemedi.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen giriş yapın.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, isFeatured, toggle } = body;
    if (!id) {
      return NextResponse.json({ error: 'Proje ID belirtilmedi.' }, { status: 400 });
    }

    if (toggle) {
      toggleProjectFeatured(id);
    } else if (isFeatured !== undefined) {
      saveProject({ id, isFeatured: Boolean(isFeatured) });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to patch project:', error);
    return NextResponse.json({ error: error.message || 'Proje güncellenemedi.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen giriş yapın.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Proje ID belirtilmedi.' }, { status: 400 });
    }

    const success = deleteProject(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: error.message || 'Proje silinemedi.' }, { status: 500 });
  }
}
