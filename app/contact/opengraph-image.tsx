import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact Investigation Flow";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: "Talk to a human.",
    subtitle:
      "Questions about licensing, volume pricing, or whether Investigation Flow fits your workflow.",
  });
}
