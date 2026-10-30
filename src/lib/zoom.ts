/**
 * Zoom seminar helpers for SCRIPTURA Digital Library.
 * A single "next seminar" is derived from the Seminars & Zoom page content and is
 * shared by the home page banner and the announcement bar.
 */

export function getValidZoomUrl(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;

    const hostname = parsed.hostname.toLowerCase();
    const isZoomHost =
      hostname === 'zoom.us' ||
      hostname.endsWith('.zoom.us') ||
      hostname === 'zoomgov.com' ||
      hostname.endsWith('.zoomgov.com');

    if (!isZoomHost) return null;

    return trimmed;
  } catch {
    return null;
  }
}

export interface UpcomingSeminarCandidate {
  title?: string | null;
  description?: string | null;
  speaker?: string | null;
  dateStr?: string | null;
  timeStr?: string | null;
  parsedDate: Date | null;
  zoomUrl: string | null;
  isFeatured: boolean;
  isUpcoming: boolean;
  isLive: boolean;
  isFuture: boolean;
}

export const SEMINAR_DURATION_MS = 3 * 60 * 60 * 1000;
const DEFAULT_TIME_ZONE_OFFSET = 'GMT+0530';

function timeZoneSuffix(timeStr?: string | null): string {
  const match = (timeStr || '').match(/\b(EST|EDT|CST|CDT|MST|MDT|PST|PDT|UTC|GMT|IST)\b/i);
  if (!match) return DEFAULT_TIME_ZONE_OFFSET;
  const zone = match[1].toUpperCase();
  return zone === 'IST' ? DEFAULT_TIME_ZONE_OFFSET : zone;
}

/**
 * Parse seminar date and time strings into a Date.
 * Handles "July 4, 2024", "Thursday, March 20, 2025", "7:00 PM EST" and ranges like
 * "7:00 PM - 8:30 PM EST". A time zone in the time text is respected; without one the
 * time is read as India time (IST). A date without a time counts as the end of that day.
 */
export function parseSeminarDateTime(dateStr?: string | null, timeStr?: string | null): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const cleanDate = dateStr
    .trim()
    .replace(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)[,\s]+/i, '');
  if (!cleanDate) return null;

  const zone = timeZoneSuffix(timeStr);
  let cleanTime = '';
  if (timeStr && typeof timeStr === 'string') {
    const timeMatch = timeStr.match(/\b\d{1,2}:\d{2}\s*(?:AM|PM)?/i);
    if (timeMatch) {
      cleanTime = timeMatch[0].trim();
      if (!/AM|PM/i.test(cleanTime)) {
        if (/PM/i.test(timeStr)) cleanTime += ' PM';
        else if (/AM/i.test(timeStr)) cleanTime += ' AM';
      }
    }
  }

  const attempt = Date.parse(`${cleanDate} ${cleanTime || '11:59 PM'} ${zone}`);
  if (!isNaN(attempt)) return new Date(attempt);

  const fallback = Date.parse(cleanDate);
  return isNaN(fallback) ? null : new Date(fallback);
}

function buildCandidate(
  base: Omit<UpcomingSeminarCandidate, 'parsedDate' | 'isLive' | 'isFuture'>,
  dateStr?: string | null,
  timeStr?: string | null,
  now: number = Date.now()
): UpcomingSeminarCandidate {
  const parsedDate = parseSeminarDateTime(dateStr, timeStr);
  const start = parsedDate?.getTime();
  const hasTime = /\d{1,2}:\d{2}/.test(timeStr || '');
  const isFuture = start !== undefined && start + SEMINAR_DURATION_MS >= now;
  const isLive = Boolean(hasTime && start !== undefined && start <= now && now < start + SEMINAR_DURATION_MS);
  return { ...base, parsedDate, isLive, isFuture };
}

/**
 * Determines the next seminar from the Seminars & Zoom page content: the Featured Meeting
 * plus every session marked "Upcoming". The soonest seminar that has not finished wins.
 * If every date has passed, the Featured Meeting is used so there is always something to show.
 * The Zoom link is optional; it is only set when it is a valid Zoom URL.
 */
export function resolveUpcomingZoomSeminar(
  zoomInfoData?: any,
  now: number = Date.now()
): UpcomingSeminarCandidate | null {
  if (!zoomInfoData) return null;

  const candidates: UpcomingSeminarCandidate[] = [];

  const fm = zoomInfoData.featuredMeeting;
  if (fm?.title) {
    candidates.push(
      buildCandidate(
        {
          title: fm.title,
          description: fm.description,
          speaker: null,
          dateStr: fm.date || '',
          timeStr: fm.time || '',
          zoomUrl: getValidZoomUrl(fm.zoomUrl),
          isFeatured: true,
          isUpcoming: true,
        },
        fm.date,
        fm.time,
        now
      )
    );
  }

  const sessions = Array.isArray(zoomInfoData.sessions) ? zoomInfoData.sessions : [];
  for (const session of sessions) {
    if (!session?.title) continue;
    const isUpcoming = !session.status || /upcoming/i.test(session.status);
    if (!isUpcoming) continue;
    candidates.push(
      buildCandidate(
        {
          title: session.title,
          description: session.description,
          speaker: session.speaker,
          dateStr: session.date || '',
          timeStr: session.timeOrActionText || '',
          zoomUrl: getValidZoomUrl(session.actionUrl || session.zoomUrl),
          isFeatured: false,
          isUpcoming: true,
        },
        session.date,
        session.timeOrActionText,
        now
      )
    );
  }

  if (candidates.length === 0) return null;

  const future = candidates
    .filter((c) => c.isFuture)
    .sort((a, b) => (a.parsedDate?.getTime() ?? 0) - (b.parsedDate?.getTime() ?? 0));
  if (future.length > 0) return future[0];

  return candidates.find((c) => c.isFeatured) || candidates[0];
}
