/**
 * The comparison ("X alternative") pages, in one place.
 *
 * Used to cross-link the pages to each other and to build their breadcrumb
 * schema. Before this existed each comparison page had exactly one inbound
 * internal link - the footer - so none of them accrued any internal authority.
 * Adding a new comparison page here wires it into every sibling automatically.
 */

export interface Comparison {
  slug: string;
  /** Short name of the product being compared against. */
  competitor: string;
  /** One line on why someone would switch, shown on sibling pages. */
  blurb: string;
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "investigation-video-editor-alternative",
    competitor: "Investigation Video Editor (IVE)",
    blurb:
      "Transferable licenses, native Mac and Windows builds, and a free trial.",
  },
  {
    slug: "v3-video-editor-alternative",
    competitor: "V3 Video Editor",
    blurb:
      "The same case workflow with modern pricing and no Windows-only requirement.",
  },
  {
    slug: "imovie-alternative",
    competitor: "iMovie",
    blurb:
      "Automatic verifiable timestamps instead of hand-placed title overlays.",
  },
  {
    slug: "wondershare-alternative",
    competitor: "Wondershare UniConverter",
    blurb:
      "A surveillance case workflow rather than a general conversion toolbox.",
  },
];

export function otherComparisons(currentSlug: string): Comparison[] {
  return COMPARISONS.filter((c) => c.slug !== currentSlug);
}

export function comparisonFor(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
