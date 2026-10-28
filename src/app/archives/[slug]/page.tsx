import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import QuarterlyNewsletterStrip from '@/components/home/QuarterlyNewsletterStrip';
import DownloadButton from '@/components/common/DownloadButton';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../../../tina/__generated__/client';

interface ArchiveDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.archiveDocumentConnection();
    const edges = res.data.archiveDocumentConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ArchiveDetailPage({
  params,
}: ArchiveDetailPageProps) {
  let docRes;
  let pageRes;

  try {
    [docRes, pageRes] = await Promise.all([
      client.queries.archiveDocument({ relativePath: `${params.slug}.mdx` }),
      client.queries.archives({ relativePath: 'index.md' }),
    ]);
  } catch {
    notFound();
  }

  const document = docRes?.data?.archiveDocument;
  const pageData = pageRes?.data?.archives;

  if (!document) {
    notFound();
  }

  const isDownload =
    document.actionType === 'download' ||
    document.actionLabel?.toLowerCase().includes('pdf');

  return (
    <div
      className="min-h-screen w-full flex flex-col relative text-foreground font-sans"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(153,212,224,0.28), transparent 45%), radial-gradient(circle at bottom right, rgba(153,212,224,0.18), transparent 50%), linear-gradient(180deg, #FCFEFE 0%, #F4FBFC 20%, #EAF7FA 45%, #DDF2F6 70%, #C8E8EF 100%)',
      }}
    >
      {/* Top Announcement Bar */}
      <AnnouncementBar
        text={pageData?.announcementText}
        subtext={pageData?.announcementSubtext}
      />

      <Header activePage="archives" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/archives" className="hover:text-primary transition-colors">
              Archives
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">{document.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Archival Document Details */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                {document.category}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Catalog Ref: {document.catalogRef}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
              {document.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span>{document.dateLabel}</span>
              {document.attributionName && (
                <>
                  <span>•</span>
                  <span>
                    {document.attributionRole
                      ? `${document.attributionRole}: ${document.attributionName}`
                      : document.attributionName}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Archival Summary
            </h3>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
              {document.description}
            </p>
          </div>

          {/* Optional Rich Text Body if provided */}
          {document.body && (
            <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed pt-4 border-t border-border">
              <TinaMarkdown content={document.body} />
            </div>
          )}

          {/* Actions */}
          <div className="pt-6 border-t border-border flex flex-wrap items-center gap-4">
            {document.pdfFile ? (
              <>
                <a
                  href={document.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded hover:bg-primary/90 transition-all uppercase tracking-wider inline-flex items-center gap-2"
                  title={`View ${document.title} PDF in a new tab`}
                  aria-label={`View ${document.title} PDF in a new tab`}
                >
                  <span>View PDF</span>
                  <span className="text-xs" aria-hidden="true">↗</span>
                </a>
                <DownloadButton
                  file={document.pdfFile}
                  filename={`${params.slug}.pdf`}
                  disabled={false}
                  className="px-6 py-2.5 border border-border bg-card text-primary font-bold text-xs rounded hover:bg-muted transition-all uppercase tracking-wider inline-flex items-center gap-2"
                  title={`Download ${document.title} PDF`}
                  ariaLabel={`Download ${document.title} PDF`}
                >
                  <span>{document.actionLabel && document.actionLabel.toLowerCase().includes('download') ? document.actionLabel : 'Download PDF'}</span>
                  <span className="text-xs" aria-hidden="true">⬇</span>
                </DownloadButton>
              </>
            ) : isDownload ? (
              <span
                className="px-4 py-2 border border-border bg-muted text-muted-foreground text-xs rounded font-medium select-none cursor-not-allowed opacity-75 inline-flex items-center gap-1.5"
                title={`${document.title} archival PDF is not yet digitized`}
              >
                <span>PDF Unavailable</span>
              </span>
            ) : (
              <span
                className="px-4 py-2 border border-border bg-muted text-muted-foreground text-xs rounded font-medium select-none"
                title="Full document is archived for reference."
              >
                {document.actionLabel || 'Archived Document'}
              </span>
            )}

            <Link
              href="/archives"
              className="px-5 py-2.5 border border-border text-primary font-bold text-xs rounded hover:bg-muted transition-all uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>←</span> Back to All Archives
            </Link>
          </div>
        </div>
      </main>

      {/* Newsletter Strip */}
      <QuarterlyNewsletterStrip />

      <Footer />
    </div>
  );
}
