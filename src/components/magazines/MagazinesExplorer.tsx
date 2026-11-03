'use client';

import React, { useState, useMemo } from 'react';
import MagazineCard, { MagazineCardData } from './MagazineCard';

interface MagazinesExplorerProps {
  initialMagazines: MagazineCardData[];
  archiveTitle?: string | null;
  featuredHero?: React.ReactNode;
  spotlight?: React.ReactNode;
}

const ITEMS_PER_PAGE = 8;

export default function MagazinesExplorer({
  initialMagazines,
  archiveTitle = 'Archive Issues',
  featuredHero,
  spotlight,
}: MagazinesExplorerProps) {
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedSeason, setSelectedSeason] = useState<string>('All Issues');
  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter options are derived from the magazine data so new values
  // entered in the CMS (e.g. a new Year or Topic) appear automatically.
  const yearOptions = [
    'All Years',
    ...Array.from(
      new Set(
        initialMagazines
          .map((m) => m.year)
          .filter((y): y is string => Boolean(y))
      )
    ).sort((a, b) => b.localeCompare(a, undefined, { numeric: true })),
  ];
  const seasonOptions = ['All Issues', 'Spring', 'Summer', 'Fall', 'Winter'];
  const topicOptions = [
    'All Topics',
    ...Array.from(
      new Set(
        initialMagazines
          .map((m) => m.topic)
          .filter((t): t is string => Boolean(t))
      )
    ).sort((a, b) => a.localeCompare(b)),
  ];

  // The 8 canonical archive issues are Summer 2024 down to Fall 2022
  const archiveIssues = useMemo(() => {
    return initialMagazines.filter((mag) => mag.badge !== 'Previous Issue');
  }, [initialMagazines]);

  const filteredMagazines = useMemo(() => {
    return archiveIssues.filter((mag) => {
      // Year filter
      if (selectedYear !== 'All Years') {
        if (mag.year !== selectedYear) return false;
      }

      // Season filter
      if (selectedSeason !== 'All Issues') {
        if (mag.season?.toLowerCase() !== selectedSeason.toLowerCase()) {
          if (!mag.issue.toLowerCase().includes(selectedSeason.toLowerCase())) {
            return false;
          }
        }
      }

      // Topic filter
      if (selectedTopic !== 'All Topics') {
        if (mag.topic?.toLowerCase() !== selectedTopic.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = mag.title.toLowerCase().includes(query);
        const matchesDescription = mag.description.toLowerCase().includes(query);
        const matchesIssue = mag.issue.toLowerCase().includes(query);
        const matchesTopic = mag.topic ? mag.topic.toLowerCase().includes(query) : false;

        if (!matchesTitle && !matchesDescription && !matchesIssue && !matchesTopic) {
          return false;
        }
      }

      return true;
    });
  }, [archiveIssues, selectedYear, selectedSeason, selectedTopic, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredMagazines.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredMagazines.length);
  const paginatedMagazines = filteredMagazines.slice(startIndex, endIndex);

  const handleResetFilters = () => {
    setSelectedYear('All Years');
    setSelectedSeason('All Issues');
    setSelectedTopic('All Topics');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const isFilterActive =
    selectedYear !== 'All Years' ||
    selectedSeason !== 'All Issues' ||
    selectedTopic !== 'All Topics' ||
    searchQuery.trim() !== '';

  return (
    <>
      {/* 5. Issue Filters Toolbar */}
      <section className="bg-card border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Year Select */}
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              aria-label="Filter by Year"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Season Select */}
            <select
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              aria-label="Filter by Season"
            >
              {seasonOptions.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>

            {/* Topic Select */}
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              aria-label="Filter by Topic"
            >
              {topicOptions.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search issues, topics..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-48 sm:w-56 pl-8 pr-3 py-2 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="absolute left-2.5 top-2 text-xs text-muted-foreground">
                🔍
              </span>
            </div>

            {isFilterActive && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-tertiary hover:underline font-semibold ml-1"
              >
                Reset
              </button>
            )}
          </div>

          {/* Dynamic Honest Count */}
          <div className="text-xs text-muted-foreground self-start md:self-auto">
            Showing{' '}
            <span className="font-bold text-primary">{filteredMagazines.length}</span> of{' '}
            <span className="font-bold">{archiveIssues.length}</span> issues
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="space-y-12">
          {/* 6. Featured Issue Hero */}
          {featuredHero}

          {/* 7. Latest Issue Spotlight */}
          {spotlight}

          {/* 8. Archive Issues Grid */}
          <div id="archive-section">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-bold text-primary">
                {archiveTitle || 'Archive Issues'}
              </h3>
              {isFilterActive && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-tertiary hover:underline font-semibold"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {filteredMagazines.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center space-y-4">
                <span className="text-3xl block">📖</span>
                <h4 className="text-lg font-heading font-bold text-primary">
                  No Issues Found
                </h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  No magazine issues match your current filter selection. Please try selecting a different
                  year, season, or topic.
                </p>
                <div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/90 transition-all uppercase tracking-wider"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedMagazines.map((magazine) => (
                  <MagazineCard key={magazine.slug} magazine={magazine} />
                ))}
              </div>
            )}
          </div>

          {/* 9. Pagination */}
          {filteredMagazines.length > 0 && (
            <nav className="flex items-center justify-between border-t border-border pt-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={validCurrentPage === 1}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card hover:bg-muted text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={validCurrentPage === totalPages}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card hover:bg-muted text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Showing{' '}
                    <span className="font-medium text-primary">
                      {filteredMagazines.length === 0 ? 0 : startIndex + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium text-primary">{endIndex}</span> of{' '}
                    <span className="font-medium">{filteredMagazines.length}</span> issues
                  </p>
                </div>
                {totalPages > 1 && (
                  <div>
                    <span className="relative z-0 inline-flex rounded shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={validCurrentPage === 1}
                        className="relative inline-flex items-center px-2.5 py-1.5 rounded-l-md border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous Page"
                      >
                        <span>←</span>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-3 py-1.5 border text-xs font-medium transition-colors ${
                            pageNum === validCurrentPage
                              ? 'border-primary bg-primary text-primary-foreground z-10'
                              : 'border-border bg-card text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={validCurrentPage === totalPages}
                        className="relative inline-flex items-center px-2.5 py-1.5 rounded-r-md border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next Page"
                      >
                        <span>→</span>
                      </button>
                    </span>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </main>
    </>
  );
}
