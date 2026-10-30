import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import CourseProgressCard from '@/components/lessons/CourseProgressCard';
import UpcomingSeminarsCard from '@/components/lessons/UpcomingSeminarsCard';
import LessonCompletionButton from '@/components/lessons/LessonCompletionButton';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowLeft, User, Award } from 'lucide-react';
import { client } from '../../../../tina/__generated__/client';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.lessonConnection();
    const edges = res.data.lessonConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function LessonDetailPage({ params }: LessonPageProps) {
  let lessonRes;
  let pageRes;
  let lessonConnectionRes;

  try {
    [lessonRes, pageRes, lessonConnectionRes] = await Promise.all([
      client.queries.lesson({ relativePath: `${params.slug}.mdx` }),
      client.queries.lessons({ relativePath: 'index.md' }),
      client.queries.lessonConnection(),
    ]);
  } catch {
    notFound();
  }

  const lesson = lessonRes?.data?.lesson;
  const pageData = pageRes?.data?.lessons;
  const rawEdges = lessonConnectionRes?.data?.lessonConnection?.edges || [];
  const allLessonSlugs = rawEdges
    .map((e) => e?.node?._sys.filename)
    .filter((s): s is string => Boolean(s));
  const totalLessons = allLessonSlugs.length || 5;

  if (!lesson) {
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
      <Header activePage="lessons" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/lessons" className="hover:text-primary transition-colors">
              Bible Lessons
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {lesson.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Expository Content (8 cols) */}
          <article className="lg:col-span-8 space-y-8">
            {/* Back Navigation Link */}
            <Link
              href="/lessons"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all lessons</span>
            </Link>

            {/* Lesson Header Card */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest px-2.5 py-1 bg-tertiary/10 rounded">
                  {lesson.division}
                </span>
                <span className="text-xs font-semibold text-primary px-2.5 py-0.5 border border-border rounded">
                  {lesson.book} {lesson.chapters}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                {lesson.title}
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {lesson.description}
              </p>

              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-tertiary" />
                  <span>
                    Teacher: <strong className="text-primary">{lesson.teacher}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-tertiary" />
                  <span className="capitalize">
                    Level: <strong className="text-primary">{lesson.difficulty}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Expository Markdown Content Body */}
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm prose prose-sm sm:prose max-w-none leading-relaxed text-foreground">
              {lesson.content ? (
                <TinaMarkdown content={lesson.content} />
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No expository body notes recorded for this lesson yet.
                </p>
              )}
            </div>

            {/* Interactive Lesson Completion Tracker */}
            <LessonCompletionButton slug={params.slug} title={lesson.title} />
          </article>

          {/* Right Column: Sidebar Widgets (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            <CourseProgressCard
              data={pageData}
              totalLessons={totalLessons}
              allLessonSlugs={allLessonSlugs}
            />
            <UpcomingSeminarsCard title={pageData?.seminarTitle} />
          </aside>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
