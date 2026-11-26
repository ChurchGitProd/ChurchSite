/** Featured books for home + the /books spotlight. */
import { resolveFeaturedSlots } from './featured';

export interface PubNode {
  _sys?: { filename?: string | null } | null;
  title?: string | null;
  featured?: string | null;
  featuredPosition?: string | null;
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
