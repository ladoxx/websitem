import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fmkal.com';
  const defaultImages = [
    `${baseUrl}/assets/fmkal_ui_showcase_png_1792038188349.jpg`,
    `${baseUrl}/logo-black-full.png`,
  ];

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0, includeImages: true },
    { path: '/hizmetler', changeFrequency: 'monthly' as const, priority: 0.9, includeImages: true },
    { path: '/projeler', changeFrequency: 'weekly' as const, priority: 0.9, includeImages: true },
    { path: '/web-siteleri', changeFrequency: 'weekly' as const, priority: 0.9, includeImages: true },
    { path: '/vaka-analizleri', changeFrequency: 'weekly' as const, priority: 0.9, includeImages: true },
    { path: '/hakkimda', changeFrequency: 'monthly' as const, priority: 0.8, includeImages: false },
    { path: '/iletisim', changeFrequency: 'yearly' as const, priority: 0.9, includeImages: false },
    { path: '/gizlilik-politikasi', changeFrequency: 'yearly' as const, priority: 0.5, includeImages: false },
    { path: '/kullanim-kosullari', changeFrequency: 'yearly' as const, priority: 0.5, includeImages: false },
  ];

  return routes.map((route) => {
    const fullUrl = `${baseUrl}${route.path}`;
    return {
      url: fullUrl,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'tr-TR': fullUrl,
          'en-US': fullUrl,
          'ko-KR': fullUrl,
          'x-default': fullUrl,
        },
      },
      ...(route.includeImages ? { images: defaultImages } : {}),
    };
  });
}

