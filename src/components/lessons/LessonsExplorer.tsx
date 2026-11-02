'use client';

import { useState, useMemo } from 'react';
import LessonCard, { LessonCardData } from './LessonCard';
import { Search } from 'lucide-react';

interface LessonsExplorerProps {
  lessons: LessonCardData[];
  searchPlaceholder?: string;
  teachers?: string[];
  divisions?: string[];
}

const ITEMS_PER_PAGE = 6;

export default function LessonsExplorer({
  lessons,
  searchPlaceholder = 'Search lessons...',
  teachers = ['Dr. Charles Vance', 'Prof. Eleanor Sterling', 'Prof. Julian Mercer'],
  divisions = ['Pentateuch', 'Historical Books', 'Gospels & Acts', 'Epistles'],
}: LessonsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('All Teachers');
  const [selectedDivision, setSelectedDivision] = useState('All Divisions');
  const [currentPage, setCurrentPage] = useState(1);

  // Combine provided teachers/divisions with any additional unique ones found in data
  const allTeachers = useMemo(() => {
    const set = new Set(teachers);
    lessons.forEach((l) => {
      if (l.teacher) set.add(l.teacher);
    });
    return Array.from(set);
  }, [lessons, teachers]);

  const allDivisions = useMemo(() => {
    const set = new Set(divisions);
    lessons.forEach((l) => {
      if (l.division) set.add(l.division);
    });
    return Array.from(set);
  }, [lessons, divisions]);

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      // Teacher filter
      if (selectedTeacher !== 'All Teachers' && lesson.teacher !== selectedTeacher) {
        return false;
      }

      // Division filter
      if (selectedDivision !== 'All Divisions' && lesson.division !== selectedDivision) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = lesson.title.toLowerCase().includes(q);
        const matchesDesc = lesson.description.toLowerCase().includes(q);
        const matchesRef = lesson.reference.toLowerCase().includes(q);
        const matchesTeacher = lesson.teacher.toLowerCase().includes(q);
        const matchesDiv = lesson.division.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesRef && !matchesTeacher && !matchesDiv) {
          return false;
        }
      }

      return true;
    });
  }, [lessons, searchQuery, selectedTeacher, selectedDivision]);

  // Total pages and paginated slice
  const totalPages = Math.max(1, Math.ceil(filteredLessons.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedLessons = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredLessons.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLessons, validCurrentPage]);

  // Handle filter changes (reset to page 1)
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleTeacherChange = (val: string) => {
    setSelectedTeacher(val);
    setCurrentPage(1);
  };

  const handleDivisionChange = (val: string) => {
    setSelectedDivision(val);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTeacher('All Teachers');
    setSelectedDivision('All Divisions');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <section className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full sm:w-72 pl-9 pr-4 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4" />
            </div>

            {/* Teacher Select */}
            <select
              value={selectedTeacher}
              onChange={(e) => handleTeacherChange(e.target.value)}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              <option value="All Teachers">All Teachers</option>
              {allTeachers.map((teacher) => (
                <option key={teacher} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>

            {/* Division Select */}
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="px-3 py-2 text-xs rounded border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              <option value="All Divisions">All Divisions</option>
              {allDivisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Counter */}
          <div className="text-xs text-muted-foreground self-start md:self-auto">
            Showing{' '}
            <span className="font-bold text-primary">
              {filteredLessons.length > 0
                ? `${(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                    validCurrentPage * ITEMS_PER_PAGE,
                    filteredLessons.length
                  )}`
                : '0'}
            </span>{' '}
            of <span className="font-bold">{filteredLessons.length}</span> lessons
            {filteredLessons.length !== lessons.length && (
              <span className="text-[11px] text-muted-foreground/80 ml-1">
                (filtered from {lessons.length})
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Lesson Grid */}
      {paginatedLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedLessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-8 text-center space-y-3">
          <p className="text-sm font-heading font-bold text-primary">
            No lessons match your current filter criteria
          </p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search query, or clear filters to view all available curriculum.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredLessons.length > 0 && (
        <nav
          aria-label="Lessons pagination"
          className="flex items-center justify-between border-t border-border pt-6"
        >
          {/* Mobile Buttons */}
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => handlePageChange(validCurrentPage - 1)}
              className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card hover:bg-muted text-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => handlePageChange(validCurrentPage + 1)}
              className="px-4 py-2 border border-border text-xs font-semibold rounded bg-card hover:bg-muted text-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          {/* Desktop Pagination */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                Page <span className="font-medium text-primary">{validCurrentPage}</span> of{' '}
                <span className="font-medium text-primary">{totalPages}</span>
              </p>
            </div>
            <div>
              <span className="relative z-0 inline-flex rounded shadow-sm -space-x-px">
                {/* Arrow Left */}
                <button
                  type="button"
                  aria-label="Previous Page"
                  disabled={validCurrentPage <= 1}
                  onClick={() => handlePageChange(validCurrentPage - 1)}
                  className="relative inline-flex items-center px-2.5 py-1.5 rounded-l-md border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>←</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-3 py-1.5 border text-xs font-medium transition-colors ${
                      pageNum === validCurrentPage
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Arrow Right */}
                <button
                  type="button"
                  aria-label="Next Page"
                  disabled={validCurrentPage >= totalPages}
                  onClick={() => handlePageChange(validCurrentPage + 1)}
                  className="relative inline-flex items-center px-2.5 py-1.5 rounded-r-md border border-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>→</span>
                </button>
              </span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
