interface OfficeLocationMapProps {
  mapLocation?: {
    address?: string | null;
    addressText?: string | null;
  } | null;
}

export default function OfficeLocationMap({
  mapLocation,
}: OfficeLocationMapProps) {
  const address = mapLocation?.address?.trim() || '';
  const caption = mapLocation?.addressText || '';

  if (!address) {
    return null;
  }

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-video bg-muted relative">
        <iframe
          src={embedUrl}
          title={`Map showing ${address}`}
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
