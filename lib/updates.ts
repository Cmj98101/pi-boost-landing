export type UpdateEntry = {
  date: string; // ISO date, e.g. "2026-07-08"
  title: string;
  body: string;
  tag: "New" | "Improved" | "Fixed";
};

// Add a new entry to the top of this array each time you ship a change to the app.
export const updates: UpdateEntry[] = [];
