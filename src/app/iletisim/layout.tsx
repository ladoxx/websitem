import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim & Proje Teklifi | 프로젝트 문의 및 제안',
  description:
    'Yeni bir web sitesi, reklam videosu veya şirket içi dijital çözüm projeniz için teklif alın ve doğrudan iletişime geçin. | 웹사이트 제작, AI 광고 영상, 디지털 인프라 구축 문의.',
  alternates: {
    canonical: 'https://fmkal.com/iletisim',
  },
  openGraph: {
    title: 'İletişim & Proje Teklifi | FMKAL (문의하기)',
    description:
      'Yeni bir web sitesi, reklam videosu veya şirket içi dijital çözüm projeniz için doğrudan iletişime geçin.',
    url: 'https://fmkal.com/iletisim',
    type: 'website',
    images: ['/og-image.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
