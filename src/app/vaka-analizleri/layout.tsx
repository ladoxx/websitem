import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaka Analizleri & Dijital Vitrin | 케이스 스터디 & 쇼케이스',
  description:
    'FMKAL tarafından hayata geçirilen web siteleri, 4K AI reklam videoları ve özel bulut projelerinin vaka analizleri. | 최신 웹 개발 및 AI 영상 프로덕션 케이스 스터디.',
  alternates: {
    canonical: 'https://fmkal.com/vaka-analizleri',
  },
  openGraph: {
    title: 'Vaka Analizleri & Dijital Vitrin | FMKAL (케이스 스터디)',
    description:
      'Gerçekleştirilen web siteleri, 4K AI reklam videoları ve özel bulut projelerinin teknik vaka analizleri.',
    url: 'https://fmkal.com/vaka-analizleri',
    type: 'website',
    images: ['/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg'],
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
