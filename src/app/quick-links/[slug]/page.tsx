import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../../../tina/__generated__/client';

interface QuickLinkDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.quickLinkConnection();
    const edges = res.data.quickLinkConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function QuickLinkDetailPage({
  params,
}: QuickLinkDetailPageProps) {
  let linkRes;
  let pageRes;

  try {
    [linkRes, pageRes] = await Promise.all([
      client.queries.quickLink({ relativePath: `${params.slug}.mdx` }),
      client.queries.quickLinks({ relativePath: 'index.md' }),
    ]);
  } catch {
    notFound();
  }

  const quickLink = linkRes?.data?.quickLink;
  const pageData = pageRes?.data?.quickLinks;

  if (!quickLink) {
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

      <Header activePage="quick-links" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link
              href="/quick-links"
              className="hover:text-primary transition-colors"
            >
              Quick Links
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">{quickLink.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Detail Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                Resource Shortcut
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-primary">
                {quickLink.subtitle}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span>Target:</span>
              <code className="text-[11px] bg-muted px-1.5 py-0.5 rounded text-primary font-mono">
                {quickLink.targetUrl}
              </code>
            </div>
          </div>

          {/* Title & Icon Header */}
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-primary/10 border border-border flex items-center justify-center text-3xl flex-shrink-0">
              {quickLink.icon}
            </div>
            <div className="space-y-2 flex-1">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                {quickLink.title}
              </h1>
              {quickLink.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {quickLink.description}
                </p>
              )}
            </div>
          </div>

          {/* Rich Body Content / Guide */}
          {quickLink.body && (
            <div className="pt-4 border-t border-border/60">
              <h2 className="text-xs font-bold text-tertiary uppercase tracking-wider mb-3">
                Overview & Quick Guide
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground font-sans leading-relaxed">
                <TinaMarkdown content={quickLink.body} />
              </div>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/quick-links"
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Back to Quick Links Directory</span>
            </Link>

            <Link
              href={quickLink.targetUrl}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all uppercase tracking-wider shadow-sm flex items-center gap-1.5"
            >
              <span>Launch {quickLink.title}</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
