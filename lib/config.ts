/**
 * Site-wide configuration for launch vs early access modes
 * Toggle between waitlist and full launch by changing the mode
 */

export type SiteMode = "early-access" | "launch";

export const SITE_CONFIG = {
  mode: "early-access" as SiteMode,

  // Live, in-browser demo of the timestamping tool
  demoUrl: "https://timestamp.investigationflow.com",

  // Desktop app downloads. Flip a platform to `true` once its PUBLIC download
  // URL is set (NEXT_PUBLIC_MACOS_DOWNLOAD_URL / NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL).
  // Buttons link to /download/mac and /download/windows, which redirect to those URLs.
  download: {
    macAvailable: true,
    windowsAvailable: true,
    macLabel: "Download for Mac",
    windowsLabel: "Download for Windows",
  },

  // Feature flags
  showFullTestimonials: false, // Can add more testimonials for launch

  // Hero section content
  hero: {
    "early-access": {
      badge: "Now in Early Access: Join the Founding Users",
      headline: "Timestamp your surveillance videos in minutes.",
      subheadline:
        "Timestamp, stitch clips in order, toggle audio, and grab stills, without fighting a general video editor. Download the app and try it free on your own footage.",
      cta: {
        primary: "Download Free Trial",
        secondary: "See How It Works",
      },
    },
    launch: {
      badge: "Built for Private Investigators: Windows & Mac",
      headline:
        "Timestamp, Stitch & Deliver Court-Ready Surveillance Videos in Minutes, Not Hours",
      subheadline:
        "Add accurate timestamps, stitch clips into one logical sequence, keep or remove audio, and pull court-ready stills, all in one tool built for surveillance work, not Hollywood.",
      cta: {
        primary: "Download Free Trial",
        secondary: "See How It Works",
      },
    },
  },

  // CTA section content
  cta: {
    "early-access": {
      headline: "See It For Yourself",
      subheadline:
        "Download the app and run your own clips through it. Timestamp, stitch, and export court-ready video in minutes.",
      benefits: [
        "Free trial: first 25 conversions on us",
        "Timestamp · Stitch · Audio · Stills",
        "Founding-user pricing at launch",
        "Built with working investigators",
      ],
      buttonText: "Download Free Trial",
      badge: "Free Trial: 25 Conversions Free",
      stats: [
        { value: "Win/Mac", label: "Native Windows & Mac App" },
        { value: "4 Tools", label: "Timestamp · Stitch · Audio · Stills" },
        { value: "Minutes", label: "From Footage to Court-Ready" },
      ],
    },
    launch: {
      headline: "Ready to Turn Footage Into Evidence?",
      subheadline:
        "Stop fighting general video editors. Do timestamping, stitching, audio, and stills in one tool built for investigators.",
      benefits: [
        "Install on Windows or Mac in minutes",
        "Process your first case today",
        "Cancel anytime, no questions asked",
        "Free trial included",
      ],
      buttonText: "Download Free Trial",
      badge: null,
      stats: [
        { value: "$19.99", label: "Starting Per Month" },
        { value: "$299", label: "One-Time License Option" },
        { value: "Win/Mac", label: "Native Desktop App" },
      ],
    },
  },

  // Email capture modal content
  emailCapture: {
    "early-access": {
      title: "Join the Waitlist",
      subtitle: "Become a founding user and shape the product",
      features: [
        "Exclusive early access (limited to 50 investigators)",
        "Priority email support from our founding team",
        "Exclusive founding user community",
        "Your feedback directly shapes our roadmap",
      ],
      buttonText: "Join Waitlist",
      successMessage:
        "Welcome to the founding user community! Check your email for next steps.",
      footerText: "🔒 No spam. Unsubscribe anytime. Limited to first 50 users.",
    },
    launch: {
      title: "Get Early Access",
      subtitle: "Join the waitlist for exclusive launch pricing",
      features: [
        "Free trial: 25 video conversions included",
        "Email support",
        "Access to all features",
        "Cancel anytime",
      ],
      buttonText: "Join Waitlist",
      successMessage: "Thank you! We'll notify you when we launch.",
      footerText: "🔒 No spam. Unsubscribe anytime. Free trial included.",
    },
  },

  // Pricing options (single product, multiple billing options)
  pricing: {
    productName: "Investigation Flow",
    productTagline: "Surveillance video, court-ready in minutes.",
    trialBanner: {
      text: "Not ready to buy? Download the app and try it free. Your first 25 video conversions are on us, every feature unlocked.",
      linkText: "Download the free trial",
      href: "/download",
    },
    features: [
      "Court-ready timestamps",
      "Stitch clips in order",
      "Keep or remove audio",
      "One-click still shots",
      "Batch process folders",
      "Windows & Mac",
    ],
    options: [
      {
        id: "monthly",
        name: "Monthly",
        price: 19.99,
        period: "/month",
        description: "Flexible month-to-month billing",
        support: "Priority email support + all updates",
        highlighted: false,
      },
      {
        id: "yearly",
        name: "Yearly",
        price: 199,
        period: "/year",
        description: "Save ~17% vs. monthly (~$16.58/mo)",
        support: "Priority email support + all updates",
        highlighted: true,
        badge: "BEST VALUE",
      },
      {
        id: "lifetime",
        name: "Lifetime (V1)",
        price: 299,
        period: "one-time",
        description: "One device · all Version 1 updates included",
        support: "Email support",
        highlighted: false,
      },
    ],
    // Volume pricing for agencies. The buyer picks how many computers they
    // need; the per-seat price drops at the tier thresholds (matching the
    // native Lemon Squeezy volume pricing on each variant). One license key
    // covers all the computers they buy. `upTo` is the inclusive max seat
    // count for a tier; `null` means "and up". Tiers must be in ascending order.
    team: {
      headline: "Outfit your whole team",
      subheadline:
        "Pick how many computers you need. The more seats, the lower the price per seat.",
      keyExplanation:
        "You get one license key that activates on every computer you buy. Move it between machines anytime by deactivating a computer first.",
      minSeats: 1,
      maxSeats: 50,
      defaultSeats: 5,
      // Shown as a third tab for buyers who need more than maxSeats.
      contact: {
        label: "50+ seats",
        headline: "Need more than 50 computers?",
        body: "Tell us how many seats you need and we'll set you up with custom volume pricing for your agency or department.",
        buttonText: "Contact us",
        email: "support@investigationflow.com",
      },
      plans: {
        yearly: {
          id: "team-yearly",
          label: "Yearly",
          unitSuffix: "/seat/yr",
          totalSuffix: "/yr",
          tiers: [
            { upTo: 3, price: 199 },
            { upTo: 6, price: 169 },
            { upTo: null, price: 149 },
          ],
        },
        monthly: {
          id: "team-monthly",
          label: "Monthly",
          unitSuffix: "/seat/mo",
          totalSuffix: "/mo",
          tiers: [
            { upTo: 3, price: 19.99 },
            { upTo: 6, price: 16.99 },
            { upTo: null, price: 14.99 },
          ],
        },
      },
    },
  },
} as const;

// Helper function to get current mode config
export function getConfig<T extends keyof typeof SITE_CONFIG>(key: T) {
  return SITE_CONFIG[key];
}

// Helper to get mode-specific content
export function getModeContent<
  T extends keyof Omit<
    typeof SITE_CONFIG,
    "mode" | "demoUrl" | "showFullTestimonials" | "pricing" | "download"
  >,
>(section: T): (typeof SITE_CONFIG)[T][SiteMode] {
  const mode = SITE_CONFIG.mode;
  const content = SITE_CONFIG[section];

  if (typeof content === "object" && content !== null && mode in content) {
    return content[mode as keyof typeof content] as any;
  }

  return content as any;
}
