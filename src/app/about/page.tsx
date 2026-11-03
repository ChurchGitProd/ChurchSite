import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import AboutHero from '@/components/about/AboutHero';
import IntroMissionSection from '@/components/about/IntroMissionSection';
import StatementOfFaithSection from '@/components/about/StatementOfFaithSection';
import LeadershipSection from '@/components/about/LeadershipSection';
import AcademicOfficeWidget from '@/components/about/AcademicOfficeWidget';
import QuoteWidget from '@/components/about/QuoteWidget';
import { client } from '../../../tina/__generated__/client';

export const metadata = {
  title: 'About',
  description: 'About SCRIPTURA Digital Library — our mission to preserve, study, and teach biblical texts with scholarly precision.',
};

export const dynamic = 'force-dynamic';

export default async function About() {
  const aboutData = await client.queries.about(
    { relativePath: 'index.md' },
    { fetchOptions: { cache: 'no-store' } }
  );
  const data = aboutData.data.about;

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

      <Header activePage="about" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero / Banner Section */}
      <AboutHero
        badge={data.hero?.badge}
        headline={data.hero?.headline}
        subheadline={data.hero?.subheadline}
      />

      {/* Core Introduction & Mission / Vision */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Introduction, Mission/Vision, Statement of Faith & Leadership */}
          <div className="lg:col-span-8 space-y-12">
            <IntroMissionSection
              introTitle={data.introTitle}
              introParagraph1={data.introParagraph1}
              introParagraph2={data.introParagraph2}
              mission={data.mission}
              vision={data.vision}
            />

            <StatementOfFaithSection
              statementOfFaith={data.statementOfFaith}
            />

            <LeadershipSection
              title={data.leadershipTitle}
              scholars={data.leadership}
            />
          </div>

          {/* Right: Sidebar Widget Area */}
          <aside className="lg:col-span-4 space-y-8">
            <AcademicOfficeWidget office={data.academicOffice} />
            <QuoteWidget quoteWidget={data.quoteWidget} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
