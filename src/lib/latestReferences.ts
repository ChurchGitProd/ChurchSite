/**
 * Resolves which scripture references appear in the home page
 * "Latest Bible References" section — the N most recent by `addedDate`.
 */

import { parseDateValue } from './featured';

export interface LatestReferenceItem {
  slug: string;
  reference?: string | null;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: (string | null)[] | null;
  crossReferences?: string | null;
  link?: string | null;
}

export interface LatestReferenceNode {
  _sys?: { filename?: string | null } | null;
  title?: string | null;
  scripture?: string | null;
  category?: string | null;
  description?: string | null;
  tags?: (string | null)[] | null;
  crossReferences?: string | null;
  addedDate?: string | null;
  featured?: string | null;
}

export function resolveLatestReferences(
  nodes: (LatestReferenceNode | null | undefined)[] | null | undefined,
  limit = 2
): LatestReferenceItem[] {
  const usable = (nodes ?? []).filter(
    (n): n is LatestReferenceNode => Boolean(n?.title && n?._sys?.filename)
  );

  return [...usable]
    .sort(
      (a, b) =>
        parseDateValue(b.addedDate) - parseDateValue(a.addedDate) ||
        (a.title ?? '').localeCompare(b.title ?? '')
    )
    .slice(0, limit)
    .map((node) => ({
      slug: node._sys!.filename!,
      reference: node.scripture,
      category: node.category,
      title: node.title,
      description: node.description,
      tags: node.tags,
      crossReferences: node.crossReferences,
      link: `/references/${node._sys!.filename}`,
    }));
}

/**
 * Resolves the reference for the "Featured Scholarly Reference" spotlight on
 * /references: docs marked featured='yes' win (newest Date Added first);
 * falls back to the newest reference so the spotlight never renders empty.
 */
export function resolveFeaturedReference(
  nodes: (LatestReferenceNode | null | undefined)[] | null | undefined
): LatestReferenceItem | null {
  const usable = (nodes ?? []).filter(
    (n): n is LatestReferenceNode => Boolean(n?.title && n?._sys?.filename)
  );
  if (usable.length === 0) return null;

  const featured = usable.filter(
    (n) => n.featured?.trim().toLowerCase() === 'yes'
  );

  return (
    resolveLatestReferences(featured.length > 0 ? featured : usable, 1)[0] ?? null
  );
}
