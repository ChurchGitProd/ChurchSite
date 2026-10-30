import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/media';

interface HeroData {
  badgeText?: string | null;
  headingLine1?: string | null;
  headingLine2?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  heroImage?: string | null;
}

interface HomeHeroProps {
  data?: HeroData | null;
}

export function resolveHeroHeading(data?: HeroData | null): { line1: string; line2: string } {
  const DEFAULT_LINE1 = 'Unveiling the Depth of';
  const DEFAULT_LINE2 = 'Holy Scripture';

  const rawLine1 = data?.headingLine1?.trim();
  const rawLine2 = data?.headingLine2?.trim();
  const rawHeadline = data?.headline?.trim();

  // Case 1: Both lines are explicitly provided with content
  if (rawLine1 && rawLine2) {
    // Avoid accidental duplication if editor wrote "Holy Scripture" in both lines
    const sanitizedLine1 =
      rawLine1.toLowerCase().endsWith(rawLine2.toLowerCase()) && rawLine1.length > rawLine2.length
        ? rawLine1.slice(0, rawLine1.length - rawLine2.length).trim()
        : rawLine1;
    return { line1: sanitizedLine1 || DEFAULT_LINE1, line2: rawLine2 };
  }

  // Case 2: Only Line 1 is provided
  if (rawLine1 && !rawLine2) {
    if (/holy scripture/i.test(rawLine1)) {
      const line1Part = rawLine1.replace(/holy scripture/i, '').trim();
      return {
        line1: line1Part || DEFAULT_LINE1,
        line2: DEFAULT_LINE2,
      };
    }
    return {
      line1: rawLine1,
      line2: DEFAULT_LINE2,
    };
  }

  // Case 3: Only Line 2 is provided
  if (!rawLine1 && rawLine2) {
    return {
      line1: DEFAULT_LINE1,
      line2: rawLine2,
    };
  }

  // Case 4: Neither Line 1 nor Line 2 is provided; inspect legacy headline
  if (rawHeadline) {
    if (/holy scripture/i.test(rawHeadline)) {
      const line1Part = rawHeadline.replace(/holy scripture/i, '').trim();
      return {
        line1: line1Part || DEFAULT_LINE1,
        line2: DEFAULT_LINE2,
      };
    }
    if (rawHeadline.includes('\n')) {
      const [l1, ...rest] = rawHeadline.split('\n');
      return {
        line1: l1.trim() || DEFAULT_LINE1,
        line2: rest.join(' ').trim() || DEFAULT_LINE2,
      };
    }
    // Custom single-line headline without "Holy Scripture"
    return {
      line1: rawHeadline,
      line2: '',
    };
  }

  // Case 5: Default fallback when all fields are missing or empty
  return {
    line1: DEFAULT_LINE1,
    line2: DEFAULT_LINE2,
  };
}

export default function HomeHero({ data }: HomeHeroProps) {
  const badgeText = data?.badgeText?.trim() || 'PREMIUM DIGITAL BIBLE LIBRARY & SCHOLARLY ARCHIVE';
  const { line1, line2 } = resolveHeroHeading(data);

  const subheadline =
    data?.subheadline?.trim() ||
    'A meticulous, beautifully curated editorial platform dedicated purely to the preservation, study, and teaching of biblical texts. Explore ancient manuscripts, modern commentaries, comprehensive lessons, and scholarly resources in an environment designed for deep contemplation.';
  const ctaText = data?.ctaText?.trim() || 'Explore Digital Library';
  const ctaLink = data?.ctaLink?.trim() || '/library';
  const secondaryCtaText = data?.secondaryCtaText?.trim() || 'Browse Lessons';
  const secondaryCtaLink = data?.secondaryCtaLink?.trim() || '/lessons';
  const heroImage = data?.heroImage?.trim() || '/uploads/hero-image.webp';

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden border-b border-border"
      style={{
        background:
          'radial-gradient(circle at top right, rgba(153,212,224,0.35), transparent 40%), linear-gradient(180deg, #EAF7FA 0%, #F4FBFC 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-secondary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>{badgeText}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight flex flex-col gap-2 sm:gap-3">
              <span className="block font-bold text-primary tracking-tight">{line1}</span>
              {line2 && (
                <span
                  className="block text-tertiary font-normal text-5xl sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "'Sacramento', cursive" }}
                >
                  {line2}
                </span>
              )}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-sans">
              {subheadline}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={ctaLink}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/95 transition-all flex items-center gap-2 group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={secondaryCtaLink}
                className="px-6 py-3 bg-card text-primary border border-border font-semibold rounded-lg hover:bg-muted transition-all flex items-center gap-2"
              >
                <span>{secondaryCtaText}</span>
                <BookOpen className="w-4 h-4 text-tertiary" />
              </Link>
            </div>
          </div>

          {/* Hero Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/20 to-primary/10 rounded-2xl blur-2xl -z-10"></div>
            <div className="border-4 border-border rounded-2xl p-2 bg-card shadow-2xl overflow-hidden transform hover:rotate-1 transition-transform duration-300">
              <img
                src={sanitizeImageUrl(heroImage)}
                alt="Open Bible on altar"
                className="w-full h-auto rounded-lg object-cover shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
