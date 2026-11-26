/**
 * Site content, extracted from the components so a new app can be re-skinned by
 * editing copy here rather than touching JSX. Icons are referenced by key from
 * the shared registry (see components/icons). This is the layer a CMS (Keystatic)
 * will feed into later.
 */
import type { IconKey } from "@/components/icons";

// ========== Features section ==========
export type FeatureItem = {
  icon: IconKey;
  title: string;
  description: string;
  // Solid accent fill + icon color from DESIGN-webflow.md
  accent: string;
};

export const FEATURES: FeatureItem[] = [
  {
    icon: "timestamp",
    title: "Verifiable Timestamps, Automatically",
    description:
      "Burn accurate, verifiable date and time onto footage that no longer carries it. Recover the original recording time and lock in timestamps that hold up under scrutiny.",
    accent: "bg-accent-purple text-white",
  },
  {
    icon: "stitch",
    title: "Stitch a Whole Case Into One Sequence",
    description:
      "Drop in clips from a day of surveillance and stitch them into a single, logical, chronological video. No timeline wrestling, no general-purpose editor required.",
    accent: "bg-accent-blue text-white",
  },
  {
    icon: "audio",
    title: "Audio On or Off, Your Call",
    description:
      "Keep the audio when it matters, strip it when it doesn't, for privacy or admissibility. One toggle per clip, no re-encoding headaches.",
    accent: "bg-accent-orange text-white",
  },
  {
    icon: "still",
    title: "Grab Clean Stills in One Click",
    description:
      "Pull clean still shots straight from the footage you're editing, perfect for reports, exhibits, and client updates, without switching tools.",
    accent: "bg-accent-green text-ink",
  },
  {
    icon: "report",
    title: "A Full Action Report on Every Case",
    description:
      "Every action is logged in order, from the moment footage is uploaded through each edit to the final export. Hand over a clear, defensible record of exactly what was done to the video.",
    accent: "bg-accent-pink text-white",
  },
  {
    icon: "effects",
    title: "Redact, Highlight, Annotate, and Brand",
    description:
      "Blur bystanders and plates, spotlight your subject, and drop in text, notes, or your logo, right on the video. Steer the viewer's eye to what matters while nothing private slips through.",
    accent: "bg-accent-purple text-white",
  },
  {
    icon: "batch",
    title: "Process Entire Cases at Once",
    description:
      "Stop processing one file at a time. Batch whole folders of surveillance video in a single pass and reclaim the hours you spend on manual prep.",
    accent: "bg-accent-blue text-white",
  },
  {
    icon: "bolt",
    title: "Built for Investigators, Not Filmmakers",
    description:
      "Export universally-accepted MP4, install on Windows or Mac in minutes, and start working immediately. No editing degree, no learning curve.",
    accent: "bg-accent-orange text-white",
  },
];

// ========== How It Works section ==========
export type HowItWorksStep = {
  number: string;
  icon: IconKey;
  title: string;
  description: string;
  // Solid accent fill + icon color from DESIGN-webflow.md
  accent: string;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    icon: "upload",
    title: "Add Your Footage",
    description:
      "Drag and drop a day's worth of surveillance clips from any camera or device. Supports all major video formats.",
    accent: "bg-accent-purple text-white",
  },
  {
    number: "02",
    icon: "adjust",
    title: "Timestamp, Stitch & Edit",
    description:
      "Add accurate timestamps, stitch clips into order, toggle audio on or off, and grab still shots, all in one place.",
    accent: "bg-accent-blue text-white",
  },
  {
    number: "03",
    icon: "export",
    title: "Export and Deliver",
    description:
      "Make final edits and redactions, then export universally-accepted MP4 files in minutes, each with an action report that logs every action, ready for clients and case files.",
    accent: "bg-accent-orange text-white",
  },
];

// ========== Why It Works (Testimonials) section ==========
export type Pillar = {
  icon: IconKey;
  title: string;
  description: string;
  // Solid accent fill + icon color from DESIGN-webflow.md
  accent: string;
};

export const PILLARS: Pillar[] = [
  {
    icon: "timestamp",
    title: "Minutes, not hours",
    description:
      "Timestamp, stitch, and export a full day of surveillance footage in the time it used to take just to set up your editor.",
    accent: "bg-accent-purple text-white",
  },
  {
    icon: "shield",
    title: "Holds up under scrutiny",
    description:
      "Accurate, verifiable timestamps and clean MP4 exports built to meet agency standards, not Hollywood effects.",
    accent: "bg-accent-blue text-white",
  },
  {
    icon: "desktop",
    title: "Made for one job",
    description:
      "No bloated timeline, no learning curve. Just the four tools surveillance video needs: timestamp, stitch, audio, and stills.",
    accent: "bg-accent-orange text-white",
  },
];

// ========== Showcase (product screenshots) section ==========
export type ShowcaseItem = {
  eyebrow: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    eyebrow: "Redaction",
    title: "Blur what shouldn't be seen",
    description:
      "Drop a blur box on a plate, a face, or a house number and it tracks the clip. Nothing private leaves your office, and the rest of the frame stays untouched.",
    src: "/screenshots/blur.webp",
    alt: "Investigation Flow blurring a license plate on surveillance footage, with a zoomed view of the redacted plate",
    width: 2000,
    height: 1119,
  },
  {
    eyebrow: "Stitching",
    title: "A whole day on one timeline",
    description:
      "Every clip from a shift lands in chronological order on a single timeline. Trim, mark, and layer effects where they matter, then export one continuous file.",
    src: "/screenshots/timeline.webp",
    alt: "Investigation Flow timeline showing five surveillance clips stitched in order with effect markers",
    width: 2000,
    height: 1573,
  },
  {
    eyebrow: "Location",
    title: "Prove where it was shot",
    description:
      "Investigation Flow reads the GPS data your camera already recorded and pins the clip on a satellite map, with coordinates, accuracy, and altitude. Export it as a location sheet and attach it straight to the file.",
    src: "/screenshots/location.webp",
    alt: "Investigation Flow inspecting a clip's GPS location on a satellite map, with coordinates, accuracy, and altitude, and an export location sheet button",
    width: 2000,
    height: 1134,
  },
];

export const TRUST_BADGES: string[] = [
  "Native Windows & Mac app",
  "Free trial included",
  "Batch processing built in",
  "Cancel anytime",
];
