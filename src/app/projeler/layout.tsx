import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projeler & Portfolyo | 주요 프로젝트 포트폴리오',
  description:
    'Furkan Mert Kalyon tarafından geliştirilen seçilmiş web siteleri, yapay zekâ videoları ve bulut altyapı çalışmaları. | 최신 웹 개발, AI 비디오 프로덕션 및 시스템 아키텍처 포트폴리오.',
  alternates: {
    canonical: 'https://fmkal.com/projeler',
  },
  openGraph: {
    title: 'Projeler & Portfolyo | FMKAL (주요 프로젝트)',
    description:
      'Furkan Mert Kalyon tarafından geliştirilen seçilmiş web siteleri, yapay zekâ videoları ve bulut altyapı çalışmaları.',
    url: 'https://fmkal.com/projeler',
    type: 'website',
    images: ['/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
