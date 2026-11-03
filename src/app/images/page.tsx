import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedImageSpotlight from '@/components/images/FeaturedImageSpotlight';
import ImagesExplorer from '@/components/images/ImagesExplorer';
import { ImageCardData } from '@/components/images/ImageCard';
import { refTitle } from '@/lib/featured';
import { resolveFeaturedImage } from '@/lib/latestImages';
import { client } from '../../../tina/__generated__/client';

export const metadata = {
  title: 'Bible Images',
  description: 'Curated biblical imagery — manuscripts, archaeology, and scribal artifacts with scholarly commentary.',
};

export const dynamic = 'force-dynamic';

export default async function Images() {
  const [imagesPageData, bibleImageConnectionData] = await Promise.all([
    client.queries.images({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.bibleImageConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = imagesPageData.data.images;
  const rawEdges = bibleImageConnectionData.data.bibleImageConnection.edges || [];

  const allImages: ImageCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      category: refTitle(node.category),
      scripture: node.scripture,
      description: node.description,
      image: node.image,
      date: node.date,
      citation: node.citation,
    }));

  // Preserve canonical display order from the original HTML reference
  const canonicalOrder = [
    'the-southern-steps-of-jerusalem',
    'greek-codex-transcription-annotations',
    'the-great-isaiah-scroll-replica',
  ];
  allImages.sort((a, b) => {
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
            <span className="text-primary font-semibold">Bible Images</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Visual Commentary'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Biblical Imagery & Artifacts'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'High-resolution photography of ancient manuscript fragments, archaeological locations, and scholarly diagrams designed to enrich scriptural comprehension.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Featured Image Spotlight — the doc marked 'Featured Spotlight = Yes' */}
        <FeaturedImageSpotlight
          badge={data.featuredImage?.badge}
          scriptureLabel={data.featuredImage?.scriptureLabel}
          downloadButtonText={data.featuredImage?.downloadButtonText}
          citationButtonText={data.featuredImage?.citationButtonText}
          item={resolveFeaturedImage(rawEdges.map((e) => e?.node))}
        />

        {/* Search & Category Explorer */}
        <ImagesExplorer
          images={allImages}
          searchPlaceholder={data.searchPlaceholder}
          archiveTitle={data.archiveTitle}
        />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
