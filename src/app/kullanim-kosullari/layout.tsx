import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | 서비스 이용약관',
  description:
    'FMKAL Bağımsız Dijital Stüdyo hizmet şartları, proje süreçleri ve kullanım koşulları. | 서비스 이용약관 및 프로젝트 진행 기준.',
  alternates: {
    canonical: 'https://fmkal.com/kullanim-kosullari',
  },
  openGraph: {
    title: 'Kullanım Koşulları | FMKAL (이용약관)',
    description: 'FMKAL hizmet şartları ve kullanım koşulları.',
    url: 'https://fmkal.com/kullanim-kosullari',
    type: 'website',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
