import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımda — Furkan Mert Kalyon | 스튜디오 소개',
  description:
    'Furkan Mert Kalyon kimdir? Bağımsız dijital stüdyo vizyonu, tasarım ve mühendislik prensipleri. | 독립 디지털 엔지니어링 스튜디오 FMKAL의 비전과 개발 철학.',
  alternates: {
    canonical: 'https://fmkal.com/hakkimda',
  },
  openGraph: {
    title: 'Hakkımda | FMKAL — Furkan Mert Kalyon (스튜디오 소개)',
    description:
      'Furkan Mert Kalyon kimdir? Bağımsız dijital stüdyo vizyonu, tasarım ve mühendislik prensipleri.',
    url: 'https://fmkal.com/hakkimda',
    type: 'profile',
    images: ['/og-image.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
