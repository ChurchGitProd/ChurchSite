import Link from 'next/link';
import { sanitizeImageUrl, isValidPdfUrl } from '@/lib/media';

export interface MagazineCardData {
  slug: string;
  title: string;
  issue: string; // e.g. "Summer 2024"
  season?: string | null;
  year?: string | null;
  topic?: string | null;
  description: string;
  coverImage?: string | null;
  badge?: string | null;
  contributorsCount?: number | null;
  articlesCount?: number | null;
  pagesCount?: number | null;
  pdfFile?: string | null;
}

interface MagazineCardProps {
  magazine: MagazineCardData;
}

export default function MagazineCard({ magazine }: MagazineCardProps) {
  return (
    <Link
      href={`/magazines/${magazine.slug}`}
      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all space-y-3 group cursor-pointer block text-left focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden group-hover:bg-tertiary/10 transition-colors relative">
        {magazine.coverImage ? (
          <img
            src={sanitizeImageUrl(magazine.coverImage)}
            alt={`${magazine.title} Cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
            No Cover
          </div>
        )}
        {isValidPdfUrl(magazine.pdfFile) && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-primary/90 text-primary-foreground text-[9px] font-bold rounded shadow-sm">
            PDF
          </span>
        )}
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider block">
          {magazine.issue}
        </span>
        <h4 className="text-sm font-heading font-bold text-primary group-hover:text-tertiary transition-colors">
          {magazine.title}
        </h4>
        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
          {magazine.description}
        </p>
      </div>
    </Link>
  );
}
