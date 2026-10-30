import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeImageUrl } from '@/lib/media';

interface BookItem {
  badge?: string | null;
  title?: string | null;
  author?: string | null;
  description?: string | null;
  coverImage?: string | null;
  downloadLink?: string | null;
}

interface MagazineItem {
  badge?: string | null;
  title?: string | null;
  issue?: string | null;
  description?: string | null;
  coverImage?: string | null;
  readLink?: string | null;
}

interface FeaturedPublicationsData {
  sectionTitle?: string | null;
  books?: (BookItem | null)[] | null;
  magazines?: (MagazineItem | null)[] | null;
}

interface FeaturedPublicationsSectionProps {
  data?: FeaturedPublicationsData | null;
}

const DEFAULT_BOOKS: BookItem[] = [
  {
    badge: 'Book Highlight',
    title: 'The Abrahamic Promise',
    author: 'Dr. Vance',
    description:
      'A deep dive into the legal, historical, and spiritual ramifications of the covenant made in Genesis 15.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=267&fit=crop',
    downloadLink: '/books',
  },
  {
    badge: 'Book Highlight',
    title: 'Hermeneutics Handbook',
    author: 'Prof. Mercer',
    description:
      'The grammatical-historical method outlined with practical textual analysis exercises.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=267&fit=crop',
    downloadLink: '/books',
  },
];

const DEFAULT_MAGAZINES: MagazineItem[] = [
  {
    badge: 'Quarterly Issue',
    title: 'Biblical Archaeology Review',
    issue: 'Issue #48',
    description:
      'Exploring the latest excavations in Jerusalem and their correlation with Old Testament chronicles.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=267&fit=crop',
    readLink: '/magazines',
  },
  {
    badge: 'Quarterly Issue',
    title: 'Eschatology & Hope',
    issue: 'Fall 2024',
    description:
      'Exploring biblical eschatology, resurrection hope, and the consummation of all things.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=267&fit=crop',
    readLink: '/magazines',
  },
];

function slugify(value?: string | null) {
  return (value || 'download').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'download';
}

export default function FeaturedPublicationsSection({ data }: FeaturedPublicationsSectionProps) {
  const sectionTitle = data?.sectionTitle || 'Featured Books & Magazines';

  const books =
    data?.books && data.books.length > 0
      ? (data.books.filter(Boolean) as BookItem[])
      : DEFAULT_BOOKS;
  const magazines =
    data?.magazines && data.magazines.length > 0
      ? (data.magazines.filter(Boolean) as MagazineItem[])
      : DEFAULT_MAGAZINES;

  return (
    <section id="books" className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle}
        </h2>
        <Link
          href="/books"
          className="text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>Browse Catalog</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book, idx) => (
          <div
            key={`book-${idx}`}
            className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:shadow-lg transition-all"
          >
            <div className="w-24 h-32 flex-shrink-0 border border-border rounded shadow-md overflow-hidden bg-muted">
              <img
                src={sanitizeImageUrl(book.coverImage || '')}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                  {book.badge || 'Book Highlight'}
                </span>
                <h3 className="text-base font-heading font-bold text-primary">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {book.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  Author: {book.author}
                </span>
                <DownloadButton
                  file={book.downloadLink || undefined}
                  filename={`${slugify(book.title)}.pdf`}
                  disabled={!book.downloadLink}
                  disabledTooltip={`${book.title || 'This book'} PDF is not yet available for download`}
                  className="text-xs font-bold text-primary hover:text-tertiary transition-colors"
                >
                  {book.downloadLink ? 'Download PDF' : 'Download PDF (Unavailable)'}
                </DownloadButton>
              </div>
            </div>
          </div>
        ))}

        {magazines.map((magazine, idx) => (
          <div
            key={`magazine-${idx}`}
            className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:shadow-lg transition-all"
          >
            <div className="w-24 h-32 flex-shrink-0 border border-border rounded shadow-md overflow-hidden bg-muted">
              <img
                src={sanitizeImageUrl(magazine.coverImage || '')}
                alt={`${magazine.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">
                  {magazine.badge || 'Quarterly Issue'}
                </span>
                <h3 className="text-base font-heading font-bold text-primary">
                  {magazine.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {magazine.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {magazine.issue}
                </span>
                <Link
                  href={magazine.readLink || '/magazines'}
                  className="text-xs font-bold text-primary hover:text-tertiary transition-colors"
                >
                  Read Online
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
