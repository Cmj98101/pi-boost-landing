import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DemoLink from "@/components/DemoLink";

const PAGE_URL =
  "https://www.investigationflow.com/investigation-video-editor-alternative";

export const metadata: Metadata = {
  title:
    "Investigation Flow vs. Investigation Video Editor (IVE): The Modern Alternative",
  description:
    "Comparing Investigation Flow and IVE (Investigation Video Editor) for private investigators: verifiable timestamps, clip stitching, transferable licenses, native Mac & Windows, a free in-browser demo, and flexible pricing.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Investigation Flow vs. Investigation Video Editor (IVE): The Modern Alternative",
    description:
      "A side-by-side comparison of Investigation Flow and IVE for surveillance video work: features, licensing, platforms, and pricing.",
    url: PAGE_URL,
    type: "article",
  },
};

// Honest, sourced comparison. IVE details from investigationve.com (features
// + buy pages). Only claims that are verifiable or fairly framed are included.
const ROWS: { feature: string; flow: string; ive: string }[] = [
  { feature: "Verifiable timestamps", flow: "yes", ive: "yes" },
  { feature: "Stitch & order multiple clips into one sequence", flow: "yes", ive: "yes" },
  { feature: "Keep or remove audio per clip", flow: "yes", ive: "yes" },
  { feature: "One-click timestamped still shots", flow: "yes", ive: "yes" },
  { feature: "Batch-process whole folders", flow: "yes", ive: "Not advertised" },
  { feature: "Native macOS app", flow: "yes", ive: "Not advertised" },
  { feature: "Native Windows app", flow: "yes", ive: "yes" },
  { feature: "Try free in your browser (no download)", flow: "yes", ive: "Download trial only" },
  { feature: "Move a license between computers (deactivate & reactivate)", flow: "yes", ive: "No, keys are non-transferable" },
  { feature: "Monthly, yearly, or one-time billing", flow: "yes", ive: "One-time only" },
  { feature: "Team volume pricing", flow: "yes", ive: "Per-key, up to 3" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the best alternative to Investigation Video Editor (IVE)?",
    a: "Investigation Flow is a modern alternative built for the same job: timestamping, stitching, audio control, and clean stills for surveillance footage. It adds native macOS and Windows apps, a free in-browser demo, and licenses you can move between computers.",
  },
  {
    q: "How is Investigation Flow different from IVE?",
    a: "Both timestamp and edit surveillance video for private investigators. The main differences: Investigation Flow runs natively on Mac and Windows, lets you try it free in the browser, offers monthly, yearly, or one-time billing with team volume discounts, and its license is transferable between machines. IVE is a one-time Windows purchase whose keys are locked to a single computer.",
  },
  {
    q: "Can I move my Investigation Flow license to a new computer?",
    a: "Yes. Each license runs on one computer at a time, but you can move it by deactivating the key on the old machine and activating it on the new one. IVE states its keys are non-transferable and a computer crash may require repurchasing a key.",
  },
  {
    q: "Does Investigation Flow work on Mac?",
    a: "Yes. Investigation Flow ships native apps for both macOS and Windows. IVE does not advertise a macOS version.",
  },
  {
    q: "How much does Investigation Flow cost compared to IVE?",
    a: "Investigation Flow is $19.99/month, $199/year, or $299 one-time for a Version 1 lifetime license, with volume discounts for teams. IVE is a one-time purchase from $69.99 (1 computer) to $129.99 (3 computers). IVE is cheaper up front; Investigation Flow adds cross-platform apps, transferable licenses, flexible billing, and a browser trial.",
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

export default function InvestigationVideoEditorAlternative() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Investigation Flow vs. <span className="gradient-text">Investigation Video Editor (IVE)</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Both tools timestamp and edit surveillance video for private investigators.
            Investigation Flow is the modern alternative: native <strong>Mac and Windows</strong>{" "}
            apps, a <strong>free in-browser demo</strong>, licenses you can <strong>move between
            computers</strong>, and flexible monthly, yearly, or one-time pricing.
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
                  <th className="p-4 md:p-5 font-semibold text-slate-700">IVE</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-4 md:p-5 text-slate-700 font-medium">{row.feature}</td>
                    <td className="p-4 md:p-5"><Cell value={row.flow} /></td>
                    <td className="p-4 md:p-5"><Cell value={row.ive} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            IVE details sourced from investigationve.com. Comparison last reviewed June 2026.
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
                title: "Your license moves with you",
                body: "Switch or upgrade computers without buying again. Deactivate the key on the old machine and activate it on the new one. IVE keys are locked to one computer and may need repurchasing after a crash.",
              },
              {
                title: "Native Mac and Windows",
                body: "A real desktop app on both platforms, plus a free in-browser demo so you can try the workflow in seconds. No download, no signup. IVE doesn't advertise a Mac version.",
              },
              {
                title: "Pricing that fits how you work",
                body: "Pay monthly, yearly, or once for a lifetime license, and get volume discounts when you outfit a team. IVE is a one-time per-computer purchase only.",
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

      {/* Fair note about IVE */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Where IVE may fit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              IVE is an established Windows tool with a lower one-time entry price (from $69.99),
              unlimited updates, and built-in branding extras like company watermarks and design
              screens. If you only work on a single Windows machine and want the cheapest one-time
              option, it&apos;s worth a look. If you need Mac support, transferable licenses, a
              browser trial, or team pricing, Investigation Flow is the better fit.
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
