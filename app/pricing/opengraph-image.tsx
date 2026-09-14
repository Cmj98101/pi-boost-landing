import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow pricing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Pricing",
    title: "One tool. Every case file, timestamped.",
    subtitle:
      "Monthly, yearly, or a one-time lifetime license. Volume pricing for agencies, and a free trial before you buy.",
  });
}
