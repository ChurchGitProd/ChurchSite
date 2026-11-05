import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import DownloadButton from '@/components/common/DownloadButton';
import BookDetailActions from '@/components/books/BookDetailActions';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { refTitle } from '@/lib/featured';
import { sanitizeImageUrl } from '@/lib/media';
import { client } from '../../../../tina/__generated__/client';
import { JsonLd, SITE_URL, absUrl } from '@/components/common/JsonLd';

interface BookPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const res = await client.queries.bookConnection();
    const edges = res.data.bookConnection.edges || [];
    return edges
      .map((edge) => edge?.node?._sys.filename)
      .filter((filename): filename is string => Boolean(filename))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await client.queries.book({
      relativePath: `${params.slug}.mdx`,
    });
    const d = res.data.book;
    return {
        title: d?.title,
        description: d?.description,
        openGraph: d?.coverImage ? { images: [absUrl(d.coverImage) as string] } : undefined,
      };
  } catch {
    return {};
  }
}

export default async function BookDetailPage({ params }: BookPageProps) {
  let bookRes;
  let pageRes;

  try {
    [bookRes, pageRes] = await Promise.all([
      client.queries.book(
        { relativePath: `${params.slug}.mdx` },
        { fetchOptions: { cache: 'no-store' } }
      ),
      client.queries.books(
        { relativePath: 'index.md' },
        { fetchOptions: { cache: 'no-store' } }
      ),
    ]);
  } catch {
    notFound();
  }

  const book = bookRes?.data?.book;
  const pageData = pageRes?.data?.books;

  if (!book) {
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

      {/* Universal Header with active nav */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: book.title,
          description: book.description || undefined,
          url: `${SITE_URL}/books/${params.slug}`,
          image: absUrl(book.coverImage),
          author: book.author
            ? { '@type': 'Person', name: book.author }
            : undefined,
          bookFormat: 'EBook',
        }}
      />
      <Header activePage="books" />

      {/* Breadcrumb Bar */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <Link href="/books" className="hover:text-primary transition-colors">
              Books
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {book.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-tertiary transition-colors"
          >
            <span>←</span>
            <span>Return to Monograph Collection</span>
          </Link>
        </div>

        {/* Book Overview Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Book Cover Image */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="border border-border rounded-xl shadow-md overflow-hidden aspect-[3/4] relative bg-muted">
                {book.coverImage ? (
                  <Image
                    src={sanitizeImageUrl(book.coverImage)}
                    alt={`${book.title} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl font-serif">
                    📖
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="md:col-span-8 lg:col-span-9 space-y-6">
              {/* Badges / Meta */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold text-tertiary uppercase tracking-wider bg-muted rounded">
                  {refTitle(book.format)}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium text-primary bg-accent/40 rounded border border-border">
                  Subject: {refTitle(book.subject)}
                </span>
              </div>

              {/* Title & Author */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                  {book.title}
                </h1>
                <p className="text-sm font-medium text-muted-foreground">
                  Authored by <span className="text-foreground">{book.author}</span>
                </p>
              </div>

              {/* Description */}
              <div className="border-t border-border pt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-2">
                  Publication Overview
                </h2>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Optional Rich Text Body if supplied */}
              {book.body && (
                <div className="border-t border-border pt-4 prose prose-sm max-w-none text-muted-foreground">
                  <TinaMarkdown content={book.body} />
                </div>
              )}

              {/* Actions & Abstract Drawer */}
              <BookDetailActions
                abstract={(book as any).abstract}
                subject={refTitle(book.subject)}
                slug={params.slug}
                pdfFile={book.pdfFile}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
