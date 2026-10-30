import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import LibraryExplorer from '@/components/library/LibraryExplorer';
import { LibraryResourceData } from '@/components/library/LibraryResourceCard';
import { client } from '../../../tina/__generated__/client';

export const dynamic = 'force-dynamic';

export default async function Library() {
  const [libraryPageData, libraryResourceConnectionData] = await Promise.all([
    client.queries.library({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.libraryResourceConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = libraryPageData.data.library;
  const rawEdges =
    libraryResourceConnectionData.data.libraryResourceConnection.edges || [];

  const allResources: LibraryResourceData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      category: node.category,
      era: node.era,
      badge: node.badge,
      description: node.description,
      author: node.author,
      primaryDetail: node.primaryDetail,
      detailIcon: node.detailIcon,
      tags: node.tags,
    }));

  // Canonical display order matching original HTML source
  const canonicalOrder = [
    'matthew-henrys-complete-commentary',
    'brown-driver-briggs-hebrew-lexicon',
    'institutes-of-the-christian-religion',
    'nicene-creed-and-early-church-fathers',
    'the-doctrine-of-justification-a-historical-survey',
  ];

  allResources.sort((a, b) => {
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

      {/* Universal Header with active nav */}
      <Header activePage="library" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Library</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Digital Resource Repository'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Theological Library'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'A comprehensive digital repository housing commentaries, lexicons, historical documents, theological treatises, and scholarly research materials for in-depth biblical study.'}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Library Explorer (Toolbar, Featured Spotlight, Resources, Pagination, and Sidebar) */}
      <LibraryExplorer
        resources={allResources}
        searchPlaceholder={data.searchPlaceholder}
        featuredResource={data.featuredResource}
        sidebarTitles={{
          categoriesTitle: data.categoriesTitle,
          popularTitle: data.popularTitle,
          recentTitle: data.recentTitle,
        }}
      />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
