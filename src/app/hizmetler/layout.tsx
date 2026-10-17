import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetler — Web Tasarımı, AI Video & Altyapı | 서비스 영역',
  description:
    'Web tasarımı, dönüşüm odaklı landing page, 4K yapay zekâ reklam videosu prodüksiyonu ve güvenli bulut/altyapı çözümleri. | 반응형 웹사이트 제작, 생성형 AI 광고 영상 및 프라이빗 클라우드 인프라.',
  alternates: {
    canonical: 'https://fmkal.com/hizmetler',
  },
  openGraph: {
    title: 'Hizmetler | FMKAL — Dijital Çözümler (웹 디자인 & AI 영상 제작)',
    description:
      'Markanız için modern web siteleri, 4K AI reklam videoları ve özel bulut altyapı çözümleri.',
    url: 'https://fmkal.com/hizmetler',
    type: 'website',
    images: ['/assets/fmkal_design_alt1_studio_png_1792050145467.jpg'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
