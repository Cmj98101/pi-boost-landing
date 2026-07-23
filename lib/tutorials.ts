/**
 * Video tutorials shown in the /learn section.
 *
 * Each entry becomes its own page at /learn/<slug> with a VideoObject schema
 * for SEO, a lazy-loaded YouTube embed, and a written walkthrough. To publish a
 * new tutorial, add an entry here: the hub page, the individual page, and the
 * sitemap all pick it up automatically.
 */

export const SITE_URL = "https://www.investigationflow.com";

export interface TutorialStep {
  heading: string;
  body: string;
}

export interface Tutorial {
  slug: string;
  title: string; // H1 and default <title>
  description: string; // meta description + VideoObject description
  youtubeId: string;
  publishDate: string; // ISO date, used as VideoObject uploadDate
  duration?: string; // optional ISO 8601 duration, e.g. "PT3M20S"
  intro: string;
  steps: TutorialStep[];
}

// hqdefault always exists for a valid video id (unlike maxresdefault).
export function tutorialThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export const TUTORIALS: Tutorial[] = [
  {
    slug: "add-timestamps",
    title: "How to Add Timestamps to Surveillance Video",
    description:
      "A step-by-step guide to adding accurate, verifiable timestamps to surveillance footage with Investigation Flow, including recovering the original recording time when a clip has lost its metadata.",
    youtubeId: "FiKMTe-SOac",
    publishDate: "2026-07-22",
    duration: "PT1M21S",
    intro:
      "Timestamps are what turn raw surveillance footage into usable evidence, but adding them by hand in a general video editor is slow and easy to get wrong. This short walkthrough shows how to add accurate, verifiable timestamps to your footage in Investigation Flow in just a few clicks, even when the original recording time is missing from the file.",
    steps: [
      {
        heading: "Import your footage",
        body: "Open Investigation Flow and drag in the clip, or the whole folder of surveillance video, that you want to timestamp. Investigation Flow reads all common video formats, so there is nothing to convert first.",
      },
      {
        heading: "Recover the original recording time",
        body: "Investigation Flow pulls the original date and time from the file's metadata automatically. If a clip has lost its metadata, you can set the correct start time yourself so the timestamp still reflects when the footage was actually recorded.",
      },
      {
        heading: "Customize how the timestamp looks",
        body: "Choose the date and time format, then set the position, size, and color so the stamp stays clearly legible without covering the action in frame.",
      },
      {
        heading: "Apply and review",
        body: "Add the timestamp and scrub through the clip to confirm it reads correctly from start to finish. You can adjust it at any point before exporting.",
      },
      {
        heading: "Export and deliver",
        body: "Export a universally-accepted MP4, complete with an action report that logs every action from import to export, ready to hand to your client or drop into the case file.",
      },
    ],
  },
];

export function getTutorial(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}
