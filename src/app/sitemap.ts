import { MetadataRoute } from 'next';
import { client } from '../../tina/__generated__/client';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://scripturadigitallibrary.netlify.app';

const STATIC_ROUTES = [
  '',
  '/about',
  '/lessons',
  '/references',
  '/images',
  '/videos',
  '/books',
  '/magazines',
  '/contact',
  '/zoom-info',
];

const COLLECTIONS: Array<[string, string]> = [
  ['lessonConnection', '/lessons'],
  ['bibleReferenceConnection', '/references'],
  ['bibleImageConnection', '/images'],
  ['videoConnection', '/videos'],
  ['bookConnection', '/books'],
  ['magazineConnection', '/magazines'],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority:
      route === '' ? 1.0 : route === '/lessons' || route === '/books' ? 0.9 : 0.8,
  }));

  for (const [connection, base] of COLLECTIONS) {
    try {
      const res = await (client.queries as any)[connection]();
      const edges = res?.data?.[connection]?.edges || [];
      for (const edge of edges) {
        const slug = edge?.node?._sys?.filename;
        if (slug) {
          routes.push({
            url: `${BASE_URL}${base}/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      }
    } catch {
      // collection unavailable — skip its routes
    }
  }

  return routes;
}
