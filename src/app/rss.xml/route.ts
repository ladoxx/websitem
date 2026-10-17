import { getAllProjects } from '@/lib/db';
import type { ShowcaseProject } from '@/data/showcaseWebsites';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://fmkal.com';
  const now = new Date().toUTCString();

  const staticPages = [
    {
      title: 'FMKAL | Bağımsız Dijital Stüdyo & Web Geliştirme (독립 디지털 스튜디오)',
      url: baseUrl,
      description:
        'Furkan Mert Kalyon — Markanız için modern web siteleri, yaratıcı AI reklam videoları ve dijital altyapı çözümleri. | 브랜드를 위한 최신 웹사이트, AI 광고 영상 및 맞춤형 디지털 인프라 솔루션.',
      category: 'Digital Studio',
    },
    {
      title: 'Hizmetler | 웹 디자인, AI 광고 영상 및 인프라 구축 — FMKAL',
      url: `${baseUrl}/hizmetler`,
      description:
        'Kurumsal web tasarımı, dönüşüm odaklı landing page, 4K AI reklam videosu prodüksiyonu ve güvenli bulut/altyapı çözümleri. | 반응형 웹사이트 제작, 생성형 AI 광고 영상, 프라이빗 클라우드 인프라.',
      category: 'Services',
    },
    {
      title: 'Projeler & Portfolyo | 주요 프로젝트 포트폴리오 — FMKAL',
      url: `${baseUrl}/projeler`,
      description:
        'Furkan Mert Kalyon tarafından geliştirilen seçilmiş web siteleri, yapay zekâ videoları ve bulut altyapı çalışmaları. | 최신 웹 개발, AI 비디오 프로덕션 및 시스템 아키텍처 포트폴리오.',
      category: 'Portfolio',
    },
    {
      title: 'Web Siteleri & Videolar | 웹사이트 & AI 영상 쇼케이스 — FMKAL',
      url: `${baseUrl}/web-siteleri`,
      description:
        'Canlı kurumsal web siteleri, SaaS uygulamaları ve 4K sinematik AI reklam videoları vitrini. | 기업 맞춤형 웹사이트, SaaS 플랫폼 및 4K 시네마틱 AI 광고 영상 쇼케이스.',
      category: 'Showcase',
    },
    {
      title: 'Vaka Analizleri | 케이스 스터디 & 프로젝트 분석 — FMKAL',
      url: `${baseUrl}/vaka-analizleri`,
      description:
        'Gerçekleştirilen dijital projelerin teknik mimarisi, performans metrikleri ve vaka analizleri. | 디지털 프로젝트의 기술 아키텍처 및 성과 분석 케이스 스터디.',
      category: 'Case Studies',
    },
    {
      title: 'Hakkımda | Furkan Mert Kalyon 소개 — FMKAL',
      url: `${baseUrl}/hakkimda`,
      description:
        'Furkan Mert Kalyon kimdir? Bağımsız dijital stüdyo vizyonu, tasarım ve mühendislik prensipleri. | 독립 디지털 엔지니어링 스튜디오 FMKAL의 비전과 개발 철학.',
      category: 'About',
    },
    {
      title: 'İletişim & Proje Teklifi | 프로젝트 문의 및 제안 — FMKAL',
      url: `${baseUrl}/iletisim`,
      description:
        'Yeni bir web sitesi, reklam videosu veya şirket içi dijital çözüm projeniz için doğrudan iletişime geçin. | 웹사이트 제작, AI 광고 영상, 디지털 인프라 구축 문의.',
      category: 'Contact',
    },
  ];

  let projects: ShowcaseProject[] = [];
  try {
    projects = getAllProjects();
  } catch {
    projects = [];
  }

  const staticItemsXml = staticPages
    .map(
      (page) => `
    <item>
      <title>${escapeXml(page.title)}</title>
      <link>${escapeXml(page.url)}</link>
      <guid isPermaLink="true">${escapeXml(page.url)}</guid>
      <description>${escapeXml(page.description)}</description>
      <category>${escapeXml(page.category)}</category>
      <pubDate>${now}</pubDate>
    </item>`
    )
    .join('');

  const projectItemsXml = projects
    .map((project) => {
      const itemUrl = `${baseUrl}/vaka-analizleri#${encodeURIComponent(project.id)}`;
      const combinedDesc = `${project.description.tr} | ${project.description.ko} | ${project.description.en}`;
      return `
    <item>
      <title>${escapeXml(`${project.title} — ${project.client} (${project.type}) | FMKAL`)}</title>
      <link>${escapeXml(itemUrl)}</link>
      <guid isPermaLink="false">${escapeXml(`fmkal-project-${project.id}`)}</guid>
      <description>${escapeXml(combinedDesc)}</description>
      <category>${escapeXml(project.type)}</category>
      <pubDate>${now}</pubDate>
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml('FMKAL | Bağımsız Dijital Stüdyo & Web Geliştirme (독립 디지털 스튜디오)')}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(
      'Furkan Mert Kalyon — Markanız için modern web siteleri, yaratıcı reklam videoları ve amaca yönelik dijital çözümler. | 최신 웹사이트 제작, AI 광고 영상 프로덕션 및 디지털 인프라 스튜디오.'
    )}</description>
    <language>tr</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${staticItemsXml}
    ${projectItemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
