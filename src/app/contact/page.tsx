import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/home/AnnouncementBar';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import OfficeLocationMap from '@/components/contact/OfficeLocationMap';
import OfficeHoursAndInfo from '@/components/contact/OfficeHoursAndInfo';
import { client } from '../../../tina/__generated__/client';

export const metadata = {
  title: 'Contact Office',
  description: 'Get in touch with the SCRIPTURA office — email, phone, office hours, and location on the map.',
};

export const dynamic = 'force-dynamic';

export default async function Contact() {
  const contactData = await client.queries.contact(
    { relativePath: 'index.md' },
    { fetchOptions: { cache: 'no-store' } }
  );
  const data = contactData.data.contact;

  return (
    <div
      className="min-h-screen w-full flex flex-col relative text-foreground font-sans"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(153,212,224,0.28), transparent 45%), radial-gradient(circle at bottom right, rgba(153,212,224,0.18), transparent 50%), linear-gradient(180deg, #FCFEFE 0%, #F4FBFC 20%, #EAF7FA 45%, #DDF2F6 70%, #C8E8EF 100%)',
      }}
    >
      {/* Top Announcement Bar */}
      <AnnouncementBar
        text={data.announcementText}
        subtext={data.announcementSubtext}
      />

      <Header activePage="contact" />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-[10px]">→</span>
            <span className="text-primary font-semibold">Contact</span>
          </nav>
        </div>
      </div>

      {/* Page Intro / Hero */}
      <ContactHero
        badge={data.hero?.badge}
        headline={data.hero?.headline}
        subheadline={data.hero?.subheadline}
      />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="space-y-12">
          {/* Contact Information Cards */}
          <ContactInfoCards
            emailCard={data.emailCard}
            phoneCard={data.phoneCard}
            locationCard={data.locationCard}
          />

          {/* Map Location Section */}
          <OfficeLocationMap mapLocation={data.mapLocation} />

          {/* Office Hours & Additional Information */}
          <OfficeHoursAndInfo
            officeHours={data.officeHours}
            additionalInfo={data.additionalInfo}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
