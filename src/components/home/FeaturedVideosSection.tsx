import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/media';
import { FeaturedVideoItem } from '@/lib/featuredVideos';

interface FeaturedVideosSectionProps {
  sectionTitle?: string | null;
  videos?: FeaturedVideoItem[];
}

export default function FeaturedVideosSection({ sectionTitle, videos }: FeaturedVideosSectionProps) {
  const items = videos ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle || 'Featured Bible Videos'}
        </h2>
        <Link
          href="/videos"
          className="text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>View All Videos</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((video) => (
          <Link
            key={video.slug}
            href={`/videos/${video.slug}`}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all flex flex-col group"
          >
            <div className="h-44 overflow-hidden relative bg-primary">
              <img
                src={sanitizeImageUrl(video.thumbnail || '')}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                alt={video.title || 'Video cover'}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </span>
              </div>
              {video.duration && (
                <span className="absolute bottom-3 right-3 bg-primary/75 text-primary-foreground text-[10px] px-2 py-1 rounded">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-5 space-y-2">
              {video.series && (
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
                  {video.series}
                </span>
              )}
              <h3 className="text-base font-heading font-bold text-primary group-hover:text-tertiary transition-colors line-clamp-1">
                {video.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {video.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
