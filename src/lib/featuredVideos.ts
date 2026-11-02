/**
 * Resolves which videos appear in the home page "Featured Bible Videos" section.
 * Slot/conflict logic lives in @/lib/featured; this maps videos into card shape.
 */

import { parseDateValue, resolveFeaturedSlots } from './featured';

export { refTitle, formatRecordedDate } from './featured';

export interface FeaturedVideoItem {
  slug: string;
  title: string;
  series?: string | null;
  description?: string | null;
  duration?: string | null;
  thumbnail?: string | null;
}

export interface FeaturedVideoNode {
  _sys?: { filename?: string | null } | null;
  title?: string | null;
  series?: { title?: string | null } | string | null;
  description?: string | null;
  duration?: string | null;
  thumbnail?: string | null;
  recordedDate?: string | null;
  featured?: string | null;
  featuredPosition?: string | null;
}

export function resolveFeaturedVideos(
  nodes: (FeaturedVideoNode | null | undefined)[] | null | undefined,
  limit = 3
): FeaturedVideoItem[] {
  const usable = (nodes ?? []).filter(
    (n): n is FeaturedVideoNode => Boolean(n?.title && n?._sys?.filename)
  );

  return resolveFeaturedSlots(usable, {
    limit,
    getTimestamp: (n) => parseDateValue(n.recordedDate),
    getKey: (n) => n.title ?? '',
  }).map((node) => ({
    slug: node._sys!.filename!,
    title: node.title!,
    series: typeof node.series === 'string' ? node.series : node.series?.title ?? '',
    description: node.description,
    duration: node.duration,
    thumbnail: node.thumbnail,
  }));
}
