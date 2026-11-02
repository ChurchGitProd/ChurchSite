import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import HomeHero from '@/components/home/HomeHero';
import ScriptureOfTheDay from '@/components/home/ScriptureOfTheDay';
import FeaturedLessonsSection from '@/components/home/FeaturedLessonsSection';
import LatestReferencesSection from '@/components/home/LatestReferencesSection';
import FeaturedVideosSection from '@/components/home/FeaturedVideosSection';
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection';
import FeaturedPublicationsSection from '@/components/home/FeaturedPublicationsSection';
import ZoomMeetingCard from '@/components/home/ZoomMeetingCard';
import { resolveUpcomingZoomSeminar } from '@/lib/zoom';
import { resolveFeaturedVideos } from '@/lib/featuredVideos';
import { resolveFeaturedLessons } from '@/lib/featuredLessons';
import { resolveLatestReferences } from '@/lib/latestReferences';
import { resolveLatestImages } from '@/lib/latestImages';
import { client } from "../../tina/__generated__/client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [homeData, zoomInfoData, videoConnectionData, lessonConnectionData, bibleReferenceConnectionData, bibleImageConnectionData] = await Promise.all([
    client.queries.home(
      { relativePath: "index.md" },
      { fetchOptions: { cache: "no-store" } }
    ),
    client.queries.zoomInfo(
      { relativePath: "index.md" },
      { fetchOptions: { cache: "no-store" } }
    ).catch(() => null),
    client.queries.videoConnection(
      {},
      { fetchOptions: { cache: "no-store" } }
    ).catch(() => null),
    client.queries.lessonConnection(
      {},
      { fetchOptions: { cache: "no-store" } }
    ).catch(() => null),
    client.queries.bibleReferenceConnection(
      {},
      { fetchOptions: { cache: "no-store" } }
    ).catch(() => null),
    client.queries.bibleImageConnection(
      {},
      { fetchOptions: { cache: "no-store" } }
    ).catch(() => null),
  ]);
  const data = homeData.data.home;
  const seminar = resolveUpcomingZoomSeminar(zoomInfoData?.data?.zoomInfo);
  const featuredVideos = resolveFeaturedVideos(
    videoConnectionData?.data?.videoConnection?.edges?.map((edge) => edge?.node)
  );
  const featuredLessons = resolveFeaturedLessons(
    lessonConnectionData?.data?.lessonConnection?.edges?.map((edge) => edge?.node)
  );
  const latestReferences = resolveLatestReferences(
    bibleReferenceConnectionData?.data?.bibleReferenceConnection?.edges?.map((edge) => edge?.node)
  );
  const galleryImages = resolveLatestImages(
    bibleImageConnectionData?.data?.bibleImageConnection?.edges?.map((edge) => edge?.node)
  );

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
        zoomInfoData={zoomInfoData?.data?.zoomInfo}
      />

      {/* Universal Header (Sticky) */}
      <Header activePage="home" />

      {/* Rich Hero Section with Bible-Based Identity Statement */}
      <HomeHero data={data.hero} />

      {/* Featured Verse / Scripture of the Day */}
      <ScriptureOfTheDay data={data.scriptureOfTheDay} />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        <FeaturedLessonsSection
          sectionTitle={data.featuredLessons?.sectionTitle}
          lessons={featuredLessons}
        />
        <LatestReferencesSection
          sectionTitle={data.latestReferences?.sectionTitle}
          items={latestReferences}
        />
        <FeaturedVideosSection
          sectionTitle={data.featuredVideos?.sectionTitle}
          videos={featuredVideos}
        />
        <GalleryPreviewSection
          sectionTitle={data.galleryPreview?.sectionTitle}
          items={galleryImages}
        />
        <FeaturedPublicationsSection data={data.featuredPublications} />
        <ZoomMeetingCard seminar={seminar} />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
