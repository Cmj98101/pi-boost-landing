import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow vs. iMovie";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "vs. iMovie",
    title: "Built for case work, not home movies.",
    subtitle:
      "Verifiable timestamps, whole-case stitching, and batch processing - the things a consumer editor was never meant to do.",
  });
}
