import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PostHogProvider from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import { SITE, absoluteUrl } from "@/lib/site";
import { getConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Kept under the ~60-char title / ~155-char description budget so neither is
// truncated in search results. Page-level metadata overrides these.
const TITLE = "Surveillance Video Timestamping | Investigation Flow";
const DESCRIPTION =
  "Timestamping software for private investigators. Fix timestamp errors, stitch clips in order, and batch process surveillance footage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE.url,
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to emit the Search
  // Console meta tag. Omitted entirely when unset so we never ship an empty one.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Drive the schema price off the real pricing config so the two can't drift.
  const pricing = getConfig("pricing");
  const prices = pricing.options.map((o) => o.price);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#software`,
        name: SITE.name,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Windows, macOS",
        url: SITE.url,
        description:
          "Video timestamping software for private investigators. Add timestamps, stitch clips in order, keep or remove audio, grab still shots, and batch process surveillance footage.",
        featureList: [
          "Video timestamping",
          "Clip stitching",
          "Audio keep or remove",
          "Still-shot capture",
          "Batch processing",
        ],
        // Exposing price is what makes software eligible for price-bearing
        // rich results. AggregateOffer covers the monthly/yearly/lifetime spread.
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: Math.min(...prices).toFixed(2),
          highPrice: Math.max(...prices).toFixed(2),
          offerCount: pricing.options.length,
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/pricing"),
          offers: pricing.options.map((option) => ({
            "@type": "Offer",
            name: `${pricing.productName} - ${option.name}`,
            price: option.price.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: absoluteUrl("/pricing"),
          })),
        },
      },
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        logo: absoluteUrl(SITE.logo),
        description:
          "Professional video editing software for private investigators and surveillance professionals.",
      },
    ],
  };

  return (
    <html lang="en" data-theme={SITE.theme} className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <PostHogPageView />
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        {/* Affiliate attribution cookie. Deferred to lazyOnload so it stays off
            the critical path - it only needs to run before a checkout click,
            and checkout lives a page away from any landing view. */}
        <Script id="lemonsqueezy-affiliate-config" strategy="lazyOnload">
          {`window.lemonSqueezyAffiliateConfig = { store: "${SITE.lemonSqueezyStore}" };`}
        </Script>
        <Script
          src="https://lmsqueezy.com/affiliate.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="8RGaHpym6HopAd3PLKhSqw"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
