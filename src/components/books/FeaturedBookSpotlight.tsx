'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeImageUrl, sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

interface FeaturedBookSpotlightProps {
  badge?: string | null;
  title?: string | null;
  coverImage?: string | null;
  description?: string | null;
  downloadButtonText?: string | null;
  abstractButtonText?: string | null;
  pdfFile?: string | null;
}

export default function FeaturedBookSpotlight({
  badge = 'Featured Publication',
  title = 'The Pauline Paradigm',
  coverImage = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
  description = 'A seminal study exploring the structural layout, rhetorical devices, and theological highlights of the Pauline Epistles, focusing specifically on justification and union with Christ.',
  downloadButtonText = 'Download PDF',
  abstractButtonText = 'Read Abstract',
  pdfFile,
}: FeaturedBookSpotlightProps) {
  const [isAbstractOpen, setIsAbstractOpen] = useState(false);
  const hasValidPdf = isValidPdfUrl(pdfFile);
  const pdfUrl = hasValidPdf ? sanitizeDocumentUrl(pdfFile) : null;

  return (
    <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Featured Cover Image */}
        <div className="md:col-span-4 flex-shrink-0 border border-border rounded-lg shadow-md overflow-hidden aspect-[3/4] relative bg-muted">
          {coverImage ? (
            <Image
              src={sanitizeImageUrl(coverImage)}
              alt={`${title || 'Featured'} book cover`}
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

        {/* Featured Details */}
        <div className="md:col-span-8 space-y-4">
          <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
            {badge || 'Featured Publication'}
          </span>
          <h2 className="text-2xl font-heading font-bold text-primary">
            {title || 'The Pauline Paradigm'}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Expandable Abstract Drawer */}
          {isAbstractOpen && (
            <div
              id="featured-book-abstract"
              className="p-4 bg-muted/60 border border-border rounded-lg text-xs text-foreground space-y-2 animate-fadeIn"
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
              <p className="text-muted-foreground leading-relaxed italic">
                {description}
              </p>
              <div className="pt-1 text-[11px] text-tertiary font-medium">
                Focus Areas: Justification by Faith, Union with Christ, Epistle Rhetoric.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            {hasValidPdf && pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-card border border-border text-primary text-xs font-bold rounded hover:bg-muted transition-all flex items-center gap-1.5"
              >
                <span>View PDF ↗</span>
              </a>
            )}

            <DownloadButton
              file={pdfUrl || undefined}
              filename={hasValidPdf ? `${(title || 'featured-monograph').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf` : undefined}
              disabled={!hasValidPdf}
              disabledTooltip="Publication PDF not yet available"
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded flex items-center gap-1.5 transition-all"
            >
              <span>⬇️</span>
              <span>{hasValidPdf ? (downloadButtonText || 'Download PDF') : `${downloadButtonText || 'Download PDF'} (Unavailable)`}</span>
            </DownloadButton>

            <button
              type="button"
              onClick={() => setIsAbstractOpen((prev) => !prev)}
              aria-expanded={isAbstractOpen}
              aria-controls="featured-book-abstract"
              className="px-4 py-2 bg-card border border-border text-primary text-xs font-bold rounded hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-tertiary transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{isAbstractOpen ? 'Close Abstract' : (abstractButtonText || 'Read Abstract')}</span>
              <span className="text-[10px]">{isAbstractOpen ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
