import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import NewsletterSignupForm from '@/components/newsletter/NewsletterSignupForm';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { client } from '../../../../tina/__generated__/client';

interface DailyLetterDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.dailyLetterConnection();
    const edges = res.data.dailyLetterConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function DailyLetterDetailPage({
  params,
}: DailyLetterDetailPageProps) {
  let letterRes;
  let pageRes;

  try {
    [letterRes, pageRes] = await Promise.all([
      client.queries.dailyLetter({ relativePath: `${params.slug}.mdx` }),
      client.queries.newsletter({ relativePath: 'index.md' }),
    ]);
  } catch {
    notFound();
  }

  const letter = letterRes?.data?.dailyLetter;
  const pageData = pageRes?.data?.newsletter;

  if (!letter) {
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

      <Header activePage="newsletter" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/newsletter" className="hover:text-primary transition-colors">
              Daily Newsletter
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">{letter.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Daily Letter Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="space-y-8">
          <article className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                  {letter.date}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="px-2.5 py-0.5 bg-muted rounded text-[11px] text-primary font-medium">
                  {letter.scripture}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <span className="text-tertiary">👤</span>
                <span>{letter.author}</span>
              </div>
            </div>

            {/* Title & Excerpt */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                {letter.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-tertiary pl-4">
                {letter.description}
              </p>
            </div>

            {/* Extended Devotional Reflection Body */}
            {letter.body && (
              <div className="pt-4 border-t border-border/60">
                <h2 className="text-xs font-bold text-tertiary uppercase tracking-wider mb-3">
                  Devotional Reflection
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground font-sans leading-relaxed space-y-4">
                  <TinaMarkdown content={letter.body} />
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
              <Link
                href="/newsletter"
                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Back to Daily Letters</span>
              </Link>
            </div>
          </article>

          {/* In-page Signup CTA for the Daily Letter */}
          <NewsletterSignupForm data={pageData?.signupCTA} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
