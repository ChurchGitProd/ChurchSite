/**
 * Resolves which videos appear in the home page "Featured Bible Videos" section.
 *
 * Videos opt in via `featured: 'yes'` and claim a home slot via
 * `featuredPosition` (1..3). If multiple featured videos claim the same slot,
 * the one with the most recent `recordedDate` wins. Empty slots are backfilled
 * with the most recently recorded remaining videos so the section always shows
 * up to `limit` cards.
 */

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

const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function recordedTimestamp(value?: string | null): number {
  const raw = value?.trim();
  if (!raw) return 0;

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) return parsed;

  // Handles loose strings like "March 2025" or "March 15, 2025"
  const monthYear = raw.match(
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s*(\d{4})/i
  );
  if (monthYear) {
    return new Date(Number(monthYear[2]), MONTH_INDEX[monthYear[1].toLowerCase()], 1).getTime();
  }

  const yearOnly = raw.match(/\b(\d{4})\b/);
  if (yearOnly) return new Date(Number(yearOnly[1]), 0, 1).getTime();

  return 0;
}

/** Reads the display name from a Tina reference field (or a plain string). */
export function refTitle(ref?: { title?: string | null } | string | null): string {
  if (!ref) return '';
  if (typeof ref === 'string') return ref;
  return ref.title ?? '';
}

/** Formats a recordedDate value (ISO or legacy "March 2025") for display. */
export function formatRecordedDate(value?: string | null): string {
  const raw = value?.trim();
  if (!raw) return '';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

export function resolveFeaturedVideos(
  nodes: (FeaturedVideoNode | null | undefined)[] | null | undefined,
  limit = 3
): FeaturedVideoItem[] {
  const usable = (nodes ?? []).filter(
    (n): n is FeaturedVideoNode => Boolean(n?.title && n?._sys?.filename)
  );

  // Newest recording first; title breaks ties deterministically.
  const byRecency = (a: FeaturedVideoNode, b: FeaturedVideoNode) =>
    recordedTimestamp(b.recordedDate) - recordedTimestamp(a.recordedDate) ||
    (a.title ?? '').localeCompare(b.title ?? '');

  const isFeatured = (n: FeaturedVideoNode) =>
    n.featured?.trim().toLowerCase() === 'yes';

  const slots: (FeaturedVideoNode | null)[] = new Array(limit).fill(null);
  const pool: FeaturedVideoNode[] = [];

  // Featured nodes are sorted newest-first, so the first to claim a slot is
  // the most recently recorded; later (older) claimants fall back to the pool.
  for (const node of usable.filter(isFeatured).sort(byRecency)) {
    const position = Number(node.featuredPosition?.trim());
    if (
      Number.isInteger(position) &&
      position >= 1 &&
      position <= limit &&
      !slots[position - 1]
    ) {
      slots[position - 1] = node;
    } else {
      pool.push(node);
    }
  }

  pool.push(...usable.filter((n) => !isFeatured(n)));
  pool.sort(byRecency);

  const result = [...slots];
  for (let i = 0; i < result.length && pool.length > 0; i++) {
    if (!result[i]) result[i] = pool.shift()!;
  }

  return result
    .filter((n): n is FeaturedVideoNode => Boolean(n))
    .map((node) => ({
      slug: node._sys!.filename!,
      title: node.title!,
      series: refTitle(node.series),
      description: node.description,
      duration: node.duration,
      thumbnail: node.thumbnail,
    }));
}
