/** Featured books/magazines for home + the /books & /magazines spotlights. */
import { parseDateValue, resolveFeaturedSlots } from './featured';

export interface PubNode {
  _sys?: { filename?: string | null } | null;
  title?: string | null;
  featured?: string | null;
  featuredPosition?: string | null;
  publishDate?: string | null;
  [key: string]: unknown;
}

function resolve<T extends PubNode>(
  nodes: (T | null | undefined)[] | null | undefined,
  limit: number,
  getTimestamp: (n: T) => number
): T[] {
  const usable = (nodes ?? []).filter(
    (n): n is T => Boolean(n?.title && n?._sys?.filename)
  );
  return resolveFeaturedSlots(usable, {
    limit,
    getTimestamp,
    getKey: (n) => n.title ?? '',
  });
}

/** Books have no date field — positions + title order decide. */
export const resolveFeaturedBooks = (n: (PubNode | null | undefined)[] | null | undefined, limit = 2) =>
  resolve(n, limit, () => 0);

export const resolveFeaturedMagazines = (n: (PubNode | null | undefined)[] | null | undefined, limit = 2) =>
  resolve(n, limit, (m) => parseDateValue(m.publishDate));

/** Newest magazine by publishDate, optionally excluding a slug (the hero's pick). */
export function resolveLatestMagazine(
  nodes: (PubNode | null | undefined)[] | null | undefined,
  excludeSlug?: string
): PubNode | null {
  const usable = (nodes ?? []).filter(
    (n): n is PubNode => Boolean(n?.title && n?._sys?.filename && n._sys.filename !== excludeSlug)
  );
  return (
    [...usable].sort(
      (a, b) => parseDateValue(b.publishDate) - parseDateValue(a.publishDate)
    )[0] ?? usable[0] ?? null
  );
}
