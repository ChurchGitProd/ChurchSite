import Link from 'next/link';
import {
  BookOpen,
  Bookmark,
  Clipboard,
  Folder,
  FileText,
  Video,
  Image as ImageIcon,
  Globe,
  LucideIcon,
} from 'lucide-react';

interface QuickLinkItem {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
}

interface QuickStudyLinksWidgetData {
  title?: string | null;
  links?: (QuickLinkItem | null)[] | null;
}

interface QuickStudyLinksWidgetProps {
  data?: QuickStudyLinksWidgetData | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Bookmark,
  Clipboard,
  Folder,
  FileText,
  Video,
  Image: ImageIcon,
  Globe,
};

const DEFAULT_LINKS: QuickLinkItem[] = [
  {
    title: 'Bible Texts',
    href: '/references',
    icon: 'BookOpen',
  },
  {
    title: 'All Lessons',
    href: '/lessons',
    icon: 'Bookmark',
  },
  {
    title: 'Publications',
    href: '/books',
    icon: 'Clipboard',
  },
  {
    title: 'Archives',
    href: '/archives',
    icon: 'Folder',
  },
];

function resolveIcon(iconName?: string | null): LucideIcon {
  if (!iconName || typeof iconName !== 'string') return BookOpen;
  const clean = iconName.trim();
  if (ICON_MAP[clean]) return ICON_MAP[clean];
  const matchedKey = Object.keys(ICON_MAP).find(
    (key) => key.toLowerCase() === clean.toLowerCase()
  );
  return (matchedKey && ICON_MAP[matchedKey]) || BookOpen;
}

export default function QuickStudyLinksWidget({ data }: QuickStudyLinksWidgetProps) {
  const title = data?.title?.trim() || 'Quick Study Links';

  // Sanitize and filter links against empty/malformed objects
  const validLinks = Array.isArray(data?.links)
    ? data.links
        .filter((item): item is QuickLinkItem => {
          if (!item || typeof item !== 'object') return false;
          const hasTitle = Boolean(item.title && item.title.trim().length > 0);
          const hasHref = Boolean(item.href && item.href.trim().length > 0);
          return hasTitle || hasHref;
        })
        .map((item) => ({
          title: item.title?.trim() || 'Study Link',
          href: item.href?.trim() || '#',
          icon: item.icon?.trim() || 'BookOpen',
        }))
    : [];

  const links = validLinks.length > 0 ? validLinks : DEFAULT_LINKS;

  return (
    <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-sm">
      <h3 className="text-base font-heading font-bold text-primary border-b border-border pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link, idx) => {
          const Icon = resolveIcon(link.icon);
          return (
            <Link
              key={idx}
              href={link.href || '#'}
              className="p-3 bg-muted hover:bg-tertiary/10 rounded text-center transition-all group flex flex-col items-center justify-center"
            >
              <Icon className="w-5 h-5 text-tertiary mb-1 transition-transform group-hover:scale-110" />
              <span className="block text-[10px] font-medium text-primary group-hover:text-tertiary transition-colors">
                {link.title || 'Link'}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
