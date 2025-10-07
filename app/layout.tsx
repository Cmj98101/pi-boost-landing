import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PI Boost - Professional Video Timestamping for Private Investigators",
  description: "Add precise timestamps to your surveillance footage with ease. Individual or batch processing - simple, fast, and reliable timestamping software for private investigators.",
  keywords: "private investigator, video timestamping, surveillance footage, batch processing, MP4, MOV, timestamp software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="piboost">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
