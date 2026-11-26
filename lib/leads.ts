/**
 * Lead capture: the free Surveillance Report Kit and the waitlist for the new
 * reporting app. Both go to Brevo, one list each (see BREVO_SETUP.md).
 */

// The lists a signup form can target. The API route maps each one to a Brevo
// list ID from the environment, so list IDs never reach the browser.
export const LEAD_LISTS = ["report-kit", "waitlist", "discount"] as const;
export type LeadList = (typeof LEAD_LISTS)[number];

export const REPORT_KIT = {
  path: "/surveillance-report-template",
  // Regenerate from lead-magnet/surveillance-report-kit.html (see BREVO_SETUP.md).
  downloadUrl: "/downloads/surveillance-report-kit.pdf",
  title: "The Surveillance Report Kit",
};

// Email-for-a-discount popup on the homepage. One code works on any plan's first
// payment (Monthly, Yearly, Lifetime). The code itself lives in Lemon Squeezy and
// is sent only by email, never shown on the site. If you change the percent,
// change the Lemon Squeezy code and the email too.
export const DISCOUNT_OFFER = {
  percent: 20,
};

export const WAITLIST = {
  path: "/waitlist",
  // Placeholder name for the new app. Change it here and every page follows.
  productName: "Investigation Flow Reports",
};

// Required "which describes you" question on the waitlist. Stored on the Brevo
// contact as the ROLE attribute so you can email agencies and solo investigators
// differently. "Other" asks for a short description, saved as "Other: <text>".
export const OTHER_ROLE = "Other";
export const ROLES = [
  "Solo investigator",
  "Investigator at an agency",
  "Agency owner or manager",
  OTHER_ROLE,
] as const;
