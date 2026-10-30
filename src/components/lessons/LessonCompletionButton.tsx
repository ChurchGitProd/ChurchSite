'use client';

import { useCourseProgress } from '@/lib/useCourseProgress';
import { CheckCircle2, Circle } from 'lucide-react';

interface LessonCompletionButtonProps {
  slug: string;
  title?: string;
}

export default function LessonCompletionButton({ slug, title }: LessonCompletionButtonProps) {
  const { isCompleted, toggleLesson, mounted } = useCourseProgress();
  const completed = mounted && isCompleted(slug);

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest block">
          Curriculum Progress
        </span>
        <h4 className="text-sm font-heading font-bold text-primary">
          {completed ? 'Lesson Completed' : 'Track Your Progress'}
        </h4>
        <p className="text-xs text-muted-foreground">
          {completed
            ? 'You have finished this lesson. Click below if you wish to reset or mark as incomplete.'
            : 'Mark this lesson as completed once you have finished reading and reflection.'}
        </p>
      </div>

      <button
        type="button"
        onClick={() => toggleLesson(slug)}
        aria-pressed={completed}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs cursor-pointer select-none shrink-0 ${
          completed
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
        title={completed ? 'Click to mark as incomplete' : 'Mark lesson complete'}
        aria-label={
          completed
            ? `Lesson ${title || ''} completed. Click to mark as incomplete`
            : `Mark lesson ${title || ''} as complete`
        }
      >
        {completed ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>✓ Lesson Completed</span>
          </>
        ) : (
          <>
            <Circle className="w-4 h-4 opacity-75" />
            <span>Mark Lesson Complete</span>
          </>
        )}
      </button>
    </div>
  );
}
