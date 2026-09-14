import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow vs. Wondershare UniConverter";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "vs. Wondershare",
    title: "A converter toolbox isn't a case workflow.",
    subtitle:
      "Verifiable timestamps, whole-case stitching, and batch processing built around surveillance footage.",
  });
}
