/**
 * Homepage FAQ content.
 *
 * Kept as plain data (no JSX) so it can be used in two places at once: the
 * <FAQ /> accordion, and the FAQPage structured data emitted on the homepage.
 * Editing a question here updates both, so the visible markup and the schema
 * can't drift apart - which is exactly the mismatch Google penalises.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Can I timestamp videos in batch?",
    answer:
      "Yes! Investigation Flow supports both individual video timestamping and batch processing. You can process entire folders of surveillance footage with just a few clicks, saving you hours of work.",
  },
  {
    question: "What video formats are supported?",
    answer:
      "Investigation Flow supports all common video formats including MP4, MOV, AVI, WMV, and more. You can export your timestamped videos in MP4 format, which is universally compatible with clients and case files.",
  },
  {
    question: "Is Investigation Flow available for both Mac and Windows?",
    answer:
      "Yes! Investigation Flow is available as a native application for both macOS and Windows. You'll get the same features and performance on both platforms.",
  },
  {
    question: "Can I customize the timestamp format?",
    answer:
      "Absolutely. Investigation Flow offers extensive customization options including timestamp format (date/time styles), position on screen, font size, color, and more. You can also edit timestamps after they've been added.",
  },
  {
    question: "Can I stitch clips together and pull still shots?",
    answer:
      "Yes. You can stitch multiple surveillance clips into one logical, chronological sequence, keep or remove the audio on each clip, and grab clean still shots straight from the footage you're editing, all without a separate editor.",
  },
  {
    question: "Can I use my license on more than one computer?",
    answer:
      "Each license runs on one computer at a time. You can move a license to a different computer whenever you need to: just deactivate the license key on the old machine, then activate it on the new one. To run Investigation Flow on multiple computers at the same time, you'll need a license for each.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees. If you cancel, you'll retain access until the end of your billing period.",
  },
];
