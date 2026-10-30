import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedDevotionalCard from '@/components/newsletter/FeaturedDevotionalCard';
import DailyLetterList from '@/components/newsletter/DailyLetterList';
import NewsletterSignupForm from '@/components/newsletter/NewsletterSignupForm';
import ScriptureQuoteBlock from '@/components/newsletter/ScriptureQuoteBlock';
import { DailyLetterItemData } from '@/components/newsletter/DailyLetterCard';
import { client } from '../../../tina/__generated__/client';

export const dynamic = 'force-dynamic';

export default async function Newsletter() {
  const [newsletterPageData, dailyLetterConnectionData] = await Promise.all([
    client.queries.newsletter({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.dailyLetterConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = newsletterPageData.data.newsletter;
  const rawEdges =
    dailyLetterConnectionData.data.dailyLetterConnection.edges || [];

  const allLetters: DailyLetterItemData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      date: node.date,
      scripture: node.scripture,
      author: node.author,
      description: node.description,
    }));

  // Canonical chronological order matching the original HTML source
  const canonicalOrder = [
    'walking-by-faith-not-by-sight',
    'the-wisdom-of-the-cross',
    'called-to-be-holy',
    'the-armor-of-god',
    'abiding-in-the-vine',
  ];

  allLetters.sort((a, b) => {
    const idxA = canonicalOrder.indexOf(a.slug);
    const idxB = canonicalOrder.indexOf(b.slug);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

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

      <Header activePage="newsletter" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Daily Newsletter</span>
          </nav>
        </div>
      </div>

      {/* Page Intro */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Daily Devotional'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Scriptura Daily Letter'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                "Start each day with scripture-centered reflections, theological insights, and practical wisdom delivered straight to your inbox. Join thousands of believers growing in faith through daily engagement with God's Word."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Featured Devotional Block */}
          <FeaturedDevotionalCard devotional={data.featuredDevotional} />

          {/* Newsletter Archive Listing */}
          <DailyLetterList letters={allLetters} />

          {/* Signup CTA Section */}
          <NewsletterSignupForm data={data.signupCTA} />

          {/* Scripture Quote Banner */}
          <ScriptureQuoteBlock data={data.scriptureQuote} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
