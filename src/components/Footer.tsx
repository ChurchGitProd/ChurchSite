import Link from 'next/link';
import { globalSettings } from '@/lib/navConfig';

export default function Footer() {
  const quickLinksTitle = globalSettings.footerQuickLinksTitle || 'Quick Links';
  const quickLinks = globalSettings.footerQuickLinks || [
    { label: 'Digital Library', href: '/library' },
    { label: 'Bible Lessons', href: '/lessons' },
    { label: 'Books Collection', href: '/books' },
    { label: 'Magazines', href: '/magazines' },
  ];

  const resourcesTitle = globalSettings.footerResourcesTitle || 'Resources';
  const resources = globalSettings.footerResources || [
    { label: 'Bible References', href: '/references' },
    { label: 'Bible Images', href: '/images' },
    { label: 'Video Archives', href: '/videos' },
    { label: 'Study Tools', href: '/resources' },
  ];

  const connectTitle = globalSettings.footerConnectTitle || 'Connect';
  const connect = globalSettings.footerConnect || [
    { label: 'Contact Office', href: '/contact' },
    { label: 'Zoom Meetings', href: '/zoom-info' },
    { label: 'Daily Newsletter', href: '/newsletter' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md">
                <span className="text-xl text-tertiary">{globalSettings.logoIcon || '📚'}</span>
              </div>
              <div>
                <span className="block font-heading text-xl font-bold tracking-tight text-primary-foreground">
                  {globalSettings.siteName || 'SCRIPTURA'}
                </span>
                <span className="block text-[10px] tracking-widest text-secondary-foreground/80 uppercase font-sans -mt-1">
                  {globalSettings.siteTagline || 'Digital Library'}
                </span>
              </div>
            </div>
            <p className="text-xs text-secondary-foreground/80 leading-relaxed">
              {globalSettings.footerDescription ||
                'A meticulous, beautifully curated editorial platform dedicated purely to the preservation, study, and teaching of biblical texts.'}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-heading font-bold text-tertiary mb-4 uppercase tracking-wider">
              {quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs text-secondary-foreground/90">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-tertiary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-heading font-bold text-tertiary mb-4 uppercase tracking-wider">
              {resourcesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-secondary-foreground/90">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-tertiary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-heading font-bold text-tertiary mb-4 uppercase tracking-wider">
              {connectTitle}
            </h4>
            <ul className="space-y-2 text-xs text-secondary-foreground/90">
              {connect.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-tertiary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-xs text-secondary-foreground/70">
          <p>
            &copy; {new Date().getFullYear()} {globalSettings.siteName || 'Scriptura'}{' '}
            {globalSettings.siteTagline || 'Digital Library'}.{' '}
            {globalSettings.copyrightText || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
