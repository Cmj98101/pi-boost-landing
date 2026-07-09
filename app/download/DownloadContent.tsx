"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PlatformIcon from "@/components/PlatformIcon";
import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";

export default function DownloadContent() {
  const download = getConfig("download");
  const platforms = [
    { key: "mac", available: download.macAvailable, name: "macOS", req: "macOS 12 (Monterey) or later", href: "/download/mac" },
    { key: "windows", available: download.windowsAvailable, name: "Windows", req: "Windows 10 or later (64-bit)", href: "/download/windows" },
  ].filter((p) => p.available);

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Download <span className="gradient-text">Investigation Flow</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-12">
            Choose your platform to get started.
          </p>

          {platforms.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {platforms.map((p) => (
                <a
                  key={p.key}
                  href={p.href}
                  onClick={() => analytics.downloadStarted(p.key)}
                  className="card-luxury group flex flex-col items-center text-center p-8 hover:-translate-y-1 transition-all"
                >
                  <div className="text-slate-800 group-hover:text-purple-700 transition-colors mb-4">
                    <PlatformIcon platform={p.key} className="w-12 h-12" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Download for {p.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">{p.req}</p>
                  <span className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10">
              <p className="text-slate-600">
                Desktop apps are coming soon. Join the waitlist and we&apos;ll email you the moment they&apos;re ready.
              </p>
            </div>
          )}

          <p className="text-sm text-slate-500 mt-10 leading-relaxed">
            Your license key activates Investigation Flow on the number of computers you
            purchased. Move it to another machine anytime by deactivating it on the old one first.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
