import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowLeft, User, BookOpen } from 'lucide-react';
import { client } from '../../../../tina/__generated__/client';
import { refTitle } from '@/lib/featured';

interface ReferencePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.bibleReferenceConnection();
    const edges = res.data.bibleReferenceConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ReferenceDetailPage({ params }: ReferencePageProps) {
  let referenceRes;
  let pageRes;

  try {
    [referenceRes, pageRes] = await Promise.all([
      client.queries.bibleReference({ relativePath: `${params.slug}.mdx` }, { fetchOptions: { cache: 'no-store' } }),
      client.queries.references({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    ]);
  } catch {
    notFound();
  }

  const reference = referenceRes?.data?.bibleReference;
  const pageData = pageRes?.data?.references;

  if (!reference) {
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
      <Header activePage="references" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/references" className="hover:text-primary transition-colors">
              Bible References
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {reference.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Expository Content — full width */}
          <article className="lg:col-span-12 space-y-8">
            {/* Back Navigation Link */}
            <Link
              href="/references"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all references</span>
            </Link>

            {/* Reference Header Card */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest px-2.5 py-1 bg-tertiary/10 rounded">
                  {reference.category}
                </span>
                <span className="text-xs font-semibold text-primary px-2.5 py-0.5 border border-border rounded">
                  {reference.scripture}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                {reference.title}
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {reference.description}
              </p>

              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-tertiary" />
                  <span>
                    Scholar:{' '}
                    <strong className="text-primary">
                      {reference.author.startsWith('By ')
                        ? reference.author.replace('By ', '')
                        : reference.author}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-tertiary" />
                  <span>
                    Classification:{' '}
                    <strong className="text-primary">
                      {reference.testament} • {refTitle(reference.genre)}
                    </strong>
                  </span>
                </div>
              </div>

              {reference.tags && reference.tags.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {reference.tags.filter(Boolean).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-muted rounded text-[10px] text-muted-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Commentary Body */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm prose prose-sm sm:prose max-w-none leading-relaxed text-foreground">
              {reference.body ? (
                <TinaMarkdown content={reference.body} />
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  Additional scholarly notes and cross-reference documentation are being compiled for this passage.
                </p>
              )}
            </div>
          </article>

          {/* Sidebar widgets removed — content spans full width */}

        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
