"use client";

import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
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

  const testimonials = [
    {
      quote: "This software has completely transformed how we document surveillance footage. The timestamp customization is exactly what we needed, and the batch processing saves us hours every week.",
      author: "Sarah M.",
      role: "Senior Private Investigator",
      company: "15+ years experience",
      rating: 5,
      verified: true
    },
    {
      quote: "Finally, a tool built specifically for investigators. The interface is intuitive, and the project management features help us stay organized across multiple cases.",
      author: "James R.",
      role: "Lead Investigator",
      company: "Licensed in 3 states",
      rating: 5,
      verified: true
    },
    {
      quote: "The export quality is exceptional. Our timestamped videos are court-ready and professional. This is now an essential tool in our workflow.",
      author: "Emily C.",
      role: "Private Investigator",
      company: "Handles 20+ cases monthly",
      rating: 5,
      verified: true
    }
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">
              TESTIMONIALS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Trusted by{" "}
            <span className="gradient-text">Professional Investigators</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            See what private investigators are saying about Investigation Flow
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Testimonial Card */}
              <div className="card-luxury h-full flex flex-col">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="mb-4">
                  <svg
                    className="w-10 h-10 text-purple-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Quote */}
                <p className="text-slate-700 leading-relaxed mb-6 flex-grow italic">
                  "{testimonial.quote}"
                </p>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Author Info */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {testimonial.author.charAt(0)}
                  </div>

                  {/* Author Details */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900">
                        {testimonial.author}
                      </p>
                      {testimonial.verified && (
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-8 px-8 py-6 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[72, 50, 32, 25, 18, 64].map((id) => (
                  <img
                    key={id}
                    src={`https://avatar.iran.liara.run/public/${id}`}
                    alt={`User ${id}`}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">500+ Investigators</p>
                <p className="text-sm text-slate-600">Trust Investigation Flow</p>
              </div>
            </div>

            <div className="h-12 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">4.9/5 Rating</p>
                <p className="text-sm text-slate-600">Based on 200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
