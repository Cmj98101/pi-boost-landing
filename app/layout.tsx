import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PostHogProvider from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
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
    siteName: "Investigation Flow",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Investigation Flow | Video Time-Stamping Simplified for Private Investigators",
    description:
      "Professional video timestamping software for private investigators. Correct timestamp errors, perfect video conversion, customize timestamp appearance and location.",
  },
  alternates: {
    canonical: "https://www.investigationflow.com",
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
        name: "Investigation Flow",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Windows, macOS",
        description:
          "Court-ready video timestamping software for private investigators. Add timestamps, stitch clips in order, keep or remove audio, grab still shots, and batch process surveillance footage.",
        featureList: [
          "Court-ready video timestamping",
          "Clip stitching",
          "Audio keep or remove",
          "Still-shot capture",
          "Batch processing",
        ],
      },
      {
        "@type": "Organization",
        name: "Investigation Flow",
        url: "https://www.investigationflow.com",
        logo: "https://www.investigationflow.com/logo-full.png",
        description:
          "Professional video editing software for private investigators and surveillance professionals.",
      },
    ],
  };

  return (
    <html lang="en" data-theme="investigationflow" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.lemonSqueezyAffiliateConfig = { store: "investigationflow" };`,
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
