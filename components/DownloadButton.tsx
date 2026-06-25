"use client";

import Link from "next/link";
import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";
import PlatformIcon from "./PlatformIcon";

// "Download Now" button (links to the /download chooser page) with the
// available platform glyphs shown inline. Renders nothing until at least
// one platform is available.
export default function DownloadButton({ className = "" }: { className?: string }) {
  const download = getConfig("download");
  const platforms = [
    { key: "mac", available: download.macAvailable },
    { key: "windows", available: download.windowsAvailable },
  ].filter((p) => p.available);

  if (platforms.length === 0) return null;

  return (
    <Link
      href="/download"
      onClick={() => analytics.downloadNowClicked("nav")}
      className={className}
    >
      Download Now
      <span className="inline-flex items-center gap-1.5">
        {platforms.map((p) => (
          <PlatformIcon key={p.key} platform={p.key} className="w-4 h-4" />
        ))}
      </span>
    </Link>
  );
}
