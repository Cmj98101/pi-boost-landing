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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title:
    "Investigation Flow | Video Time-Stamping Simplified for Private Investigators",
  description:
    "Professional video timestamping software for private investigators. Correct timestamp errors, perfect video conversion, customize timestamp appearance and location.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title:
      "Investigation Flow | Video Time-Stamping Simplified for Private Investigators",
    description:
      "Professional video timestamping software for private investigators. Correct timestamp errors, perfect video conversion, customize timestamp appearance and location.",
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Investigation Flow | Video Time-Stamping Simplified for Private Investigators",
    description:
      "Professional video timestamping software for private investigators. Correct timestamp errors, perfect video conversion, customize timestamp appearance and location.",
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: SITE.name,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Windows, macOS",
        description:
          "Video timestamping software for private investigators. Add timestamps, stitch clips in order, keep or remove audio, grab still shots, and batch process surveillance footage.",
        featureList: [
          "Video timestamping",
          "Clip stitching",
          "Audio keep or remove",
          "Still-shot capture",
          "Batch processing",
        ],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.lemonSqueezyAffiliateConfig = { store: "${SITE.lemonSqueezyStore}" };`,
          }}
        />
        <script src="https://lmsqueezy.com/affiliate.js" defer />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <PostHogPageView />
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="8RGaHpym6HopAd3PLKhSqw"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
