import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/media';

interface LessonItem {
  category?: string | null;
  reference?: string | null;
  author?: string | null;
  title?: string | null;
  description?: string | null;
  readTime?: string | null;
  image?: string | null;
  link?: string | null;
}

interface FeaturedLessonsData {
  sectionTitle?: string | null;
  lesson1?: LessonItem | null;
  lesson2?: LessonItem | null;
}

interface FeaturedLessonsSectionProps {
  data?: FeaturedLessonsData | null;
}

export default function FeaturedLessonsSection({ data }: FeaturedLessonsSectionProps) {
  const sectionTitle = data?.sectionTitle || 'Featured Bible Lessons';

  const defaultLessons: LessonItem[] = [
    {
      category: 'Pentateuch',
      reference: 'Genesis 1-11',
      author: 'Dr. Charles Vance',
      title: 'The Theology of Creation & Covenant',
      description:
        'An in-depth scholarly analysis of the primeval history, exploring the structural parallels of creation narratives and the foundational covenants.',
      readTime: '45 mins read',
      image:
        'https://uxmagic.blob.core.windows.net/public/agent-images/study_scene-1782719380163-v1e6si6wd9.png',
    },
    {
      category: 'Epistles',
      reference: 'Romans 5-8',
      author: 'Prof. Eleanor Sterling',
      title: 'Grace, Justification, and the New Life',
      description:
        "Tracing Paul's masterpiece argument from legal justification to the intimate reality of life in the Holy Spirit.",
      readTime: '50 mins read',
      image:
        'https://uxmagic.blob.core.windows.net/public/agent-images/library_shelf-1782719371570-ajnz70oz8sg.png',
    },
  ];

  const lessons: LessonItem[] = [
    data?.lesson1 || defaultLessons[0],
    data?.lesson2 || defaultLessons[1],
  ].filter(Boolean) as LessonItem[];

  return (
    <section id="lessons" className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle}
        </h2>
        <Link
          href="/lessons"
          className="text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>View All Lessons</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all flex flex-col group"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={sanitizeImageUrl(lesson.image || defaultLessons[idx]?.image || '')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={lesson.title || 'Lesson thumbnail'}
              />
              {lesson.category && (
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                  {lesson.category}
                </span>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs text-tertiary font-semibold">
                  {lesson.reference}
                  {lesson.author ? ` | ${lesson.author}` : ''}
                </p>
                <h3 className="text-lg font-heading font-bold text-primary group-hover:text-tertiary transition-colors">
                  {lesson.title}
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
                <Link
                  href={lesson.link || (idx === 0 ? '/lessons/genesis-1-11-the-theology-of-creation' : '/lessons/grace-justification-and-new-life')}
                  className="text-primary font-semibold hover:underline"
                >
                  Read Lesson
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
