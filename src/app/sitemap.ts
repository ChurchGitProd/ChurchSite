import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scripturadigitallibrary.netlify.app';

  const routes = [
    '',
    '/about',
    '/lessons',
    '/references',
    '/videos',
    '/images',
    '/books',
    '/library',
    '/magazines',
    '/newsletter',
    '/archives',
    '/resources',
    '/quick-links',
    '/contact',
    '/zoom-info',
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/lessons' || route === '/books' ? 0.9 : 0.8,
  }));
}
