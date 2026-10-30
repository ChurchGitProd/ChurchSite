import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ReferenceItem {
  reference?: string | null;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: (string | null)[] | null;
  link?: string | null;
}

interface LatestReferencesData {
  sectionTitle?: string | null;
  items?: (ReferenceItem | null)[] | null;
}

interface LatestReferencesSectionProps {
  data?: LatestReferencesData | null;
}

export default function LatestReferencesSection({ data }: LatestReferencesSectionProps) {
  const sectionTitle = data?.sectionTitle || 'Latest Bible References';

  const defaultItems: ReferenceItem[] = [
    {
      reference: 'Isaiah 53:1-12',
      category: 'Messianic Prophecy',
      title: 'The Suffering Servant',
      description:
        'A comprehensive cross-reference guide connecting the prophetic lyrics of Isaiah with the Passion narratives in the Gospels of Matthew and John.',
      tags: ['Prophecy', 'Atonement', 'Gospel Parallel'],
      link: '/references',
    },
    {
      reference: 'Hebrews 11:1-40',
      category: 'Historical Narrative',
      title: 'The Cloud of Witnesses',
      description:
        'Analyzing the historical context of Old Testament heroes of faith highlighted by the author of Hebrews to encourage first-century Jewish Christians.',
      tags: ['Faith', 'Old Testament', 'Exhortation'],
      link: '/references',
    },
  ];

  const items = data?.items && data.items.length > 0 ? (data.items.filter(Boolean) as ReferenceItem[]) : defaultItems;

  return (
    <section
      id="references"
      className="space-y-6 py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-6 lg:rounded-xl border border-border/50"
      style={{ background: '#F4FBFC' }}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle}
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
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.link || '/references'}
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
