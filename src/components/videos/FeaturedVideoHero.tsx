'use client';

import React, { useState } from 'react';
import { Play, VideoOff } from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/lib/youtube';
import { sanitizeImageUrl } from '@/lib/media';

interface FeaturedVideoData {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  speaker?: string | null;
  scripture?: string | null;
  recorded?: string | null;
  buttonText?: string | null;
  videoUrl?: string | null;
  coverImage?: string | null;
}

interface FeaturedVideoHeroProps {
  data?: FeaturedVideoData | null;
}

export default function FeaturedVideoHero({ data }: FeaturedVideoHeroProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const badge = data?.badge || 'Featured Lecture';
  const title = data?.title || 'Introduction to Greek Codex Sinaiticus';
  const description =
    data?.description ||
    'Prof. Julian Mercer delivers a comprehensive lecture on the transcription techniques, textual variations, and historical impact of the Sinaiticus Codex.';
  const speaker = data?.speaker || 'Prof. Julian Mercer';
  const scripture = data?.scripture || 'Romans 1-3, Galatians 1';
  const recorded = data?.recorded || 'March 2025';
  const buttonText = data?.buttonText || 'Watch Lecture Now';

  const embedUrl = getYouTubeEmbedUrl(data?.videoUrl);

  const fallbackThumbnail =
    'https://uxmagic.blob.core.windows.net/public/agent-images/library_shelf-1782719371570-ajnz70oz8sg.png';
  const coverImage = data?.coverImage || fallbackThumbnail;

  const handlePlayAction = () => {
    if (embedUrl) {
      setIsPlaying(true);
    } else {
      setShowStatusModal(true);
    }
  };

  return (
    <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Video Preview Box (7 cols) */}
        <div className="lg:col-span-7 rounded-lg overflow-hidden relative bg-black shadow-lg group">
          {embedUrl && isPlaying ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden bg-primary">
              <img
                src={sanitizeImageUrl(coverImage)}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                alt={title}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handlePlayAction}
                  aria-label="Play video"
                  className="w-16 h-12 sm:w-20 sm:h-16 rounded-xl bg-primary/95 text-primary-foreground flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-tertiary cursor-pointer"
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1 fill-current" />
                </button>
              </div>
              <span className="absolute bottom-4 right-4 bg-primary/80 text-primary-foreground text-xs px-2.5 py-1 rounded font-semibold tracking-wide">
                45:30
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Lecture Metadata (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest block">
            {badge}
          </span>
          <h2 className="text-2xl font-heading font-bold text-primary leading-tight">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
            <p>
              <span className="font-semibold text-primary">Speaker:</span> {speaker}
            </p>
            <p>
              <span className="font-semibold text-primary">Scripture:</span> {scripture}
            </p>
            <p>
              <span className="font-semibold text-primary">Recorded:</span> {recorded}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handlePlayAction}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{buttonText}</span>
              {!embedUrl && (
                <span className="text-[10px] font-normal text-primary-foreground/75 opacity-80">
                  (Stream Pending)
                </span>
              )}
            </button>
          </div>

          {showStatusModal && (
            <div className="p-3.5 rounded-lg bg-muted/80 border border-border space-y-1.5 animate-fadeIn">
              <div className="flex items-start gap-2 text-xs text-primary font-semibold">
                <VideoOff className="w-4 h-4 text-tertiary flex-shrink-0 mt-0.5" />
                <span>Video Recording Pending Digital Archiving</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed pl-6">
                The high-definition video master for this lecture is scheduled for upload. Full theological transcriptions and related codex study notes are available in the Jesus Loves Ministry Library.
              </p>
              <div className="pl-6 pt-1">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="text-[10px] text-tertiary font-bold hover:underline"
                >
                  Dismiss notice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
