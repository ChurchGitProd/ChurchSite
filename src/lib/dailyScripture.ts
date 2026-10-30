export const SCRIPTURE_TIME_ZONE = 'Asia/Kolkata';

export interface DailyVerseEntry {
  day?: number | null;
  verse?: string | null;
  reference?: string | null;
}

export interface ScriptureOfTheDayData {
  verse?: string | null;
  reference?: string | null;
  dailyVerses?: (DailyVerseEntry | null)[] | null;
}

export interface ResolvedScripture {
  verse: string;
  reference: string;
}

const DEFAULT_SCRIPTURE: ResolvedScripture = {
  verse: 'Your word is a lamp to my feet and a light to my path.',
  reference: 'Psalm 119:105 (ESV)',
};

export function getDayOfMonth(now: Date = new Date(), timeZone: string = SCRIPTURE_TIME_ZONE): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, day: 'numeric' }).formatToParts(now);
  return Number(parts.find((p) => p.type === 'day')?.value);
}

export function resolveDailyScripture(
  data?: ScriptureOfTheDayData | null,
  now: Date = new Date()
): ResolvedScripture {
  const byDay = new Map<number, ResolvedScripture>();
  for (const entry of data?.dailyVerses ?? []) {
    const verse = entry?.verse?.trim();
    const reference = entry?.reference?.trim();
    if (entry?.day && verse && reference && !byDay.has(entry.day)) {
      byDay.set(entry.day, { verse, reference });
    }
  }

  const today = getDayOfMonth(now);
  for (let offset = 0; offset < 31 && byDay.size > 0; offset++) {
    const day = ((today - 1 - offset + 31) % 31) + 1;
    const match = byDay.get(day);
    if (match) return match;
  }

  const verse = data?.verse?.trim();
  const reference = data?.reference?.trim();
  return verse && reference ? { verse, reference } : DEFAULT_SCRIPTURE;
}
