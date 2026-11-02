/**
 * Shared logic for CMS-managed "featured on home page" sections.
 *
 * Documents opt in via `featured: 'yes'` and claim a home slot via
 * `featuredPosition` (1..limit). Candidates are sorted newest-first; the first
 * to claim a slot wins, later (older) claimants fall back to a pool that
 * backfills any empty slots so the section always shows up to `limit` items.
 */

export interface FeaturedSlottable {
  featured?: string | null;
  featuredPosition?: string | null;
}

export interface ResolveFeaturedOptions<T> {
  limit?: number;
  /** Timestamp used for "newest wins" ordering (0 = unknown/oldest). */
  getTimestamp: (node: T) => number;
  /** Deterministic tie-breaker when timestamps are equal. */
  getKey: (node: T) => string;
}

const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** Parses flexible date strings: ISO, "March 2025", "March 15, 2025", or a bare year. */
export function parseDateValue(value?: string | null): number {
  const raw = value?.trim();
  if (!raw) return 0;

  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) return parsed;

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

/** Formats a date value (ISO or legacy "March 2025") for display. */
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

/** Assigns featured nodes to fixed slots and backfills the rest. */
export function resolveFeaturedSlots<T extends FeaturedSlottable>(
  nodes: (T | null | undefined)[] | null | undefined,
  { limit = 3, getTimestamp, getKey }: ResolveFeaturedOptions<T>
): T[] {
  const usable = (nodes ?? []).filter((n): n is T => Boolean(n));

  const byRecency = (a: T, b: T) =>
    getTimestamp(b) - getTimestamp(a) || getKey(a).localeCompare(getKey(b));

  const isFeatured = (n: T) => n.featured?.trim().toLowerCase() === 'yes';

  const slots: (T | null)[] = new Array(limit).fill(null);
  const pool: T[] = [];

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

  return result.filter((n): n is T => Boolean(n));
}
