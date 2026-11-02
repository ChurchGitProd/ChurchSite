import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/media';
import { FeaturedLessonItem } from '@/lib/featuredLessons';
import ReadPdfLink from '@/components/common/ReadPdfLink';

interface FeaturedLessonsSectionProps {
  sectionTitle?: string | null;
  lessons?: FeaturedLessonItem[];
}

const FALLBACK_IMAGE =
  'https://uxmagic.blob.core.windows.net/public/agent-images/study_scene-1782719380163-v1e6si6wd9.png';

export default function FeaturedLessonsSection({ sectionTitle, lessons }: FeaturedLessonsSectionProps) {
  const items = lessons ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="lessons" className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle || 'Featured Bible Lessons'}
        </h2>
        <Link
          href="/lessons"
          className="text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>View All Lessons</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((lesson) => (
          <div
            key={lesson.slug}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all flex flex-col group"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={sanitizeImageUrl(lesson.image || FALLBACK_IMAGE)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={lesson.title || 'Lesson thumbnail'}
              />
              {lesson.division && (
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                  {lesson.division}
                </span>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs text-tertiary font-semibold">
                  {lesson.reference}
                  {lesson.teacher ? ` | ${lesson.teacher}` : ''}
                </p>
                <h3 className="text-lg font-heading font-bold text-primary group-hover:text-tertiary transition-colors">
                  <Link href={`/lessons/${lesson.slug}`} className="hover:text-tertiary transition-colors">
                    {lesson.title}
                  </Link>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {lesson.description}
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-tertiary" />
                  <span>{lesson.readTime || '30 mins read'}</span>
                </span>
                <ReadPdfLink
                  pdfFile={lesson.pdfFile}
                  className="text-primary font-semibold hover:underline"
                >
                  Read Lesson
                </ReadPdfLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
