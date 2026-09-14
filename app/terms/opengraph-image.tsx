import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Investigation Flow Terms of Service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Legal",
    title: "Terms of Service",
    subtitle:
      "The terms covering licenses, subscriptions, and your use of Investigation Flow.",
  });
}
