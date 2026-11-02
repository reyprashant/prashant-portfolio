/**
 * Root layout: fonts, global metadata defaults, skip link, header, footer,
 * analytics and site-wide structured data (Person, Organization, WebSite).
 *
 * Fonts are loaded with next/font/google, which downloads and self-hosts the
 * WOFF2 files at build time, subsets to Latin and sets font-display: swap.
 */
import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";
import { publicEnv, siteUrl } from "@/lib/env";
import { aicnSchema, organizationSchema, personSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoPages.home.title,
    template: `%s | ${site.name}`,
  },
  description: seoPages.home.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  ...(publicEnv.googleSiteVerification
    ? { verification: { google: publicEnv.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bebas.variable} ${manrope.variable}`}>
      <body className="surface-black flex min-h-svh flex-col">
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd
          data={[personSchema(), organizationSchema(), aicnSchema(), websiteSchema()]}
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
