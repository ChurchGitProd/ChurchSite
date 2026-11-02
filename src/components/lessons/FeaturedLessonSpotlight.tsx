import Link from 'next/link';
import { sanitizeImageUrl } from '@/lib/media';
import { FeaturedLessonItem } from '@/lib/featuredLessons';
import ReadPdfLink from '@/components/common/ReadPdfLink';

interface FeaturedLessonSpotlightProps {
  badge?: string | null;
  linkText?: string | null;
  lesson?: FeaturedLessonItem | null;
}

const FALLBACK_IMAGE =
  'https://uxmagic.blob.core.windows.net/public/agent-images/study_scene-1782719380163-v1e6si6wd9.png';

export default function FeaturedLessonSpotlight({
  badge,
  linkText,
  lesson,
}: FeaturedLessonSpotlightProps) {
  if (!lesson) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full md:w-1/2 h-48 rounded-lg overflow-hidden border border-border flex-shrink-0">
        <img
          src={sanitizeImageUrl(lesson.image || FALLBACK_IMAGE)}
          className="w-full h-full object-cover"
          alt={lesson.title}
        />
      </div>
      <div className="w-full md:w-1/2 space-y-3">
        <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
          {badge || 'Featured Lesson'}
        </span>
        <h2 className="text-xl font-heading font-bold text-primary">
          <Link
            href={`/lessons/${lesson.slug}`}
            className="hover:text-tertiary transition-colors"
          >
            {lesson.title}
          </Link>
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {lesson.description}
        </p>
        <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Teacher: {lesson.teacher}</span>
          <ReadPdfLink
            pdfFile={lesson.pdfFile}
            className="text-primary font-semibold hover:underline"
          >
            {linkText || 'Start Lesson'}
          </ReadPdfLink>
        </div>
      </div>
    </div>
  );
}
