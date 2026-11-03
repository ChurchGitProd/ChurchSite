import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// Explicit allowlist of external hosts permitted for proxied download
const ALLOWED_EXTERNAL_HOSTS = new Set([
  'uxmagic.blob.core.windows.net',
  'images.unsplash.com',
]);

// Allowed file extensions
const ALLOWED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.pdf',
  '.epub',
  '.mobi',
  '.txt',
  '.docx',
]);

const MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.epub': 'application/epub+zip',
  '.mobi': 'application/x-mobipocket-ebook',
  '.txt': 'text/plain; charset=utf-8',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

// Sanitize filename to prevent header injection or path anomalies
function sanitizeFilename(name: string): string {
  const sanitized = name.replace(/[\r\n"\\]/g, '').replace(/[^a-zA-Z0-9._ -]/g, '_').trim();
  return sanitized.length > 0 ? sanitized : 'download';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get('url');
  const localFile = searchParams.get('file');
  const customFilename = searchParams.get('filename');
  const isInline = searchParams.get('inline') === 'true' || searchParams.get('preview') === 'true';
  const dispositionType = isInline ? 'inline' : 'attachment';

  const cleanFilename = sanitizeFilename(customFilename || 'download');

  // Case 1: Approved external URL download (e.g. Azure Blob images)
  if (rawUrl) {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (parsedUrl.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only HTTPS URLs are permitted' }, { status: 400 });
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    if (!ALLOWED_EXTERNAL_HOSTS.has(hostname)) {
      return NextResponse.json({ error: 'External host is not permitted' }, { status: 403 });
    }

    // Restrict uxmagic host to known safe agent-images path
    if (hostname === 'uxmagic.blob.core.windows.net' && !parsedUrl.pathname.startsWith('/public/agent-images/')) {
      return NextResponse.json({ error: 'Path not permitted' }, { status: 403 });
    }

    const ext = path.extname(parsedUrl.pathname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: 'File type not permitted' }, { status: 403 });
    }

    try {
      const response = await fetch(parsedUrl.toString());

      if (!response.ok) {
        return NextResponse.json(
          { error: `Upstream resource returned status ${response.status}` },
          { status: response.status === 404 ? 404 : 502 }
        );
      }

      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const contentLength = response.headers.get('content-length');

      const headers = new Headers();
      headers.set('Content-Disposition', `${dispositionType}; filename="${cleanFilename}"`);
      headers.set('Content-Type', contentType);
      if (contentLength) {
        headers.set('Content-Length', contentLength);
      }
      headers.set('Cache-Control', 'public, max-age=86400, immutable');

      return new Response(response.body, {
        status: 200,
        headers,
      });
    } catch (err) {
      console.error('Error fetching remote download asset:', err);
      return NextResponse.json({ error: 'Failed to retrieve asset' }, { status: 502 });
    }
  }

  // Case 2: Local document path in public/documents/ or public/uploads/
  // Served by fetching the static asset from this deployment's own origin —
  // serverless hosts don't give functions filesystem access to public/.
  if (localFile) {
    let decodedLocal = localFile;
    try {
      decodedLocal = decodeURIComponent(localFile);
    } catch {
      // Keep original if decoding fails
    }

    if (decodedLocal.includes('..') || localFile.includes('..')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // Strip leading slashes and normalize separators
    const normalizedLocal = decodedLocal.replace(/^[/\\]+/, '').replace(/\\/g, '/');

    // Bare filenames try documents/ first, then uploads/
    const candidates =
      normalizedLocal.startsWith('uploads/') || normalizedLocal.startsWith('documents/')
        ? [normalizedLocal]
        : [`documents/${normalizedLocal}`, `uploads/${normalizedLocal}`];

    const ext = path.extname(normalizedLocal).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: 'File type not permitted' }, { status: 403 });
    }

    const origin = new URL(request.url).origin;
    let upstream: Response | null = null;
    let servedPath = '';
    for (const rel of candidates) {
      try {
        const res = await fetch(`${origin}/${rel}`);
        if (res.ok) {
          upstream = res;
          servedPath = rel;
          break;
        }
      } catch {
        // Try the next candidate
      }
    }

    if (!upstream) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const rawName = customFilename ? cleanFilename : sanitizeFilename(path.basename(servedPath));
    let downloadFilename = rawName;
    if (ext && !downloadFilename.toLowerCase().endsWith(ext)) {
      downloadFilename = `${downloadFilename}${ext}`;
    }

    const headers = new Headers();
    headers.set('Content-Disposition', `${dispositionType}; filename="${downloadFilename}"`);
    headers.set('Content-Type', upstream.headers.get('content-type') || MIME_TYPES[ext] || 'application/octet-stream');
    const contentLength = upstream.headers.get('content-length');
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
    headers.set('Cache-Control', isInline ? 'public, max-age=3600, stale-while-revalidate=86400' : 'no-cache');

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  }

  return NextResponse.json({ error: 'No download target specified' }, { status: 400 });
}
