import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import ZoomHero from '@/components/zoom-info/ZoomHero';
import FeaturedMeetingCard from '@/components/zoom-info/FeaturedMeetingCard';
import MeetingDetailCards from '@/components/zoom-info/MeetingDetailCards';
import SessionScheduleList from '@/components/zoom-info/SessionScheduleList';
import RelatedScriptureSection from '@/components/zoom-info/RelatedScriptureSection';
import { client } from '../../../tina/__generated__/client';

export const metadata = {
  title: 'Zoom Seminar Schedule | SCRIPTURA Digital Library',
  description:
    'Join our live theological seminars, Bible study sessions, and scholarly discussions via Zoom. Connect with our faculty and fellow believers from around the world.',
};

export const dynamic = 'force-dynamic';

export default async function ZoomInfoPage() {
  const zoomInfoData = await client.queries.zoomInfo(
    { relativePath: 'index.md' },
    { fetchOptions: { cache: 'no-store' } }
  );
  const data = zoomInfoData.data.zoomInfo;

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
        zoomInfoData={data}
      />

      <Header activePage="zoom-info" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Zoom Meeting Info</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <ZoomHero
        badge={data.hero?.badge}
        headline={data.hero?.headline}
        subheadline={data.hero?.subheadline}
      />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="space-y-12">
          {/* Upcoming Meeting Hero Card */}
          <FeaturedMeetingCard
            featuredMeeting={data.featuredMeeting}
            meetingId={data.meetingAccessCard?.meetingId}
            passcode={data.meetingAccessCard?.passcode}
          />

          {/* Meeting Detail Cards: Speaker, Access, Preparation */}
          <MeetingDetailCards
            speakerCard={data.speakerCard}
            meetingAccessCard={data.meetingAccessCard}
            preparationCard={data.preparationCard}
          />

          {/* Upcoming & Past Sessions Listing */}
          <SessionScheduleList
            sessionsTitle={data.sessionsTitle}
            sessions={data.sessions}
          />

          {/* Related Scripture Study Widget */}
          <RelatedScriptureSection
            relatedScripture={data.relatedScripture}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
