import React from 'react';

interface JsonLdProps {
  contactEmail?: string;
}

export default function JsonLd({ contactEmail = 'iletisim@fmkal.com' }: JsonLdProps) {
  const baseUrl = 'https://fmkal.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${baseUrl}/#organization`,
        name: 'FMKAL',
        alternateName: [
          'FMKAL Bağımsız Dijital Stüdyo',
          'FMKAL Independent Digital Studio',
          'FMKAL 독립 디지털 스튜디오',
        ],
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo-black-full.png`,
          width: 512,
          height: 512,
        },
        image: `${baseUrl}/og-image.png`,
        description:
          'Markanız için modern web siteleri, yaratıcı AI reklam videoları ve güvenli dijital altyapı çözümleri. | 브랜드를 위한 최신 웹사이트 제작, 4K AI 광고 영상 및 프라이빗 클라우드 인프라 스튜디오.',
        email: contactEmail,
        founder: {
          '@type': 'Person',
          '@id': `${baseUrl}/#founder`,
          name: 'Furkan Mert Kalyon',
          jobTitle: 'Founder & Lead Software Engineer',
          url: `${baseUrl}/hakkimda`,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: contactEmail,
            contactType: 'customer support',
            availableLanguage: ['Turkish', 'English', 'Korean'],
            url: `${baseUrl}/iletisim`,
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Turkey' },
          { '@type': 'Country', name: 'South Korea' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        knowsLanguage: ['tr', 'en', 'ko'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital Studio Services / 디지털 스튜디오 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Tasarımı ve Geliştirme / 웹 디자인 및 개발 / Web Design & Development',
                description:
                  'Next.js, TypeScript ve modern mimari ile yüksek performanslı, SEO uyumlu kurumsal web siteleri ve landing page geliştirme.',
                url: `${baseUrl}/hizmetler`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Video Prodüksiyonu / 광고 영상 및 AI 비디오 제작 / AI Ad Video Production',
                description:
                  'Yapay zekâ destekli 4K sinematik reklam videoları, sosyal medya Reels/Shorts kreatifleri ve ürün tanıtım filmleri.',
                url: `${baseUrl}/hizmetler`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Dijital Sistemler ve Altyapı / 디지털 시스템 및 인프라 구축 / Cloud & Docker Infrastructure',
                description:
                  'Docker konteyner mimarisi, Cloudflare Zero Trust tünelleme ve kurumsal özel bulut sistemleri.',
                url: `${baseUrl}/hizmetler`,
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'FMKAL | Bağımsız Dijital Stüdyo & Web Geliştirme',
        alternateName: 'FMKAL | 독립 디지털 스튜디오 & 웹 개발',
        description:
          'Furkan Mert Kalyon — Markanız için modern web siteleri, yaratıcı reklam videoları ve amaca yönelik dijital çözümler.',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        inLanguage: ['tr-TR', 'en-US', 'ko-KR'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  );
}
