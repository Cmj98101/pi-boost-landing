"use client";

import { useState, useEffect, useRef } from "react";
import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function BuyContent() {
  const pricingConfig = getConfig("pricing");
  const teamConfig = pricingConfig.team;
  const [isVisible, setIsVisible] = useState(false);
  const [loadingOption, setLoadingOption] = useState<string | null>(null);
  const [teamBilling, setTeamBilling] = useState<"yearly" | "monthly" | "contact">("yearly");
  const [teamSeats, setTeamSeats] = useState<number>(teamConfig.defaultSeats);
  const sectionRef = useRef<HTMLElement>(null);

  // Volume pricing: find the first tier whose `upTo` covers the seat count.
  // The "contact" tab has no plan/price (custom quote for 50+ seats).
  const teamPlan = teamBilling === "contact" ? null : teamConfig.plans[teamBilling];
  const resolveRate = (
    tiers: readonly { readonly upTo: number | null; readonly price: number }[],
    seats: number
  ) => (tiers.find((t) => t.upTo === null || seats <= t.upTo) ?? tiers[tiers.length - 1]).price;

  const perSeat = teamPlan ? resolveRate(teamPlan.tiers, teamSeats) : 0;
  const baseRate = teamPlan ? teamPlan.tiers[0].price : 0;
  const teamTotal = perSeat * teamSeats;
  const savingsTotal = (baseRate - perSeat) * teamSeats;
  const savingsPct = baseRate > 0 ? Math.round(((baseRate - perSeat) / baseRate) * 100) : 0;
  const money = (n: number) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);

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
        analytics.proceedToCheckout(optionId);
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

  const handleTeamCheckout = async () => {
    if (!teamPlan) return;
    setLoadingOption(teamPlan.id);

    analytics.paymentButtonClicked(teamPlan.id);
    analytics.trialSignupStarted(teamPlan.id);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: teamPlan.id,
          quantity: teamSeats,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        analytics.proceedToCheckout(teamPlan.id);
        window.open(data.url, "_blank");
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
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white"
      >
        {/* Decorative background */}

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="display-xl mb-4">
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
                    className="w-5 h-5 text-ink"
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
          {/* The plan cards below are H3s. This H2 gives them a parent so the
              outline runs H1 -> H2 -> H3 instead of skipping a level. The
              design has no visible heading here, so it's screen-reader only. */}
          <h2 className="sr-only">Plans and pricing</h2>
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
                    <div className="badge">
                      {option.badge}
                    </div>
                  </div>
                )}

                {/* Card: the featured tier flips to the dark card (DESIGN-webflow.md) */}
                <div
                  className={`relative h-full text-center !p-0 ${
                    option.highlighted ? "card-dark shadow-layered-strong" : "card"
                  }`}
                >
                  <div className="p-8 md:p-10 h-full flex flex-col">
                    {/* Option Name */}
                    <h3 className={`display-xs mb-2 min-h-[3.5rem] flex items-center justify-center text-center ${option.highlighted ? "!text-white" : ""}`}>
                      {option.name}
                    </h3>

                    {/* Price */}
                    <div className={`mb-1 flex items-start justify-center leading-none font-semibold ${option.highlighted ? "text-white" : "text-ink"}`}>
                      <span className="text-2xl md:text-3xl mt-1.5">
                        $
                      </span>
                      <span className="text-4xl md:text-5xl tracking-tight">
                        {whole}
                      </span>
                      {cents && (
                        <span className="text-xl md:text-2xl mt-1.5">
                          .{cents}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-4 ${option.highlighted ? "text-white/60" : "text-mute"}`}>{option.period}</p>

                    {/* Description */}
                    <p className={`mb-4 ${option.highlighted ? "text-white/80" : "text-body"}`}>{option.description}</p>

                    {/* Support info */}
                    <p className={`text-xs mb-6 ${option.highlighted ? "text-white/60" : "text-mute"}`}>{option.support}</p>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSelectOption(option.id)}
                      disabled={loadingOption !== null}
                      className={`btn-primary mt-auto w-full ${option.highlighted ? "btn-on-dark" : ""}`}
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
            <div className="card relative overflow-hidden !p-0">
              {/* Accent bar */}

              <div className="p-8 md:p-10">
                {/* Heading */}
                <div className="mb-8">
                  <p className="eyebrow mb-3">Team</p>
                  <h2 className="display-lg">
                    {teamConfig.headline}
                  </h2>
                  <p className="text-slate-600 mt-2 max-w-2xl">
                    {teamConfig.subheadline}
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
                  {/* Left: billing toggle + seat selector */}
                  <div className="flex flex-col">
                    {/* Billing tabs */}
                    <div className="inline-flex p-1 bg-surface rounded-sm border border-hairline mb-8 self-start">
                      {(["yearly", "monthly", "contact"] as const).map((key) => (
                        <button
                          key={key}
                          onClick={() => setTeamBilling(key)}
                          className={`px-5 py-2 rounded-xs text-sm font-medium transition-all ${
                            teamBilling === key
                              ? "bg-white text-ink shadow-sm"
                              : "text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          {key === "contact"
                            ? teamConfig.contact.label
                            : teamConfig.plans[key].label}
                          {key === "yearly" && (
                            <span className="ml-2 text-xs font-semibold text-ink">
                              Best value
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {teamBilling === "contact" ? (
                      <div className="flex-1 flex items-center">
                        <p className="text-slate-600 leading-relaxed">
                          Running Investigation Flow on more than {teamConfig.maxSeats}{" "}
                          computers? We&apos;ll set you up with custom volume pricing and
                          licensing for your agency or department. Just reach out.
                        </p>
                      </div>
                    ) : (
                      <>
                    {/* Seat selector */}
                    <div className="mb-3 flex items-end justify-between">
                      <label className="text-sm font-semibold text-slate-700">
                        How many computers?
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setTeamSeats((n) => Math.max(teamConfig.minSeats, n - 1))
                          }
                          disabled={teamSeats <= teamConfig.minSeats}
                          className="w-9 h-9 rounded-lg border border-slate-300 text-slate-700 font-semibold text-lg leading-none hover:bg-slate-50 disabled:opacity-40"
                          aria-label="Remove a computer"
                        >
                          −
                        </button>
                        <span className="w-12 text-center text-xl font-semibold text-slate-900 tabular-nums">
                          {teamSeats}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setTeamSeats((n) => Math.min(teamConfig.maxSeats, n + 1))
                          }
                          disabled={teamSeats >= teamConfig.maxSeats}
                          className="w-9 h-9 rounded-lg border border-slate-300 text-slate-700 font-semibold text-lg leading-none hover:bg-slate-50 disabled:opacity-40"
                          aria-label="Add a computer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={teamConfig.minSeats}
                      max={teamConfig.maxSeats}
                      value={teamSeats}
                      onChange={(e) => setTeamSeats(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                      aria-label="Number of computers"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>{teamConfig.minSeats}</span>
                      <span>{teamConfig.maxSeats}+</span>
                    </div>

                    {/* One-key explanation */}
                    <div className="mt-8 p-4 bg-slate-50 rounded-md border border-slate-200 flex gap-3">
                      <svg
                        className="w-5 h-5 text-ink flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">
                          One license key for {teamSeats} computer
                          {teamSeats === 1 ? "" : "s"}.
                        </strong>{" "}
                        {teamConfig.keyExplanation}
                      </p>
                    </div>
                      </>
                    )}
                  </div>

                  {/* Right: live price summary + checkout (or contact CTA) */}
                  <div className="card-dark p-6 md:p-8 flex flex-col">
                    {teamBilling === "contact" ? (
                      <>
                        <h3 className="display-xs !text-white">
                          {teamConfig.contact.headline}
                        </h3>
                        <p className="text-white/80 mt-2">
                          {teamConfig.contact.body}
                        </p>
                        <a
                          href="/contact"
                          className="btn-primary mt-auto w-full btn-on-dark"
                        >
                          {teamConfig.contact.buttonText}
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
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </a>
                      </>
                    ) : (
                      <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                        {money(teamTotal)}
                      </span>
                      <span className="text-white/60 font-medium">
                        {teamPlan?.totalSuffix}
                      </span>
                    </div>
                    <p className="text-white/80 mt-1">
                      {teamSeats} {teamSeats === 1 ? "computer" : "computers"} ×{" "}
                      {money(perSeat)}
                      {teamPlan?.unitSuffix}
                    </p>

                    {savingsPct > 0 ? (
                      <div className="mt-4 inline-flex items-center gap-2 self-start px-3 py-1.5 bg-accent-green rounded-sm">
                        <svg
                          className="w-4 h-4 text-ink"
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
                        <span className="text-sm font-semibold text-ink">
                          Save {money(savingsTotal)}
                          {teamPlan?.totalSuffix} ({savingsPct}% off)
                        </span>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-white/60">
                        Add a 4th computer to unlock volume pricing.
                      </p>
                    )}

                    <button
                      onClick={handleTeamCheckout}
                      disabled={loadingOption !== null}
                      className="btn-primary mt-auto w-full btn-on-dark"
                    >
                      {loadingOption === teamPlan?.id ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue to checkout
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
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Secure checkout · one key, activate on every computer
                    </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Single Use Disclaimer */}
          <div className="mb-12 p-6 bg-slate-50 rounded-md border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About the Lifetime (V1) License
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              The Lifetime (V1) License is a one-time purchase that runs Investigation Flow <strong>Version 1</strong> on
              {" "}<strong>one computer at a time</strong>, with all Version 1 updates included. No recurring fees. Future
              major versions (such as Version 2) are sold separately.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Need to switch machines? You can move the license to a different computer anytime. Just deactivate the
              license key on the old computer first, then activate it on the new one. Every plan (Monthly, Yearly, and
              Lifetime) is licensed for <strong>one active computer at a time</strong>; to run Investigation Flow on
              multiple computers at once, you'll need a license for each.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 mb-12">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-ink"
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
                className="w-5 h-5 text-ink"
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
                className="w-5 h-5 text-ink"
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
          <div className="text-center mb-8">
            <div className="card inline-flex items-center gap-3 px-6 py-4">
              <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0">
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
                <p className="font-semibold text-slate-900">
                  30-Day Money-Back Guarantee
                </p>
                <p className="text-sm text-slate-600">
                  Try risk-free. Not satisfied? Full refund, no questions asked.
                </p>
              </div>
            </div>
          </div>

          {/* Free Trial Banner */}
          <div className="text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-5 py-3 bg-surface border border-hairline rounded-md text-sm md:text-base">
              <svg
                className="w-5 h-5 text-ink flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="text-slate-700">
                {pricingConfig.trialBanner.text}
              </span>
              <a
                href={pricingConfig.trialBanner.href}
                className="font-medium text-ink underline underline-offset-2"
              >
                {pricingConfig.trialBanner.linkText}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
