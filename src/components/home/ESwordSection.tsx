'use client';

import React, { useState } from 'react';
import { ExternalLink, Download, BookOpen, Search, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

interface ESwordSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ESwordSection({
  title = 'e-Sword — Free Bible Study Platform',
  subtitle = 'Access comprehensive digital Scripture study tools with e-Sword. Explore parallel Bible translations, Strong’s Greek & Hebrew concordances, commentaries, and theological reference dictionaries directly below or in a separate tab.',
}: ESwordSectionProps) {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section className="space-y-6 scroll-mt-24" aria-labelledby="esword-section-title">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border/70">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-muted border border-border text-[11px] font-semibold text-secondary uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            <span>Digital Bible Study Integration</span>
          </div>
          <h2 id="esword-section-title" className="text-2xl sm:text-3xl font-heading font-bold text-primary">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Quick Action Links */}
        <div className="flex items-center gap-2.5 flex-shrink-0 pt-1 md:pt-0">
          <a
            href="https://www.e-sword.net/downloads.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-primary bg-card hover:bg-muted border border-border rounded-lg shadow-sm transition-all"
            title="Download e-Sword software for your device"
          >
            <Download className="w-3.5 h-3.5 text-tertiary" />
            <span>Downloads</span>
          </a>
          <a
            href="https://www.e-sword.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/95 rounded-lg shadow-md transition-all group"
            title="Open e-Sword in a new tab"
          >
            <span>Open e-Sword.net</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Embedded Browser Frame */}
      <div className="bg-card border border-border rounded-2xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
        {/* Browser Top Window Chrome Bar */}
        <div className="bg-muted/80 border-b border-border px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/90 inline-block border border-red-500/20" />
            <span className="w-3 h-3 rounded-full bg-amber-400/90 inline-block border border-amber-500/20" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/90 inline-block border border-emerald-500/20" />
          </div>

          {/* Centered Mock URL Address Bar */}
          <div className="flex-1 max-w-lg mx-auto bg-background/90 border border-border/80 rounded-md px-3 py-1 flex items-center justify-center gap-2 text-[11px] text-muted-foreground shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate font-mono">https://www.e-sword.net/</span>
          </div>

          {/* Browser utility actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleRefresh}
              aria-label="Reload embedded page"
              title="Reload preview"
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://www.e-sword.net/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open e-Sword in external browser"
              title="Open full page in new window"
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div className="relative w-full bg-white h-[600px] sm:h-[680px] lg:h-[750px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm gap-3">
              <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-xs font-medium text-muted-foreground">
                Connecting to e-Sword Free Bible Study Platform...
              </p>
            </div>
          )}

          <iframe
            key={iframeKey}
            src="https://www.e-sword.net/"
            title="e-Sword: Free Bible Study Platform"
            className="w-full h-full border-0 bg-white"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoading(false)}
            allow="fullscreen"
          />
        </div>

        {/* Feature Highlights Footer Bar */}
        <div className="bg-muted/40 border-t border-border px-4 py-3 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-tertiary flex-shrink-0" />
              <span className="truncate font-medium text-foreground">Parallel Bibles</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-tertiary flex-shrink-0" />
              <span className="truncate font-medium text-foreground">Strong’s Concordance</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-tertiary flex-shrink-0" />
              <span className="truncate font-medium text-foreground">Scholarly Commentaries</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-tertiary flex-shrink-0" />
              <span className="truncate font-medium text-foreground">Multi-Device Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
