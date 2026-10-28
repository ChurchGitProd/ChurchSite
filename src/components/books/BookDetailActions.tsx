'use client';

import React, { useState } from 'react';
import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

interface BookDetailActionsProps {
  abstract?: string | null;
  subject?: string | null;
  slug: string;
  pdfFile?: string | null;
}

export default function BookDetailActions({
  abstract,
  subject,
  slug,
  pdfFile,
}: BookDetailActionsProps) {
  const [isAbstractOpen, setIsAbstractOpen] = useState(false);
  const hasAbstract = Boolean(abstract && abstract.trim());
  const abstractElementId = `book-abstract-${slug}`;

  const hasValidPdf = isValidPdfUrl(pdfFile);
  const pdfUrl = hasValidPdf ? sanitizeDocumentUrl(pdfFile) : null;

  return (
    <div className="space-y-6 pt-4 border-t border-border">
      {/* Expandable Abstract Drawer */}
      {isAbstractOpen && hasAbstract && (
        <div
          id={abstractElementId}
          className="p-5 bg-muted/60 border border-border rounded-xl text-xs text-foreground space-y-2 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary block uppercase tracking-wider text-[10px]">
              Monograph Abstract Summary
            </span>
            <button
              type="button"
              onClick={() => setIsAbstractOpen(false)}
              className="text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label="Close abstract"
            >
              ✕ Close
            </button>
          </div>
          <p className="text-muted-foreground leading-relaxed italic text-xs sm:text-sm">
            {abstract}
          </p>
          {subject && (
            <div className="pt-1 text-[11px] text-tertiary font-medium">
              Subject Classification: {subject}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-4">
        {hasValidPdf && pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-muted text-primary border border-border text-xs font-bold rounded hover:bg-tertiary/20 hover:text-primary transition-all flex items-center gap-1.5"
          >
            <span>View PDF ↗</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="px-4 py-2.5 bg-muted/40 border border-border text-muted-foreground text-xs font-semibold rounded cursor-not-allowed opacity-60 flex items-center gap-1.5"
            title="Publication PDF is currently unavailable for viewing"
          >
            <span>PDF Unavailable</span>
          </button>
        )}

        <DownloadButton
          file={pdfUrl || undefined}
          filename={hasValidPdf ? `${slug}.pdf` : undefined}
          disabled={!hasValidPdf}
          disabledTooltip="Publication PDF not yet available"
          className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded flex items-center gap-2"
        >
          <span>⬇️</span>
          <span>{hasValidPdf ? 'Download Monograph (PDF)' : 'Download PDF (Unavailable)'}</span>
        </DownloadButton>

        {hasAbstract ? (
          <button
            type="button"
            onClick={() => setIsAbstractOpen((prev) => !prev)}
            aria-expanded={isAbstractOpen}
            aria-controls={abstractElementId}
            className="px-4 py-2.5 bg-card border border-border text-primary text-xs font-bold rounded hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-tertiary transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>{isAbstractOpen ? 'Close Abstract' : 'Read Abstract'}</span>
            <span className="text-[10px]">{isAbstractOpen ? '▲' : '▼'}</span>
          </button>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="px-4 py-2.5 bg-muted/40 border border-border text-muted-foreground text-xs font-semibold rounded cursor-not-allowed opacity-60 flex items-center gap-1.5"
            title="Scholarly abstract is currently unavailable for this publication"
          >
            <span>Abstract Unavailable</span>
          </button>
        )}

        <span className="text-xs text-muted-foreground italic">
          {pdfFile
            ? 'Official publication PDF authenticated and ready for digital consultation.'
            : 'Physical and digital repository copies are currently in scholarly review.'}
        </span>
      </div>
    </div>
  );
}
