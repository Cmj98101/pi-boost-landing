"use client";

import { analytics } from "@/lib/analytics";
import { FEATURES } from "@/lib/content";
import { Icon } from "@/components/icons";

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Decorative background elements */}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="display-lg mb-6">
            Everything You Need to{" "}
            Save Time
          </h2>

          <p className="body-lg">
            Stop fighting Premiere. Investigation Flow does the four jobs
            surveillance video actually needs: timestamp, stitch, audio, and
            stills, and nothing you don&apos;t.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`group relative animate-fade-in-up delay-${index * 100}`}
            >
              {/* Feature Card */}
              <div className="card h-full transition-shadow duration-300 hover:shadow-layered">
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-md ${feature.accent}`}
                >
                  <Icon name={feature.icon} className="h-9 w-9" />
                </div>

                {/* Content */}
                <h3 className="display-xs mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center text-ink font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
            href="/download"
            onClick={() => analytics.downloadNowClicked("features")}
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Download Free Trial
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
