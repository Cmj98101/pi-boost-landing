import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow product updates";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Changelog",
    title: "What's new in Investigation Flow.",
    subtitle:
      "Every release, what changed, and why it matters for your case work.",
  });
}
