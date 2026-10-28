import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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

    const publicDir = path.resolve(process.cwd(), 'public');
    const documentsDir = path.resolve(publicDir, 'documents');
    const uploadsDir = path.resolve(publicDir, 'uploads');

    // Strip leading slashes and normalize separators
    const normalizedLocal = decodedLocal.replace(/^[/\\]+/, '').replace(/\\/g, '/');

    let resolvedPath: string;
    if (normalizedLocal.startsWith('uploads/') || normalizedLocal.startsWith('documents/')) {
      resolvedPath = path.resolve(publicDir, normalizedLocal);
    } else {
      const inDocs = path.resolve(documentsDir, normalizedLocal);
      const inUploads = path.resolve(uploadsDir, normalizedLocal);
      resolvedPath = fs.existsSync(inDocs) ? inDocs : inUploads;
    }

    // Prevent directory traversal attacks: must reside strictly within documentsDir or uploadsDir
    const isInsideDocs = resolvedPath.startsWith(documentsDir + path.sep);
    const isInsideUploads = resolvedPath.startsWith(uploadsDir + path.sep);

    if (!isInsideDocs && !isInsideUploads) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: 'File type not permitted' }, { status: 403 });
    }

    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) {
      return NextResponse.json({ error: 'Not a file' }, { status: 400 });
    }

    const rawName = customFilename ? cleanFilename : sanitizeFilename(path.basename(resolvedPath));
    let downloadFilename = rawName;
    if (ext && !downloadFilename.toLowerCase().endsWith(ext)) {
      downloadFilename = `${downloadFilename}${ext}`;
    }

    const stream = fs.createReadStream(resolvedPath);
    const readable = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    const headers = new Headers();
    headers.set('Content-Disposition', `${dispositionType}; filename="${downloadFilename}"`);
    headers.set('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    headers.set('Content-Length', stat.size.toString());
    headers.set('Cache-Control', isInline ? 'public, max-age=3600, stale-while-revalidate=86400' : 'no-cache');

    return new Response(readable, {
      status: 200,
      headers,
    });
  }

  return NextResponse.json({ error: 'No download target specified' }, { status: 400 });
}
