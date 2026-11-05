// Must match media.tina.mediaRoot in tina/config.ts
const MEDIA_ROOT = '/uploads';

function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// Encodes a local path exactly once, whether or not it was already encoded
// (Tina stores some values as "/uploads/My%20File.pdf", others with raw spaces).
function encodeLocalPath(value: string): string {
  return encodeURI(decodeURIComponentSafe(value));
}

// Same idea for absolute URLs, which must not have %2F/%3F-style escapes decoded.
function encodeAbsoluteUrl(value: string): string {
  return /%[0-9a-f]{2}/i.test(value) ? value.replace(/ /g, '%20') : encodeURI(value);
}

/**
 * Utility to sanitize and normalize image URLs.
 *
 * Resolves TinaCloud media resolution quirks where TinaCloud's GraphQL API
 * prepends `https://assets.tina.io/<clientId>/` to:
 * 1. Absolute external URLs (e.g. Unsplash, Azure Blob) -> Strips the prepended assets.tina.io
 * 2. Local public repository assets (e.g. /hero-image.webp, /uploads/*) -> Returns the clean local path
 * 3. Paths with spaces -> URL encodes them (e.g. /hero image.webp -> /hero%20image.webp)
 */
export function sanitizeImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();

  // 1. Check if TinaCMS / TinaCloud prepended uploads or assets.tina.io to an absolute http(s) URL
  // e.g. "/uploadshttps://...", "/uploads/https://...", "https://assets.tina.io/<id>/uploadshttps://...", "https://assets.tina.io/<id>https://..."
  const nestedHttpMatch = trimmed.match(
    /(?:https?:\/\/[^\/]*assets\.tina\.io\/[^\/]+[\/]?)?(?:\/?uploads[\/]?)?(https?:\/\/.+)$/i
  );
  if (nestedHttpMatch && nestedHttpMatch[1]) {
    const nested = nestedHttpMatch[1];
    if (trimmed !== nested) {
      return nested;
    }
  }

  // 2. TinaCloud prepended its domain to a local repo asset in public/ (e.g. /hero, /uploads, /documents, /images)
  // e.g. "https://assets.tina.io/8806b500-960f-4f66-b582-b1fe3d6c3111/hero image.webp"
  // or "https://assets.tina.io/8806b500-960f-4f66-b582-b1fe3d6c3111/uploads/Qumran Caves.jpg"
  const localMatch = trimmed.match(
    /^https?:\/\/[^\/]*assets\.tina\.io\/[^\/]+(\/(?:hero[^\/?#]*|(?:uploads|documents|images)\/[^?#]*))/i
  );
  if (localMatch && localMatch[1]) {
    return encodeURI(decodeURIComponentSafe(localMatch[1]));
  }

  // 3. Tina Cloud drops the media root from asset URLs, e.g. a file stored at
  // /uploads/Bible.jpg comes back as https://assets.tina.io/<id>/Bible.jpg.
  // Re-attach the media root so it resolves to the file deployed from public/uploads.
  const localRootMatch = trimmed.match(
    /^https?:\/\/[^\/]*assets\.tina\.io\/[^\/]+\/([^\/?#]+\.(?:webp|png|jpg|jpeg|gif|svg|ico|avif))/i
  );
  if (localRootMatch && localRootMatch[1]) {
    return encodeURI(`${MEDIA_ROOT}/${decodeURIComponentSafe(localRootMatch[1])}`);
  }

  // 4. Standalone relative path (e.g. "/hero image.webp")
  if (trimmed.startsWith('/')) {
    return encodeLocalPath(trimmed);
  }

  // 5. Root-relative asset path missing its leading slash (e.g. "uploads/x.png").
  // Left as-is it resolves against the current page URL — /uploads/x.png works
  // on the homepage but 404s everywhere else.
  if (/^(?:uploads|documents|images)\//i.test(trimmed)) {
    return encodeLocalPath(`/${trimmed}`);
  }

  return trimmed;
}

/**
 * Checks whether a given URL or file path points to a valid PDF file.
 * Safely ignores query strings, hash anchors, and leading/trailing whitespace.
 */
export function isValidPdfUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.split('?')[0].split('#')[0].toLowerCase().trim();
  return clean.endsWith('.pdf');
}

/**
 * Utility to sanitize and normalize document (PDF) URLs.
 * Ensures local paths have a leading slash, encodes spaces,
 * strips prepended assets.tina.io domains, and returns a safe URL.
 */
export function sanitizeDocumentUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  // 1. Strip nested prepended assets.tina.io or /uploads prefixing an absolute http(s) URL
  const nestedHttpMatch = trimmed.match(
    /(?:https?:\/\/[^\/]*assets\.tina\.io\/[^\/]+[\/]?)?(?:\/?uploads[\/]?)?(https?:\/\/.+)$/i
  );
  if (nestedHttpMatch && nestedHttpMatch[1] && trimmed !== nestedHttpMatch[1]) {
    return encodeAbsoluteUrl(nestedHttpMatch[1]);
  }

  // 2. TinaCloud domain prepended to a local repo asset (e.g. uploads/ or documents/)
  const localMatch = trimmed.match(
    /^https?:\/\/[^\/]*assets\.tina\.io\/[^\/]+(\/(?:uploads|documents)\/[^?#]*)/i
  );
  if (localMatch && localMatch[1]) {
    return encodeURI(decodeURIComponentSafe(localMatch[1]));
  }

  // 2b. TinaCloud drops the media root: /uploads/x.pdf comes back as assets.tina.io/<id>/x.pdf
  const rootFileMatch = trimmed.match(/^https?:\/\/[^\/]*assets\.tina\.io\/[^\/]+\/([^\/?#]+\.[a-z0-9]+)$/i);
  if (rootFileMatch && rootFileMatch[1]) {
    return encodeURI(`${MEDIA_ROOT}/${decodeURIComponentSafe(rootFileMatch[1])}`);
  }

  // 3. Relative path starting without leading slash (e.g. "uploads/sample.pdf" -> "/uploads/sample.pdf")
  if (trimmed.startsWith('uploads/') || trimmed.startsWith('documents/')) {
    return encodeLocalPath(`/${trimmed}`);
  }

  // 4. Already has a leading slash
  if (trimmed.startsWith('/')) {
    return encodeLocalPath(trimmed);
  }

  // 5. External HTTP(S) URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return encodeAbsoluteUrl(trimmed);
  }

  return encodeLocalPath(`/${trimmed}`);
}
