import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DemoLink from "@/components/DemoLink";

const PAGE_URL =
  "https://www.investigationflow.com/v3-video-editor-alternative";

export const metadata: Metadata = {
  title:
    "Investigation Flow vs. V3 Video Editor: The Modern Alternative",
  description:
    "Comparing Investigation Flow and V3 Video Editor for private investigators: verifiable timestamps, clip stitching, native Mac & Windows, a free in-browser demo, and flexible pricing.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Investigation Flow vs. V3 Video Editor: The Modern Alternative",
    description:
      "A side-by-side comparison of Investigation Flow and V3 Video Editor for surveillance video work: features, platforms, and pricing.",
    url: PAGE_URL,
    type: "article",
  },
};

// Honest, sourced comparison. V3 details from v3investigativesolutions.com
// (Learn More / pricing pages). Only claims that are verifiable or fairly
// framed are included.
const ROWS: { feature: string; flow: string; v3: string }[] = [
  { feature: "Verifiable timestamps", flow: "yes", v3: "yes" },
  { feature: "Stitch & order multiple clips into one sequence", flow: "yes", v3: "yes" },
  { feature: "Keep or remove audio per clip", flow: "yes", v3: "Removal only, not selective" },
  { feature: "One-click timestamped still shots", flow: "yes", v3: "Not advertised" },
  { feature: "Batch-process whole folders", flow: "yes", v3: "Not advertised" },
  { feature: "Native macOS app", flow: "yes", v3: "Not advertised, PC only" },
  { feature: "Native Windows app", flow: "yes", v3: "yes" },
  { feature: "Try free in your browser (no download)", flow: "yes", v3: "Download trial only" },
  { feature: "Move a license between computers", flow: "yes", v3: "yes" },
  { feature: "Monthly, yearly, or one-time billing", flow: "yes", v3: "Monthly only" },
  { feature: "Team volume pricing", flow: "yes", v3: "Not advertised" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the best alternative to V3 Video Editor?",
    a: "Investigation Flow is a modern alternative built for the same job: timestamping, stitching, audio control, and clean stills for surveillance footage. It adds a native macOS app, a free in-browser demo, and monthly, yearly, or one-time billing.",
  },
  {
    q: "How is Investigation Flow different from V3 Video Editor?",
    a: "Both timestamp and edit surveillance video for private investigators. The main differences: Investigation Flow runs natively on Mac and Windows, lets you try it free in the browser, and offers monthly, yearly, or one-time billing with team volume discounts. V3 Video Editor is Windows-only and billed monthly at $9.99.",
  },
  {
    q: "Does Investigation Flow work on Mac?",
    a: "Yes. Investigation Flow ships native apps for both macOS and Windows. V3 Video Editor's site only advertises PC compatibility.",
  },
  {
    q: "Can I try Investigation Flow before I buy?",
    a: "Yes. Investigation Flow offers a free, in-browser demo with no download or signup required. V3 Video Editor offers a downloadable free trial with no credit card required.",
  },
  {
    q: "How much does Investigation Flow cost compared to V3 Video Editor?",
    a: "Investigation Flow is $19.99/month, $199/year, or $299 one-time for a Version 1 lifetime license, with volume discounts for teams. V3 Video Editor is $9.99/month with no annual or one-time option advertised. V3 is cheaper month-to-month; Investigation Flow adds Mac support, a browser trial, and a way to stop paying monthly for good.",
  },
];

function Cell({ value }: { value: string }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Yes
      </span>
    );
  }
  return <span className="text-slate-500 text-sm">{value}</span>;
}

export default function V3VideoEditorAlternative() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Investigation Flow vs. <span className="gradient-text">V3 Video Editor</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Both tools timestamp and edit surveillance video for private investigators.
            Investigation Flow is the modern alternative: native <strong>Mac and Windows</strong>{" "}
            apps, a <strong>free in-browser demo</strong>, and flexible monthly, yearly, or
            one-time pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoLink
              location="comparison-hero"
              className="btn-primary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              Try the Live Demo
            </DemoLink>
            <Link
              href="/pricing"
              className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Side-by-side comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 md:p-5 font-semibold text-slate-700">Feature</th>
                  <th className="p-4 md:p-5 font-bold text-purple-700">Investigation Flow</th>
                  <th className="p-4 md:p-5 font-semibold text-slate-700">V3 Video Editor</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-4 md:p-5 text-slate-700 font-medium">{row.feature}</td>
                    <td className="p-4 md:p-5"><Cell value={row.flow} /></td>
                    <td className="p-4 md:p-5"><Cell value={row.v3} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            V3 Video Editor details sourced from v3investigativesolutions.com. Comparison last reviewed July 2026.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why investigators choose Investigation Flow
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Native Mac and Windows",
                body: "A real desktop app on both platforms, plus a free in-browser demo so you can try the workflow in seconds. No download, no signup. V3's site only advertises PC compatibility.",
              },
              {
                title: "Pricing that fits how you work",
                body: "Pay monthly, yearly, or once for a lifetime license, and get volume discounts when you outfit a team. V3 is a monthly subscription only, with no path to stop paying.",
              },
              {
                title: "Built for the whole case, not just one clip",
                body: "Batch-process entire folders of footage and pull one-click timestamped stills for reports and exhibits, all without leaving the app.",
              },
            ].map((card, i) => (
              <div key={i} className="card-luxury p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fair note about V3 */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Where V3 Video Editor may fit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              V3 Video Editor is a Windows tool built specifically for investigators, with a
              lower monthly entry price ($9.99) and a fast &quot;Lightning Export&quot; mode for
              quick turnarounds. If you only work on a single Windows machine and want the
              cheapest monthly option, it&apos;s worth a look. If you need Mac support, a browser
              trial, a way to stop paying monthly, or team pricing, Investigation Flow is the
              better fit.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((f, i) => (
              <div key={i} className="card-luxury p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{f.q}</h3>
                <p className="text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            See it for yourself
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Upload a clip and watch it get timestamped in seconds, right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoLink
              location="comparison-cta"
              className="btn-primary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              Try the Live Demo
            </DemoLink>
            <Link
              href="/pricing"
              className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
