import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import type { UpcomingSeminarCandidate } from '@/lib/zoom';

interface ZoomMeetingCardProps {
  seminar?: UpcomingSeminarCandidate | null;
}

export default function ZoomMeetingCard({ seminar }: ZoomMeetingCardProps) {
  if (!seminar) return null;

  const { title, description, speaker, dateStr, timeStr, zoomUrl, isLive, isFuture } = seminar;

  return (
    <section className="bg-card border border-border p-6 sm:p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded text-[10px] font-bold tracking-widest uppercase">
            Live Seminar
          </span>
          {isLive ? (
            <span className="text-xs text-tertiary font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
              Live now
            </span>
          ) : (
            isFuture && (
              <span className="text-xs text-tertiary font-semibold">Upcoming</span>
            )
          )}
        </div>
        <h3 className="text-xl font-heading font-bold text-primary">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-2 text-xs text-muted-foreground">
        {dateStr && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-tertiary flex-shrink-0" />
            <span>{dateStr}</span>
          </div>
        )}
        {timeStr && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-tertiary flex-shrink-0" />
            <span>{timeStr}</span>
          </div>
        )}
        {speaker && (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-tertiary flex-shrink-0" />
            <span>{speaker}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 md:items-stretch">
        {zoomUrl ? (
          <>
            <a
              href={zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all whitespace-nowrap"
            >
              Join Zoom Meeting
            </a>
            <Link
              href="/zoom-info"
              className="block text-center text-xs font-semibold text-tertiary hover:text-primary transition-colors whitespace-nowrap"
            >
              Seminar details →
            </Link>
          </>
        ) : (
          <Link
            href="/zoom-info"
            className="block text-center px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all whitespace-nowrap"
          >
            View Seminar Details
          </Link>
        )}
      </div>
    </section>
  );
}
