import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { SHOWCASE_PROJECTS, ShowcaseProject, ShowcaseType } from '@/data/showcaseWebsites';

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = process.env.SQLITE_DB_PATH || path.join(DATA_DIR, 'fmkal.db');

// Singleton database instance
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initTables(db);
    seedIfEmpty(db);
  }
  return db;
}

function initTables(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title_tr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_ko TEXT NOT NULL,
      desc_tr TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      desc_ko TEXT NOT NULL,
      highlights_tr TEXT NOT NULL,
      highlights_en TEXT NOT NULL,
      highlights_ko TEXT NOT NULL,
      client TEXT NOT NULL,
      year TEXT NOT NULL,
      type TEXT NOT NULL,
      live_url TEXT,
      video_url TEXT,
      thumbnail TEXT NOT NULL,
      tags TEXT NOT NULL,
      metrics TEXT,
      duration TEXT,
      resolution TEXT,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      service TEXT,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
}

function seedIfEmpty(database: Database.Database) {
  const countRow = database.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
  if (countRow.count === 0) {
    const insert = database.prepare(`
      INSERT INTO projects (
        id, title_tr, title_en, title_ko,
        desc_tr, desc_en, desc_ko,
        highlights_tr, highlights_en, highlights_ko,
        client, year, type,
        live_url, video_url, thumbnail,
        tags, metrics, duration, resolution, order_index
      ) VALUES (
        @id, @title_tr, @title_en, @title_ko,
        @desc_tr, @desc_en, @desc_ko,
        @highlights_tr, @highlights_en, @highlights_ko,
        @client, @year, @type,
        @live_url, @video_url, @thumbnail,
        @tags, @metrics, @duration, @resolution, @order_index
      )
    `);

    const insertMany = database.transaction((projects: ShowcaseProject[]) => {
      for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        insert.run({
          id: p.id,
          title_tr: p.title,
          title_en: p.title,
          title_ko: p.title,
          desc_tr: p.description.tr,
          desc_en: p.description.en,
          desc_ko: p.description.ko,
          highlights_tr: JSON.stringify(p.highlights.tr),
          highlights_en: JSON.stringify(p.highlights.en),
          highlights_ko: JSON.stringify(p.highlights.ko),
          client: p.client,
          year: p.year,
          type: p.type,
          live_url: p.liveUrl || null,
          video_url: p.videoUrl || null,
          thumbnail: p.thumbnail,
          tags: JSON.stringify(p.tags),
          metrics: p.metrics || null,
          duration: p.duration || null,
          resolution: p.resolution || null,
          order_index: i,
        });
      }
    });

    insertMany(SHOWCASE_PROJECTS);
  }

  // Ensure default contact email exists
  const emailSetting = database.prepare("SELECT value FROM settings WHERE key = 'contact_email'").get();
  if (!emailSetting) {
    database.prepare("INSERT INTO settings (key, value) VALUES ('contact_email', 'iletisim@fmkal.com')").run();
  }
}

// Map database row to ShowcaseProject object
export function mapRowToProject(row: any): ShowcaseProject {
  return {
    id: row.id,
    title: row.title_tr,
    client: row.client,
    year: row.year,
    type: row.type as ShowcaseType,
    description: {
      tr: row.desc_tr,
      en: row.desc_en,
      ko: row.desc_ko,
    },
    liveUrl: row.live_url || undefined,
    videoUrl: row.video_url || undefined,
    thumbnail: row.thumbnail,
    tags: JSON.parse(row.tags || '[]'),
    highlights: {
      tr: JSON.parse(row.highlights_tr || '[]'),
      en: JSON.parse(row.highlights_en || '[]'),
      ko: JSON.parse(row.highlights_ko || '[]'),
    },
    metrics: row.metrics || undefined,
    duration: row.duration || undefined,
    resolution: row.resolution || undefined,
  };
}

// Queries
export function getAllProjects(): ShowcaseProject[] {
  const database = getDb();
  const rows = database.prepare('SELECT * FROM projects ORDER BY order_index ASC, created_at DESC').all();
  return rows.map(mapRowToProject);
}

export function saveProject(data: any): ShowcaseProject {
  const database = getDb();
  const id = data.id || `project-${Date.now()}`;

  const existing = database.prepare('SELECT id FROM projects WHERE id = ?').get(id);

  if (existing) {
    database.prepare(`
      UPDATE projects SET
        title_tr = @title_tr, title_en = @title_en, title_ko = @title_ko,
        desc_tr = @desc_tr, desc_en = @desc_en, desc_ko = @desc_ko,
        highlights_tr = @highlights_tr, highlights_en = @highlights_en, highlights_ko = @highlights_ko,
        client = @client, year = @year, type = @type,
        live_url = @live_url, video_url = @video_url, thumbnail = @thumbnail,
        tags = @tags, metrics = @metrics, duration = @duration, resolution = @resolution
      WHERE id = @id
    `).run({
      id,
      title_tr: data.title_tr || data.title,
      title_en: data.title_en || data.title,
      title_ko: data.title_ko || data.title,
      desc_tr: data.desc_tr || data.description?.tr || '',
      desc_en: data.desc_en || data.description?.en || '',
      desc_ko: data.desc_ko || data.description?.ko || '',
      highlights_tr: JSON.stringify(data.highlights_tr || data.highlights?.tr || []),
      highlights_en: JSON.stringify(data.highlights_en || data.highlights?.en || []),
      highlights_ko: JSON.stringify(data.highlights_ko || data.highlights?.ko || []),
      client: data.client,
      year: data.year,
      type: data.type,
      live_url: data.live_url || data.liveUrl || null,
      video_url: data.video_url || data.videoUrl || null,
      thumbnail: data.thumbnail,
      tags: JSON.stringify(data.tags || []),
      metrics: data.metrics || null,
      duration: data.duration || null,
      resolution: data.resolution || null,
    });
  } else {
    database.prepare(`
      INSERT INTO projects (
        id, title_tr, title_en, title_ko,
        desc_tr, desc_en, desc_ko,
        highlights_tr, highlights_en, highlights_ko,
        client, year, type,
        live_url, video_url, thumbnail,
        tags, metrics, duration, resolution
      ) VALUES (
        @id, @title_tr, @title_en, @title_ko,
        @desc_tr, @desc_en, @desc_ko,
        @highlights_tr, @highlights_en, @highlights_ko,
        @client, @year, @type,
        @live_url, @video_url, @thumbnail,
        @tags, @metrics, @duration, @resolution
      )
    `).run({
      id,
      title_tr: data.title_tr || data.title,
      title_en: data.title_en || data.title,
      title_ko: data.title_ko || data.title,
      desc_tr: data.desc_tr || data.description?.tr || '',
      desc_en: data.desc_en || data.description?.en || '',
      desc_ko: data.desc_ko || data.description?.ko || '',
      highlights_tr: JSON.stringify(data.highlights_tr || data.highlights?.tr || []),
      highlights_en: JSON.stringify(data.highlights_en || data.highlights?.en || []),
      highlights_ko: JSON.stringify(data.highlights_ko || data.highlights?.ko || []),
      client: data.client,
      year: data.year,
      type: data.type,
      live_url: data.live_url || data.liveUrl || null,
      video_url: data.video_url || data.videoUrl || null,
      thumbnail: data.thumbnail,
      tags: JSON.stringify(data.tags || []),
      metrics: data.metrics || null,
      duration: data.duration || null,
      resolution: data.resolution || null,
    });
  }

  const row = database.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  return mapRowToProject(row);
}

export function deleteProject(id: string): boolean {
  const database = getDb();
  const res = database.prepare('DELETE FROM projects WHERE id = ?').run(id);
  return res.changes > 0;
}

// Contact Messages Queries
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  service?: string;
  message: string;
  is_read: number;
  created_at: string;
}

export function saveContactMessage(msg: { name: string; email: string; service?: string; message: string }): number {
  const database = getDb();
  const res = database.prepare(`
    INSERT INTO messages (name, email, service, message)
    VALUES (?, ?, ?, ?)
  `).run(msg.name, msg.email, msg.service || null, msg.message);
  return Number(res.lastInsertRowid);
}

export function getAllMessages(): ContactMessage[] {
  const database = getDb();
  return database.prepare('SELECT * FROM messages ORDER BY created_at DESC').all() as ContactMessage[];
}

export function markMessageAsRead(id: number): boolean {
  const database = getDb();
  const res = database.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(id);
  return res.changes > 0;
}

export function deleteMessage(id: number): boolean {
  const database = getDb();
  const res = database.prepare('DELETE FROM messages WHERE id = ?').run(id);
  return res.changes > 0;
}

export function getDashboardStats() {
  const database = getDb();
  const totalProjects = (database.prepare('SELECT COUNT(*) as c FROM projects').get() as any).c;
  const totalVideos = (database.prepare("SELECT COUNT(*) as c FROM projects WHERE type = 'Video'").get() as any).c;
  const totalWebsites = (database.prepare("SELECT COUNT(*) as c FROM projects WHERE type = 'Web Sitesi'").get() as any).c;
  const totalSaaS = (database.prepare("SELECT COUNT(*) as c FROM projects WHERE type = 'SaaS Uygulaması'").get() as any).c;
  const totalMessages = (database.prepare('SELECT COUNT(*) as c FROM messages').get() as any).c;
  const unreadMessages = (database.prepare('SELECT COUNT(*) as c FROM messages WHERE is_read = 0').get() as any).c;

  return {
    totalProjects,
    totalVideos,
    totalWebsites,
    totalSaaS,
    totalMessages,
    unreadMessages,
  };
}

// Site Settings Queries (Email, etc.)
export function getSetting(key: string, defaultValue = ''): string {
  const database = getDb();
  const row = database.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
  return row ? row.value : defaultValue;
}

export function setSetting(key: string, value: string): void {
  const database = getDb();
  database.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(key, value);
}

export function getAllSettings(): Record<string, string> {
  const database = getDb();
  const rows = database.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const result: Record<string, string> = {
    contact_email: 'iletisim@fmkal.com',
    google_verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    naver_verification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
  };
  rows.forEach((r) => {
    result[r.key] = r.value;
  });
  return result;
}
