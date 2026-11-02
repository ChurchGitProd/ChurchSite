import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { LatestReferenceItem } from '@/lib/latestReferences';

interface FeaturedReferenceSpotlightProps {
  badge?: string | null;
  linkText?: string | null;
  item?: LatestReferenceItem | null;
}

export default function FeaturedReferenceSpotlight({
  badge,
  linkText,
  item,
}: FeaturedReferenceSpotlightProps) {
  if (!item) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground p-6 rounded-xl space-y-4 border border-primary/20 shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold tracking-widest text-tertiary uppercase">
          {badge || 'FEATURED SCHOLARLY REFERENCE'}
        </span>
        {item.category && (
          <span className="px-2 py-0.5 bg-tertiary text-primary text-[10px] font-bold rounded">
            {item.category}
          </span>
        )}
      </div>

      <h2 className="text-2xl font-heading font-bold">
        {item.reference ? `${item.reference} — ` : ''}
        {item.title}
      </h2>

      <p className="text-xs text-primary-foreground/90 leading-relaxed font-sans">
        {item.description}
      </p>

      <div className="pt-2 flex flex-wrap gap-4 items-center justify-between text-xs text-primary-foreground/75 border-t border-primary-foreground/10">
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
          <span>
            {item.crossReferences
              ? `Cross-References: ${item.crossReferences}`
              : `Scripture: ${item.reference}`}
          </span>
        </span>
        <Link
          href={item.link || `/references/${item.slug}`}
          className="text-tertiary font-bold hover:underline flex items-center gap-1 group"
        >
          <span>{linkText || 'Read Full Commentary'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
