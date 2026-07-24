import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const PAGE_URL = "/contact";

export const metadata: Metadata = {
  title: "Contact | Investigation Flow",
  description:
    "Get in touch with the Investigation Flow team. Email us and we'll get back to you within 24 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact | Investigation Flow",
    description:
      "Get in touch with the Investigation Flow team. We respond within 24 hours.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-2xl px-6 text-center md:px-12">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Get in <span className="gradient-text">touch</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Questions, feedback, or need a hand? Email us and a real person will
            get back to you.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Email us
            </p>
            <a
              href={`mailto:${SITE.supportEmail}`}
              className="mt-3 inline-block text-2xl font-bold text-purple-600 hover:text-purple-700 md:text-3xl"
            >
              {SITE.supportEmail}
            </a>
            <p className="mt-6 text-sm text-slate-500">
              We respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
