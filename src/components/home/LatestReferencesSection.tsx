import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LatestReferenceItem } from '@/lib/latestReferences';

interface LatestReferencesSectionProps {
  sectionTitle?: string | null;
  items?: LatestReferenceItem[];
}

export default function LatestReferencesSection({ sectionTitle, items }: LatestReferencesSectionProps) {
  const list = items ?? [];

  if (list.length === 0) {
    return null;
  }

  return (
    <section
      id="references"
      className="space-y-6 py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-6 lg:rounded-xl border border-border/50"
      style={{ background: '#F4FBFC' }}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle || 'Latest Bible References'}
        </h2>
        <Link
          href="/references"
          className="text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>View All References</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((item) => (
          <Link
            key={item.slug}
            href={item.link || `/references/${item.slug}`}
            className="block bg-card border border-border rounded-lg p-5 hover:border-tertiary transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                {item.reference}
              </span>
              {item.category && (
                <span className="text-xs text-muted-foreground">
                  Category: {item.category}
                </span>
              )}
            </div>
            <h3 className="text-lg font-heading font-bold text-primary mb-2 group-hover:text-tertiary transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.filter(Boolean).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 bg-muted rounded text-[10px] text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
