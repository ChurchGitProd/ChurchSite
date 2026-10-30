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
import { client } from "../../tina/__generated__/client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const homeData = await client.queries.home(
    { relativePath: "index.md" },
    { fetchOptions: { cache: "no-store" } }
  );
  const data = homeData.data.home;

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

      {/* Universal Header (Sticky) */}
      <Header activePage="home" />

      {/* Rich Hero Section with Bible-Based Identity Statement */}
      <HomeHero data={data.hero} />

      {/* Featured Verse / Scripture of the Day */}
      <ScriptureOfTheDay data={data.scriptureOfTheDay} />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        <FeaturedLessonsSection data={data.featuredLessons} />
        <LatestReferencesSection data={data.latestReferences} />
        <FeaturedVideosSection data={data.featuredVideos} />
        <GalleryPreviewSection data={data.galleryPreview} />
        <FeaturedPublicationsSection data={data.featuredPublications} />
        <ZoomMeetingCard data={data.zoomMeeting} />
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
