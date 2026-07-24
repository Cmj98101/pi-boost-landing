/**
 * Central brand + site configuration.
 *
 * Everything here is app-specific. When reusing this site for another product,
 * this is the first file to change: update these values (plus the logo, favicon,
 * and theme colors) and the page metadata, sitemap, robots, structured data, and
 * contact links all update from here.
 */
export const SITE = {
  name: "Investigation Flow",
  // Canonical production URL. No trailing slash.
  url: "https://www.investigationflow.com",
  description:
    "Professional video timestamping software for private investigators and surveillance professionals.",
  supportEmail: "support@investigationflow.com",
  // Contact for privacy/legal requests (GDPR, CCPA, deletion).
  legalEmail: "chris@investigationflow.com",
  // Wordmark logo in /public, used in the nav and Organization schema.
  logo: "/logo-full.png",
  // daisyUI theme name applied on <html data-theme>.
  theme: "investigationflow",
  // Lemon Squeezy store slug for affiliate tracking and checkout.
  lemonSqueezyStore: "investigationflow",
} as const;

// Build an absolute URL from a site-relative path, e.g. absoluteUrl("/learn").
export function absoluteUrl(path = ""): string {
  return `${SITE.url}${path}`;
}
