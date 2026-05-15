/**
 * Site-wide configuration for launch vs early access modes
 * Toggle between waitlist and full launch by changing the mode
 */

export type SiteMode = "early-access" | "launch";

export const SITE_CONFIG = {
  mode: "early-access" as SiteMode,

  // Feature flags
  showPricing: false, // Set to true for launch
  showFullTestimonials: false, // Can add more testimonials for launch

  // Hero section content
  hero: {
    "early-access": {
      badge: "Limited Early Access - Join Our Founding Users",
      headline: "Video Time-Stamping Simplified for Private Investigators",
      subheadline:
        "Join our exclusive waitlist and help us build the perfect tool for investigators while getting your videos court-ready.",
      cta: {
        primary: "Join Waitlist",
        secondary: "See How It Works",
      },
    },
    launch: {
      badge: "Launching Soon - Join the Waitlist",
      headline: "Video Time-Stamping Simplified for Private Investigators",
      subheadline:
        "Correct timestamp errors, perfect video conversion, customize timestamp appearance and location - Simplified.",
      cta: {
        primary: "Get Early Access",
        secondary: "See How It Works",
      },
    },
  },

  // CTA section content
  cta: {
    "early-access": {
      headline: "Ready to Become a Founding User?",
      subheadline:
        "Join our exclusive waitlist. Your feedback shapes the product.",
      benefits: [
        "Direct line to our founding team",
        "Shape the product roadmap",
        "First access to new features",
        "Priority support",
      ],
      buttonText: "Join Waitlist",
      badge: "Limited to First 50 Investigators",
      stats: [
        { value: "Early", label: "Exclusive Early Access" },
        { value: "50", label: "Limited Spots Available" },
        { value: "24/7", label: "Direct Access to Founders" },
      ],
    },
    launch: {
      headline: "Ready to Transform Your Video Workflow?",
      subheadline:
        "Join hundreds of investigators already saving hours per case.",
      benefits: [
        "Set up in 60 seconds",
        "Process your first video today",
        "Cancel anytime, no questions asked",
        "7-day free trial included",
      ],
      buttonText: "Start Free Trial",
      badge: null,
      stats: [
        { value: "$9.99", label: "Starting at Per Month" },
        { value: "7 Days", label: "Free Trial Included" },
        { value: "First 100", label: "Get 50% Off First Month" },
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
        "7-day free trial included",
        "Email support",
        "Access to all features",
        "Cancel anytime",
      ],
      buttonText: "Join Waitlist",
      successMessage: "Thank you! We'll notify you when we launch.",
      footerText: "🔒 No spam. Unsubscribe anytime. 7-day free trial included.",
    },
  },

  // Pricing options (single product, multiple billing options)
  pricing: {
    productName: "Investigation Flow",
    productTagline: "Video Timestamping for Investigators",
    features: [
      "Convert videos to MP4",
      "Add or correct timestamps",
      "Remove audio track",
      "Recover original recording time",
      "Court-ready video output",
    ],
    options: [
      {
        id: "monthly",
        name: "Monthly",
        price: 9.99,
        period: "/month",
        description: "Flexible monthly billing",
        support: "Priority support + all updates",
        highlighted: false,
      },
      {
        id: "yearly",
        name: "Yearly",
        price: 79.99,
        period: "/year",
        description: "Save 33% with annual billing",
        support: "Priority support + all updates",
        highlighted: true,
        badge: "BEST VALUE",
      },
      {
        id: "single-use",
        name: "Single Use",
        price: 59.99,
        period: "one-time",
        description: "One license key, one installation",
        support: "Community support",
        highlighted: false,
      },
    ],
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
    "mode" | "showPricing" | "showFullTestimonials" | "pricing"
  >
>(section: T): (typeof SITE_CONFIG)[T][SiteMode] {
  const mode = SITE_CONFIG.mode;
  const content = SITE_CONFIG[section];

  if (typeof content === "object" && content !== null && mode in content) {
    return content[mode as keyof typeof content] as any;
  }

  return content as any;
}
