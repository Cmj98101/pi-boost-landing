import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ReportKitForm } from "@/components/LeadForms";
import { REPORT_KIT } from "@/lib/leads";

const PAGE_URL = REPORT_KIT.path;
const TITLE = "Free Surveillance Report Template for Private Investigators";
const DESCRIPTION =
  "Download a free surveillance report template plus the writing rules, phrase swaps, and pre-submission checklist that keep adjusters and attorneys sending you cases.";

export const metadata: Metadata = {
  title: `${TITLE} | Investigation Flow`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const INSIDE = [
  {
    title: "Fill-in report template",
    body: "Case details, subject and vehicle descriptions, a timed activity log, summary, media index, and certification, in the order adjusters read them.",
  },
  {
    title: "12 rules for defensible reports",
    body: "What to write, what to leave out, and how to document the hours where nothing happened so they don't raise questions.",
  },
  {
    title: "Subjective-to-objective phrase swaps",
    body: "Side-by-side rewrites that turn opinions like \"no sign of pain\" into observations that hold up when an attorney reads them.",
  },
  {
    title: "Before-you-send checklist",
    body: "A last pass that catches the mistakes that get reports bounced back: wrong claim numbers, log times that don't match the video, unexplained gaps.",
  },
];

const SWAPS = [
  {
    before: "The subject showed no sign of pain.",
    after:
      "The subject walked from the vehicle to the store entrance, about 150 feet, at a steady pace without an assistive device and did not stop.",
  },
  {
    before: "Nothing happened all morning.",
    after:
      "No activity observed from 07:30 to 11:45. Vehicle 1 remained in the driveway and the front blinds remained closed.",
  },
  {
    before: "The subject lifted a heavy box.",
    after:
      "The subject lifted a cardboard box, about 2 ft by 2 ft, from the trunk with both hands and carried it to the front door.",
  },
];

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. Enter your name and email and the PDF downloads right away. We send a copy to your inbox too.",
  },
  {
    q: "Who is it for?",
    a: "Private investigators who run surveillance for insurance carriers, TPAs, attorneys, and employers, whether you write a few reports a month or run an agency.",
  },
  {
    q: "Can I use it with my clients' formats?",
    a: "Yes. The template covers the sections most clients expect. Rename or reorder them to match each client's guidelines.",
  },
  {
    q: "What will you email me?",
    a: "The kit, then the occasional report-writing tip and news about the reporting app we're building. Unsubscribe with one click anytime.",
  },
];

function KitCover() {
  return (
    <div className="mx-auto -mt-2 mb-6 w-40 rotate-[-3deg] rounded-md bg-primary p-4 text-left shadow-layered-strong">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-white/60">Free PDF</p>
      <p className="mt-2 text-sm font-semibold leading-tight text-white">The Surveillance Report Kit</p>
      <div className="mt-3 space-y-1">
        <div className="h-1 w-full rounded bg-white/20" />
        <div className="h-1 w-4/5 rounded bg-white/20" />
        <div className="h-1 w-3/5 rounded bg-white/20" />
      </div>
      <p className="mt-4 text-[8px] text-slate-400">Investigation Flow</p>
    </div>
  );
}

export default function ReportTemplatePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero + opt-in */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">
              Free download for private investigators
            </p>
            <h1 className="display-xl mt-3">
              The surveillance report template adjusters want to read
            </h1>
            <p className="mt-5 body-lg">
              A ready-to-fill template plus the writing rules that make a report clear,
              objective, and hard to pick apart, so clients keep sending you cases.
            </p>
            <a href="#get-the-kit" className="btn-primary mt-6 inline-flex w-full items-center justify-center lg:hidden">
              Get the free kit
            </a>
            <ul className="mt-6 space-y-3">
              {INSIDE.map((item) => (
                <li key={item.title} className="flex gap-3 text-slate-700">
                  <svg className="mt-1 h-5 w-5 flex-none text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div id="get-the-kit" className="card shadow-layered scroll-mt-24">
            <KitCover />
            <ReportKitForm location="report_kit_hero" heading="Where should we send your kit?" />
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <h2 className="display-lg text-center">What&apos;s in the kit</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {INSIDE.map((item, i) => (
              <div key={item.title} className="card">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview: phrase swaps */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="display-lg text-center">
            A preview: write what you saw, not what you think
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            The quickest way to lose an adjuster&apos;s trust is an opinion dressed up as an
            observation. Three of the rewrites from the kit:
          </p>
          <div className="mt-10 space-y-4">
            {SWAPS.map((swap) => (
              <div key={swap.before} className="card grid gap-3 md:grid-cols-2 md:gap-6">
                <div>
                  <p className="eyebrow-sm text-body-mid">Instead of</p>
                  <p className="mt-1 text-body-mid line-through decoration-mute-soft">{swap.before}</p>
                </div>
                <div>
                  <p className="eyebrow-sm text-ink">Write</p>
                  <p className="mt-1 text-slate-800">{swap.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + second opt-in */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-12 lg:grid-cols-2">
          <div>
            <h2 className="display-lg">Questions</h2>
            <dl className="mt-8 space-y-6">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-slate-900">{item.q}</dt>
                  <dd className="mt-1 text-slate-600">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card lg:self-start">
            <ReportKitForm location="report_kit_footer" heading="Get the free kit" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
