"use client";

import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";

// "Try the Live Demo" link that opens the in-browser demo and fires a
// demo_clicked analytics event tagged with where it was clicked.
export default function DemoLink({
  location,
  className = "",
  children,
}: {
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  const demoUrl = getConfig("demoUrl");
  return (
    <a
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.demoClicked(location)}
      className={className}
    >
      {children}
    </a>
  );
}
