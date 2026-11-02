'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard, { BookCardData } from './BookCard';

interface BooksExplorerProps {
  books: BookCardData[];
  searchPlaceholder?: string | null;
}

const ITEMS_PER_PAGE = 6;

export default function BooksExplorer({
  books,
  searchPlaceholder = 'Search books...',
}: BooksExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [currentPage, setCurrentPage] = useState(1);

  // Subjects come from the book data so any new subject appears automatically
  const subjectOptions = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => {
      if (b.subject) set.add(b.subject);
    });
    return ['All Subjects', ...Array.from(set).sort()];
  }, [books]);

  // Filter books based on search text and subject dropdown
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // 1. Text Search Filter (title, author, description, format, subject)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesDescription = book.description.toLowerCase().includes(q);
        const matchesFormat = book.format.toLowerCase().includes(q);
        const matchesSubject = book.subject.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesAuthor &&
          !matchesDescription &&
          !matchesFormat &&
          !matchesSubject
        ) {
          return false;
        }
      }

      // 2. Subject Filter
      if (selectedSubject !== 'All Subjects') {
        if (book.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [books, searchQuery, selectedSubject]);

  const totalFiltered = filteredBooks.length;
  const totalBooks = books.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedBooks = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBooks, validCurrentPage]);

  const startEntry = totalFiltered === 0 ? 0 : (validCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endEntry = Math.min(validCurrentPage * ITEMS_PER_PAGE, totalFiltered);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All Subjects');
    setCurrentPage(1);
  };

  const goToPage = (p: number) =>
    setCurrentPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-8">
      {/* Search & Subject Filters Bar */}
      <section className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder || 'Search books...'}
                aria-label="Search books"
                className="w-full sm:w-72 pl-9 pr-4 py-2 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search input"
                  className="absolute right-2.5 top-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Subject Select Dropdown */}
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by subject"
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {subjectOptions.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>

            {/* Active filter reset pill */}
            {(searchQuery || selectedSubject !== 'All Subjects') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-tertiary hover:underline font-medium"
              >
                Reset
              </button>
            )}
          </div>

          {/* Truthful Dynamic Dataset Counter */}
          <div className="text-xs text-muted-foreground self-start md:self-auto">
            Showing{' '}
            <span className="font-bold text-primary">{startEntry}</span> to{' '}
            <span className="font-bold text-primary">{endEntry}</span> of{' '}
            <span className="font-bold">{totalFiltered}</span> books
            {totalFiltered !== totalBooks && (
              <span className="text-[11px] text-muted-foreground/70 ml-1">
                (filtered from {totalBooks})
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Book Grid or Empty State — 2 columns x 3 rows, 6 per page */}
      {totalFiltered > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {paginatedBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </section>
      ) : (
        <div className="p-12 text-center bg-card border border-border rounded-xl space-y-3">
          <span className="text-3xl block">📚</span>
          <h4 className="text-base font-heading font-bold text-primary">
            No monographs found
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No books matched your search criteria. Try a different author, keyword, or subject.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Functional Pagination */}
      {totalFiltered > 0 && (
        <nav aria-label="Pagination" className="flex items-center justify-between border-t border-border pt-6">
          {/* Mobile controls */}
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              type="button"
              disabled={validCurrentPage === 1}
              onClick={() => goToPage(validCurrentPage - 1)}
              className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={validCurrentPage === totalPages}
              onClick={() => goToPage(validCurrentPage + 1)}
              className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              Next
            </button>
          </div>

          {/* Desktop controls */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-primary">{startEntry}</span> to{' '}
                <span className="font-medium text-primary">{endEntry}</span> of{' '}
                <span className="font-medium">{totalFiltered}</span> books
              </p>
            </div>
            <div>
              <span className="relative z-0 inline-flex rounded shadow-sm -space-x-px">
                <button
                  type="button"
                  disabled={validCurrentPage === 1}
                  onClick={() => goToPage(validCurrentPage - 1)}
                  aria-label="Previous page"
                  className="relative inline-flex items-center px-2.5 py-1.5 rounded-l-md border border-border bg-card text-xs font-medium text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-current={p === validCurrentPage ? 'page' : undefined}
                    className={
                      p === validCurrentPage
                        ? 'relative inline-flex items-center px-3 py-1.5 border border-primary bg-primary text-primary-foreground text-xs font-medium'
                        : 'relative inline-flex items-center px-3 py-1.5 border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted transition-colors'
                    }
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={validCurrentPage === totalPages}
                  onClick={() => goToPage(validCurrentPage + 1)}
                  aria-label="Next page"
                  className="relative inline-flex items-center px-2.5 py-1.5 rounded-r-md border border-border bg-card text-xs font-medium text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
