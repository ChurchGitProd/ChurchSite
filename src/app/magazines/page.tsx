import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import FeaturedMagazineHero from '@/components/magazines/FeaturedMagazineHero';
import MagazineSpotlight from '@/components/magazines/MagazineSpotlight';
import MagazinesExplorer from '@/components/magazines/MagazinesExplorer';
import { MagazineCardData } from '@/components/magazines/MagazineCard';
import { resolveFeaturedMagazines, resolveLatestMagazine } from '@/lib/featuredPublications';
import { refTitle } from '@/lib/featured';
import { client } from '../../../tina/__generated__/client';

export const metadata = {
  title: 'Magazines',
  description: 'Quarterly SCRIPTURA magazine issues — seasonal theology, biblical studies, church history, and ethics.',
};

export const dynamic = 'force-dynamic';

export default async function Magazines() {
  const [magazinesPageData, magazineConnectionData] = await Promise.all([
    client.queries.magazines({ relativePath: 'index.md' }, { fetchOptions: { cache: 'no-store' } }),
    client.queries.magazineConnection({}, { fetchOptions: { cache: 'no-store' } }),
  ]);

  const data = magazinesPageData.data.magazines;
  const rawEdges = magazineConnectionData.data.magazineConnection.edges || [];

  const allMagazines: MagazineCardData[] = rawEdges
    .map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => Boolean(node))
    .map((node) => ({
      slug: node._sys.filename,
      title: node.title,
      issue: node.issue,
      season: node.season,
      year: node.year,
      topic: refTitle(node.topic),
      description: node.description,
      coverImage: node.coverImage,
      badge: node.badge,
      contributorsCount: node.contributorsCount,
      articlesCount: node.articlesCount,
      pagesCount: node.pagesCount,
      pdfFile: node.pdfFile,
    }));

  // Canonical display order matching original HTML source
  const canonicalOrder = [
    'fall-2024-eschatology-and-hope',
    'summer-2024-ecclesiology',
    'spring-2024-christology',
    'winter-2023-soteriology',
    'fall-2023-pneumatology',
    'summer-2023-biblical-hermeneutics',
    'spring-2023-church-history',
    'winter-2022-ethics-and-morality',
    'fall-2022-apologetics',
  ];

  allMagazines.sort((a, b) => {
    const idxA = canonicalOrder.indexOf(a.slug);
    const idxB = canonicalOrder.indexOf(b.slug);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

  // Hero = featured flag; Spotlight = newest by Publish Date (excluding the hero)
  const featuredMag = resolveFeaturedMagazines(rawEdges.map((e) => e?.node), 1)[0] ?? null;
  const spotlightIssue = (() => {
    const latest = resolveLatestMagazine(rawEdges.map((e) => e?.node), featuredMag?._sys?.filename ?? undefined);
    return latest ? allMagazines.find((m) => m.slug === latest._sys?.filename) ?? null : null;
  })();

  return (
    <div
      className="min-h-screen w-full flex flex-col relative text-foreground font-sans"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(153,212,224,0.28), transparent 45%), radial-gradient(circle at bottom right, rgba(153,212,224,0.18), transparent 50%), linear-gradient(180deg, #FCFEFE 0%, #F4FBFC 20%, #EAF7FA 45%, #DDF2F6 70%, #C8E8EF 100%)',
      }}
    >
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        text={data.announcementText}
        subtext={data.announcementSubtext}
      />

      {/* 2. Universal Header */}
      <Header activePage="magazines" />

      {/* 3. Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Magazines</span>
          </nav>
        </div>
      </div>

      {/* 4. Page Intro */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
              {data.hero?.badge || 'Quarterly Publications'}
            </span>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {data.hero?.headline || 'Scriptura Magazine'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {data.hero?.subheadline ||
                'Our quarterly theological journal featuring scholarly articles, book reviews, biblical expositions, and contemporary theological discussions from leading scholars and pastors.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5-9. Issue Filter Toolbar, Featured Hero, Spotlight, Archive Grid & Pagination */}
      <MagazinesExplorer
        initialMagazines={allMagazines}
        archiveTitle={data.archiveTitle}
        featuredHero={featuredMag ? (
          <FeaturedMagazineHero
            badge={data.featuredIssue?.badge}
            tag={data.featuredIssue?.tag}
            title={featuredMag.title as string}
            description={featuredMag.description as string}
            date={featuredMag.publishDate as string}
            details={[
              featuredMag.articlesCount ? `${featuredMag.articlesCount} Articles` : null,
              featuredMag.pagesCount ? `${featuredMag.pagesCount} Pages` : null,
            ].filter(Boolean).join(' | ')}
            coverImage={featuredMag.coverImage as string}
            readButtonText={data.featuredIssue?.readButtonText}
            downloadButtonText={data.featuredIssue?.downloadButtonText}
            pdfFile={featuredMag.pdfFile as string}
          />
        ) : undefined}
        spotlight={
          spotlightIssue ? (
            <MagazineSpotlight
              sectionTitle={data.spotlightTitle}
              issue={spotlightIssue}
            />
          ) : null
        }
      />

      {/* 11. Universal Footer */}
      <Footer />
    </div>
  );
}
