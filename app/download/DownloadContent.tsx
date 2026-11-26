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

      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white">

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h1 className="display-xl mb-4">
            Download Investigation Flow
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
                  className="card group flex flex-col items-center text-center p-8 transition-shadow hover:shadow-layered"
                >
                  <div className="text-slate-800 group-hover:text-body-mid transition-colors mb-4">
                    <PlatformIcon platform={p.key} className="w-12 h-12" />
                  </div>
                  <h2 className="display-xs mb-1">
                    Download for {p.name}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">{p.req}</p>
                  <span className="btn-primary mt-auto w-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="card p-10">
              <p className="text-slate-600">
                Desktop apps for this platform are coming soon. Check back shortly.
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
