"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getConfig } from "@/lib/config";

export default function Navigation() {
  const demoUrl = getConfig("demoUrl");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why It Works", href: "#why" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                document
                  .querySelector("#hero")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <img
              src="/logo-full.png"
              alt="Investigation Flow"
              className="h-9 md:h-10 w-auto group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={
                  link.href.startsWith("#")
                    ? isHomePage
                      ? link.href
                      : `/${link.href}`
                    : link.href
                }
                onClick={(e) => {
                  if (link.href.startsWith("#") && isHomePage) {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`font-medium transition-colors hover:text-purple-600 ${
                  isScrolled ? "text-slate-700" : "text-slate-700"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-luxury"
            >
              Try the Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${
                isScrolled ? "text-slate-900" : "text-slate-900"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={
                  link.href.startsWith("#")
                    ? isHomePage
                      ? link.href
                      : `/${link.href}`
                    : link.href
                }
                onClick={(e) => {
                  if (link.href.startsWith("#") && isHomePage) {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block text-slate-700 font-medium hover:text-purple-600 transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary-luxury w-full text-center block"
            >
              Try the Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
