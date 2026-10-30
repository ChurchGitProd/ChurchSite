import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedArchiveBlock from '@/components/archives/FeaturedArchiveBlock';
import ArchiveSidebar from '@/components/archives/ArchiveSidebar';
import ArchivesExplorer from '@/components/archives/ArchivesExplorer';
import { ArchiveItemData } from '@/components/archives/ArchiveItemCard';
import { client } from '../../../tina/__generated__/client';

export const dynamic = 'force-dynamic';

export default async function Archives() {
  const [archivesPageData, archiveDocumentConnectionData] = await Promise.all([
    client.queries.archives({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.archiveDocumentConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = archivesPageData.data.archives;
  const rawEdges =
    archiveDocumentConnectionData.data.archiveDocumentConnection.edges || [];

  const allArchives: ArchiveItemData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      category: node.category,
      catalogRef: node.catalogRef,
      dateLabel: node.dateLabel,
      attributionRole: node.attributionRole,
      attributionName: node.attributionName,
      description: node.description,
      actionLabel: node.actionLabel,
      actionType: (node.actionType as 'download' | 'link' | null) || null,
      pdfFile: node.pdfFile || null,
    }));

  // Canonical display order matching original HTML source
  const canonicalOrder = [
    'the-covenant-of-grace-in-the-pentateuch',
    'hermeneutics-roundtable-covenant-theology',
    'the-great-isaiah-scroll-facsimile-notes',
  ];

  allArchives.sort((a, b) => {
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
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        text={data.announcementText}
        subtext={data.announcementSubtext}
      />

      {/* 2. Universal Header */}
      <Header activePage="archives" />

      {/* 3. Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Archives</span>
          </nav>
        </div>
      </div>

      {/* 4. Page Intro */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Historical Repository'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Scriptural & Historical Archives'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'Deep theological materials, past seminar transcripts, rare manuscript documentation, and historical commentaries archived for serious research.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5-8. Archive Type Filters, Featured Block, Archive Listing & Pagination */}
      <ArchivesExplorer
        initialArchives={allArchives}
        catalogInfo={data.catalogInfo}
        featuredBlock={
          <FeaturedArchiveBlock archive={data.featuredArchive} />
        }
        sidebar={
          <ArchiveSidebar
            classificationsTitle={data.classificationsTitle}
            accessPolicy={data.accessPolicy}
          />
        }
      />

      {/* 10. Universal Footer */}
      <Footer />
    </div>
  );
}
