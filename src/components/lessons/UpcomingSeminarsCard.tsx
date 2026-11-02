import Link from 'next/link';

export interface SeminarItem {
  title: string;
  schedule: string;
  link?: string;
  isLive?: boolean;
}

interface UpcomingSeminarsCardProps {
  title?: string | null;
  seminars?: SeminarItem[];
}

export default function UpcomingSeminarsCard({
  title = 'Upcoming Q&A Seminars',
  seminars,
}: UpcomingSeminarsCardProps) {
  const items = seminars ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-sm">
      <h3 className="text-base font-heading font-bold text-primary border-b border-border pb-2">
        {title || 'Upcoming Q&A Seminars'}
      </h3>
      <div className="space-y-3">
        {items.map((seminar, idx) => (
          <div key={idx} className="border-l-2 border-tertiary pl-3 py-1">
            <Link
              href={seminar.link || '/zoom-info'}
              className="text-xs font-bold text-primary hover:text-tertiary transition-colors flex items-center gap-2"
            >
              {seminar.isLive && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              )}
              {seminar.title}
            </Link>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {seminar.schedule}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
