import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

export interface FeaturedArchiveData {
  badge?: string | null;
  catalogRef?: string | null;
  title: string;
  description: string;
  category?: string | null;
  linkText?: string | null;
  pdfFile?: string | null;
}

interface FeaturedArchiveBlockProps {
  archive?: FeaturedArchiveData | null;
}

export default function FeaturedArchiveBlock({ archive }: FeaturedArchiveBlockProps) {
  const badge = archive?.badge || 'Featured Archival Document';
  const catalogRef = archive?.catalogRef || 'MS-8840';
  const title = archive?.title || 'The Codex Sinaiticus Restored Transcripts';
  const description =
    archive?.description ||
    'A comprehensive, digitalized, and annotated transcription of the Epistle to the Galatians as found in the Codex Sinaiticus, detailing scribal variant corrections.';
  const category = archive?.category || 'Manuscripts / Greek';
  const hasValidPdf = isValidPdfUrl(archive?.pdfFile);
  const pdfUrl = hasValidPdf ? sanitizeDocumentUrl(archive?.pdfFile) : null;

  const downloadFilename = `${catalogRef.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center text-xs">
        <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
          {badge}
        </span>
        <span className="text-muted-foreground font-mono">
          Catalog Ref: {catalogRef}
        </span>
      </div>
      <h2 className="text-xl font-heading font-bold text-primary">{title}</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/50">
        <span className="flex items-center gap-1.5">
          <span className="text-tertiary">📁</span> Category: {category}
        </span>
        <div className="flex items-center gap-3">
          {hasValidPdf && pdfUrl ? (
            <div className="flex items-center gap-2.5">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline inline-flex items-center gap-1 text-xs"
                title={`View ${title} PDF in a new tab`}
                aria-label={`View ${title} PDF in a new tab`}
              >
                <span>View PDF</span>
                <span className="text-[10px]" aria-hidden="true">↗</span>
              </a>
              <span className="text-muted-foreground/40 text-xs" aria-hidden="true">|</span>
              <DownloadButton
                file={pdfUrl}
                filename={downloadFilename}
                className="text-primary font-bold hover:underline inline-flex items-center gap-1 text-xs"
                title={`Download ${title} PDF`}
                ariaLabel={`Download ${title} PDF`}
              >
                <span>Download PDF</span>
                <span className="text-[10px]" aria-hidden="true">⬇</span>
              </DownloadButton>
            </div>
          ) : (
            <span
              className="inline-flex items-center text-xs font-semibold text-muted-foreground/80 bg-muted px-3 py-1.5 rounded cursor-not-allowed border border-border select-none"
              title="Digital document access is not currently available."
            >
              PDF Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
