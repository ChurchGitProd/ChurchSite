import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedVideoHero from '@/components/videos/FeaturedVideoHero';
import VideosExplorer from '@/components/videos/VideosExplorer';
import { VideoCardData } from '@/components/videos/VideoCard';
import { refTitle } from '@/lib/featuredVideos';
import { client } from '../../../tina/__generated__/client';
export const metadata = {
  title: 'Bible Videos',
  description: 'Video lectures on biblical theology, hermeneutics, and archaeology from the SCRIPTURA video series.',
};

export const dynamic = 'force-dynamic';

export default async function Videos() {
  const [videosPageData, videoConnectionData] = await Promise.all([
    client.queries.videos({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.videoConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = videosPageData.data.videos;
  const rawEdges = videoConnectionData.data.videoConnection.edges || [];

  const allVideos: VideoCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      series: refTitle(node.series),
      speaker: refTitle(node.speaker),
      scripture: node.scripture,
      duration: node.duration,
      description: node.description,
      thumbnail: node.thumbnail,
      recordedDate: node.recordedDate,
      videoUrl: node.videoUrl,
    }));

  // Preserve canonical display order from the original HTML reference
  const canonicalOrder = [
    'how-to-interpret-hebrew-poetry',
    'the-qumran-caves-excavations',
    'the-abrahamic-promise-explored',
  ];
  allVideos.sort((a, b) => {
    const idxA = canonicalOrder.indexOf(a.slug);
    const idxB = canonicalOrder.indexOf(b.slug);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

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
        text={data.announcementText}
        subtext={data.announcementSubtext}
      />

      {/* Universal Header with active nav */}
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
            <span className="text-primary font-semibold">Bible Videos</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Lectures & Seminars'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Theological Video Library'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'High-definition video recordings of scholarly lectures, textual expositions, and historical breakdowns of biblical literature.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Featured Video Hero Section */}
        <FeaturedVideoHero data={data.featuredVideo} />

        {/* Video Grid Section & Toolbar */}
        <VideosExplorer
          videos={allVideos}
          searchPlaceholder={data.searchPlaceholder}
          lecturesTitle={data.lecturesTitle}
        />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
