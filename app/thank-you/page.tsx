import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import PurchaseTracker from "./PurchaseTracker";

export const metadata: Metadata = {
  title: "Thank You | Investigation Flow",
  description: "Your Investigation Flow purchase is complete.",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: "Find your license key",
    body: "Please check your email, as we sent you your license key and your receipt. Check your spam folder if it isn't in your inbox within a few minutes.",
  },
  {
    title: "Download the app",
    body: "Already installed the free trial? Skip this. Otherwise grab the Mac or Windows version below.",
  },
  {
    title: "Activate",
    body: "Open Investigation Flow, paste your license key when prompted, and every feature stays unlocked.",
  },
];

// Lemon Squeezy fills [order_id] with the numeric order ID when it sends a
// buyer here from the confirmation modal. Anyone arriving without one (typed
// the URL, an old bookmark, a bot) is sent home on the server, before the page
// or the Google tag loads, so no purchase is recorded.
function hasOrderId(value: string | string[] | undefined): boolean {
  const id = Array.isArray(value) ? value[0] : value;
  return typeof id === "string" && /^\d+$/.test(id);
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { order_id } = await searchParams;
  if (!hasOrderId(order_id)) {
    redirect("/");
  }

  return (
    <main className="min-h-screen">
      <PurchaseTracker />
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-2xl px-6 text-center md:px-12">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            You&apos;re <span className="gradient-text">all set</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Thanks for buying Investigation Flow. Here&apos;s how to get going
            in under two minutes.
          </p>

          <ol className="mt-10 space-y-4 text-left">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-slate-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/download" className="btn-primary-luxury inline-flex items-center justify-center gap-2 text-lg">
              Download the app
            </Link>
            <Link href="/learn" className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg">
              Watch the tutorials
            </Link>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            Need a hand? Email{" "}
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="font-medium text-purple-600 hover:text-purple-700"
            >
              {SITE.supportEmail}
            </a>{" "}
            and a real person will reply within 24 hours.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
