import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedReferenceSpotlight from '@/components/references/FeaturedReferenceSpotlight';
import ReferencesExplorer from '@/components/references/ReferencesExplorer';
import { ReferenceCardData } from '@/components/references/ReferenceCard';
import { refTitle } from '@/lib/featured';
import { resolveFeaturedReference } from '@/lib/latestReferences';
import { client } from '../../../tina/__generated__/client';

export const dynamic = 'force-dynamic';

export default async function References() {
  const [referencesPageData, bibleReferenceConnectionData] = await Promise.all([
    client.queries.references({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.bibleReferenceConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = referencesPageData.data.references;
  const rawEdges =
    bibleReferenceConnectionData.data.bibleReferenceConnection.edges || [];

  const allReferences: ReferenceCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      scripture: node.scripture,
      category: node.category,
      description: node.description,
      author: node.author,
      testament: node.testament,
      genre: refTitle(node.genre),
      tags: node.tags,
    }));

  // Preserve canonical display order from the original HTML reference
  const canonicalOrder = [
    'matthew-1-22-23',
    'psalm-22-1-31',
    'deuteronomy-6-4-9',
  ];
  const featuredItem = resolveFeaturedReference(rawEdges.map((e) => e?.node));

  allReferences.sort((a, b) => {
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
      <Header activePage="references" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Bible References</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Scriptural Concordance'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Theological Cross-References'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'A meticulously cross-referenced database linking messianic prophecies, apostolic epistles, covenants, and historical chronicles with linguistic breakdowns.'}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive References Explorer (Toolbar + Grid + Sidebar) */}
      <ReferencesExplorer
        references={allReferences.filter((r) => r.slug !== featuredItem?.slug)}
        searchPlaceholder={data.searchPlaceholder}
        featuredSlot={
          <FeaturedReferenceSpotlight
            badge={data.featuredReference?.badge}
            linkText={data.featuredReference?.linkText}
            item={featuredItem}
          />
        }
      />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
