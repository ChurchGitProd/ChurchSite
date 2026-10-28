import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeImageUrl, sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

interface FeaturedMagazineHeroProps {
  badge?: string | null;
  tag?: string | null;
  title: string;
  description: string;
  date?: string | null;
  details?: string | null;
  coverImage?: string | null;
  readButtonText?: string | null;
  downloadButtonText?: string | null;
  pdfFile?: string | null;
}

export default function FeaturedMagazineHero({
  badge = 'FEATURED ISSUE',
  tag = 'Latest',
  title,
  description,
  date = 'December 2024',
  details = '8 Articles | 120 Pages',
  coverImage = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=533&fit=crop',
  readButtonText = 'Read Issue',
  downloadButtonText = 'Download PDF',
  pdfFile,
}: FeaturedMagazineHeroProps) {
  const hasValidPdf = isValidPdfUrl(pdfFile);
  const pdfUrl = hasValidPdf ? sanitizeDocumentUrl(pdfFile) : null;

  return (
    <div
      id="featured-issue"
      className="bg-primary text-primary-foreground p-8 rounded-xl space-y-6 border border-primary/20 shadow-md scroll-mt-24"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] bg-primary-foreground/10 rounded-lg overflow-hidden relative shadow-sm">
            {coverImage ? (
              <img
                src={sanitizeImageUrl(coverImage)}
                alt={`${title} Cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-foreground/10 text-primary-foreground text-xs">
                No Cover Available
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest text-tertiary uppercase">
              {badge || 'FEATURED ISSUE'}
            </span>
            {tag && (
              <span className="px-2 py-0.5 bg-tertiary text-primary text-[10px] font-bold rounded">
                {tag}
              </span>
            )}
          </div>
          <h2 className="text-3xl font-heading font-bold">{title}</h2>
          <p className="text-sm text-primary-foreground/90 leading-relaxed font-sans">
            {description}
          </p>
          <div className="pt-2 flex flex-wrap gap-4 items-center text-xs text-primary-foreground/75">
            {date && (
              <span className="flex items-center gap-1.5">
                <span className="text-tertiary">📅</span> {date}
              </span>
            )}
            {details && (
              <span className="flex items-center gap-1.5">
                <span className="text-tertiary">📄</span> {details}
              </span>
            )}
          </div>
          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="#featured-issue"
              title="Featured editorial issue summary displayed above"
              className="px-5 py-2.5 bg-tertiary text-primary font-bold text-xs rounded hover:bg-tertiary/90 transition-all uppercase tracking-wider inline-flex items-center justify-center"
            >
              {readButtonText || 'Read Issue'}
            </a>
            {hasValidPdf && pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 font-bold text-xs rounded hover:bg-primary-foreground/30 transition-all uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>View PDF ↗</span>
              </a>
            )}
            <DownloadButton
              file={pdfUrl || undefined}
              filename={hasValidPdf ? `${(title || 'featured-issue').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf` : undefined}
              disabled={!hasValidPdf}
              disabledTooltip="Winter 2024 Magazine PDF edition is not yet available"
              className="px-5 py-2.5 bg-primary-foreground text-primary font-bold text-xs rounded uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>{hasValidPdf ? '⬇️' : ''}</span>
              <span>{hasValidPdf ? (downloadButtonText || 'Download PDF') : `${downloadButtonText || 'Download PDF'} (Unavailable)`}</span>
            </DownloadButton>
          </div>
        </div>
      </div>
    </div>
  );
}
