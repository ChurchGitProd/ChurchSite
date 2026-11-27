'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Globe, ListVideo } from 'lucide-react';
import VideoCard, { VideoCardData } from './VideoCard';

interface VideosExplorerProps {
  videos: VideoCardData[];
  searchPlaceholder?: string | null;
  lecturesTitle?: string | null;
}

const ITEMS_PER_PAGE = 6;
const BASE_MINISTRY_LANGUAGES = [
  'Nepali',
  'Kannada',
  'English',
  'Tamil',
  'Telugu',
  'Hindi',
  'Malayalam',
] as const;

export default function VideosExplorer({
  videos,
  searchPlaceholder,
  lecturesTitle,
}: VideosExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('All Playlists');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [currentPage, setCurrentPage] = useState(1);

  const displayLecturesTitle = lecturesTitle || 'All Lectures & Seminars';

  // Playlist options derived dynamically from videos
  const playlistOptions = useMemo(
    () => [
      'All Playlists',
      ...Array.from(new Set(videos.map((v) => v.series).filter(Boolean))).sort(),
    ],
    [videos]
  );

  // Available languages dynamically derived from base list + whatever languages exist in videos
  const availableLanguages = useMemo(() => {
    const fromVideos = videos.map((v) => v.language).filter(Boolean) as string[];
    return Array.from(new Set([...BASE_MINISTRY_LANGUAGES, ...fromVideos])).filter(Boolean);
  }, [videos]);

  // Filter videos based on search, playlist, and language
  const filteredVideos = useMemo(() => {
    return videos.filter((item) => {
      // 1. Language Filter
      if (selectedLanguage !== 'All Languages') {
        if (item.language !== selectedLanguage) {
          return false;
        }
      }

      // 2. Playlist Filter
      if (selectedPlaylist !== 'All Playlists') {
        if (item.series !== selectedPlaylist) {
          return false;
        }
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesScripture = item.scripture.toLowerCase().includes(q);
        const matchesPlaylist = item.series.toLowerCase().includes(q);
        const matchesDescription = item.description.toLowerCase().includes(q);
        const matchesLanguage = item.language ? item.language.toLowerCase().includes(q) : false;

        if (
          !matchesTitle &&
          !matchesScripture &&
          !matchesPlaylist &&
          !matchesDescription &&
          !matchesLanguage
        ) {
          return false;
        }
      }

      return true;
    });
  }, [videos, searchQuery, selectedPlaylist, selectedLanguage]);

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

  const handlePlaylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlaylist(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedPlaylist('All Playlists');
    setSelectedLanguage('All Languages');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedPlaylist !== 'All Playlists' ||
    selectedLanguage !== 'All Languages';

  return (
    <div className="space-y-4">
      {/* 1. Categorization by 6 Languages Bar */}
      <section className="bg-card border border-border rounded-xl p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-tertiary shrink-0" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Filter by Language:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleLanguageSelect('All Languages')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                selectedLanguage === 'All Languages'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              All Languages ({videos.length})
            </button>
            {availableLanguages.map((lang) => {
              const count = videos.filter((v) => v.language === lang).length;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageSelect(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                    selectedLanguage === lang
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
                  }`}
                >
                  <span>{lang}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        selectedLanguage === lang
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-card text-muted-foreground border border-border/50'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Search & Playlist / Speaker Filter Toolbar */}
      <section className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder || 'Search videos, playlists, languages...'}
                className="w-full sm:w-72 pl-9 pr-4 py-2 text-xs rounded border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            </div>

            {/* 1. Playlist Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedPlaylist}
                onChange={handlePlaylistChange}
                aria-label="Filter by Playlist"
                className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
              >
                {playlistOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Language Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                aria-label="Filter by Language"
                className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
              >
                <option value="All Languages">All Languages</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

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
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
            <ListVideo className="w-5 h-5 text-tertiary" />
            <span>{displayLecturesTitle}</span>
          </h3>
          {(selectedLanguage !== 'All Languages' || selectedPlaylist !== 'All Playlists') && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Filtering by:</span>
              {selectedLanguage !== 'All Languages' && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold rounded">
                  {selectedLanguage}
                </span>
              )}
              {selectedPlaylist !== 'All Playlists' && (
                <span className="px-2 py-0.5 bg-tertiary/15 text-tertiary font-bold rounded">
                  {selectedPlaylist}
                </span>
              )}
            </div>
          )}
        </div>

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
                Try selecting a different language, playlist, or clearing the search terms.
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
    </div>
  );
}
