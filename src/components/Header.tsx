'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_SECTIONS, TOP_NAV_HOME, TOP_NAV_ABOUT, TOP_NAV_CONTACT, OTHER_TOP_NAV_LINKS, globalSettings } from '@/lib/navConfig';

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({
    bible: false,
    hub: false,
    connect: false,
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border shadow-sm bg-background">
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-transform group-hover:scale-105">
              <span className="text-xl text-tertiary">{globalSettings.logoIcon || '📚'}</span>
            </div>
            <div>
              <span className="block font-heading text-xl font-bold tracking-tight text-primary">{globalSettings.siteName || 'SCRIPTURA'}</span>
              <span className="block text-[10px] tracking-widest text-muted-foreground uppercase font-sans -mt-1">{globalSettings.siteTagline || 'Digital Library'}</span>
            </div>
          </Link>

          {/* Main Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            <Link
              href={TOP_NAV_HOME.href}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activePage === TOP_NAV_HOME.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {TOP_NAV_HOME.label}
            </Link>

            {NAV_SECTIONS.map((section) => {
              const isSectionActive = section.items?.some((item) => item.id === activePage);
              return (
                <div key={section.id} className="relative group">
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                      isSectionActive
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span>{section.label}</span>
                    <span className="text-xs transition-transform group-hover:rotate-180 group-focus-within:rotate-180">▼</span>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-card rounded-xl border border-border shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                    {section.items?.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`block px-3 py-2 text-xs font-medium text-primary hover:bg-muted rounded-lg transition-colors ${
                          activePage === item.id ? 'font-semibold bg-muted' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {OTHER_TOP_NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activePage === link.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Search Input */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search scriptures, commentaries..."
                className="w-56 md:w-64 pl-9 pr-4 py-2 text-xs rounded-lg bg-muted border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm" aria-hidden="true">
                🔍
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-muted text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <span className="text-2xl leading-none font-bold" aria-hidden="true">
                {isMobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/45 lg:hidden transition-opacity duration-200"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-y-0 right-0 z-[110] w-[85vw] max-w-[384px] bg-card border-l border-border shadow-2xl flex flex-col justify-between overflow-hidden lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header with Title and Close X Button */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <span className="text-base text-tertiary">{globalSettings.logoIcon || '📚'}</span>
            </div>
            <div>
              <span className="block font-heading text-lg font-bold tracking-tight text-primary">{globalSettings.siteName || 'SCRIPTURA'}</span>
              <span className="block text-[9px] tracking-widest text-muted-foreground uppercase font-sans -mt-0.5">{globalSettings.siteTagline || 'Digital Library'}</span>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors text-xl font-bold z-[120]"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] p-4 space-y-4">
          {/* Mobile Search Input */}
          <div className="relative sm:hidden">
            <input
              type="text"
              placeholder="Search scriptures, commentaries..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg bg-muted border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
            />
            <span className="absolute left-3 top-3 text-muted-foreground text-xs" aria-hidden="true">
              🔍
            </span>
          </div>

          <nav className="space-y-1 font-sans text-sm" aria-label="Mobile Navigation Links">
            {/* Home Link */}
            <Link
              href={TOP_NAV_HOME.href}
              onClick={closeMenu}
              className={`block px-3 py-2.5 rounded-lg font-medium transition-colors ${
                activePage === TOP_NAV_HOME.id ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary' : 'text-foreground hover:bg-muted'
              }`}
            >
              {TOP_NAV_HOME.label}
            </Link>

            {NAV_SECTIONS.map((section) => {
              const isOpen = openSubmenus[section.id];
              return (
                <div key={section.id} className="border-b border-border/60 pb-1">
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-foreground hover:bg-muted font-medium transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`mobile-submenu-${section.id}`}
                  >
                    <span>{section.label}</span>
                    <span
                      className={`text-xs text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div id={`mobile-submenu-${section.id}`} className="pl-4 pr-2 py-1 space-y-1 bg-muted/30 rounded-lg mt-1">
                      {section.items?.map((item) => {
                        const isActive = activePage === item.id;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={closeMenu}
                            className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                              isActive
                                ? 'text-primary font-semibold bg-muted'
                                : 'text-foreground hover:text-primary hover:bg-muted'
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Other Top Navigation Links */}
            {OTHER_TOP_NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={closeMenu}
                className={`block px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  activePage === link.id ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary' : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Drawer Footer: close action */}
        <div className="p-4 border-t border-border bg-muted/40 flex items-center justify-end">
          <button
            type="button"
            onClick={closeMenu}
            className="min-h-[40px] px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            Close ✕
          </button>
        </div>
      </div>
    </header>
  );
}
