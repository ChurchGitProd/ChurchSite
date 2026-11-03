import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import { client } from '../../tina/__generated__/client';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export const dynamic = 'force-dynamic';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/lessons', label: 'Lessons' },
  { href: '/books', label: 'Books' },
  { href: '/magazines', label: 'Magazines' },
  { href: '/videos', label: 'Videos' },
  { href: '/contact', label: 'Contact' },
];

export default async function NotFound() {
  const homeData = await client.queries.home(
    { relativePath: 'index.md' },
    { fetchOptions: { cache: 'no-store' } }
  );
  const home = homeData.data.home;

  return (
    <div
      className="min-h-screen w-full flex flex-col relative text-foreground font-sans"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(153,212,224,0.28), transparent 45%), radial-gradient(circle at bottom right, rgba(153,212,224,0.18), transparent 50%), linear-gradient(180deg, #FCFEFE 0%, #F4FBFC 20%, #EAF7FA 45%, #DDF2F6 70%, #C8E8EF 100%)',
      }}
    >
      <AnnouncementBar
        text={home.announcementText}
        subtext={home.announcementSubtext}
      />

      <Header />

      <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-3">
            <p className="text-7xl sm:text-8xl font-heading font-bold text-primary/20 select-none">
              404
            </p>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you are looking for does not exist or may have been
              moved. Try one of the sections below, or head back to the home
              page.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-border bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold text-sm rounded hover:bg-primary/95 transition-all uppercase tracking-wider shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
