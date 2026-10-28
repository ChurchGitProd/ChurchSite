import rawGlobalData from '../../content/global/index.json';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface GlobalSettings {
  siteName: string;
  siteTagline: string;
  logoIcon: string;
  footerDescription: string;
  copyrightText: string;
  topNavLinks: NavItem[];
  navSections: NavSection[];
  footerQuickLinksTitle: string;
  footerQuickLinks: FooterLink[];
  footerResourcesTitle: string;
  footerResources: FooterLink[];
  footerConnectTitle: string;
  footerConnect: FooterLink[];
}

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  siteName: 'SCRIPTURA',
  siteTagline: 'Digital Library',
  logoIcon: '📚',
  footerDescription:
    'A meticulous, beautifully curated editorial platform dedicated purely to the preservation, study, and teaching of biblical texts.',
  copyrightText: 'All rights reserved.',
  topNavLinks: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact Office', href: '/contact' },
  ],
  navSections: [
    {
      id: 'bible',
      label: 'Bible',
      items: [
        { id: 'lessons', label: 'Lessons', href: '/lessons' },
        { id: 'references', label: 'Scripture References', href: '/references' },
        { id: 'images', label: 'Bible Images', href: '/images' },
        { id: 'videos', label: 'Bible Videos', href: '/videos' },
      ],
    },
    {
      id: 'hub',
      label: 'Knowledge Hub',
      items: [
        { id: 'books', label: 'Books', href: '/books' },
        { id: 'library', label: 'Library', href: '/library' },
        { id: 'magazines', label: 'Magazines', href: '/magazines' },
        { id: 'newsletter', label: 'Daily Letter', href: '/newsletter' },
        { id: 'resources', label: 'Resources', href: '/resources' },
        { id: 'archives', label: 'Archives', href: '/archives' },
      ],
    },
    {
      id: 'connect',
      label: 'Connect Portal',
      items: [
        { id: 'quick-links', label: 'Quick Links', href: '/quick-links' },
        { id: 'zoom-info', label: 'Zoom Info', href: '/zoom-info' },
      ],
    },
  ],
  footerQuickLinksTitle: 'Quick Links',
  footerQuickLinks: [
    { label: 'Digital Library', href: '/library' },
    { label: 'Bible Lessons', href: '/lessons' },
    { label: 'Books Collection', href: '/books' },
    { label: 'Magazines', href: '/magazines' },
  ],
  footerResourcesTitle: 'Resources',
  footerResources: [
    { label: 'Bible References', href: '/references' },
    { label: 'Bible Images', href: '/images' },
    { label: 'Video Archives', href: '/videos' },
    { label: 'Study Tools', href: '/resources' },
  ],
  footerConnectTitle: 'Connect',
  footerConnect: [
    { label: 'Contact Office', href: '/contact' },
    { label: 'Zoom Meetings', href: '/zoom-info' },
    { label: 'Daily Newsletter', href: '/newsletter' },
    { label: 'About Us', href: '/about' },
  ],
};

function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

function normalizeNavItem(item: unknown, fallbackId: string): NavItem | null {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Record<string, unknown>;
  const label = isNonEmptyString(raw.label) ? raw.label.trim() : null;
  const href = isNonEmptyString(raw.href) ? raw.href.trim() : null;
  if (!label || !href) return null;
  const id = isNonEmptyString(raw.id) ? raw.id.trim() : fallbackId;
  return { id, label, href };
}

function normalizeFooterLink(item: unknown): FooterLink | null {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Record<string, unknown>;
  const label = isNonEmptyString(raw.label) ? raw.label.trim() : null;
  const href = isNonEmptyString(raw.href) ? raw.href.trim() : null;
  if (!label || !href) return null;
  return { label, href };
}

export function normalizeGlobalSettings(raw: unknown): GlobalSettings {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_GLOBAL_SETTINGS;
  }

  const data = raw as Record<string, unknown>;

  const siteName = isNonEmptyString(data.siteName)
    ? data.siteName.trim()
    : DEFAULT_GLOBAL_SETTINGS.siteName;

  const siteTagline = isNonEmptyString(data.siteTagline)
    ? data.siteTagline.trim()
    : DEFAULT_GLOBAL_SETTINGS.siteTagline;

  const logoIcon = isNonEmptyString(data.logoIcon)
    ? data.logoIcon.trim()
    : DEFAULT_GLOBAL_SETTINGS.logoIcon;

  const footerDescription = isNonEmptyString(data.footerDescription)
    ? data.footerDescription.trim()
    : DEFAULT_GLOBAL_SETTINGS.footerDescription;

  const copyrightText = isNonEmptyString(data.copyrightText)
    ? data.copyrightText.trim()
    : DEFAULT_GLOBAL_SETTINGS.copyrightText;

  // Normalize topNavLinks safely
  let topNavLinks: NavItem[] = [];
  if (Array.isArray(data.topNavLinks)) {
    topNavLinks = data.topNavLinks
      .map((item, idx) => normalizeNavItem(item, `nav-${idx}`))
      .filter((item): item is NavItem => item !== null);
  }
  if (topNavLinks.length === 0) {
    topNavLinks = DEFAULT_GLOBAL_SETTINGS.topNavLinks;
  }

  // Normalize navSections safely
  let navSections: NavSection[] = [];
  if (Array.isArray(data.navSections)) {
    navSections = data.navSections
      .map((sec, secIdx) => {
        if (!sec || typeof sec !== 'object') return null;
        const s = sec as Record<string, unknown>;
        const label = isNonEmptyString(s.label) ? s.label.trim() : null;
        if (!label) return null;
        const id = isNonEmptyString(s.id) ? s.id.trim() : `section-${secIdx}`;
        let items: NavItem[] = [];
        if (Array.isArray(s.items)) {
          items = s.items
            .map((item, itemIdx) => normalizeNavItem(item, `item-${secIdx}-${itemIdx}`))
            .filter((item): item is NavItem => item !== null);
        }
        return { id, label, items };
      })
      .filter((sec): sec is NavSection => sec !== null);
  }
  if (navSections.length === 0) {
    navSections = DEFAULT_GLOBAL_SETTINGS.navSections;
  }

  // Normalize footerQuickLinks safely
  let footerQuickLinks: FooterLink[] = [];
  if (Array.isArray(data.footerQuickLinks)) {
    footerQuickLinks = data.footerQuickLinks
      .map(normalizeFooterLink)
      .filter((link): link is FooterLink => link !== null);
  }
  if (footerQuickLinks.length === 0) {
    footerQuickLinks = DEFAULT_GLOBAL_SETTINGS.footerQuickLinks;
  }

  // Normalize footerResources safely
  let footerResources: FooterLink[] = [];
  if (Array.isArray(data.footerResources)) {
    footerResources = data.footerResources
      .map(normalizeFooterLink)
      .filter((link): link is FooterLink => link !== null);
  }
  if (footerResources.length === 0) {
    footerResources = DEFAULT_GLOBAL_SETTINGS.footerResources;
  }

  // Normalize footerConnect safely
  let footerConnect: FooterLink[] = [];
  if (Array.isArray(data.footerConnect)) {
    footerConnect = data.footerConnect
      .map(normalizeFooterLink)
      .filter((link): link is FooterLink => link !== null);
  }
  if (footerConnect.length === 0) {
    footerConnect = DEFAULT_GLOBAL_SETTINGS.footerConnect;
  }

  const footerQuickLinksTitle = isNonEmptyString(data.footerQuickLinksTitle)
    ? data.footerQuickLinksTitle.trim()
    : DEFAULT_GLOBAL_SETTINGS.footerQuickLinksTitle;

  const footerResourcesTitle = isNonEmptyString(data.footerResourcesTitle)
    ? data.footerResourcesTitle.trim()
    : DEFAULT_GLOBAL_SETTINGS.footerResourcesTitle;

  const footerConnectTitle = isNonEmptyString(data.footerConnectTitle)
    ? data.footerConnectTitle.trim()
    : DEFAULT_GLOBAL_SETTINGS.footerConnectTitle;

  return {
    siteName,
    siteTagline,
    logoIcon,
    footerDescription,
    copyrightText,
    topNavLinks,
    navSections,
    footerQuickLinksTitle,
    footerQuickLinks,
    footerResourcesTitle,
    footerResources,
    footerConnectTitle,
    footerConnect,
  };
}

export const globalSettings: GlobalSettings = normalizeGlobalSettings(rawGlobalData);

export const TOP_NAV_HOME: NavItem =
  globalSettings.topNavLinks.find((l) => l.id === 'home' || l.href === '/') ||
  DEFAULT_GLOBAL_SETTINGS.topNavLinks[0];

export const TOP_NAV_ABOUT: NavItem =
  globalSettings.topNavLinks.find((l) => l.id === 'about' || l.href === '/about') ||
  DEFAULT_GLOBAL_SETTINGS.topNavLinks[1];

export const TOP_NAV_CONTACT: NavItem =
  globalSettings.topNavLinks.find((l) => l.id === 'contact' || l.href === '/contact') ||
  DEFAULT_GLOBAL_SETTINGS.topNavLinks[2];

export const OTHER_TOP_NAV_LINKS: NavItem[] = globalSettings.topNavLinks.filter(
  (l) => l.id !== TOP_NAV_HOME.id && l.href !== TOP_NAV_HOME.href
);

export const NAV_SECTIONS: NavSection[] = globalSettings.navSections;
