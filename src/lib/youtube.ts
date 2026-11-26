/**
 * Safe YouTube URL utilities for SCRIPTURA Digital Library.
 * Enforces strict YouTube host validation, extracts canonical 11-char video IDs,
 * and generates privacy-enhanced embed URLs and thumbnails.
 */

export function extractYouTubeId(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Direct 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();

    // Verify authorized YouTube hostnames
    const isYouTubeHost =
      hostname === 'youtube.com' ||
      hostname.endsWith('.youtube.com') ||
      hostname === 'youtu.be' ||
      hostname === 'youtube-nocookie.com' ||
      hostname.endsWith('.youtube-nocookie.com');

    if (!isYouTubeHost) return null;

    let id: string | null = null;

    if (hostname === 'youtu.be') {
      // https://youtu.be/VIDEO_ID
      id = parsed.pathname.slice(1).split('/')[0] || null;
    } else if (parsed.pathname.startsWith('/watch')) {
      // https://www.youtube.com/watch?v=VIDEO_ID
      id = parsed.searchParams.get('v');
    } else if (parsed.pathname.startsWith('/embed/')) {
      // https://www.youtube.com/embed/VIDEO_ID or https://www.youtube-nocookie.com/embed/VIDEO_ID
      id = parsed.pathname.replace('/embed/', '').split('/')[0] || null;
    } else if (parsed.pathname.startsWith('/shorts/')) {
      // https://www.youtube.com/shorts/VIDEO_ID
      id = parsed.pathname.replace('/shorts/', '').split('/')[0] || null;
    }

    // Validate 11-character alphanumeric/dash/underscore video ID format
    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return id;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Extracts a YouTube playlist ID from a URL or raw ID string.
 * Supports standard URLs (e.g. https://www.youtube.com/playlist?list=PL...),
 * watch URLs with &list=, youtu.be?list=, and direct IDs (e.g. PL...).
 */
export function extractYouTubePlaylistId(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Direct playlist ID format (typically starts with PL, UU, LL, FL, RD, etc. and is 12+ chars)
  if (/^(?:PL|UU|LL|FL|RD|OLAK5uy_)[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const isYouTubeHost =
      hostname === 'youtube.com' ||
      hostname.endsWith('.youtube.com') ||
      hostname === 'youtu.be' ||
      hostname === 'youtube-nocookie.com' ||
      hostname.endsWith('.youtube-nocookie.com');

    if (!isYouTubeHost) return null;

    const listParam = parsed.searchParams.get('list');
    if (listParam && /^[a-zA-Z0-9_-]{10,}$/.test(listParam)) {
      return listParam;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Returns a high-quality direct YouTube thumbnail URL for a given video URL or ID.
 * Returns null if the URL or video ID is invalid.
 */
export function getYouTubeThumbnailUrl(
  url?: string | null,
  quality: 'hq' | 'maxres' = 'hq'
): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault.jpg' : 'hqdefault.jpg'}`;
}

/**
 * Generates an official, privacy-enhanced YouTube embed URL from an editor-supplied URL.
 * Returns null if the URL is missing, invalid, or belongs to an unauthorized domain.
 */
export function getYouTubeEmbedUrl(url?: string | null): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

/**
 * Formats an ISO 8601 duration string (e.g. PT28M15S, PT1H5M30S, PT45S)
 * into the project's standard display format (e.g. '28:15', '1:05:30').
 * Returns null if the input is invalid or missing.
 */
export function formatIsoDuration(iso?: string | null): string | null {
  if (!iso || typeof iso !== 'string') return null;
  const trimmed = iso.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
  if (!match) return null;

  const days = parseInt(match[1] || '0', 10);
  const hours = parseInt(match[2] || '0', 10) + days * 24;
  const minutes = parseInt(match[3] || '0', 10);
  const seconds = parseInt(match[4] || '0', 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


