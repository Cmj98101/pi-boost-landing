import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow tutorials";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Tutorials",
    title: "Learn Investigation Flow.",
    subtitle:
      "Short, practical walkthroughs for timestamping, stitching, and delivering surveillance footage.",
  });
}
