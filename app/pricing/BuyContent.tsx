"use client";

import { useState, useEffect, useRef } from "react";
import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function BuyContent() {
  const pricingConfig = getConfig("pricing");
  const [isVisible, setIsVisible] = useState(false);
  const [loadingOption, setLoadingOption] = useState<string | null>(null);
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

  const handleSelectOption = async (optionId: string) => {
    setLoadingOption(optionId);

    analytics.paymentButtonClicked(optionId);
    analytics.trialSignupStarted(optionId);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: optionId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.open(data.url, '_blank');
        setLoadingOption(null);
      } else {
        throw new Error(data.error || "Failed to start checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setLoadingOption(null);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      <section
        ref={sectionRef}
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
      >
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gold-200/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-900">
              {pricingConfig.productName}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8">
              {pricingConfig.productTagline}
            </p>

            {/* Features List */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm md:text-base text-slate-600 mb-8">
              {pricingConfig.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-purple-600"
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

          {/* Pricing Options */}
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {pricingConfig.options.map((option, index) => {
              const [whole, cents] = String(option.price).split(".");
              return (
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

                {/* Card */}
                <div
                  className={`relative h-full text-center ${
                    option.highlighted
                      ? "card-luxury-border ring-2 ring-purple-300 transform md:scale-105"
                      : "card-luxury"
                  }`}
                >
                  {/* Gradient overlay for highlighted option */}
                  {option.highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl -z-10"></div>
                  )}

                  <div className="p-8 md:p-10 h-full flex flex-col">
                    {/* Option Name */}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 min-h-[3.5rem] flex items-center justify-center text-center">
                      {option.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-1 flex items-start justify-center leading-none">
                      <span className="text-2xl md:text-3xl font-bold text-slate-900 mt-1.5">
                        $
                      </span>
                      <span className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        {whole}
                      </span>
                      {cents && (
                        <span className="text-xl md:text-2xl font-bold text-slate-900 mt-1.5">
                          .{cents}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm mb-4">{option.period}</p>

                    {/* Description */}
                    <p className="text-slate-600 mb-4">{option.description}</p>

                    {/* Support info */}
                    <p className="text-xs text-slate-500 mb-6">{option.support}</p>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSelectOption(option.id)}
                      disabled={loadingOption !== null}
                      className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        option.highlighted
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {loadingOption === option.id ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Team / Volume Pricing */}
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              {/* Accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>

              <div className="p-8 md:p-10">
                {/* Heading */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-3">
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                      Team
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {pricingConfig.team.headline}
                  </h3>
                  <p className="text-slate-600 mt-2 max-w-2xl">
                    {pricingConfig.team.subheadline}
                  </p>
                </div>

                {/* Seat bands */}
                <div className="grid gap-6 md:grid-cols-3">
                  {pricingConfig.team.bands.map((band) => (
                    <div
                      key={band.id}
                      className={`relative rounded-xl border p-6 text-center flex flex-col ${
                        band.highlighted
                          ? "border-purple-300 ring-2 ring-purple-200 bg-gradient-to-br from-purple-50 to-blue-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      {band.highlighted && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full shadow">
                            MOST POPULAR
                          </div>
                        </div>
                      )}

                      <p className="text-sm font-semibold text-slate-700 mb-2">
                        {band.seats}
                      </p>

                      <div className="flex items-start justify-center leading-none mb-1">
                        <span className="text-xl font-bold text-slate-900 mt-1">
                          $
                        </span>
                        <span className="text-4xl font-bold text-slate-900 tracking-tight">
                          {band.pricePerSeat}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm mb-1">{band.period}</p>
                      <p className="text-sm font-medium text-purple-700 mb-5">
                        {band.note}
                      </p>

                      <button
                        onClick={() => handleSelectOption(band.id)}
                        disabled={loadingOption !== null}
                        className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-semibold py-3 px-5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          band.highlighted
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        {loadingOption === band.id ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                          </>
                        ) : (
                          <>Get {band.seats}</>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Single Use Disclaimer */}
          <div className="mb-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About the Lifetime (V1) License
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              The Lifetime (V1) License is a one-time purchase that runs Investigation Flow <strong>Version 1</strong> on
              {" "}<strong>one computer at a time</strong>, with all Version 1 updates included—no recurring fees. Future
              major versions (such as Version 2) are sold separately.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Need to switch machines? You can move the license to a different computer anytime—just deactivate the
              license key on the old computer first, then activate it on the new one. Every plan (Monthly, Yearly, and
              Lifetime) is licensed for <strong>one active computer at a time</strong>; to run Investigation Flow on
              multiple computers at once, you'll need a license for each.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 mb-12">
            <div className="flex items-center gap-2">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>All Major Cards Accepted</span>
            </div>
            <div className="flex items-center gap-2">
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
              <span>Cancel Anytime</span>
            </div>
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
                  Try risk-free. Not satisfied? Full refund, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
