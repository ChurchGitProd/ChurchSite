import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import DownloadButton from '@/components/common/DownloadButton';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../../../tina/__generated__/client';
import { sanitizeImageUrl, sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

interface MagazineDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.magazineConnection();
    const edges = res.data.magazineConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function MagazineDetailPage({
  params,
}: MagazineDetailPageProps) {
  let magazineRes;
  let pageRes;

  try {
    [magazineRes, pageRes] = await Promise.all([
      client.queries.magazine({ relativePath: `${params.slug}.mdx` }),
      client.queries.magazines({ relativePath: 'index.md' }),
    ]);
  } catch {
    notFound();
  }

  const magazine = magazineRes?.data?.magazine;
  const pageData = pageRes?.data?.magazines;

  if (!magazine) {
    notFound();
  }

  const hasValidPdf = isValidPdfUrl(magazine.pdfFile);
  const pdfUrl = hasValidPdf ? sanitizeDocumentUrl(magazine.pdfFile) : null;

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

      <Header activePage="magazines" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/magazines" className="hover:text-primary transition-colors">
              Magazines
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">{magazine.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Issue Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Cover Image */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden shadow-md border border-border">
                {magazine.coverImage ? (
                  <img
                    src={sanitizeImageUrl(magazine.coverImage)}
                    alt={`${magazine.title} Cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    No Cover Image
                  </div>
                )}
              </div>
            </div>

            {/* Details Column */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-tertiary uppercase tracking-widest">
                    {magazine.issue}
                  </span>
                  {magazine.badge && (
                    <span className="px-2.5 py-0.5 bg-muted border border-border rounded text-[10px] text-primary font-semibold">
                      {magazine.badge}
                    </span>
                  )}
                  {magazine.topic && (
                    <span className="px-2.5 py-0.5 bg-secondary/15 text-secondary text-[10px] font-semibold rounded">
                      {magazine.topic}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-primary">
                  {magazine.title}
                </h1>
              </div>

              {/* Source-Supported Metadata Tags */}
              <div className="flex flex-wrap gap-4 py-3 border-y border-border text-xs text-muted-foreground">
                {magazine.season && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-tertiary">🍂</span> Season: {magazine.season}
                  </span>
                )}
                {magazine.year && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-tertiary">📅</span> Year: {magazine.year}
                  </span>
                )}
                {magazine.contributorsCount && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-tertiary">👤</span> {magazine.contributorsCount} Contributors
                  </span>
                )}
                {magazine.articlesCount && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-tertiary">📄</span> {magazine.articlesCount} Articles
                  </span>
                )}
                {magazine.pagesCount && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-tertiary">📖</span> {magazine.pagesCount} Pages
                  </span>
                )}
                {magazine.publishDate && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-tertiary">🗓️</span> Published: {magazine.publishDate}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Issue Overview
                </h3>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                  {magazine.description}
                </p>
              </div>

              {/* Optional Rich Text Body if provided */}
              {magazine.body && (
                <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed pt-2">
                  <TinaMarkdown content={magazine.body} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {hasValidPdf && pdfUrl ? (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-muted text-primary border border-border font-bold text-xs rounded hover:bg-tertiary/20 hover:text-primary transition-all uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>View PDF ↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="px-6 py-2.5 bg-muted/40 text-muted-foreground border border-border font-bold text-xs rounded cursor-not-allowed opacity-60 uppercase tracking-wider inline-flex items-center gap-1.5"
                    title="Digital PDF edition is currently unavailable for viewing"
                  >
                    <span>PDF Unavailable</span>
                  </button>
                )}

                <DownloadButton
                  file={pdfUrl || undefined}
                  filename={hasValidPdf ? `${params.slug}.pdf` : undefined}
                  disabled={!hasValidPdf}
                  disabledTooltip="Digital edition is not yet available for download"
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded hover:bg-primary/90 transition-all uppercase tracking-wider"
                >
                  {hasValidPdf ? 'Download Digital Edition (PDF)' : 'Download PDF (Unavailable)'}
                </DownloadButton>

                <Link
                  href="/magazines"
                  className="px-5 py-2.5 border border-border text-primary font-bold text-xs rounded hover:bg-muted transition-all uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>←</span> Back to All Magazines
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
