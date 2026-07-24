import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DemoLink from "@/components/DemoLink";

const PAGE_URL = "/imovie-alternative";

export const metadata: Metadata = {
  title:
    "Investigation Flow vs. iMovie: A Purpose-Built Alternative for Surveillance Video",
  description:
    "Comparing Investigation Flow and iMovie for private investigators: automatic verifiable timestamps, whole-case stitching, batch processing, and native Mac & Windows support.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Investigation Flow vs. iMovie: A Purpose-Built Alternative for Surveillance Video",
    description:
      "Why a free general-purpose editor like iMovie isn't built for surveillance case work, and what Investigation Flow does instead.",
    url: PAGE_URL,
    type: "article",
  },
};

// iMovie details sourced from Apple's public iMovie documentation and app
// listing. iMovie is a free, general-purpose consumer editor, not a tool
// built for surveillance case work, so this comparison is framed around
// that gap rather than a feature-for-feature rivalry.
const ROWS: { feature: string; flow: string; imovie: string }[] = [
  { feature: "Automatic, verifiable timestamps from footage metadata", flow: "yes", imovie: "Manual title overlay per clip, no metadata recovery" },
  { feature: "Stitch a whole case into one sequence", flow: "yes", imovie: "yes, with manual timeline work" },
  { feature: "Keep or remove audio per clip", flow: "yes", imovie: "yes" },
  { feature: "One-click timestamped still shots", flow: "yes", imovie: "Not built for this" },
  { feature: "Batch-process whole folders at once", flow: "yes", imovie: "No, one clip at a time" },
  { feature: "Native Windows app", flow: "yes", imovie: "No, Mac and iOS only" },
  { feature: "Built for case work, not general filmmaking", flow: "yes", imovie: "General-purpose consumer editor" },
  { feature: "Try free in your browser (no download)", flow: "yes", imovie: "N/A, but iMovie itself is free" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I use iMovie to timestamp surveillance video?",
    a: "Yes, technically. iMovie lets you drag a Date/Time title onto a clip, but it's a manual, one-clip-at-a-time process with an 8-second default duration, and it can't recover an original recording time if the footage lost its metadata. Investigation Flow automates this across a whole case.",
  },
  {
    q: "What is the best alternative to using iMovie for surveillance video?",
    a: "Investigation Flow is built specifically for the job: automatic verifiable timestamps, whole-case clip stitching, per-clip audio control, and one-click stills, on native Mac and Windows apps.",
  },
  {
    q: "Why not just use iMovie since it's free?",
    a: "iMovie's price is hard to beat, but it wasn't built for case work. There's no batch processing, no automatic timestamp recovery from file metadata, and no Windows version, so a day of footage that takes minutes in Investigation Flow can take hours of manual timeline work in iMovie.",
  },
  {
    q: "Does Investigation Flow cost more than iMovie?",
    a: "iMovie is free. Investigation Flow is $19.99/month, $199/year, or $299 one-time for a lifetime license. The cost buys automation: metadata-based timestamping, batch folder processing, and one-click clean stills that iMovie doesn't offer.",
  },
  {
    q: "Is iMovie good enough for surveillance video work?",
    a: "It can produce a video with a timestamp overlay, but the timestamp is manually entered per clip rather than recovered from the original recording metadata, which matters if authenticity is questioned. For a handful of short clips it may be workable; for a full case of surveillance footage, purpose-built software like Investigation Flow is far faster and more defensible.",
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

export default function IMovieAlternative() {
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
            Investigation Flow vs. <span className="gradient-text">iMovie</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            iMovie is free and comes on every Mac, but it wasn&apos;t built for surveillance
            case work. Investigation Flow automates the parts that eat your time:{" "}
            <strong>verifiable timestamps</strong>, <strong>whole-case stitching</strong>, and{" "}
            <strong>batch processing</strong>, on native Mac and Windows.
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
                  <th className="p-4 md:p-5 font-semibold text-slate-700">iMovie</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-4 md:p-5 text-slate-700 font-medium">{row.feature}</td>
                    <td className="p-4 md:p-5"><Cell value={row.flow} /></td>
                    <td className="p-4 md:p-5"><Cell value={row.imovie} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            iMovie details sourced from Apple&apos;s public iMovie documentation. Comparison last reviewed July 2026.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why investigators choose Investigation Flow over iMovie
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Timestamps recovered, not typed in",
                body: "Investigation Flow burns in accurate timestamps from the original recording, even when footage lost its metadata. iMovie's Date/Time title has to be placed and set by hand on every clip.",
              },
              {
                title: "A whole case in minutes, not hours",
                body: "Batch-process an entire folder of surveillance footage in one pass instead of building a timeline clip by clip.",
              },
              {
                title: "Runs where you work",
                body: "Native apps for both Mac and Windows, plus a free in-browser demo. iMovie is Mac and iOS only.",
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

      {/* Fair note about iMovie */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Where iMovie may fit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              iMovie is free, comes pre-installed on every Mac, and handles basic trimming and
              titles well. For a one-off clip or two, it can get the job done. Once you&apos;re
              handling a full day of surveillance footage across multiple clips and cases,
              Investigation Flow&apos;s automatic timestamping and batch processing save
              significant time over building each video by hand.
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
