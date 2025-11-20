"use client";

import { useState, useEffect } from "react";
import { analytics } from "@/lib/analytics";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    analytics.emailCaptureStart();

    try {
      const response = await fetch("/api/email-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Thank you! We'll notify you when we launch.");
        setEmail("");
        setFirstName("");
        setLastName("");

        analytics.emailCaptureSuccess(email);
      } else {
        const errorMsg =
          data.error || "Something went wrong. Please try again.";
        setMessage(errorMsg);

        analytics.emailCaptureFailed(errorMsg);
      }
    } catch (error) {
      const errorMsg = "Something went wrong. Please try again.";
      setMessage(errorMsg);

      analytics.emailCaptureFailed(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Luxury Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-1000"></div>

      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:py-32">

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Headline & CTA */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-100 animate-fade-in">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-700">
                Trusted by 500+ Private Investigators
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-200">
              <span className="text-slate-900">Video Time-Stamping </span>
              <span className="gradient-text">Simplified</span>
              <br />
              <span className="text-slate-900">for </span>
              <span className="gradient-text">Private Investigators</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed animate-fade-in-up delay-300">
              Correct timestamp errors, perfect video conversion, customize timestamp appearance and location - Simplified.
            </p>

            {/* Key Benefits - Quick Scan */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              {[
                "✓ Court-Ready Evidence",
                "✓ Universal Compatibility",
                "✓ Batch Processing"
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
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
              <a
                href="#pricing"
                className="btn-primary-luxury inline-flex items-center justify-center gap-2 text-lg group"
              >
                Start Free Trial
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
                href="#features"
                className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg"
              >
                See How It Works
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="flex items-center gap-8 pt-4 animate-fade-in-up delay-600">
              <div className="flex -space-x-3">
                {[72, 50, 32, 25, 18].map((id) => (
                  <img
                    key={id}
                    src={`https://avatar.iran.liara.run/public/${id}`}
                    alt={`User ${id}`}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-white shadow-md"
                  />
                ))}
              </div>

              <div className="flex flex-col">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">4.9/5</span> from 500+ investigators
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Demo / Email Capture */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Product Demo Card */}
            <div className="card-luxury-border animate-scale-in delay-700">
              {/* Video Placeholder */}
              <div className="video-container mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-slate-600 font-medium">
                      Watch 60-Second Demo
                    </p>
                    <p className="text-sm text-slate-500">
                      See how easy it is to timestamp videos
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3">
                {[
                  { icon: "🎬", text: "Convert any video format to MP4" },
                  { icon: "⏱️", text: "Add professional timestamps" },
                  { icon: "🔇", text: "Remove audio for privacy" }
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-slate-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Capture Card */}
            <div className="card-luxury glass animate-scale-in delay-800">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Get Early Access
                </h3>
                <p className="text-slate-600">
                  Join the waitlist for exclusive beta access
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
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
                  </div>
                  <p className="text-green-700 font-semibold text-lg">{message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary-luxury w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Join Waitlist
                        <svg
                          className="w-5 h-5"
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
                      </span>
                    )}
                  </button>
                  {message && !isSuccess && (
                    <p className="text-center text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      {message}
                    </p>
                  )}
                  <p className="text-center text-xs text-slate-500">
                    🔒 No spam. Unsubscribe anytime. 7-day free trial included.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
