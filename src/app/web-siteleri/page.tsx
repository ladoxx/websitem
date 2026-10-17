import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Siteleri & AI Videolar | 웹사이트 & AI 영상 쇼케이스',
  description:
    'FMKAL tarafından geliştirilen canlı kurumsal web siteleri, SaaS platformları ve 4K sinematik AI reklam videoları vitrini. | 기업 맞춤형 웹사이트 및 AI 광고 영상 쇼케이스.',
  alternates: {
    canonical: 'https://fmkal.com/web-siteleri',
  },
  openGraph: {
    title: 'Web Siteleri & Videolar | FMKAL (웹사이트 & 영상 쇼케이스)',
    description:
      'Canlı kurumsal web siteleri, SaaS platformları ve 4K sinematik AI reklam videoları vitrini.',
    url: 'https://fmkal.com/web-siteleri',
    type: 'website',
    images: ['/assets/fmkal_design_alt2_modern_ui_png_1792050167377.jpg'],
  },
};

export { default } from '../vaka-analizleri/page';

