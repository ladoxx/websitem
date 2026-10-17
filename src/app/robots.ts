import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video'],
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: ['Yeti', 'NaverBot'],
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://fmkal.com/sitemap.xml',
    host: 'https://fmkal.com',
  };
}

