import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DownloadButton from "@/components/DownloadButton";
import YouTubeFacade from "@/components/YouTubeFacade";
import {
  TUTORIALS,
  getTutorial,
  tutorialThumbnail,
  SITE_URL,
} from "@/lib/tutorials";

export function generateStaticParams() {
  return TUTORIALS.map((tutorial) => ({ slug: tutorial.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return {};

  const url = `${SITE_URL}/learn/${tutorial.slug}`;
  return {
    title: `${tutorial.title} | Investigation Flow`,
    description: tutorial.description,
    alternates: { canonical: url },
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      url,
      type: "article",
      images: [tutorialThumbnail(tutorial.youtubeId)],
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();

  const url = `${SITE_URL}/learn/${tutorial.slug}`;

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: tutorial.title,
    description: tutorial.description,
    thumbnailUrl: [tutorialThumbnail(tutorial.youtubeId)],
    uploadDate: tutorial.publishDate,
    contentUrl: `https://www.youtube.com/watch?v=${tutorial.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${tutorial.youtubeId}`,
    ...(tutorial.duration ? { duration: tutorial.duration } : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE_URL}/learn` },
      { "@type": "ListItem", position: 3, name: tutorial.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([videoLd, breadcrumbLd]),
        }}
      />
      <Navigation />

      <article className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">

        <div className="relative mx-auto max-w-3xl px-6 md:px-12">
          {/* Breadcrumb */}
          {/* Mirrors the BreadcrumbList schema above, which starts at Home. */}
          <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-body-mid">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/learn" className="hover:text-body-mid">
              Learn
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{tutorial.title}</span>
          </nav>

          <h1 className="display-xl">
            {tutorial.title}
          </h1>
          <p className="mt-5 body-lg">
            {tutorial.intro}
          </p>

          {/* Video */}
          <div className="mt-8">
            <YouTubeFacade id={tutorial.youtubeId} title={tutorial.title} />
          </div>

          {/* Written walkthrough */}
          <div className="mt-12">
            <h2 className="display-lg">
              Step by step
            </h2>
            <ol className="mt-8 space-y-8">
              {tutorial.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.heading}
                    </h3>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Try it on your own footage
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              Download Investigation Flow and put this workflow to work on a real
              case. Your first conversions are free.
            </p>
            <div className="mt-6 flex justify-center">
              <DownloadButton className="btn-primary inline-flex items-center gap-2" />
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 font-semibold text-accent-blue-deep hover:underline"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All tutorials
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
