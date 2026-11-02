'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ReferenceCard, { ReferenceCardData } from './ReferenceCard';

interface ReferencesExplorerProps {
  references: ReferenceCardData[];
  searchPlaceholder?: string | null;
  featuredSlot?: React.ReactNode;
}

const TESTAMENTS = ['All Testaments', 'Old Testament', 'New Testament'];

const ITEMS_PER_PAGE = 6;

export default function ReferencesExplorer({
  references,
  searchPlaceholder,
  featuredSlot,
}: ReferencesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('All Testaments');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [currentPage, setCurrentPage] = useState(1);

  // Genres come from the references data so new CMS-managed genres appear automatically
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    references.forEach((r) => {
      if (r.genre) set.add(r.genre);
    });
    return Array.from(set).sort();
  }, [references]);

  // Filter references based on current search and filter criteria
  const filteredReferences = useMemo(() => {
    return references.filter((item) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesScripture = item.scripture.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesAuthor = item.author.toLowerCase().includes(q);
        const matchesDescription = item.description.toLowerCase().includes(q);
        const matchesTags =
          item.tags?.some((tag) => tag && tag.toLowerCase().includes(q)) ?? false;

        if (
          !matchesTitle &&
          !matchesScripture &&
          !matchesCategory &&
          !matchesAuthor &&
          !matchesDescription &&
          !matchesTags
        ) {
          return false;
        }
      }

      // 2. Testament filter
      if (selectedTestament !== 'All Testaments') {
        if (item.testament !== selectedTestament) {
          return false;
        }
      }

      // 3. Genre filter
      if (selectedGenre !== 'All Genres') {
        if (item.genre !== selectedGenre) {
          return false;
        }
      }

      return true;
    });
  }, [references, searchQuery, selectedTestament, selectedGenre]);

  // Reset page when filters change
  const totalPages = Math.max(1, Math.ceil(filteredReferences.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReferences = filteredReferences.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const displayedCount = filteredReferences.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTestamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTestament(e.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedTestament('All Testaments');
    setSelectedGenre('All Genres');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedTestament !== 'All Testaments' ||
    selectedGenre !== 'All Genres';

  return (
    <>
      {/* Search & Filter Toolbar */}
      <section className="bg-card border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={
                  searchPlaceholder || 'Search references (e.g. Isaiah 53)...'
                }
                className="w-full sm:w-72 pl-9 pr-4 py-2 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            </div>

            {/* Testament Dropdown */}
            <select
              value={selectedTestament}
              onChange={handleTestamentChange}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              {TESTAMENTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Genre Dropdown — derived from the references data */}
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              <option value="All Genres">All Genres</option>
              {allGenres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            {/* Clear filters pill */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-2.5 py-1.5 text-xs text-tertiary hover:text-primary border border-border rounded bg-muted/60 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Counter */}
          <div className="text-xs text-muted-foreground self-start md:self-auto">
            Showing{' '}
            <span className="font-bold text-primary">{displayedCount}</span> of{' '}
            <span className="font-bold">{references.length}</span> references
          </div>
        </div>
      </section>

      {/* Main Content Layout — full width */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Featured Reference Block */}
        {featuredSlot}

        {/* Bible References Listing */}
        {paginatedReferences.length > 0 ? (
          <div className="space-y-6">
            {paginatedReferences.map((ref) => (
              <ReferenceCard key={ref.slug} reference={ref} />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-10 text-center space-y-3">
            <p className="text-sm font-semibold text-primary">
              No references match your criteria.
            </p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search terms or clearing selected filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-block px-4 py-2 text-xs font-bold text-primary-foreground bg-primary rounded hover:bg-primary/90 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredReferences.length > 0 && (
          <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-border pt-6"
          >
            {/* Mobile View */}
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                type="button"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card hover:bg-muted text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card hover:bg-muted text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Showing{' '}
                  <span className="font-medium text-primary">
                    {filteredReferences.length === 0 ? 0 : startIndex + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium text-primary">
                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredReferences.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredReferences.length}</span>{' '}
                  entries
                </p>
              </div>

              <div>
                <span className="relative z-0 inline-flex rounded shadow-sm -space-x-px">
                  {/* Left Arrow Button */}
                  <button
                    type="button"
                    aria-label="Previous Page"
                    disabled={safeCurrentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="relative inline-flex items-center px-2.5 py-1.5 rounded-l-md border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {/* Numeric Page Buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = page === safeCurrentPage;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-3 py-1.5 border text-xs font-medium transition-colors ${
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground font-bold z-10'
                            : 'border-border bg-card text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Right Arrow Button */}
                  <button
                    type="button"
                    aria-label="Next Page"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="relative inline-flex items-center px-2.5 py-1.5 rounded-r-md border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            </div>
          </nav>
        )}
      </main>
    </>
  );
}
