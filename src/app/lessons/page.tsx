import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedLessonSpotlight from '@/components/lessons/FeaturedLessonSpotlight';
import UpcomingSeminarsCard, { SeminarItem } from '@/components/lessons/UpcomingSeminarsCard';
import LessonsExplorer from '@/components/lessons/LessonsExplorer';
import { LessonCardData } from '@/components/lessons/LessonCard';
import { refTitle } from '@/lib/featured';
import { resolveFeaturedLessons } from '@/lib/featuredLessons';
import { resolveUpcomingZoomSeminar } from '@/lib/zoom';
import { client } from '../../../tina/__generated__/client';

export const metadata = {
  title: 'Bible Lessons',
  description: 'Structured Bible lessons by division — Pentateuch, Historical Books, Gospels, and Epistles.',
};

export const dynamic = 'force-dynamic';

export default async function Lessons() {
  const [lessonsPageData, lessonConnectionData, zoomInfoData] = await Promise.all([
    client.queries.lessons({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.lessonConnection({}, { fetchOptions: { cache: 'no-store' } }),
    client.queries.zoomInfo({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }).catch(() => null),
  ]);

  const data = lessonsPageData.data.lessons;
  const rawEdges = lessonConnectionData.data.lessonConnection.edges || [];

  const allLessons: LessonCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      reference: `${node.book} ${node.chapters}`,
      division: refTitle(node.division),
      teacher: node.teacher,
      description: node.description,
      pdfFile: node.pdfFile || null,
    }));

  // Spotlight shows the lesson holding featured position 1 on its document
  const featured = resolveFeaturedLessons(rawEdges.map((e) => e?.node));
  const spotlight = featured[0] ?? null;
  const gridLessons = allLessons.filter((l) => l.slug !== spotlight?.slug);

  const seminar = resolveUpcomingZoomSeminar(zoomInfoData?.data?.zoomInfo);
  const seminarItems: SeminarItem[] = seminar?.title
    ? [
        {
          title: seminar.title,
          schedule: [seminar.dateStr, seminar.timeStr].filter(Boolean).join(' | '),
          link: '/zoom-info',
          isLive: seminar.isLive,
        },
      ]
    : [];

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
      <Header activePage="lessons" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Bible Lessons</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero Section */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Curriculum & Exegesis'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Expository Bible Lessons'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'Structured, text-centered lessons written by theological scholars, analyzing historical context, original languages, and doctrinal implications.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Lesson Spotlight (narrower when the seminars card sits beside it) */}
          <div className={seminarItems.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'}>
            <FeaturedLessonSpotlight
              badge={data.featuredLesson?.badge}
              linkText={data.featuredLesson?.linkText}
              lesson={spotlight}
            />
          </div>

          {/* Seminars widget beside the spotlight */}
          {seminarItems.length > 0 && (
            <aside className="lg:col-span-4 space-y-8">
              <UpcomingSeminarsCard title={data.seminarTitle} seminars={seminarItems} />
            </aside>
          )}

          {/* Interactive Lesson Explorer (Search, Filter, Counter, Grid, Pagination) — full width */}
          <div className="lg:col-span-12">
            <LessonsExplorer
              lessons={gridLessons.length > 0 ? gridLessons : allLessons}
              searchPlaceholder={data.searchPlaceholder || 'Search lessons...'}
            />
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
