import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Download Investigation Flow for Windows and Mac";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Free trial",
    title: "Download Investigation Flow.",
    subtitle:
      "Windows and Mac. Your first 25 video conversions are free, with every feature unlocked.",
  });
}
