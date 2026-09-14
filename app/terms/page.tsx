import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const EFFECTIVE_DATE = "September 14, 2026";

export const metadata: Metadata = {
  title: "Terms of Service | Investigation Flow",
  description:
    "The terms governing your use of the Investigation Flow desktop application, license keys, subscriptions, and website.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Investigation Flow",
    description:
      "The terms governing your use of the Investigation Flow desktop application, license keys, and subscriptions.",
    url: "/terms",
    type: "article",
  },
};

type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

type Section = { heading: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    heading: "1. Agreement to These Terms",
    blocks: [
      {
        type: "p",
        text: `These Terms of Service ("Terms") form a binding agreement between you and Investigation Flow ("we," "our," or "us") governing your access to and use of the Investigation Flow desktop application, our website, and any related services (collectively, the "Service").`,
      },
      {
        type: "p",
        text: `By downloading, installing, activating, or using the Service, you agree to these Terms. If you are entering into these Terms on behalf of an agency, company, or other organization, you represent that you have the authority to bind that organization, and "you" refers to that organization.`,
      },
      {
        type: "p",
        text: `If you do not agree to these Terms, do not install or use the Service.`,
      },
    ],
  },
  {
    heading: "2. Eligibility",
    blocks: [
      {
        type: "p",
        text: `You must be at least 18 years old and capable of forming a binding contract to use the Service. The Service is intended for professional use by investigators, security and surveillance professionals, legal support staff, and similar users.`,
      },
    ],
  },
  {
    heading: "3. License Grant",
    blocks: [
      {
        type: "p",
        text: `Subject to your compliance with these Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to install and use the Investigation Flow desktop application for your internal business or professional purposes.`,
      },
      { type: "h3", text: "Seats and activation" },
      {
        type: "p",
        text: `Licenses are sold per computer ("seat"). Your license key activates on the number of computers covered by your purchase. You may move a license between computers at any time by deactivating a computer first. Attempting to activate more computers than your license covers will fail until a seat is freed.`,
      },
      { type: "h3", text: "What this license does not include" },
      {
        type: "ul",
        items: [
          `Reselling, renting, leasing, sublicensing, or distributing the Service or your license key to any third party.`,
          `Sharing a license key outside the organization that purchased it.`,
          `Reverse engineering, decompiling, or disassembling the application, except where that restriction is prohibited by applicable law.`,
          `Removing, obscuring, or altering any proprietary notices in the application.`,
          `Using the Service to build or train a competing product.`,
        ],
      },
    ],
  },
  {
    heading: "4. Free Trial",
    blocks: [
      {
        type: "p",
        text: `Investigation Flow includes a free trial covering your first 25 video conversions, with all features unlocked. No payment information is required to begin the trial.`,
      },
      {
        type: "p",
        text: `When the trial allowance is exhausted, a paid license is required to continue processing video. We may change or discontinue the trial at any time, but doing so will not affect a trial already in progress.`,
      },
    ],
  },
  {
    heading: "5. Plans, Billing, and Renewal",
    blocks: [
      {
        type: "p",
        text: `Investigation Flow is offered on monthly and yearly subscription plans and as a one-time Lifetime (Version 1) purchase. Current pricing is shown on our pricing page and may change from time to time.`,
      },
      { type: "h3", text: "Subscriptions" },
      {
        type: "ul",
        items: [
          `Subscriptions renew automatically at the end of each billing period at the then-current rate until cancelled.`,
          `You may cancel at any time. Cancellation stops future renewals; it does not retroactively refund the current period.`,
          `Access continues through the end of the billing period you have already paid for.`,
          `If a renewal payment fails, we may suspend access until payment is resolved.`,
        ],
      },
      { type: "h3", text: "Lifetime (Version 1)" },
      {
        type: "p",
        text: `A Lifetime (Version 1) purchase is a one-time payment that includes all Version 1 updates for the covered seat, with no recurring fee. It does not automatically include future major versions released as a separate product, which may require a new purchase or an upgrade fee.`,
      },
      { type: "h3", text: "Taxes and payment processing" },
      {
        type: "p",
        text: `Payments are processed by our third-party merchant of record, which may act as the seller of record and collect applicable sales tax or VAT. Prices are exclusive of taxes unless stated otherwise. Your purchase is also subject to that processor's terms.`,
      },
    ],
  },
  {
    heading: "6. Refunds",
    blocks: [
      {
        type: "p",
        text: `Because a free trial is available before purchase, we encourage you to confirm that Investigation Flow works with your footage and workflow before you buy.`,
      },
      {
        type: "p",
        text: `If the Service does not work as described, contact us within 30 days of your purchase and we will work with you to resolve the issue or issue a refund. Refund requests outside that window, or for a plan that has been substantially used across a full billing period, are handled at our discretion.`,
      },
      {
        type: "p",
        text: `To request a refund, email ${SITE.supportEmail} from the address associated with your purchase.`,
      },
    ],
  },
  {
    heading: "7. Your Content and Your Responsibilities",
    blocks: [
      {
        type: "p",
        text: `Investigation Flow processes video on your own computer. We do not receive, store, or have access to the footage you process, and we claim no ownership of it. Your files remain entirely yours.`,
      },
      {
        type: "p",
        text: `You are solely responsible for the footage you process and for how you use the output. You represent that you have the legal right to record, possess, process, and distribute the material you run through the Service, and that your use complies with all laws applicable to you.`,
      },
      {
        type: "p",
        text: `This includes, without limitation, surveillance and recording laws, wiretap and eavesdropping statutes, privacy and data-protection laws, evidence-handling rules, and any licensing requirements governing investigative work in your jurisdiction. We do not provide legal advice, and nothing in the Service should be taken as legal advice.`,
      },
      {
        type: "p",
        text: `You are responsible for maintaining your own backups of source footage and exported files.`,
      },
    ],
  },
  {
    heading: "8. Acceptable Use",
    blocks: [
      {
        type: "p",
        text: `You agree not to use the Service to:`,
      },
      {
        type: "ul",
        items: [
          `Violate any applicable law or regulation, including surveillance, privacy, and recording laws.`,
          `Process footage you do not have the legal right to possess or process.`,
          `Falsify, misrepresent, or knowingly apply an inaccurate timestamp in order to mislead a court, client, insurer, or any other party.`,
          `Stalk, harass, or unlawfully monitor any individual.`,
          `Circumvent licensing, activation, or usage limits in the application.`,
          `Introduce malware or otherwise interfere with the integrity of the Service.`,
        ],
      },
      {
        type: "p",
        text: `Timestamp accuracy depends on the metadata in your source files and on the information you provide. You are responsible for verifying that timestamps are correct before relying on them or submitting them as evidence.`,
      },
    ],
  },
  {
    heading: "9. Intellectual Property",
    blocks: [
      {
        type: "p",
        text: `The Service, including the application, website, documentation, and all associated trademarks, logos, designs, and content, is owned by us or our licensors and is protected by intellectual property laws. These Terms grant you a license to use the Service, not any ownership interest in it.`,
      },
      {
        type: "p",
        text: `Any feedback, suggestions, or feature requests you send us may be used without restriction and without obligation to you.`,
      },
    ],
  },
  {
    heading: "10. Third-Party Components and Services",
    blocks: [
      {
        type: "p",
        text: `The Service incorporates third-party and open-source components, and relies on third-party providers for payment processing, analytics, and hosting. Those components and services are governed by their own terms and licenses. We are not responsible for third-party services we do not control.`,
      },
    ],
  },
  {
    heading: "11. Updates and Changes to the Service",
    blocks: [
      {
        type: "p",
        text: `We may update, modify, or improve the Service over time, including adding or removing features. We may also discontinue a feature or the Service as a whole. If we discontinue the Service entirely while you hold an active paid subscription, we will provide a pro-rated refund for the unused portion of your current billing period.`,
      },
    ],
  },
  {
    heading: "12. Suspension and Termination",
    blocks: [
      {
        type: "p",
        text: `You may stop using the Service at any time and may cancel a subscription through your account or by contacting us.`,
      },
      {
        type: "p",
        text: `We may suspend or terminate your license if you materially breach these Terms, including by sharing or reselling license keys, circumventing activation limits, or using the Service unlawfully. Where practical and appropriate, we will give you notice and an opportunity to correct the problem first.`,
      },
      {
        type: "p",
        text: `On termination, your license ends and you must stop using the application. Sections that by their nature should survive termination will survive, including Sections 7 through 9 and 13 through 16.`,
      },
    ],
  },
  {
    heading: "13. Disclaimer of Warranties",
    blocks: [
      {
        type: "p",
        text: `The Service is provided "as is" and "as available," without warranties of any kind, whether express, implied, or statutory. To the fullest extent permitted by law, we disclaim all implied warranties, including merchantability, fitness for a particular purpose, title, and non-infringement.`,
      },
      {
        type: "p",
        text: `We do not warrant that the Service will be uninterrupted, error-free, or that it will meet every requirement of a particular case, court, client, or jurisdiction. You are responsible for reviewing output before relying on it.`,
      },
      {
        type: "p",
        text: `Some jurisdictions do not allow the exclusion of certain warranties, so some of these exclusions may not apply to you.`,
      },
    ],
  },
  {
    heading: "14. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: `To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, footage, business, or goodwill, arising out of or relating to your use of the Service, even if we have been advised of the possibility of such damages.`,
      },
      {
        type: "p",
        text: `To the fullest extent permitted by law, our total aggregate liability arising out of or relating to these Terms or the Service will not exceed the greater of (a) the amount you paid us for the Service in the twelve months preceding the event giving rise to the claim, or (b) fifty U.S. dollars.`,
      },
      {
        type: "p",
        text: `These limitations apply regardless of the legal theory on which a claim is based. Some jurisdictions do not allow certain limitations of liability, so some of these limitations may not apply to you.`,
      },
    ],
  },
  {
    heading: "15. Indemnification",
    blocks: [
      {
        type: "p",
        text: `You agree to indemnify and hold harmless Investigation Flow and its owners, employees, and agents from any claims, damages, liabilities, losses, and reasonable legal fees arising out of your use of the Service, the footage you process, your violation of these Terms, or your violation of any law or third-party right.`,
      },
    ],
  },
  {
    heading: "16. Governing Law and Disputes",
    blocks: [
      {
        type: "p",
        text: `These Terms are governed by the laws of the United States and the state in which Investigation Flow is established, without regard to conflict-of-laws principles.`,
      },
      {
        type: "p",
        text: `Before filing any formal claim, you agree to contact us at ${SITE.supportEmail} and attempt in good faith to resolve the dispute informally for at least 30 days. Most issues can be resolved this way.`,
      },
    ],
  },
  {
    heading: "17. Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: `We may update these Terms from time to time. When we do, we will revise the effective date at the top of this page. If a change is material, we will make reasonable efforts to notify you, such as by email or an in-app notice.`,
      },
      {
        type: "p",
        text: `Your continued use of the Service after a change takes effect constitutes acceptance of the revised Terms. If you do not agree to a change, stop using the Service and contact us about cancelling.`,
      },
    ],
  },
  {
    heading: "18. General",
    blocks: [
      {
        type: "ul",
        items: [
          `Entire agreement: These Terms, together with our Privacy Policy, are the entire agreement between you and us regarding the Service.`,
          `Severability: If any provision is found unenforceable, the rest remains in effect.`,
          `No waiver: Our failure to enforce a provision is not a waiver of our right to enforce it later.`,
          `Assignment: You may not assign these Terms without our written consent. We may assign them in connection with a merger, acquisition, or sale of assets.`,
          `Force majeure: Neither party is liable for delays caused by events beyond its reasonable control.`,
        ],
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <article className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-3xl px-6 md:px-12">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="mt-4 text-slate-500">Effective Date: {EFFECTIVE_DATE}</p>

          {SECTIONS.map((section, i) => (
            <section key={i} className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, j) => {
                  if (block.type === "h3") {
                    return (
                      <h3
                        key={j}
                        className="mt-6 text-lg font-semibold text-slate-900"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "ul") {
                    return (
                      <ul
                        key={j}
                        className="list-disc space-y-2 pl-6 text-slate-600"
                      >
                        {block.items.map((item, k) => (
                          <li key={k} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={j} className="leading-relaxed text-slate-600">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">19. Contact Us</h2>
            <div className="mt-4 space-y-4">
              <p className="leading-relaxed text-slate-600">
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-900">
                  Investigation Flow
                </span>
                <br />
                Email:{" "}
                <a
                  href={`mailto:${SITE.legalEmail}`}
                  className="font-semibold text-purple-600 hover:text-purple-700"
                >
                  {SITE.legalEmail}
                </a>
              </p>
              <p className="leading-relaxed text-slate-600">
                See also our{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-purple-600 hover:text-purple-700"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
