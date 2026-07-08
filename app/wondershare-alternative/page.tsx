import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DemoLink from "@/components/DemoLink";

const PAGE_URL = "https://www.investigationflow.com/wondershare-alternative";

export const metadata: Metadata = {
  title:
    "Investigation Flow vs. Wondershare UniConverter: A Purpose-Built Alternative for Surveillance Video",
  description:
    "Comparing Investigation Flow and Wondershare UniConverter for private investigators: automatic court-ready timestamps, whole-case stitching, batch processing, and native Mac & Windows support.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Investigation Flow vs. Wondershare UniConverter: A Purpose-Built Alternative for Surveillance Video",
    description:
      "Why a general video converter/editor like Wondershare UniConverter isn't built for surveillance case work, and what Investigation Flow does instead.",
    url: PAGE_URL,
    type: "article",
  },
};

// Wondershare UniConverter details sourced from Wondershare's public product
// and pricing pages. UniConverter is a general-purpose video converter and
// editor toolbox, not a tool built for surveillance case work, so this
// comparison is framed around that gap rather than a feature-for-feature
// rivalry.
const ROWS: { feature: string; flow: string; wondershare: string }[] = [
  { feature: "Automatic, court-ready timestamps from footage metadata", flow: "yes", wondershare: "Manual watermark/text overlay, no metadata recovery" },
  { feature: "Stitch a whole case into one sequence", flow: "yes", wondershare: "yes, general merge/editing tool" },
  { feature: "Keep or remove audio per clip", flow: "yes", wondershare: "yes" },
  { feature: "One-click timestamped still shots", flow: "yes", wondershare: "Not built for this" },
  { feature: "Batch-process whole case folders", flow: "yes", wondershare: "General batch conversion, not case-specific" },
  { feature: "Native macOS app", flow: "yes", wondershare: "yes" },
  { feature: "Native Windows app", flow: "yes", wondershare: "yes" },
  { feature: "Built for investigators, not a general toolbox", flow: "yes", wondershare: "General-purpose converter and editor" },
  { feature: "Try free in your browser (no download)", flow: "yes", wondershare: "Download trial only, watermarked output" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I use Wondershare UniConverter to timestamp surveillance video?",
    a: "Yes, some investigators do this manually using UniConverter's watermark and text-overlay tools. It works for a clip or two, but there's no automatic recovery of an original recording time from footage metadata, so every timestamp has to be entered by hand.",
  },
  {
    q: "What is the best alternative to using Wondershare for surveillance video?",
    a: "Investigation Flow is built specifically for the job: automatic court-ready timestamps, whole-case clip stitching, per-clip audio control, and one-click stills, on native Mac and Windows apps.",
  },
  {
    q: "Why not just use a general converter like Wondershare?",
    a: "UniConverter is a format converter and general editor first, so timestamping and case organization are manual workarounds rather than built-in features. There's no case-specific batch workflow, and free trial exports carry a watermark.",
  },
  {
    q: "How much does Wondershare UniConverter cost compared to Investigation Flow?",
    a: "Wondershare's published pricing runs from around $19.95/month or roughly $59.99/year per user up to about $89.99 for a perpetual license, with variation by source and region. Investigation Flow is $19.99/month, $199/year, or $299 one-time for a lifetime license, in a similar range but purpose-built for surveillance case work.",
  },
  {
    q: "Does Wondershare work on both Mac and Windows?",
    a: "Yes, UniConverter is cross-platform, which is more than some PI-specific tools offer. It's still a general video toolbox rather than software built around timestamping and case workflows, which is where Investigation Flow focuses.",
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

export default function WondershareAlternative() {
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
            Investigation Flow vs. <span className="gradient-text">Wondershare UniConverter</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Wondershare UniConverter is a capable general video converter and editor, but it
            wasn&apos;t built for surveillance case work. Investigation Flow automates the parts
            that eat your time: <strong>court-ready timestamps</strong>,{" "}
            <strong>whole-case stitching</strong>, and <strong>batch processing</strong>, on
            native Mac and Windows.
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
                  <th className="p-4 md:p-5 font-semibold text-slate-700">Wondershare UniConverter</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-4 md:p-5 text-slate-700 font-medium">{row.feature}</td>
                    <td className="p-4 md:p-5"><Cell value={row.flow} /></td>
                    <td className="p-4 md:p-5"><Cell value={row.wondershare} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            Wondershare UniConverter details sourced from Wondershare&apos;s public product and pricing pages. Comparison last reviewed July 2026.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why investigators choose Investigation Flow over Wondershare
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Timestamps recovered, not typed in",
                body: "Investigation Flow burns in accurate timestamps from the original recording. UniConverter's watermark tool has to be positioned and typed by hand on every clip.",
              },
              {
                title: "A whole case in minutes, not hours",
                body: "Batch-process an entire folder of surveillance footage in one pass, purpose-built for how investigators actually work a case.",
              },
              {
                title: "No watermarked trial exports",
                body: "Try the full workflow free in your browser, no download, no signup, and no watermark on your test clip.",
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

      {/* Fair note about Wondershare */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Where Wondershare UniConverter may fit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              UniConverter is a genuinely useful general-purpose toolbox for format conversion,
              basic editing, and watermarking, and it runs on both Mac and Windows. If you already
              own it and only need to timestamp the occasional clip, it can work in a pinch. Once
              you&apos;re processing full cases of surveillance footage, Investigation Flow&apos;s
              automatic timestamping and batch processing save significant time over a manual,
              clip-by-clip workflow.
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
            Upload a clip and watch it become court-ready in seconds, right in your browser.
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
