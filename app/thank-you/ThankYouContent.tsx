"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLive = process.env.NEXT_PUBLIC_LAUNCH_MODE === "live";
  const foundersLink = process.env.STRIPE_FOUNDERS_PAYMENT_LINK_URL || "#";
  const macosDownloadUrl = process.env.NEXT_PUBLIC_MACOS_DOWNLOAD_URL || "#";
  const windowsDownloadUrl = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "#";

  useEffect(() => {
    if (sessionId) {
      // Fetch session data to show user details
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  // Waitlist Mode - Pre-Launch
  if (!isLive) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
          <div className="card-luxury text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              You're on the <span className="gradient-text">Waitlist!</span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We'll email you the moment Investigation Flow launches.
            </p>

            {/* What Happens Next */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-bold text-lg text-slate-900 mb-4">What happens next:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <p className="text-slate-700">We'll email you the moment we launch (2-3 weeks)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <p className="text-slate-700">Get instant download links for macOS & Windows</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <p className="text-slate-700">Start your 7-day free trial immediately</p>
                </div>
              </div>
            </div>

            {/* Founder's Pricing Offer */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-4">
                <span className="text-sm font-semibold">LIMITED TIME OFFER</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Lock in Founder's Pricing
              </h3>

              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-3xl md:text-4xl font-bold line-through opacity-60">$14.99</span>
                <span className="text-5xl md:text-6xl font-bold">$9.99</span>
                <span className="text-xl">/month</span>
              </div>

              <p className="text-lg mb-6 text-white/90">
                Pay now and lock in founding-user pricing <strong>forever</strong>. First 100 only.
              </p>

              <div className="space-y-3 mb-6 text-left">
                {[
                  "Locked-in founding-user discount, forever",
                  "Access the moment we launch",
                  "All future features included",
                  "Priority support",
                  "Cancel anytime"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={foundersLink}
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl text-lg w-full"
              >
                Claim Founder's Pricing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <p className="text-sm text-white/70 mt-4">67 of 100 spots claimed</p>
            </div>

            <div className="space-y-4">
              <Link href="/" className="btn-secondary-luxury inline-flex items-center justify-center gap-2">
                Return to Home
              </Link>

              <p className="text-sm text-slate-500">
                Questions? Email{" "}
                <a href="mailto:chris@systumboost.com" className="text-purple-600 hover:underline font-medium">
                  chris@systumboost.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Live Mode - Download Page
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="card-luxury text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Your <span className="gradient-text">Free Trial</span> Has Started!
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            Download Investigation Flow and start timestamping videos in minutes.
          </p>

          {/* Download Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a
              href={macosDownloadUrl}
              className="card-luxury group hover:shadow-xl transition-all p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 rounded-2xl flex items-center justify-center transition-all">
                <svg className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 group-hover:text-purple-700 transition-colors">Download for macOS</h3>
              <p className="text-sm text-slate-600">macOS 11.0 or later</p>
            </a>

            <a
              href={windowsDownloadUrl}
              className="card-luxury group hover:shadow-xl transition-all p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 rounded-2xl flex items-center justify-center transition-all">
                <svg className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 group-hover:text-purple-700 transition-colors">Download for Windows</h3>
              <p className="text-sm text-slate-600">Windows 10 or later</p>
            </a>
          </div>

          {/* Trial Details */}
          {sessionData && (
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Your Trial Details</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Trial Period</p>
                  <p className="font-bold text-2xl text-slate-900">7 Days</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Trial Ends</p>
                  <p className="font-bold text-2xl text-slate-900">
                    {sessionData.trial_end
                      ? new Date(sessionData.trial_end * 1000).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <p className="font-bold text-2xl text-green-600">Active</p>
                </div>
              </div>
            </div>
          )}

          {/* Getting Started Steps */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg text-slate-900 mb-4 text-center">Getting Started</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 font-bold text-sm">1</span>
                </div>
                <p className="text-slate-700">Download and install Investigation Flow</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 font-bold text-sm">2</span>
                </div>
                <p className="text-slate-700">Open the app and enter your email to activate</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <p className="text-slate-700">Start timestamping your first video!</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/" className="btn-secondary-luxury inline-flex items-center justify-center gap-2">
              Return to Home
            </Link>

            <p className="text-sm text-slate-500">
              Need help? Email{" "}
              <a href="mailto:chris@systumboost.com" className="text-purple-600 hover:underline font-medium">
                chris@systumboost.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
