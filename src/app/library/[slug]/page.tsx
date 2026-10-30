import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import DownloadButton from '@/components/common/DownloadButton';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../../../tina/__generated__/client';

interface LibraryResourcePageProps {
  params: {
    slug: string;
  };
}

function getDetailIcon(iconType?: string | null): string {
  switch (iconType) {
    case 'calendar':
      return '📅';
    case 'languages':
      return '🌐';
    case 'user':
      return '👤';
    case 'scroll':
      return '📜';
    case 'graduation-cap':
      return '🎓';
    default:
      return '📄';
  }
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.libraryResourceConnection();
    const edges = res.data.libraryResourceConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function LibraryResourceDetailPage({
  params,
}: LibraryResourcePageProps) {
  let resourceRes;
  let pageRes;

  try {
    [resourceRes, pageRes] = await Promise.all([
      client.queries.libraryResource({ relativePath: `${params.slug}.mdx` }),
      client.queries.library({ relativePath: 'index.md' }),
    ]);
  } catch {
    notFound();
  }

  const resource = resourceRes?.data?.libraryResource;
  const pageData = pageRes?.data?.library;

  if (!resource) {
    notFound();
  }

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

      {/* Universal Header with active nav */}
      <Header activePage="library" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/library" className="hover:text-primary transition-colors">
              Library
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {resource.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-tertiary transition-colors"
          >
            <span>←</span>
            <span>Return to Theological Library</span>
          </Link>
        </div>

        {/* Resource Overview Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          {/* Classification & Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold text-tertiary uppercase tracking-wider bg-muted rounded">
              {resource.category}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium text-primary bg-accent/40 rounded border border-border">
              Era: {resource.era}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted rounded">
              {resource.badge}
            </span>
          </div>

          {/* Title & Author */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
              {resource.title}
            </h1>
            {resource.author && (
              <p className="text-sm font-medium text-muted-foreground">
                Author / Source: <span className="text-foreground">{resource.author}</span>
              </p>
            )}
          </div>

          {/* Primary Detail and Tags Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-3 border-y border-border/60 text-xs text-muted-foreground">
            {resource.primaryDetail && (
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-tertiary">{getDetailIcon(resource.detailIcon)}</span>
                <span>{resource.primaryDetail}</span>
              </span>
            )}

            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-muted rounded text-[11px] text-foreground/80 font-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary">
              Scholarly Overview
            </h2>
            <p className="text-sm text-foreground/90 leading-relaxed font-sans">
              {resource.description}
            </p>
          </div>

          {/* Optional Rich Text Body if supplied */}
          {resource.body && (
            <div className="border-t border-border pt-4 prose prose-sm max-w-none text-muted-foreground">
              <TinaMarkdown content={resource.body} />
            </div>
          )}

          {/* Repository Status Information */}
          <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-foreground">Catalog Reference Indexed</span>
            </div>
            <span className="italic">
              Available for scholarly consultation in the Scriptura Digital Repository
            </span>
          </div>

          {resource.pdfFile && (
            <div className="border-t border-border pt-6 flex flex-wrap items-center gap-4">
              <DownloadButton
                file={resource.pdfFile}
                filename={`${params.slug}.pdf`}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded hover:bg-primary/90 transition-all uppercase tracking-wider"
              >
                Download Document (PDF)
              </DownloadButton>
              <span className="text-xs text-muted-foreground italic">
                Digital consultation copy authenticated for download.
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
