'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard, { VideoCardData } from './VideoCard';

interface VideosExplorerProps {
  videos: VideoCardData[];
  searchPlaceholder?: string | null;
  lecturesTitle?: string | null;
}

const ITEMS_PER_PAGE = 3;

export default function VideosExplorer({
  videos,
  searchPlaceholder,
  lecturesTitle,
}: VideosExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('All Speakers');
  const [selectedSeries, setSelectedSeries] = useState('All Series');
  const [currentPage, setCurrentPage] = useState(1);

  const displayLecturesTitle = lecturesTitle || 'All Lectures & Seminars';

  // Filter options are derived from the videos themselves so new series and
  // speakers added in the CMS appear here automatically.
  const speakers = useMemo(
    () => [
      'All Speakers',
      ...Array.from(new Set(videos.map((v) => v.speaker).filter(Boolean))).sort(),
    ],
    [videos]
  );
  const seriesOptions = useMemo(
    () => [
      'All Series',
      ...Array.from(new Set(videos.map((v) => v.series).filter(Boolean))).sort(),
    ],
    [videos]
  );

  // Filter videos based on search and dropdown selections
  const filteredVideos = useMemo(() => {
    return videos.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSpeaker = item.speaker.toLowerCase().includes(q);
        const matchesScripture = item.scripture.toLowerCase().includes(q);
        const matchesSeries = item.series.toLowerCase().includes(q);
        const matchesDescription = item.description.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesSpeaker &&
          !matchesScripture &&
          !matchesSeries &&
          !matchesDescription
        ) {
          return false;
        }
      }

      // 2. Speaker Filter
      if (selectedSpeaker !== 'All Speakers') {
        if (item.speaker !== selectedSpeaker) {
          return false;
        }
      }

      // 3. Series Filter
      if (selectedSeries !== 'All Series') {
        if (item.series !== selectedSeries) {
          return false;
        }
      }

      return true;
    });
  }, [videos, searchQuery, selectedSpeaker, selectedSeries]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVideos = filteredVideos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const displayedCount = filteredVideos.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpeaker(e.target.value);
    setCurrentPage(1);
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeries(e.target.value);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedSpeaker('All Speakers');
    setSelectedSeries('All Series');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedSpeaker !== 'All Speakers' ||
    selectedSeries !== 'All Series';

  return (
    <>
      {/* Search & Filter Toolbar */}
      <section className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder || 'Search videos...'}
                className="w-full sm:w-72 pl-9 pr-4 py-2 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            </div>

            {/* Speaker Filter Select */}
            <select
              value={selectedSpeaker}
              onChange={handleSpeakerChange}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              {speakers.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Series Filter Select */}
            <select
              value={selectedSeries}
              onChange={handleSeriesChange}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              {seriesOptions.map((ser) => (
                <option key={ser} value={ser}>
                  {ser}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
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
            <span className="font-bold">{videos.length}</span> videos
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="space-y-6 pt-4">
        <h3 className="text-xl font-heading font-bold text-primary border-b border-border pb-2">
          {displayLecturesTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedVideos.length > 0 ? (
            paginatedVideos.map((video) => (
              <VideoCard key={video.slug} video={video} />
            ))
          ) : (
            <div className="col-span-full bg-card border border-border rounded-xl p-10 text-center space-y-3">
              <p className="text-sm font-semibold text-primary">
                No lecture videos match your criteria.
              </p>
              <p className="text-xs text-muted-foreground">
                Try adjusting your search terms or clearing selected speaker and series filters.
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
      {filteredVideos.length > 0 && (
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
                  {filteredVideos.length === 0 ? 0 : startIndex + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium text-primary">
                  {Math.min(startIndex + ITEMS_PER_PAGE, filteredVideos.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{filteredVideos.length}</span> videos
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

                {/* Page Number Buttons */}
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
