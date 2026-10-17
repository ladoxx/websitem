import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | 개인정보 처리방침',
  description:
    'FMKAL Bağımsız Dijital Stüdyo gizlilik politikası, KVKK ve GDPR veri güvenliği standartları. | 개인정보 보호 및 데이터 보안 정책.',
  alternates: {
    canonical: 'https://fmkal.com/gizlilik-politikasi',
  },
  openGraph: {
    title: 'Gizlilik Politikası | FMKAL (개인정보 처리방침)',
    description: 'FMKAL veri güvenliği, KVKK ve gizlilik politikası.',
    url: 'https://fmkal.com/gizlilik-politikasi',
    type: 'website',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
