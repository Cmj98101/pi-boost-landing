import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow vs. V3 Video Editor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "vs. V3 Video Editor",
    title: "The modern alternative to V3.",
    subtitle:
      "Verifiable timestamps, clip stitching, native Mac and Windows, and pricing that fits how you actually work.",
  });
}
