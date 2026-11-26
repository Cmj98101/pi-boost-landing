"use client";

import PaymentButton from "./PaymentButton";
import { getModeContent } from "@/lib/config";
import { analytics } from "@/lib/analytics";

export default function CTA() {
  const ctaContent = getModeContent('cta');

  return (
    <section
      id="cta"
      className="relative py-24 md:py-32 overflow-hidden bg-primary"
    >

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center animate-fade-in-up">
          {/* Main CTA Card */}
          <div>
            {ctaContent.badge && (
              <p className="eyebrow mb-6 text-white/70">
                {ctaContent.badge}
              </p>
            )}

            {/* Headline */}
            <h2 className="display-lg mb-6 text-white">
              {ctaContent.headline}
            </h2>

            {/* Subheadline */}
            <p className="body-lg mb-10 !text-white/80 max-w-3xl mx-auto">
              {ctaContent.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="/download"
                onClick={() => analytics.downloadNowClicked("cta-section")}
                className="btn-primary btn-on-dark"
              >
                {ctaContent.buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary !bg-transparent !text-white !border-white/30 hover:!border-white"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm mb-10">
              {ctaContent.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {ctaContent.stats.map((stat, index) => (
                <div key={index} className="rounded-md p-6 border border-white/15 text-center">
                  <div className="text-4xl font-semibold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
