'use client';

import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';
import { useCourseProgress } from '@/lib/useCourseProgress';
import ReadPdfLink from '@/components/common/ReadPdfLink';

export interface LessonCardData {
  slug: string;
  title: string;
  reference: string;
  division: string;
  teacher: string;
  description: string;
  pdfFile?: string | null;
}

interface LessonCardProps {
  lesson: LessonCardData;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const { isCompleted, toggleLesson, mounted } = useCourseProgress();
  const completed = mounted && isCompleted(lesson.slug);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between p-5 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold">
          <span>{lesson.reference}</span>
          <span className="flex items-center gap-2">
            <span className="text-tertiary uppercase">{lesson.division}</span>
            <button
              type="button"
              onClick={() => toggleLesson(lesson.slug)}
              aria-pressed={completed}
              title={completed ? 'Mark as incomplete' : 'Mark lesson complete'}
              aria-label={completed ? 'Mark lesson incomplete' : 'Mark lesson complete'}
              className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                completed ? 'text-emerald-600' : 'text-muted-foreground hover:text-tertiary'
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>In progress</span>
                </>
              )}
            </button>
          </span>
        </div>
        <h3 className="text-base font-heading font-bold text-primary">
          <Link
            href={`/lessons/${lesson.slug}`}
            className="hover:text-tertiary transition-colors"
          >
            {lesson.title}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {lesson.description}
        </p>
      </div>
      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <span>{lesson.teacher}</span>
        <ReadPdfLink
          pdfFile={lesson.pdfFile}
          className="text-primary font-semibold hover:underline"
        >
          Read Lesson
        </ReadPdfLink>
      </div>
    </div>
  );
}
