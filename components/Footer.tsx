export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-white py-16 md:py-20 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo-full-white.png"
                alt="Investigation Flow"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professional video timestamping software for private
              investigators.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 flex items-center justify-center transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-white text-lg">Product</h4>
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
            </ul>
          </div>

          {/* Downloads */}
          <div>
            <h4 className="font-bold mb-4 text-white text-lg">Download</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
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
                  href="#"
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
            <h4 className="font-bold mb-4 text-white text-lg">Support</h4>
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
