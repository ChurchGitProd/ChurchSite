import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowLeft, User, BookOpen, Clock, Calendar, VideoOff } from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/lib/youtube';
import { client } from '../../../../tina/__generated__/client';
import { JsonLd, SITE_URL, absUrl } from '@/components/common/JsonLd';
import { sanitizeImageUrl } from '@/lib/media';
import { refTitle, formatRecordedDate } from '@/lib/featuredVideos';

interface VideoPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.videoConnection();
    const edges = res.data.videoConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await client.queries.video({
      relativePath: `${params.slug}.mdx`,
    });
    const d = res.data.video;
    return {
        title: d?.title,
        description: d?.description,
        openGraph: d?.thumbnail ? { images: [absUrl(d.thumbnail) as string] } : undefined,
      };
  } catch {
    return {};
  }
}

export default async function VideoDetailPage({ params }: VideoPageProps) {
  let videoRes;
  let pageRes;

  try {
    [videoRes, pageRes] = await Promise.all([
      client.queries.video(
        { relativePath: `${params.slug}.mdx` },
        { fetchOptions: { cache: 'no-store' } }
      ),
      client.queries.videos(
        { relativePath: 'index.md' },
        { fetchOptions: { cache: 'no-store' } }
      ),
    ]);
  } catch {
    notFound();
  }

  const video = videoRes?.data?.video;
  const pageData = pageRes?.data?.videos;

  if (!video) {
    notFound();
  }

  const fallbackThumbnail =
    'https://uxmagic.blob.core.windows.net/public/agent-images/library_shelf-1782719371570-ajnz70oz8sg.png';

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
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: video.title,
          description: video.description || undefined,
          url: `${SITE_URL}/videos/${params.slug}`,
          thumbnailUrl: absUrl(video.thumbnail)
            ? [absUrl(video.thumbnail)]
            : undefined,
          uploadDate: video.recordedDate || undefined,
          embedUrl: video.videoUrl || undefined,
        }}
      />
      <Header activePage="videos" />

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
            <Link href="/videos" className="hover:text-primary transition-colors">
              Bible Videos
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {video.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        {/* Back Navigation Link */}
        <Link
          href="/videos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all lectures</span>
        </Link>

        {/* Video Showcase Card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          {(() => {
            const embedUrl = getYouTubeEmbedUrl(video.videoUrl);
            if (embedUrl) {
              return (
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            return (
              /* Honest Archived Video Placeholder (no fake player or invented URL) */
              <div className="relative aspect-video w-full overflow-hidden bg-primary">
                <img
                  src={sanitizeImageUrl(video.thumbnail || fallbackThumbnail)}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-60 filter blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center text-primary-foreground space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur border border-primary-foreground/20 flex items-center justify-center shadow-2xl">
                    <VideoOff className="w-8 h-8 text-tertiary" />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <span className="text-[11px] font-bold text-tertiary uppercase tracking-widest block">
                      Archived Lecture Recording
                    </span>
                    <h2 className="text-xl font-heading font-bold text-white">
                      Video Stream Currently Pending
                    </h2>
                    <p className="text-xs text-primary-foreground/80 leading-relaxed">
                      The master audiovisual recording is currently being digitized. The complete scholarly outline, scripture references, and exposition are documented below.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 rounded text-[11px] font-semibold text-tertiary">
                    <Clock className="w-3.5 h-3.5" /> Runtime: {video.duration}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Lecture Metadata Information */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest px-2.5 py-1 bg-tertiary/10 rounded">
                {refTitle(video.series)}
              </span>
              <span className="text-xs font-semibold text-primary px-2.5 py-0.5 border border-border rounded">
                {video.scripture}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
              {video.title}
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {video.description}
            </p>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-tertiary" />
                <span>
                  Speaker: <strong className="text-primary">{refTitle(video.speaker)}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-tertiary" />
                <span>
                  Scripture: <strong className="text-primary">{video.scripture}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-tertiary" />
                <span>
                  Duration: <strong className="text-primary">{video.duration}</strong>
                </span>
              </div>
              {video.recordedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-tertiary" />
                  <span>
                    Recorded: <strong className="text-primary">{formatRecordedDate(video.recordedDate)}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expository Notes & Lecture Outline */}
        <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-heading font-bold text-primary border-b border-border pb-2">
            Lecture Study Notes &amp; Outline
          </h3>
          <div className="prose prose-sm sm:prose max-w-none leading-relaxed text-foreground">
            {video.body ? (
              <TinaMarkdown content={video.body} />
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Scholarly transcriptions and study notes are being finalized for this lecture.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
