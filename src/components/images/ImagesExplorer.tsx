'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageCard, { ImageCardData } from './ImageCard';

interface ImagesExplorerProps {
  images: ImageCardData[];
  searchPlaceholder?: string | null;
  archiveTitle?: string | null;
}

const ITEMS_PER_PAGE = 6;

export default function ImagesExplorer({
  images,
  searchPlaceholder,
  archiveTitle,
}: ImagesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Images');
  const [currentPage, setCurrentPage] = useState(1);

  const displayArchiveTitle = archiveTitle || 'Image Archive';

  // Categories come from the images data so CMS-managed categories appear automatically
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    images.forEach((img) => {
      if (img.category) set.add(img.category);
    });
    return Array.from(set).sort();
  }, [images]);

  // Filter images based on search query and category selection
  const filteredImages = useMemo(() => {
    return images.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesScripture = item.scripture.toLowerCase().includes(q);
        const matchesDescription = item.description.toLowerCase().includes(q);

        if (!matchesTitle && !matchesCategory && !matchesScripture && !matchesDescription) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All Images') {
        if (item.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    });
  }, [images, searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const displayedCount = filteredImages.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Images');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) || selectedCategory !== 'All Images';

  return (
    <>
      {/* Search & Category Filters Bar */}
      <section className="bg-card border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {['All Images', ...allCategories].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-primary hover:bg-tertiary/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-2.5 py-1 text-xs text-tertiary hover:text-primary transition-colors ml-1 font-medium underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder || 'Search gallery...'}
              className="w-full pl-9 pr-4 py-2 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-xl font-heading font-bold text-primary">
            {displayArchiveTitle}
          </h3>
          <div className="text-xs text-muted-foreground">
            Showing <span className="font-bold text-primary">{displayedCount}</span> of{' '}
            <span className="font-bold">{images.length}</span> images
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedImages.length > 0 ? (
            paginatedImages.map((img) => (
              <ImageCard key={img.slug} image={img} />
            ))
          ) : (
            <div className="col-span-full bg-card border border-border rounded-xl p-10 text-center space-y-3">
              <p className="text-sm font-semibold text-primary">
                No images match your criteria.
              </p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search terms or selecting another category filter.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-block px-4 py-2 text-xs font-bold text-primary-foreground bg-primary rounded hover:bg-primary/90 transition-all shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Pagination Controls */}
      {filteredImages.length > 0 && (
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
                  {filteredImages.length === 0 ? 0 : startIndex + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium text-primary">
                  {Math.min(startIndex + ITEMS_PER_PAGE, filteredImages.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{filteredImages.length}</span> images
              </p>
            </div>

            <div>
              <span className="relative z-0 inline-flex rounded shadow-sm -space-x-px">
                {/* Previous Button */}
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

                {/* Next Button */}
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
    </>
  );
}
