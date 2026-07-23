export type UpdateSection = {
  heading?: string;
  items: string[];
};

export type UpdateEntry = {
  date: string; // ISO date, e.g. "2026-07-08"
  version?: string; // e.g. "1.3.0"
  title: string;
  tag: "New" | "Improved" | "Fixed";
  body?: string; // optional short lead-in
  sections?: UpdateSection[]; // grouped bullet points
};

// Add a new entry to the top of this array each time you ship a change to the app.
export const updates: UpdateEntry[] = [
  {
    date: "2026-07-22",
    version: "1.3.0",
    title: "Faster conversions and cleaner effects",
    tag: "Improved",
    sections: [
      {
        heading: "Conversion engine overhaul",
        items: [
          "Dramatically faster video conversions, so large batches finish in a fraction of the time.",
          "Conversions now use your computer's full hardware encoding capability on every run.",
          "Merged exports are assembled directly, eliminating a wasteful second encoding pass.",
          "Adding blurs or spotlights no longer meaningfully slows down conversion.",
          "Fixed conversions getting progressively slower the longer the app was open.",
          "Faster exports on computers without hardware video encoders.",
        ],
      },
      {
        heading: "Timeline and effects fixes",
        items: [
          "Effects (blurs, spotlights, text) now clear from the timeline immediately after they're burned into an export. Previously they could linger until an app restart.",
          'New "Keep for all exports" option on picture overlays: keep it checked and your logo or badge re-applies to every export automatically, or uncheck it to burn the picture once and clear it like any other effect.',
        ],
      },
      {
        heading: "Release",
        items: ["Version 1.3.0 for macOS and Windows."],
      },
    ],
  },
];
