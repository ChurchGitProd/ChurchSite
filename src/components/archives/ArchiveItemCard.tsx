import Link from 'next/link';
import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

export interface ArchiveItemData {
  slug: string;
  title: string;
  category: string;
  catalogRef: string;
  dateLabel: string;
  attributionRole?: string | null;
  attributionName?: string | null;
  description: string;
  actionLabel?: string | null;
  actionType?: 'download' | 'link' | null;
  pdfFile?: string | null;
}

interface ArchiveItemCardProps {
  item: ArchiveItemData;
}

export default function ArchiveItemCard({ item }: ArchiveItemCardProps) {
  const hasValidPdf = isValidPdfUrl(item.pdfFile);
  const pdfUrl = hasValidPdf ? sanitizeDocumentUrl(item.pdfFile) : null;
  const isDownload =
    item.actionType === 'download' ||
    Boolean(item.actionLabel?.toLowerCase().includes('pdf')) ||
    hasValidPdf;

  const downloadFilename = hasValidPdf ? `${item.slug}.pdf` : undefined;

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-tertiary transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
          {item.category}
        </span>
        <span className="text-xs text-muted-foreground">
          {item.dateLabel} | Catalog: {item.catalogRef}
        </span>
      </div>
      <h3 className="text-base font-heading font-bold text-primary mb-2">
        <Link
          href={`/archives/${item.slug}`}
          className="hover:text-tertiary transition-colors"
        >
          {item.title}
        </Link>
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {item.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {item.attributionRole && item.attributionName ? (
            `${item.attributionRole}: ${item.attributionName}`
          ) : item.attributionName ? (
            item.attributionName
          ) : null}
        </span>
        <div>
          {hasValidPdf && pdfUrl ? (
            <div className="flex items-center gap-2.5">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                title={`View ${item.title} PDF in a new tab`}
                aria-label={`View ${item.title} PDF in a new tab`}
              >
                <span>View PDF</span>
                <span className="text-[10px]" aria-hidden="true">↗</span>
              </a>
              <span className="text-muted-foreground/40 text-xs" aria-hidden="true">|</span>
              <DownloadButton
                file={pdfUrl}
                filename={downloadFilename}
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                title={`Download ${item.title} PDF`}
                ariaLabel={`Download ${item.title} PDF`}
              >
                <span>{item.actionLabel && item.actionLabel.toLowerCase().includes('download') ? item.actionLabel : 'Download PDF'}</span>
                <span className="text-[10px]" aria-hidden="true">⬇</span>
              </DownloadButton>
            </div>
          ) : isDownload ? (
            <span
              className="inline-flex items-center text-xs font-semibold text-muted-foreground/70 bg-muted/60 px-2.5 py-1 rounded cursor-not-allowed border border-border select-none"
              title={`${item.title} archival PDF is not yet digitized`}
            >
              PDF Unavailable
            </span>
          ) : (
            <Link
              href={`/archives/${item.slug}`}
              className="text-primary font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>{item.actionLabel || 'Access Details'}</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
