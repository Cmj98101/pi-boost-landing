import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TUTORIALS, SITE_URL, tutorialThumbnail } from "@/lib/tutorials";

const PAGE_URL = `${SITE_URL}/learn`;

export const metadata: Metadata = {
  title: "Learn Investigation Flow: Video Tutorials & Guides",
  description:
    "Step-by-step video tutorials for Investigation Flow. Learn how to add timestamps, stitch clips, redact and annotate, and export finished surveillance video.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Learn Investigation Flow: Video Tutorials & Guides",
    description:
      "Step-by-step video tutorials for Investigation Flow, built for private investigators.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
          <h1 className="display-xl">
            Learn Investigation Flow
          </h1>
          <p className="mx-auto mt-6 max-w-2xl body-lg md:text-xl">
            Short, practical video tutorials that walk you through getting
            surveillance footage ready, one task at a time.
          </p>
        </div>
      </section>

      {/* Tutorials grid */}
      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TUTORIALS.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/learn/${tutorial.slug}`}
                className="card group flex flex-col overflow-hidden"
              >
                <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-slate-900">
                  {/* Intentionally empty alt: this card's <Link> already
                      renders the tutorial title as visible text, so a
                      describing alt here would be announced twice. The
                      thumbnail is decorative in this context. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tutorialThumbnail(tutorial.youtubeId)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20"></span>
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <svg
                      className="h-6 w-6 translate-x-0.5 text-ink"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-body-mid">
                  {tutorial.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tutorial.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
