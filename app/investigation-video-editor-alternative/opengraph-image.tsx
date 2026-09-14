import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow vs. Investigation Video Editor (IVE)";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "vs. IVE",
    title: "The modern alternative to IVE.",
    subtitle:
      "Verifiable timestamps, clip stitching, transferable licenses, and native Mac and Windows support.",
  });
}
