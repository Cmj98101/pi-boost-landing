"use client";

import { analytics } from "@/lib/analytics";
import { FEATURES } from "@/lib/content";
import { Icon } from "@/components/icons";

export default function Features() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Everything You Need to{" "}
            <span className="gradient-text">Save Time</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
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
              <div className="card-luxury-border h-full group-hover:scale-105 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-white">
                      <Icon name={feature.icon} className="w-12 h-12" />
                    </div>
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
            href="/download"
            onClick={() => analytics.downloadNowClicked("features")}
            className="btn-primary-luxury inline-flex items-center gap-2 text-lg group"
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
