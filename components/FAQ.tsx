"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the 7-day free trial work?",
      answer: "Simply download PI Boost and start using all features immediately. No credit card required. After 7 days, choose a plan to continue using the software."
    },
    {
      question: "Can I timestamp videos in batch?",
      answer: "Yes! PI Boost supports both individual video timestamping and batch processing. You can process entire folders of surveillance footage with just a few clicks, saving you hours of work."
    },
    {
      question: "What video formats are supported?",
      answer: "PI Boost supports all common video formats including MP4, MOV, AVI, WMV, and more. You can export your timestamped videos in MP4 or MOV format, which are universally compatible with courts and clients."
    },
    {
      question: "Is PI Boost available for both Mac and Windows?",
      answer: "Yes! PI Boost is available as a native application for both macOS and Windows. You'll get the same features and performance on both platforms."
    },
    {
      question: "Can I customize the timestamp format?",
      answer: "Absolutely. PI Boost offers extensive customization options including timestamp format (date/time styles), position on screen, font size, color, and more. You can also edit timestamps after they've been added."
    },
    {
      question: "How does project management work?",
      answer: "PI Boost includes built-in project management to help you organize videos by case. Create projects for each investigation, add videos, and keep everything organized in one place."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include priority email support. Yearly subscribers also get priority phone support and a dedicated account manager. We're here to help you succeed with PI Boost."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees. If you cancel, you'll retain access until the end of your billing period."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about PI Boost
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-white shadow-lg">
              <input
                type="radio"
                name="faq-accordion"
                checked={openIndex === index}
                onChange={() => setOpenIndex(openIndex === index ? null : index)}
              />
              <div className="collapse-title text-xl font-semibold pr-12">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-gray-600 pt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
