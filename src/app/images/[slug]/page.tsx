import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import DownloadButton from '@/components/common/DownloadButton';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowLeft, BookOpen, Download, Calendar, FileText } from 'lucide-react';
import { client } from '../../../../tina/__generated__/client';
import { sanitizeImageUrl } from '@/lib/media';

interface ImagePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.bibleImageConnection();
    const edges = res.data.bibleImageConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ImageDetailPage({ params }: ImagePageProps) {
  let imageRes;
  let pageRes;

  try {
    [imageRes, pageRes] = await Promise.all([
      client.queries.bibleImage({ relativePath: `${params.slug}.mdx` }, { fetchOptions: { cache: 'no-store' } }),
      client.queries.images({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    ]);
  } catch {
    notFound();
  }

  const image = imageRes?.data?.bibleImage;
  const pageData = pageRes?.data?.images;

  if (!image) {
    notFound();
  }

  const filename = `${params.slug}.png`;
  const fallbackImage =
    'https://uxmagic.blob.core.windows.net/public/agent-images/hero_bible-1782719363350-90sctq9ygv4.png';
  const displayImage = image.image || fallbackImage;

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
      <Header activePage="images" />

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
            <Link href="/images" className="hover:text-primary transition-colors">
              Bible Images
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {image.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        {/* Back Navigation Link */}
        <Link
          href="/images"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to image archive</span>
        </Link>

        {/* Image Showcase Card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          {/* High-Resolution Image Display */}
          <div className="w-full bg-black/90 flex items-center justify-center p-4 sm:p-8">
            <img
              src={sanitizeImageUrl(displayImage)}
              alt={image.title}
              className="max-h-[600px] w-auto object-contain rounded shadow-lg"
            />
          </div>

          {/* Details & Metadata Information */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest px-2.5 py-1 bg-tertiary/10 rounded">
                {image.category}
              </span>
              <span className="text-xs font-semibold text-primary px-2.5 py-0.5 border border-border rounded">
                {image.scripture}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                {image.title}
              </h1>

              {/* Genuine High-Resolution Download via secure API proxy */}
              {image.image && (
                <DownloadButton
                  url={image.image}
                  filename={filename}
                  className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res</span>
                </DownloadButton>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {image.description}
            </p>

            {/* Metadata Rows: only rendered if data genuinely exists */}
            {(image.date || image.citation) && (
              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                {image.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-tertiary" />
                    <span>
                      Historical Era: <strong className="text-primary">{image.date}</strong>
                    </span>
                  </div>
                )}
                {image.citation && (
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-tertiary" />
                    <span>
                      Citation: <strong className="text-primary">{image.citation}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Optional Expository Commentary Body: rendered ONLY if real content exists */}
        {image.body && (
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-heading font-bold text-primary border-b border-border pb-2">
              Scholarly Commentary &amp; Codicology
            </h3>
            <div className="prose prose-sm sm:prose max-w-none leading-relaxed text-foreground">
              <TinaMarkdown content={image.body} />
            </div>
          </section>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
