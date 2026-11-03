interface OfficeLocationMapProps {
  mapLocation?: {
    address?: string | null;
    addressText?: string | null;
    embedCode?: string | null;
  } | null;
}

// Accepts either a full <iframe ...> snippet or a bare embed URL and
// returns the src, but only for Google Maps embed URLs.
function extractEmbedUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const iframeSrc = trimmed.match(/<iframe[^>]*\bsrc=["']([^"']+)["']/i);
  const url = (iframeSrc ? iframeSrc[1] : trimmed).replace(/&amp;/g, '&');

  return /^https:\/\/([\w-]+\.)*google\.[a-z.]+\/maps\/embed\b/i.test(url)
    ? url
    : null;
}

export default function OfficeLocationMap({
  mapLocation,
}: OfficeLocationMapProps) {
  const embedCode = mapLocation?.embedCode?.trim() || '';
  const address = mapLocation?.address?.trim() || '';
  const caption = mapLocation?.addressText || '';

  // Official embed code wins (exact pin from Google's "Embed a map" dialog);
  // the typed address is the fallback.
  const embedUrl =
    (embedCode ? extractEmbedUrl(embedCode) : null) ||
    (address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(
          address
        )}&output=embed`
      : null);

  if (!embedUrl) {
    return null;
  }

  const label = caption || address || 'office location';

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-video bg-muted relative">
        <iframe
          src={embedUrl}
          title={`Map showing ${label}`}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {caption && (
        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span aria-hidden="true">📍</span>
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
