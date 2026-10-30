import Link from 'next/link';
import { sanitizeImageUrl } from '@/lib/media';
import ReadPdfLink from '@/components/common/ReadPdfLink';

interface FeaturedLessonData {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  teacher?: string | null;
  linkText?: string | null;
  image?: string | null;
}

interface FeaturedLessonSpotlightProps {
  data?: FeaturedLessonData | null;
  slug?: string;
  image?: string;
  pdfFile?: string | null;
}

export default function FeaturedLessonSpotlight({
  data,
  slug = 'genesis-1-11-the-theology-of-creation',
  pdfFile,
  image = 'https://uxmagic.blob.core.windows.net/public/agent-images/study_scene-1782719380163-v1e6si6wd9.png',
}: FeaturedLessonSpotlightProps) {
  const badge = data?.badge || 'Featured Lesson';
  const title = data?.title || 'Genesis 1-11 — The Theology of Creation';
  const description =
    data?.description ||
    'Dr. Charles Vance analyzes the primeval history of Genesis, focusing on the structural parallels of creation narratives and the covenant of grace.';
  const teacher = data?.teacher || 'Dr. Vance';
  const linkText = data?.linkText || 'Start Lesson';
  const coverImage = data?.image || image;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full md:w-1/2 h-48 rounded-lg overflow-hidden border border-border flex-shrink-0">
        <img
          src={sanitizeImageUrl(coverImage)}
          className="w-full h-full object-cover"
          alt={title}
        />
      </div>
      <div className="w-full md:w-1/2 space-y-3">
        <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
          {badge}
        </span>
        <h2 className="text-xl font-heading font-bold text-primary">
          <Link
            href={`/lessons/${slug}`}
            className="hover:text-tertiary transition-colors"
          >
            {title}
          </Link>
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Teacher: {teacher}</span>
          <ReadPdfLink
            pdfFile={pdfFile}
            className="text-primary font-semibold hover:underline"
          >
            {linkText}
          </ReadPdfLink>
        </div>
      </div>
    </div>
  );
}
