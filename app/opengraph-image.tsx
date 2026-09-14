import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "Investigation Flow - timestamp your surveillance videos in minutes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: "Timestamp your surveillance videos in minutes.",
    subtitle:
      "Timestamp, stitch clips in order, toggle audio, and grab stills - without fighting a general video editor.",
  });
}
