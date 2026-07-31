"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getConfig, getModeContent } from "@/lib/config";
import { analytics } from "@/lib/analytics";

export default function Hero() {
  const heroContent = getModeContent("hero");
  const audiences = getConfig("heroAudiences");
  // Seeds the initial width before real pixel widths are measured.
  const longestAudience = audiences.reduce(
    (a, b) => (b.length > a.length ? b : a),
    ""
  );
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [audienceIndex, setAudienceIndex] = useState(0);
  // The prior index survives one render after a change, so the outgoing word
  // can slide up and out while the incoming word rises into place.
  const prevIndexRef = useRef(0);
  const prevIndex = prevIndexRef.current;
  useEffect(() => {
    prevIndexRef.current = audienceIndex;
  }, [audienceIndex]);

  // Measure every word so the slot can reserve the widest one. A slot that
  // hugged the active word would change line 1's total width on each rotation,
  // and centering would then shove "Give" left and right. Re-measure on resize,
  // since the font size changes across breakpoints.
  useEffect(() => {
    let frame = 0;
    const measure = () =>
      setWidths(audiences.map((_, i) => wordRefs.current[i]?.offsetWidth ?? 0));
    // Resize fires faster than layout settles, so coalesce to one measurement
    // per frame rather than measuring mid-reflow.
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("resize", schedule);
    // Inter arrives after first paint and changes every width.
    document.fonts?.ready.then(schedule).catch(() => {});
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
    };
  }, [audiences]);
  const slotWidth = widths.length ? Math.max(...widths) : 0;

  useEffect(() => {
    // Respect users who prefer less motion: hold on the first audience.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setAudienceIndex((i) => (i + 1) % audiences.length);
    }, 2600);
    return () => clearInterval(id);
  }, [audiences.length]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28"
    >
      {/* Luxury Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-1000"></div>

      {/* Content Container */}
      <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="space-y-10">

          {/* Main Headline: no entrance animation. This is the LCP element,
              so it must paint fully opaque immediately. The audience word
              rotates; the rest of the line stays put. */}
          {/* Steps down to text-4xl on the narrowest phones: at 48px, "Give" plus
              the longest audience word overflows a 375px viewport and orphans
              "Give" on its own line. */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-slate-900">
            {/* Line 1 holds the rotating word; keeping "evidence they can use"
                on its own line below means the word's changing width can never
                reflow the rest of the headline. */}
            <span className="block">
              Give{" "}
              <span
                className="relative inline-block whitespace-nowrap align-baseline"
                style={slotWidth ? { width: slotWidth } : undefined}
              >
                {/* Invisible word establishes the line box (height + baseline)
                    and seeds the slot width until real widths are measured. */}
                <span className="invisible" aria-hidden="true">
                  {longestAudience}
                </span>
                {/* Words are pinned to the slot's left edge, not centered in it:
                    centering would split the slack in two and open a gap after
                    "Give" on the shorter words. Left-aligned, the slack all
                    falls at the end of the line where it reads as nothing. */}
                {audiences.map((word, i) => {
                  const isActive = i === audienceIndex;
                  const isLeaving =
                    i === prevIndex && prevIndex !== audienceIndex;
                  const motion = isActive
                    ? "opacity-100 translate-y-0"
                    : isLeaving
                      ? "opacity-0 -translate-y-[0.4em]"
                      : "opacity-0 translate-y-[0.4em]";
                  return (
                    <span
                      key={word}
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      aria-hidden={!isActive}
                      // Transition opacity and translate only. transition-all
                      // would also animate the inherited font-size across the
                      // sm breakpoint, so a resize would measure a word
                      // mid-shrink and latch a too-wide slot, leaving a gap
                      // after "Give" until the next resize.
                      className={`gradient-text absolute left-0 top-0 whitespace-nowrap transition-[opacity,translate] duration-500 ease-out ${motion}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </span>
            {/* text-balance keeps the wrap even on phones ("evidence they" /
                "can use") instead of leaving "use" alone on a line. */}
            <span className="block text-balance">evidence they can use</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed animate-fade-in-up delay-300 max-w-2xl mx-auto">
            {heroContent.subheadline}
          </p>

          {/* CTA Buttons. The row stretches, so the secondary button matches
              the height the primary gains from its second line. */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <a
              href="/download"
              onClick={() => analytics.downloadNowClicked("hero")}
              className="btn-primary-luxury inline-flex flex-col items-center justify-center text-lg group"
            >
              <span className="inline-flex items-center gap-2">
                {heroContent.cta.primary}
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
              </span>
              <span className="text-xs font-normal text-white/80 mt-1">
                No credit card required
              </span>
            </a>

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary-luxury inline-flex items-center justify-center gap-2 text-lg"
            >
              {heroContent.cta.secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Product shot. Deliberately outside the max-w-5xl text column so the
          app window reads wider than the copy above it. The PNG carries its
          own window shadow on a transparent background, so it needs no frame. */}
      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 mt-12 md:mt-14 animate-fade-in-up delay-600">
        <Image
          src="/screenshots/hero.webp"
          alt="Investigation Flow with a day of surveillance clips loaded, a burned-in timestamp on the footage, and the timestamp settings panel open"
          width={2400}
          height={1335}
          priority
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
