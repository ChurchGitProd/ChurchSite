import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

interface ZoomMeetingData {
  title?: string | null;
  description?: string | null;
  date?: string | null;
  time?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}

interface ZoomMeetingCardProps {
  data?: ZoomMeetingData | null;
}

export default function ZoomMeetingCard({ data }: ZoomMeetingCardProps) {
  const title =
    data?.title || 'Hermeneutics Roundtable: Covenant Theology';
  const description =
    data?.description ||
    'An open theological discussion with Dr. Vance and guest scholars. Includes a Q&A session on Genesis covenants.';
  const date = data?.date || 'Thursday, March 20, 2025';
  const time = data?.time || '7:00 PM - 8:30 PM EST';
  const buttonText = data?.buttonText || 'Join Zoom Meeting';
  const buttonLink = data?.buttonLink || '/zoom-info';

  return (
    <section className="bg-card border border-border p-6 sm:p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded text-[10px] font-bold tracking-widest uppercase">
            Live Seminar
          </span>
          <span className="text-xs text-tertiary font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
            Live
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold text-primary">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-tertiary flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-tertiary flex-shrink-0" />
          <span>{time}</span>
        </div>
      </div>
      <Link
        href={buttonLink}
        className="block text-center px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all whitespace-nowrap"
      >
        {buttonText}
      </Link>
    </section>
  );
}
