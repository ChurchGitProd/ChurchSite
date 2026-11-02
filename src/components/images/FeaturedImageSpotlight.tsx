'use client';

import React, { useState } from 'react';
import { Download, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import DownloadButton from '@/components/common/DownloadButton';
import { sanitizeImageUrl } from '@/lib/media';
import { GalleryImageItem } from '@/lib/latestImages';

interface FeaturedImageSpotlightProps {
  badge?: string | null;
  scriptureLabel?: string | null;
  downloadButtonText?: string | null;
  citationButtonText?: string | null;
  item?: GalleryImageItem | null;
}

export default function FeaturedImageSpotlight({
  badge,
  scriptureLabel,
  downloadButtonText,
  citationButtonText,
  item,
}: FeaturedImageSpotlightProps) {
  const [showCitation, setShowCitation] = useState(false);

  if (!item) {
    return null;
  }

  return (
    <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Image preview (7 cols) */}
        <div className="lg:col-span-7 rounded-lg overflow-hidden border border-border shadow-inner bg-muted">
          <img
            src={sanitizeImageUrl(item.image || '')}
            className="w-full h-auto object-cover"
            alt={item.title || 'Featured image'}
          />
        </div>

        {/* Right Column: Metadata & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest block">
            {badge || 'Featured Spotlight'}
          </span>
          <h2 className="text-2xl font-heading font-bold text-primary leading-tight">
            {item.title}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {item.description}
          </p>

          {/* Scripture Callout Box */}
          {item.scripture && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-xs font-semibold text-primary">
                {scriptureLabel || 'Related Scripture:'}
              </p>
              <span className="block text-[10px] text-tertiary font-bold uppercase">
                {item.scripture}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3 items-center">
            {/* Real High-Resolution Download via verified API proxy */}
            <DownloadButton
              url={item.image || ''}
              filename={`${item.slug}.png`}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadButtonText || 'Download High-Res'}</span>
            </DownloadButton>

            {/* Non-deceptive inline Citation Details Toggle */}
            {item.citation && (
              <button
                type="button"
                onClick={() => setShowCitation(!showCitation)}
                className="px-4 py-2 bg-card border border-border text-primary text-xs font-bold rounded hover:bg-muted transition-all flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-tertiary" />
                <span>{citationButtonText || 'View Citation Details'}</span>
                {showCitation ? (
                  <ChevronUp className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                )}
              </button>
            )}
          </div>

          {/* Inline Citation Card — real citation from the document */}
          {showCitation && item.citation && (
            <div className="p-3.5 rounded-lg bg-muted/80 border border-border space-y-1.5 text-xs text-muted-foreground animate-fadeIn">
              <p className="font-semibold text-primary">Archival Attribution &amp; Source:</p>
              <p className="text-[11px] leading-relaxed">
                {item.citation}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
