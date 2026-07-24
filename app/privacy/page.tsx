import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const EFFECTIVE_DATE = "July 24, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | Investigation Flow",
  description:
    "How Investigation Flow handles information across the desktop app and marketing website. The desktop app collects no personal data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Investigation Flow",
    description:
      "How Investigation Flow handles information across the desktop app and marketing website.",
    url: "/privacy",
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
    heading: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: `Welcome to Investigation Flow ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we handle information in connection with your use of the Investigation Flow desktop application, our marketing website, and any related services (collectively, the "Service").`,
      },
      {
        type: "p",
        text: `By using the Service, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of the Service.`,
      },
    ],
  },
  {
    heading: "2. Scope: Application vs. Website",
    blocks: [
      {
        type: "p",
        text: `This Policy covers two distinct surfaces, and the data practices differ between them:`,
      },
      {
        type: "ul",
        items: [
          `Desktop Application: the Investigation Flow software you install and run on your computer. The app itself collects no personal data and transmits nothing to our servers.`,
          `Marketing Website: the public website we use to describe and sell Investigation Flow. The website uses analytics tools to help us understand how visitors interact with our pages.`,
        ],
      },
      {
        type: "p",
        text: `Important: Google Analytics and PostHog are used exclusively on our marketing website. They are not present in the desktop application and have no access to anything you do inside the app.`,
      },
    ],
  },
  {
    heading: "3. Information We Do Not Collect",
    blocks: [
      {
        type: "p",
        text: `Within the desktop application, Investigation Flow does not collect, process, or store any personal data. Specifically, the app does not collect:`,
      },
      {
        type: "ul",
        items: [
          `Usage data, analytics, or behavioral information`,
          `Device identifiers or hardware information`,
          `Location data`,
          `In-app content, notes, case files, or other data you create`,
          `Any information beyond what is strictly required to process your purchase`,
        ],
      },
      {
        type: "p",
        text: `Your in-app activity stays entirely on your device and is never transmitted to our servers.`,
      },
    ],
  },
  {
    heading: "4. Information We Do Collect",
    blocks: [
      { type: "h3", text: "4.1 Email Address" },
      {
        type: "p",
        text: `When you make a purchase, whether a one-time payment or a subscription, your email address is collected as part of the payment process. This is the only personal information we collect from customers.`,
      },
      { type: "h3", text: "4.2 Payment Processing" },
      {
        type: "p",
        text: `We use third-party payment processors to handle all transactions. Those processors may collect billing information (such as credit card details and billing address) directly from you. We do not receive, store, or have access to your full payment card details. Please review the privacy policy of the relevant payment processor for details on how they handle your financial data.`,
      },
      { type: "h3", text: "4.3 Website Analytics (Google Analytics & PostHog)" },
      {
        type: "p",
        text: `Our marketing website uses Google Analytics and PostHog to collect anonymized, aggregated information about how visitors interact with our website pages. This may include:`,
      },
      {
        type: "ul",
        items: [
          `Pages visited and time spent on each page`,
          `Referring website or search terms that brought you to our site`,
          `General geographic region (country or city level, not precise location)`,
          `Browser type, operating system, and device category`,
          `Clicks, scrolls, and other on-page interactions (via PostHog)`,
        ],
      },
      {
        type: "p",
        text: `This data is used solely to improve our website and marketing. It is not linked to your identity, your email address, or your use of the desktop application.`,
      },
      {
        type: "p",
        text: `You can opt out of Google Analytics across all websites by installing the Google Analytics Opt-out Browser Add-on (available at tools.google.com/dlpage/gaoptout). PostHog analytics can be blocked via standard browser privacy extensions or by enabling "Do Not Track" in your browser settings.`,
      },
      {
        type: "p",
        text: `For more information on how these tools handle data, please review the Google Analytics Privacy Policy and the PostHog Privacy Policy.`,
      },
    ],
  },
  {
    heading: "5. How We Use Your Information",
    blocks: [
      { type: "p", text: `We use the information we collect for the following purposes:` },
      {
        type: "ul",
        items: [
          `To process payments and deliver access to the Service`,
          `To send transactional emails (purchase confirmations, receipts, subscription renewal notices)`,
          `To send marketing emails about Investigation Flow features, updates, and offers`,
          `To provide customer support when you contact us`,
          `To analyze aggregated, anonymized website traffic and improve our marketing site`,
        ],
      },
      {
        type: "p",
        text: `You may opt out of marketing emails at any time by clicking the unsubscribe link in any marketing message, or by contacting us directly. Transactional emails cannot be opted out of while your account remains active.`,
      },
    ],
  },
  {
    heading: "6. Data Storage",
    blocks: [
      {
        type: "p",
        text: `We do not operate our own user-data databases. Your email address is held only within the systems of our payment processor and email service provider(s). Website analytics data is stored within the Google Analytics and PostHog platforms, subject to their respective data retention policies.`,
      },
    ],
  },
  {
    heading: "7. Data Sharing and Disclosure",
    blocks: [
      {
        type: "p",
        text: `We do not sell, rent, trade, or otherwise share your email address or any personal information with third parties for their own marketing or commercial purposes.`,
      },
      { type: "p", text: `We may share information only in the following limited circumstances:` },
      {
        type: "ul",
        items: [
          `Service Providers: We may share your email with trusted service providers (e.g., payment processors, email delivery platforms) who assist in operating the Service. These providers are contractually required to use your information solely on our behalf.`,
          `Analytics Platforms: Aggregated, anonymized website usage data is processed by Google Analytics and PostHog as described in Section 4.3. This data is not linked to your identity.`,
          `Legal Requirements: We may disclose information if required by law, court order, or governmental authority, or when disclosure is necessary in good faith to protect our rights or the safety of others.`,
        ],
      },
    ],
  },
  {
    heading: "8. Subscriptions and One-Time Payments",
    blocks: [
      {
        type: "p",
        text: `Investigation Flow offers both subscription-based plans and one-time purchase options. Regardless of which you choose, the same data practices apply: we collect only your email address and do not retain any additional personal information on our own systems.`,
      },
      {
        type: "p",
        text: `If you hold an active subscription, your email may be used to send renewal notices, billing alerts, and related service communications.`,
      },
    ],
  },
  {
    heading: "9. Data Retention",
    blocks: [
      {
        type: "p",
        text: `We retain your email address for as long as necessary to fulfil the purposes described in this Privacy Policy, including for the duration of your subscription or licence, and for a reasonable period thereafter to comply with legal obligations or resolve disputes.`,
      },
      {
        type: "p",
        text: `To request deletion of your email address from our records, please contact us using the details in Section 15. We will honour your request subject to any applicable legal retention requirements.`,
      },
    ],
  },
  {
    heading: "10. Security",
    blocks: [
      {
        type: "p",
        text: `We take reasonable technical and organisational measures to protect the limited information we hold against unauthorised access, loss, or disclosure. However, no method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.`,
      },
    ],
  },
  {
    heading: "11. Children's Privacy",
    blocks: [
      {
        type: "p",
        text: `The Service is not directed to children under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.`,
      },
    ],
  },
  {
    heading: "12. Rights of EU/EEA Users (GDPR)",
    blocks: [
      {
        type: "p",
        text: `If you are located in the European Union or European Economic Area, the General Data Protection Regulation (GDPR) provides you with specific rights regarding your personal data. This section describes those rights and how to exercise them.`,
      },
      { type: "h3", text: "12.1 Legal Basis for Processing" },
      { type: "p", text: `We process your personal data on the following legal bases:` },
      {
        type: "ul",
        items: [
          `Contractual necessity: Processing your email address is necessary to fulfil your purchase and deliver the Service.`,
          `Legitimate interests: Sending marketing communications about our own products where you have a reasonable expectation of receiving them as a customer. You may object at any time.`,
          `Consent: Where required by applicable law, we will obtain your consent before sending marketing emails.`,
        ],
      },
      { type: "h3", text: "12.2 Your GDPR Rights" },
      { type: "p", text: `Under the GDPR, you have the right to:` },
      {
        type: "ul",
        items: [
          `Access: request a copy of the personal data we hold about you`,
          `Rectification: request correction of inaccurate or incomplete data`,
          `Erasure ('Right to be Forgotten'): request deletion of your personal data where there is no overriding legal reason for us to retain it`,
          `Restriction: request that we limit the processing of your data in certain circumstances`,
          `Data Portability: receive your personal data in a structured, machine-readable format`,
          `Objection: object to processing based on legitimate interests, including direct marketing`,
          `Withdraw Consent: where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing`,
        ],
      },
      { type: "h3", text: "12.3 International Data Transfers" },
      {
        type: "p",
        text: `Our service providers, including payment processors and analytics platforms, may process data in the United States or other countries outside the EU/EEA. Where such transfers occur, we rely on appropriate safeguards (such as Standard Contractual Clauses) to ensure your data is protected to EU standards.`,
      },
      { type: "h3", text: "12.4 Right to Lodge a Complaint" },
      {
        type: "p",
        text: `You have the right to lodge a complaint with your local data protection authority if you believe we have not handled your personal data in accordance with applicable law.`,
      },
      {
        type: "p",
        text: `To exercise any of your GDPR rights, please contact us at ${SITE.legalEmail}. We will respond within 30 days.`,
      },
    ],
  },
  {
    heading: "13. Rights of California Residents (CCPA/CPRA)",
    blocks: [
      {
        type: "p",
        text: `If you are a California resident, the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA) grants you additional rights regarding your personal information. This section describes those rights.`,
      },
      { type: "h3", text: "13.1 Categories of Personal Information Collected" },
      {
        type: "p",
        text: `In the past 12 months, we have collected the following categories of personal information from California consumers:`,
      },
      {
        type: "ul",
        items: [
          `Identifiers: Email address (collected at point of purchase)`,
          `Internet or other electronic network activity: Anonymized website usage data via Google Analytics and PostHog (not linked to your identity)`,
          `Commercial information: Records of products purchased`,
        ],
      },
      {
        type: "p",
        text: `We do not sell or share your personal information with third parties for cross-context behavioral advertising purposes.`,
      },
      { type: "h3", text: "13.2 Your CCPA/CPRA Rights" },
      { type: "p", text: `As a California resident, you have the right to:` },
      {
        type: "ul",
        items: [
          `Know: request disclosure of the categories and specific pieces of personal information we have collected about you, the sources of that information, the purposes for which it is used, and the categories of third parties with whom it is shared`,
          `Delete: request deletion of personal information we have collected from you, subject to certain exceptions`,
          `Correct: request correction of inaccurate personal information`,
          `Opt Out of Sale/Sharing: we do not sell or share personal information as defined under the CCPA/CPRA, so this right is not currently applicable`,
          `Limit Use of Sensitive Personal Information: we do not collect sensitive personal information as defined under the CPRA`,
          `Non-Discrimination: we will not discriminate against you for exercising any of your CCPA/CPRA rights`,
        ],
      },
      { type: "h3", text: "13.3 How to Submit a Request" },
      {
        type: "p",
        text: `To exercise your rights under the CCPA/CPRA, please contact us at ${SITE.legalEmail} with the subject line "California Privacy Request." We will verify your identity before processing your request and will respond within 45 days. If we need additional time, we will notify you.`,
      },
      { type: "h3", text: "13.4 Authorized Agent" },
      {
        type: "p",
        text: `You may designate an authorized agent to submit a request on your behalf. We will require written authorization and may verify your identity directly before processing the request.`,
      },
    ],
  },
  {
    heading: "14. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: `We may update this Privacy Policy from time to time. When we do, we will revise the Effective Date at the top of this document. If changes are material, we will notify you via email. Your continued use of the Service after any update constitutes acceptance of the revised Policy.`,
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <article className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-3xl px-6 md:px-12">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Privacy <span className="gradient-text">Policy</span>
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

          {/* 15. Contact Us */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">15. Contact Us</h2>
            <div className="mt-4 space-y-4">
              <p className="leading-relaxed text-slate-600">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us at:
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
            </div>
          </section>

          <p className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500">
            © 2026 Investigation Flow. All rights reserved.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
