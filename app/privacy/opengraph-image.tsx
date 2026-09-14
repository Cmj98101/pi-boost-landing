import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow Privacy Policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Legal",
    title: "Your footage never leaves your computer.",
    subtitle:
      "The desktop app collects no personal data and transmits nothing to our servers.",
  });
}
