import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { globalSettings } from "@/lib/navConfig";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
