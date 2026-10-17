import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import JsonLd from '@/components/JsonLd';
import { getAllSettings } from '@/lib/db';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  let googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';
  let naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '';
  let contactEmail = 'iletisim@fmkal.com';

  try {
    const settings = getAllSettings();
    if (settings.google_verification) googleVerification = settings.google_verification;
    if (settings.naver_verification) naverVerification = settings.naver_verification;
    if (settings.contact_email) contactEmail = settings.contact_email;
  } catch {
    // Fallback to env or defaults during static build if DB is locked
  }

  return {
    metadataBase: new URL('https://fmkal.com'),
    title: {
      default: 'FMKAL | Bağımsız Dijital Stüdyo & Web Geliştirme (독립 디지털 스튜디오)',
      template: '%s | FMKAL',
    },
    description:
      'Furkan Mert Kalyon — Markanız için modern web siteleri, yaratıcı AI reklam videoları ve amaca yönelik dijital çözümler. | 브랜드를 위한 최신 웹사이트 제작, 4K AI 광고 영상 및 맞춤형 디지털 인프라 스튜디오.',
    applicationName: 'FMKAL Digital Studio',
    keywords: [
      // Turkish Keywords (Google TR)
      'FMKAL',
      'Furkan Mert Kalyon',
      'Web Tasarımı',
      'Web Geliştirme',
      'Bağımsız Dijital Stüdyo',
      'Dijital Ajans',
      'AI Video Prodüksiyonu',
      'Yapay Zeka Reklam Videosu',
      'Kurumsal Web Sitesi',
      'Next.js Geliştirici',
      'Özel Bulut Altyapısı',
      // English Keywords (Google Global)
      'Independent Digital Studio',
      'Next.js Web Development',
      'AI Commercial Video Production',
      'Custom Web Design',
      'Private Cloud Infrastructure',
      // Korean Keywords (Naver & Google KR)
      'FMKAL 스튜디오',
      '독립 디지털 스튜디오',
      '웹 디자인 및 개발',
      '반응형 홈페이지 제작',
      '기업 웹사이트 제작',
      '랜딩페이지 제작',
      'AI 광고 영상 제작',
      '생성형 AI 비디오 프로덕션',
      'Next.js 웹 개발',
      '디지털 에이전시',
      '프라이빗 클라우드 구축',
    ],
    authors: [{ name: 'Furkan Mert Kalyon', url: 'https://fmkal.com' }],
    creator: 'Furkan Mert Kalyon',
    publisher: 'FMKAL',
    category: 'technology',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: 'https://fmkal.com',
      languages: {
        'tr-TR': 'https://fmkal.com',
        'en-US': 'https://fmkal.com',
        'ko-KR': 'https://fmkal.com',
        'x-default': 'https://fmkal.com',
      },
      types: {
        'application/rss+xml': 'https://fmkal.com/rss.xml',
      },
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      alternateLocale: ['ko_KR', 'en_US'],
      url: 'https://fmkal.com',
      siteName: 'FMKAL | Independent Digital Studio',
      title: 'FMKAL | Bağımsız Dijital Stüdyo & Web Geliştirme (독립 디지털 스튜디오)',
      description:
        'Markanız için modern web siteleri, 4K AI reklam videoları ve güvenli dijital altyapı çözümleri. | 브랜드를 위한 최신 웹사이트 제작 및 AI 광고 영상 스튜디오.',
      images: [
        {
          url: '/assets/fmkal_ui_showcase_png_1792038188349.jpg',
          width: 1200,
          height: 630,
          alt: 'FMKAL — Bağımsız Dijital Stüdyo & Web Geliştirme (독립 디지털 스튜디오)',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FMKAL | Bağımsız Dijital Stüdyo & Web Geliştirme',
      description:
        'Furkan Mert Kalyon — Modern web siteleri, yaratıcı AI reklam videoları ve güvenli dijital altyapı çözümleri.',
      images: ['/assets/fmkal_ui_showcase_png_1792038188349.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: googleVerification || 'GOOGLE_SITE_VERIFICATION_CODE',
      other: {
        'naver-site-verification': [naverVerification || 'NAVER_SITE_VERIFICATION_CODE'],
      },
    },
    other: {
      Yeti: 'index, follow',
      NaverBot: 'index, follow',
      subject: 'Web Tasarımı, AI Video Prodüksiyonu ve Dijital Altyapı | 웹 디자인, AI 광고 영상 및 디지털 인프라',
      classification: 'Digital Studio, Web Development, AI Production',
      'reply-to': contactEmail,
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.png', type: 'image/png' },
        { url: '/logo-black-icon.png', type: 'image/png' },
      ],
      apple: [{ url: '/logo-black-icon.png' }],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let contactEmail = 'iletisim@fmkal.com';
  try {
    const settings = getAllSettings();
    if (settings.contact_email) contactEmail = settings.contact_email;
  } catch {
    // Fallback
  }

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <JsonLd contactEmail={contactEmail} />
      </head>
      <body className="bg-[#f8fafc] text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        <LanguageProvider>
          <div className="fixed inset-0 bg-studio-dots opacity-40 pointer-events-none -z-10" />
          <div className="relative z-10 flex min-h-screen flex-col">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

