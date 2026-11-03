export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://scripturadigitallibrary.netlify.app';

// Resolve a CMS image value (external URL or /uploads path) to absolute
export function absUrl(src?: string | null): string | undefined {
  const s = src?.trim();
  if (!s) return undefined;
  return s.startsWith('http://') || s.startsWith('https://')
    ? s
    : `${SITE_URL}${s.startsWith('/') ? s : `/${s}`}`;
}

// Renders schema.org JSON-LD. The caller builds the graph object.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\u003c'),
      }}
    />
  );
}
