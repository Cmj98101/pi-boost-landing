import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { WaitlistForm } from "@/components/LeadForms";
import { WAITLIST } from "@/lib/leads";

const PAGE_URL = WAITLIST.path;
const TITLE = `${WAITLIST.productName}: Surveillance Reports, Done Before You Get Home`;
const DESCRIPTION =
  "Join the waitlist for a new surveillance reporting app for private investigators on web, iPhone, and Android. Log in the field, finish the report faster.";

export const metadata: Metadata = {
  title: `Join the Waitlist | ${WAITLIST.productName}`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

// What the app will do. Edit these to match what you're actually building;
// a waitlist page should never promise a feature you won't ship.
const FEATURES = [
  {
    title: "Log it as it happens",
    body: "Tap to time-stamp an entry from your phone and dictate what you see. No more reconstructing the day from memory and a notepad.",
  },
  {
    title: "Your log becomes the report",
    body: "Field notes turn into a clean, chronological report draft in your format, ready for you to review and send.",
  },
  {
    title: "Objective by default",
    body: "Flags opinion words and missing times before the adjuster does, so every report reads the way clients expect.",
  },
  {
    title: "Phone, tablet, and desktop",
    body: "Start in the car on iPhone or Android, finish at your desk on the web. Everything stays in sync.",
  },
];

const PERKS = [
  "Early access before the public launch",
  "Progress updates as features land, with screenshots",
  "A say in what we build. We read every reply.",
];

const FAQ = [
  {
    q: "When does it launch?",
    a: "We're building it now. Waitlist members get progress updates along the way and are the first to get access.",
  },
  {
    q: "Will it work with my clients' report formats?",
    a: "That's the goal. Tell us which formats you deal with when you reply to our welcome email, and we'll make sure they're covered.",
  },
  {
    q: "Does joining cost anything?",
    a: "No. Joining the waitlist is free and doesn't commit you to anything.",
  },
  {
    q: "What about the desktop app?",
    a: "Investigation Flow for Mac and Windows isn't going anywhere. Keep using it for timestamping, stitching, and stills.",
  },
];

export default function WaitlistPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero + opt-in */}
      <section className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">
              Coming to web, iPhone, and Android
            </p>
            <h1 className="display-xl mt-3">
              Finish the surveillance report before you get home
            </h1>
            <p className="mt-5 body-lg">
              Ten hours in the car shouldn&apos;t end with two more hours at the keyboard.
              {" "}{WAITLIST.productName} turns what you log in the field into a clean,
              objective report your clients can use.
            </p>
            <a href="#join" className="btn-primary mt-6 inline-flex w-full items-center justify-center lg:hidden">
              Join the waitlist
            </a>
            <ul className="mt-6 space-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex gap-3 text-slate-700">
                  <svg className="mt-1 h-5 w-5 flex-none text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div id="join" className="card shadow-layered scroll-mt-24">
            <p className="mb-5 text-center display-xs">
              Get early access
            </p>
            <WaitlistForm location="waitlist_hero" />
          </div>
        </div>
      </section>

      {/* What we're building */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <h2 className="display-lg text-center">What we&apos;re building</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            Built by the team behind Investigation Flow, for investigators who do surveillance.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card">
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + second opt-in */}
      <section className="bg-slate-50 py-20">
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
            <p className="mb-5 text-center display-xs">Join the waitlist</p>
            <WaitlistForm location="waitlist_footer" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
