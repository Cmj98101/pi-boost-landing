"use client";

import { useState } from "react";
import PaymentButton from "./PaymentButton";
import { analytics } from "@/lib/analytics";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Track email capture attempt
    analytics.emailCaptureStart();

    try {
      const response = await fetch("/api/email-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Thank you! We'll notify you when we launch.");
        setEmail("");
        setFirstName("");
        setLastName("");

        // Track successful email capture
        analytics.emailCaptureSuccess(email);
      } else {
        const errorMsg = data.error || "Something went wrong. Please try again.";
        setMessage(errorMsg);

        // Track failed email capture
        analytics.emailCaptureFailed(errorMsg);
      }
    } catch (error) {
      const errorMsg = "Something went wrong. Please try again.";
      setMessage(errorMsg);

      // Track failed email capture
      analytics.emailCaptureFailed(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center bg-white py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Left side - Hero content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Convert Investigation Videos in Minutes
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Transform your surveillance footage into court-ready evidence with just a few
                clicks. Add timestamps, remove audio, and convert to standard MP4 format.
              </p>
            </div>

            {/* Feature checkmarks */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-base md:text-lg">
                  Convert any video format to standard MP4
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-base md:text-lg">
                  Add accurate timestamps to surveillance footage
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-base md:text-lg">
                  Remove audio for privacy and legal compliance
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <PaymentButton
                text="Start 7-Day Free Trial"
                variant="primary"
                size="lg"
                className="text-white"
              />
            </div>

            {/* Sign in link */}
            <div>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 transition-colors"
              >
                Already have an account? Sign in
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

          {/* Right side - Email capture card */}
          <div className="lg:pt-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 max-w-md mx-auto lg:mx-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Get Early Access
              </h3>
              <p className="text-gray-600 mb-6">
                Join our waiting list to be notified when our software launches.
              </p>

              {isSuccess ? (
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-green-600 text-4xl mb-2">✓</div>
                  <p className="text-green-600 font-semibold">{message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Joining..." : "Notify Me"}
                  </button>
                  {message && !isSuccess && (
                    <p className="text-center text-sm text-red-600">{message}</p>
                  )}
                </form>
              )}

              {/* App mockup image */}
              <div className="mt-8 bg-gray-900 rounded-lg p-4">
                <div className="bg-gray-800 rounded-t-lg px-3 py-2 flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-sm font-medium ml-2">
                    PI Video Converter
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Convert Video</div>
                      <div className="text-xs text-gray-500">MOV, AVI to MP4</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Add Timestamp</div>
                      <div className="text-xs text-gray-500">Date & Time overlay</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">Remove Audio</div>
                      <div className="text-xs text-gray-500">Ensure privacy compliance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
