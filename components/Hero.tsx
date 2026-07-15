"use client";

import { useState, useEffect, useRef } from "react";
import { getConfig, getModeContent } from "@/lib/config";
import { analytics } from "@/lib/analytics";

export default function Hero() {
  const heroContent = getModeContent("hero");
  const audiences = getConfig("heroAudiences");
  // Seeds the initial width before real pixel widths are measured.
  const longestAudience = audiences.reduce(
    (a, b) => (b.length > a.length ? b : a),
    ""
  );
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [audienceIndex, setAudienceIndex] = useState(0);
  // The prior index survives one render after a change, so the outgoing word
  // can slide up and out while the incoming word rises into place.
  const prevIndexRef = useRef(0);
  const prevIndex = prevIndexRef.current;
  useEffect(() => {
    prevIndexRef.current = audienceIndex;
  }, [audienceIndex]);

  // Measure each word so the container can hug the active word instead of
  // reserving the widest word's width. Re-measure on resize, since the font
  // size changes across breakpoints.
  useEffect(() => {
    const measure = () =>
      setWidths(audiences.map((_, i) => wordRefs.current[i]?.offsetWidth ?? 0));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [audiences]);

  useEffect(() => {
    // Respect users who prefer less motion: hold on the first audience.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setAudienceIndex((i) => (i + 1) % audiences.length);
    }, 2600);
    return () => clearInterval(id);
  }, [audiences.length]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
    >
      {/* Luxury Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-1000"></div>

      {/* Content Container */}
      <div className="relative w-full max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="space-y-8">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-100 animate-fade-in">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {heroContent.badge}
            </span>
          </div>

          {/* Main Headline — no entrance animation: this is the LCP element,
              so it must paint fully opaque immediately. The audience word
              rotates; the rest of the line stays put. */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900">
            Give{" "}
            <span
              className="relative inline-block whitespace-nowrap align-baseline transition-[width] duration-500 ease-out"
              style={
                widths[audienceIndex]
                  ? { width: widths[audienceIndex] }
                  : undefined
              }
            >
              {/* Invisible word establishes the line box (height + baseline)
                  and seeds the width until real widths are measured. */}
              <span className="invisible" aria-hidden="true">
                {longestAudience}
              </span>
              {audiences.map((word, i) => {
                const isActive = i === audienceIndex;
                const isLeaving = i === prevIndex && prevIndex !== audienceIndex;
                const motion = isActive
                  ? "opacity-100 translate-y-0"
                  : isLeaving
                    ? "opacity-0 -translate-y-[0.4em]"
                    : "opacity-0 translate-y-[0.4em]";
                return (
                  <span
                    key={word}
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    aria-hidden={!isActive}
                    className={`gradient-text absolute left-0 top-0 whitespace-nowrap transition-all duration-500 ease-out ${motion}`}
                  >
                    {word}
                  </span>
                );
              })}
            </span>{" "}
            evidence they can use
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed animate-fade-in-up delay-300 max-w-2xl mx-auto">
            {heroContent.subheadline}
          </p>

          {/* Key Benefits - Quick Scan */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-400">
            {[
              "✓ Verifiable Timestamps",
              "✓ Stitch Clips in Order",
              "✓ Audio Toggle + Stills"
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200"
              >
                <span className="text-sm font-medium text-slate-700">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <a
              href="/download"
              onClick={() => analytics.downloadNowClicked("hero")}
              className="btn-primary-luxury inline-flex items-center justify-center gap-2 text-lg group"
            >
              {heroContent.cta.primary}
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

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              {heroContent.cta.secondary}
            </a>
          </div>

          {/* Free-trial reassurance line under the download CTA */}
          <p className="text-sm text-slate-500 animate-fade-in-up delay-500">
            Free trial, first 25 conversions on us. Windows &amp; Mac.
          </p>

          {/* Honest trust line */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 pt-4 text-sm text-slate-600 animate-fade-in-up delay-600">
            {[
              "Built with working private investigators",
              "Native Windows & Mac app",
              "Free trial, no credit card",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
