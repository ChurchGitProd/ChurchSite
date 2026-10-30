import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import QuickLinksExplorer from '@/components/quick-links/QuickLinksExplorer';
import { ShortcutCardData } from '@/components/quick-links/ShortcutCard';
import { client } from '../../../tina/__generated__/client';

export const dynamic = 'force-dynamic';

export default async function QuickLinks() {
  const [quickLinksPageData, quickLinkConnectionData] = await Promise.all([
    client.queries.quickLinks(
      { relativePath: 'index.md' },
      { fetchOptions: { cache: 'no-store' } }
    ),
    client.queries.quickLinkConnection(
      {},
      { fetchOptions: { cache: 'no-store' } }
    ),
  ]);

  const data = quickLinksPageData.data.quickLinks;
  const rawEdges = quickLinkConnectionData.data.quickLinkConnection.edges || [];

  const allShortcuts: ShortcutCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      subtitle: node.subtitle,
      targetUrl: node.targetUrl,
      icon: node.icon,
      description: node.description,
    }));

  // Canonical ordering matching the original source HTML cards
  const canonicalOrder = [
    'all-lessons',
    'references',
    'library',
    'seminars',
    'newsletter',
    'books',
    'archives',
    'contact',
  ];

  allShortcuts.sort((a, b) => {
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

      <Header activePage="quick-links" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Quick Links</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Navigation Hub'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Quick Links Directory'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'Fast-track access to all theological resources, study materials, and platform features. Browse by category or use the search module to find exactly what you need.'}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Explorer Layout */}
      <QuickLinksExplorer
        featuredBanner={data.featuredBanner}
        categorySectionTitle={data.categorySectionTitle}
        searchSectionTitle={data.searchSectionTitle}
        searchPlaceholder={data.searchPlaceholder}
        shortcutsSectionTitle={data.shortcutsSectionTitle}
        shortcuts={allShortcuts}
      />

      <Footer />
    </div>
  );
}
