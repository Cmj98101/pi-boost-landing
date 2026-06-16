"use client";

import { useState, useEffect } from "react";
import { getConfig, getModeContent } from "@/lib/config";

export default function Hero() {
  const heroContent = getModeContent("hero");
  const demoUrl = getConfig("demoUrl");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

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

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] animate-fade-in-up delay-200">
            <span className="gradient-text">{heroContent.headline}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed animate-fade-in-up delay-300 max-w-2xl mx-auto">
            {heroContent.subheadline}
          </p>

          {/* Key Benefits - Quick Scan */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-400">
            {[
              "✓ Court-Ready Timestamps",
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
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
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
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              {heroContent.cta.secondary}
            </a>
          </div>

          {/* Honest pre-launch trust line */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 pt-4 text-sm text-slate-600 animate-fade-in-up delay-600">
            {[
              "Built with working private investigators",
              "Native Windows & Mac app",
              "Try free in your browser",
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
