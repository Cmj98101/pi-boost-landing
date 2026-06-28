"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";

export default function LiveDemo() {
  const demoUrl = getConfig("demoUrl");
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
      id="demo"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50 scroll-mt-20"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Heading */}
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
            <span className="text-sm font-semibold text-purple-700">
              LIVE DEMO: NO DOWNLOAD, NO SIGNUP
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Try It Free,{" "}
            <span className="gradient-text">Right in Your Browser</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Drop in a clip, add a court-ready timestamp, and download the MP4. See
            exactly how it works before you install a thing.
          </p>
        </div>

        {/* Browser-framed preview of the live site */}
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.demoClicked("livedemo-preview")}
          className={`group block max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-white transition-all duration-700 hover:shadow-purple-200/50 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-md flex items-center justify-center gap-2 px-4 py-1.5 bg-white rounded-lg text-xs md:text-sm text-slate-500 border border-slate-200">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                timestamp.investigationflow.com
              </div>
            </div>
          </div>

          {/* Screenshot */}
          <div className="relative">
            <Image
              src="/demo-preview.png"
              alt="Investigation Flow live demo: add a court-ready timestamp to any clip"
              width={1440}
              height={900}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300">
              <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-xl font-semibold text-slate-900">
                Open the live demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
        </a>

        {/* CTA */}
        <div
          className={`mt-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.demoClicked("livedemo-button")}
            className="btn-primary-luxury inline-flex items-center justify-center gap-2 text-lg group"
          >
            Open the Live Demo
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
