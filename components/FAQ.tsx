"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Can I timestamp videos in batch?",
      answer: "Yes! Investigation Flow supports both individual video timestamping and batch processing. You can process entire folders of surveillance footage with just a few clicks, saving you hours of work.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "What video formats are supported?",
      answer: "Investigation Flow supports all common video formats including MP4, MOV, AVI, WMV, and more. You can export your timestamped videos in MP4 or MOV format, which are universally compatible with courts and clients.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "Is Investigation Flow available for both Mac and Windows?",
      answer: "Yes! Investigation Flow is available as a native application for both macOS and Windows. You'll get the same features and performance on both platforms.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: "Can I customize the timestamp format?",
      answer: "Absolutely. Investigation Flow offers extensive customization options including timestamp format (date/time styles), position on screen, font size, color, and more. You can also edit timestamps after they've been added.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      question: "Can I stitch clips together and pull still shots?",
      answer: "Yes. You can stitch multiple surveillance clips into one logical, chronological sequence, keep or remove the audio on each clip, and grab court-ready still shots straight from the footage you're editing—all without a separate editor.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      question: "Do you offer a subscription or a one-time purchase?",
      answer: "Both. You can subscribe monthly or yearly (the yearly plan saves about 34%), or buy a one-time Version 1 lifetime license for a single device that includes all Version 1 updates. Future major versions are sold separately. Subscriptions include priority email support; all plans include email support.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees. If you cancel, you'll retain access until the end of your billing period.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">
              FAQ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            <span className="gradient-text">Frequently Asked</span> Questions
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Everything you need to know about Investigation Flow
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-luxury overflow-hidden transition-all duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-start gap-4 p-6 text-left transition-colors hover:bg-slate-50"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {faq.icon}
                </div>

                {/* Question */}
                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 pr-8">
                    {faq.question}
                  </h3>
                </div>

                {/* Chevron */}
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pl-20">
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-white rounded-2xl shadow-lg border border-slate-200">
            <p className="text-lg font-semibold text-slate-900">
              Still have questions?
            </p>
            <p className="text-slate-600">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a
              href="mailto:chris@systumboost.com"
              className="btn-primary-luxury inline-flex items-center gap-2"
            >
              Contact Support
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
