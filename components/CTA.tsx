"use client";

import { useState, useEffect, useRef } from "react";
import PaymentButton from "./PaymentButton";
import { getConfig, getModeContent } from "@/lib/config";

export default function CTA() {
  const ctaContent = getModeContent('cta');
  const demoUrl = getConfig('demoUrl');

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float delay-1000"></div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Main CTA Card */}
          <div>
            {ctaContent.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
                <span className="text-sm font-semibold text-white">
                  {ctaContent.badge}
                </span>
              </div>
            )}

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {ctaContent.headline}
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
              {ctaContent.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-slate-50 hover:shadow-2xl transition-all duration-300 font-bold px-8 py-4 rounded-xl shadow-xl text-lg"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 text-lg"
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
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
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
