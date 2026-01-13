"use client";

import { useState, useEffect, useRef } from "react";
import { getConfig } from "@/lib/config";

export default function Pricing() {
  const showPricing = getConfig('showPricing');
  const pricingConfig = getConfig('pricing');

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Don't render anything if pricing is hidden
  if (!showPricing) {
    return null;
  }

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
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">
              SIMPLE PRICING
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            {pricingConfig.productTagline}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600 mb-8">
            {pricingConfig.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
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
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {pricingConfig.options.map((option: typeof pricingConfig.options[number], index: number) => (
            <div
              key={option.id}
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Badge */}
              {"badge" in option && option.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                    {option.badge}
                  </div>
                </div>
              )}

              {/* Pricing Card */}
              <div
                className={`relative h-full text-center ${
                  option.highlighted
                    ? "card-luxury-border ring-2 ring-purple-300 transform md:scale-105"
                    : "card-luxury"
                }`}
              >
                {/* Gradient overlay for highlighted plan */}
                {option.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl -z-10"></div>
                )}

                <div className="p-6 md:p-8">
                  {/* Plan Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    {option.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-4xl md:text-5xl font-bold text-slate-900">
                      ${option.price}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">{option.period}</p>

                  {/* Description */}
                  <p className="text-slate-600 mb-4">{option.description}</p>

                  {/* Support info */}
                  <p className="text-xs text-slate-500 mb-6">{option.support}</p>

                  {/* CTA Button */}
                  <a
                    href="/pricing"
                    className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                      option.highlighted
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    Get Started
                    <svg
                      className="w-4 h-4"
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
            </div>
          ))}
        </div>

        {/* Money-Back Guarantee */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900">
                30-Day Money-Back Guarantee
              </p>
              <p className="text-sm text-slate-600">
                Try risk-free. Not satisfied? Get a full refund, no questions
                asked.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">Have questions about pricing?</p>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#faq")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors inline-flex items-center gap-2"
          >
            Check our FAQ
            <svg
              className="w-4 h-4"
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
          </a>
        </div>
      </div>
    </section>
  );
}
