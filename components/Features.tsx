"use client";

import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";

export default function Features() {
  const demoUrl = getConfig("demoUrl");

  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Court-Ready Timestamps, Automatically",
      description:
        "Burn accurate, verifiable date and time onto footage that no longer carries it. Recover the original recording time and lock in timestamps that hold up in court.",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      ),
      title: "Stitch a Whole Case Into One Sequence",
      description:
        "Drop in clips from a day of surveillance and stitch them into a single, logical, chronological video. No timeline wrestling, no general-purpose editor required.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Audio On or Off, Your Call",
      description:
        "Keep the audio when it matters, strip it when it doesn't, for privacy or admissibility. One toggle per clip, no re-encoding headaches.",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Grab Court-Ready Stills in One Click",
      description:
        "Pull clean still shots straight from the footage you're editing, perfect for reports, exhibits, and client updates, without switching tools.",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Process Entire Cases at Once",
      description:
        "Stop processing one file at a time. Batch whole folders of surveillance video in a single pass and reclaim the hours you spend on manual prep.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Built for Investigators, Not Filmmakers",
      description:
        "Export universally-accepted MP4 or MOV, install on Windows or Mac in minutes, and start working immediately. No editing degree, no learning curve.",
      gradient: "from-emerald-500 to-purple-500",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">
              POWERFUL FEATURES
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Everything You Need to{" "}
            <span className="gradient-text">Save Time</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Stop fighting Premiere. Investigation Flow does the four jobs
            surveillance video actually needs: timestamp, stitch, audio, and
            stills, and nothing you don't.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative animate-fade-in-up delay-${index * 100}`}
            >
              {/* Feature Card */}
              <div className="card-luxury-border h-full group-hover:scale-105 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}
                  ></div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Learn more</span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-slate-600 mb-6 text-lg">
            Ready to turn footage into evidence?
          </p>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.demoClicked("features")}
            className="btn-primary-luxury inline-flex items-center gap-2 text-lg group"
          >
            Try the Live Demo
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
