"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-white py-16 md:py-20 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo-full-white.png"
                alt="Investigation Flow"
                width={1682}
                height={357}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professional video timestamping software for private
              investigators.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Product</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#features")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#faq")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/learn"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  Learn
                </a>
              </li>
              <li>
                <a
                  href="/updates"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Compare</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/investigation-video-editor-alternative"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-start gap-2 group text-sm"
                >
                  <span className="w-1 h-1 mt-2 bg-purple-500 rounded-full shrink-0 group-hover:w-2 transition-all"></span>
                  Investigation Flow vs. IVE
                </a>
              </li>
              <li>
                <a
                  href="/v3-video-editor-alternative"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-start gap-2 group text-sm"
                >
                  <span className="w-1 h-1 mt-2 bg-purple-500 rounded-full shrink-0 group-hover:w-2 transition-all"></span>
                  Investigation Flow vs. V3
                </a>
              </li>
              <li>
                <a
                  href="/imovie-alternative"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-start gap-2 group text-sm"
                >
                  <span className="w-1 h-1 mt-2 bg-purple-500 rounded-full shrink-0 group-hover:w-2 transition-all"></span>
                  Investigation Flow vs. iMovie
                </a>
              </li>
              <li>
                <a
                  href="/wondershare-alternative"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-start gap-2 group text-sm"
                >
                  <span className="w-1 h-1 mt-2 bg-purple-500 rounded-full shrink-0 group-hover:w-2 transition-all"></span>
                  Investigation Flow vs. Wondershare
                </a>
              </li>
            </ul>
          </div>

          {/* Downloads */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Download</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/download"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 flex items-center justify-center transition-all">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <span>Download for macOS</span>
                </a>
              </li>
              <li>
                <a
                  href="/download"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 flex items-center justify-center transition-all">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  </div>
                  <span>Download for Windows</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@investigationflow.com"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@investigationflow.com?subject=Cancel%20Subscription"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  Cancel Subscription
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@investigationflow.com?subject=Billing%20Question"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all"></span>
                  Billing Questions
                </a>
              </li>
            </ul>
            <p className="text-slate-500 text-xs mt-4">
              We respond within 24 hours
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Investigation Flow. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="mailto:support@investigationflow.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
