import type { Metadata } from "next";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = {
  title: "Download for Mac & Windows | Investigation Flow",
  description:
    "Download Investigation Flow for macOS or Windows. Timestamp, stitch, and export court-ready surveillance video, no browser required.",
  alternates: {
    canonical: "https://www.investigationflow.com/download",
  },
  openGraph: {
    title: "Download for Mac & Windows | Investigation Flow",
    description:
      "Download Investigation Flow for macOS or Windows. Timestamp, stitch, and export court-ready surveillance video, no browser required.",
    type: "website",
  },
};

export default function DownloadPage() {
  return <DownloadContent />;
}
