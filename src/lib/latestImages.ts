/**
 * Resolves which Sacred Images appear in the home page "Bible Image Gallery
 * Preview" (newest by `dateAdded`) and the `/images` spotlight (featured flag).
 */

import { parseDateValue, refTitle } from './featured';

export interface GalleryImageItem {
  slug: string;
  title?: string | null;
  category?: string | null;
  image?: string | null;
  scripture?: string | null;
  description?: string | null;
  citation?: string | null;
}

export interface GalleryImageNode {
  _sys?: { filename?: string | null } | null;
  title?: string | null;
  category?: { title?: string | null } | string | null;
  image?: string | null;
  scripture?: string | null;
  description?: string | null;
  citation?: string | null;
  dateAdded?: string | null;
  featured?: string | null;
}

function toItem(node: GalleryImageNode): GalleryImageItem {
  return {
    slug: node._sys!.filename!,
    title: node.title,
    category: refTitle(node.category),
    image: node.image,
    scripture: node.scripture,
    description: node.description,
    citation: node.citation,
  };
}

/** The N most recently added images for the home gallery preview. */
export function resolveLatestImages(
  nodes: (GalleryImageNode | null | undefined)[] | null | undefined,
  limit = 6
): GalleryImageItem[] {
  const usable = (nodes ?? []).filter(
    (n): n is GalleryImageNode => Boolean(n?.title && n?._sys?.filename)
  );

  return [...usable]
    .sort(
      (a, b) =>
        parseDateValue(b.dateAdded) - parseDateValue(a.dateAdded) ||
        (a.title ?? '').localeCompare(b.title ?? '')
    )
    .slice(0, limit)
    .map(toItem);
}

/**
 * Resolves the image for the `/images` spotlight: docs marked featured='yes'
 * win (newest Date Added first); falls back to the newest image.
 */
export function resolveFeaturedImage(
  nodes: (GalleryImageNode | null | undefined)[] | null | undefined
): GalleryImageItem | null {
  const usable = (nodes ?? []).filter(
    (n): n is GalleryImageNode => Boolean(n?.title && n?._sys?.filename)
  );
  if (usable.length === 0) return null;

  const featured = usable.filter(
    (n) => n.featured?.trim().toLowerCase() === 'yes'
  );

  return resolveLatestImages(featured.length > 0 ? featured : usable, 1)[0] ?? null;
}
