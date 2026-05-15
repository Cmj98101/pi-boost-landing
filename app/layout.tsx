import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

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
    canonical: "https://investigationflow.com",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "127",
        },
        operatingSystem: "Windows, macOS",
        description:
          "Professional video timestamping software for private investigators. Add timestamps, remove audio, convert formats, and batch process surveillance footage.",
        featureList: [
          "Video timestamping",
          "Batch processing",
          "Audio removal",
          "Format conversion",
          "Project management",
        ],
      },
      {
        "@type": "Organization",
        name: "Investigation Flow",
        url: "https://investigationflow.com",
        logo: "https://investigationflow.com/logo.svg",
        description:
          "Professional video editing software for private investigators and surveillance professionals.",
      },
    ],
  };

  return (
    <html lang="en" data-theme="investigationflow">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="8RGaHpym6HopAd3PLKhSqw"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
