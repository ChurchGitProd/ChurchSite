import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedBookSpotlight from '@/components/books/FeaturedBookSpotlight';
import BooksExplorer from '@/components/books/BooksExplorer';
import BooksSidebar from '@/components/books/BooksSidebar';
import { BookCardData } from '@/components/books/BookCard';
import { resolveFeaturedBooks } from '@/lib/featuredPublications';
import { refTitle } from '@/lib/featured';
import { client } from '../../../tina/__generated__/client';

export const dynamic = 'force-dynamic';

export default async function Books() {
  const [booksPageData, bookConnectionData] = await Promise.all([
    client.queries.books(
      { relativePath: 'index.md' },
      { fetchOptions: { cache: 'no-store' } }
    ),
    client.queries.bookConnection(
      {},
      { fetchOptions: { cache: 'no-store' } }
    ),
  ]);

  const data = booksPageData.data.books;
  const rawEdges = bookConnectionData.data.bookConnection.edges || [];
  const featuredBook = resolveFeaturedBooks(rawEdges.map((e) => e?.node), 1)[0] ?? null;

  const allBooks: BookCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      author: node.author,
      format: refTitle(node.format),
      subject: refTitle(node.subject),
      description: node.description,
      coverImage: node.coverImage,
      abstract: (node as any).abstract || null,
      pdfFile: node.pdfFile || null,
    }));

  // Preserve canonical display order matching the original HTML reference
  const canonicalOrder = [
    'the-abrahamic-promise',
    'hermeneutics-handbook',
    'stones-of-the-temple',
    'byzantine-text-families',
  ];

  allBooks.sort((a, b) => {
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

      {/* Universal Header with active navigation state */}
      <Header activePage="books" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Books</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Scholarly Monographs'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Theological Books & Publications'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'Explore our collection of peer-reviewed monographs, historical commentaries, and study manuals published by the Scriptura Research Institute.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Row: Spotlight (8) + Sidebar Widgets (4) */}
          <div className="lg:col-span-8">
            {/* Featured Book Spotlight — the doc set to Featured position 1 */}
            <FeaturedBookSpotlight
              badge={data.featuredBook?.badge}
              title={featuredBook?.title as string}
              coverImage={featuredBook?.coverImage as string}
              description={featuredBook?.description as string}
              downloadButtonText={data.featuredBook?.downloadButtonText}
              abstractButtonText={data.featuredBook?.abstractButtonText}
              pdfFile={featuredBook?.pdfFile as string}
            />
          </div>

          <BooksSidebar />

          {/* Bottom Row: Full-Width Books Explorer */}
          <div className="lg:col-span-12">
            <BooksExplorer
              books={allBooks}
              searchPlaceholder={data.searchPlaceholder}
            />
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
