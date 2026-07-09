import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updates } from "@/lib/updates";

export const metadata: Metadata = {
  title: "Updates | Investigation Flow",
  description:
    "See what's new in Investigation Flow: the latest features, improvements, and fixes.",
  alternates: {
    canonical: "https://www.investigationflow.com/updates",
  },
  openGraph: {
    title: "Updates | Investigation Flow",
    description:
      "See what's new in Investigation Flow: the latest features, improvements, and fixes.",
    type: "website",
  },
};

type UpdateEntryTag = "New" | "Improved" | "Fixed";

const TAG_STYLES: Record<UpdateEntryTag, string> = {
  New: "bg-purple-100 text-purple-700",
  Improved: "bg-blue-100 text-blue-700",
  Fixed: "bg-slate-100 text-slate-700",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function UpdatesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              What&apos;s <span className="gradient-text">New</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600">
              The latest features, improvements, and fixes in Investigation Flow.
            </p>
          </div>

          {updates.length > 0 ? (
            <div className="space-y-8">
              {updates.map((entry) => (
                <article key={`${entry.date}-${entry.title}`} className="card-luxury p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${TAG_STYLES[entry.tag]}`}
                    >
                      {entry.tag}
                    </span>
                    <time dateTime={entry.date} className="text-sm text-slate-500">
                      {formatDate(entry.date)}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{entry.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{entry.body}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10 text-center">
              <p className="text-slate-600">
                We&apos;re just getting started. Check back here for new features,
                improvements, and fixes as we ship them.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
