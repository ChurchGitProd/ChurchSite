import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { globalSettings } from "@/lib/navConfig";
import { JsonLd, SITE_URL } from "@/components/common/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const siteFullName = `${globalSettings.siteName || 'Scriptura'} ${globalSettings.siteTagline || 'Digital Library'}`;
const siteDescription = globalSettings.footerDescription || "Exploring the Sacred Texts with Scholarly Precision & Reverence";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://scripturadigitallibrary.netlify.app'),
  title: {
    default: siteFullName,
    template: `%s | ${siteFullName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteFullName,
    description: siteDescription,
    siteName: siteFullName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteFullName,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: '#163B6C',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans transition-colors duration-200`}>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#org`,
                name: siteFullName,
                url: SITE_URL,
                description: siteDescription,
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#site`,
                url: SITE_URL,
                name: siteFullName,
                description: siteDescription,
                publisher: { '@id': `${SITE_URL}/#org` },
              },
            ],
          }}
        />
        {children}
      </body>
    </html>
  );
}
