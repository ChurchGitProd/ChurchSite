import Link from 'next/link';
import { Play } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/media';
import { getYouTubeThumbnailUrl } from '@/lib/youtube';

export interface VideoCardData {
  slug: string;
  title: string;
  series: string;
  speaker: string;
  scripture: string;
  duration: string;
  description: string;
  thumbnail?: string | null;
  recordedDate?: string | null;
  videoUrl?: string | null;
  language?: string | null;
}

interface VideoCardProps {
  video: VideoCardData;
}

export default function VideoCard({ video }: VideoCardProps) {
  const fallbackThumbnail =
    'https://uxmagic.blob.core.windows.net/public/agent-images/study_scene-1782719380163-v1e6si6wd9.png';

  const thumbnailSrc =
    video.thumbnail ||
    getYouTubeThumbnailUrl(video.videoUrl) ||
    fallbackThumbnail;

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col group">
      <Link href={`/videos/${video.slug}`} className="block relative h-48 overflow-hidden bg-primary">
        <img
          src={sanitizeImageUrl(thumbnailSrc)}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {video.language && (
          <span className="absolute top-3 left-3 bg-primary/85 text-primary-foreground backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {video.language}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-12 h-12 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </span>
        </div>
        <span className="absolute bottom-3 right-3 bg-primary/75 text-primary-foreground text-[10px] px-2 py-1 rounded font-semibold tracking-wide">
          {video.duration}
        </span>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest truncate">
              {video.series}
            </span>
            {video.language && (
              <span className="text-[9px] font-semibold text-muted-foreground uppercase px-1.5 py-0.5 bg-muted rounded border border-border/50 shrink-0">
                {video.language}
              </span>
            )}
          </div>
          <Link href={`/videos/${video.slug}`}>
            <h4 className="font-heading font-bold text-base text-primary group-hover:text-tertiary transition-colors line-clamp-1">
              {video.title}
            </h4>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-semibold text-primary">
            {video.speaker} <span className="text-border">|</span> {video.scripture}
          </span>
          <Link
            href={`/videos/${video.slug}`}
            className="text-[10px] font-bold text-tertiary hover:underline uppercase tracking-wider"
          >
            Lecture Notes →
          </Link>
        </div>
      </div>
    </article>
  );
}
