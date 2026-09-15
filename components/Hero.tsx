"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { getConfig, getModeContent } from "@/lib/config";
import { analytics } from "@/lib/analytics";

// useLayoutEffect warns when React renders this on the server, so fall back to
// useEffect there. The layout pass only matters in the browser anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const heroContent = getModeContent("hero");
  const audiences = getConfig("heroAudiences");
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [audienceIndex, setAudienceIndex] = useState(0);
  // The word being animated out. Held in state (not a ref) because unmounting
  // it has to happen on a render, once its transition has finished.
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  // True for exactly one frame after the word changes, while the incoming word
  // sits in its "from" styles. A newly mounted element has nothing to
  // transition from - if it mounts already at its final opacity it simply
  // appears, which is why the incoming word used to pop in while the outgoing
  // one faded. Mount it hidden, then flip it on the next frame so the browser
  // has two states to interpolate between.
  const [entering, setEntering] = useState(false);

  // MOTION_MS must match the duration-500 class on the words below.
  const MOTION_MS = 500;

  useEffect(() => {
    if (!entering) return;
    // Two frames: the first guarantees the browser has painted the "from"
    // styles, the second starts the transition. One frame is enough in most
    // browsers but not reliably in all of them.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntering(false));
    });
    // rAF is suspended in a background tab. Rotation only starts after an
    // interaction, so the tab is normally visible, but if it is backgrounded
    // mid-rotation the incoming word would otherwise stay stuck invisible
    // until the visitor came back. This releases it either way.
    const fallback = setTimeout(() => setEntering(false), 80);
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      clearTimeout(fallback);
    };
  }, [entering, audienceIndex]);

  useEffect(() => {
    if (leavingIndex === null) return;
    // Keep the outgoing word mounted for the length of its fade, then drop it
    // so the heading holds a single word again between rotations.
    const t = setTimeout(() => setLeavingIndex(null), MOTION_MS);
    return () => clearTimeout(t);
  }, [leavingIndex]);

  // The interval's closure would capture a stale index, so the current one is
  // mirrored into a ref for it to read.
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = audienceIndex;
  }, [audienceIndex]);

  const rotate = () => {
    const from = indexRef.current;
    setLeavingIndex(from);
    setAudienceIndex((from + 1) % audiences.length);
    setEntering(true);
  };

  // Measure every word so the slot can reserve the widest one. A slot that
  // hugged the active word would change line 1's total width on each rotation,
  // and centering would then shove "Give" left and right. Re-measure on resize,
  // since the font size changes across breakpoints.
  //
  // The first measurement runs in a layout effect, synchronously and before
  // paint, rather than inside requestAnimationFrame. The slot used to contain
  // an in-flow invisible copy of the longest word, so it was naturally wide
  // enough even before JS measured anything; that copy is gone now (it was
  // polluting the heading's text), which makes the reserved width entirely
  // dependent on this measurement. rAF is the wrong tool for that: it does not
  // fire at all in a background tab, and it lands after first paint, which
  // would let the slot resize under a painted headline.
  useIsomorphicLayoutEffect(() => {
    let frame = 0;
    const measure = () =>
      setWidths(audiences.map((_, i) => wordRefs.current[i]?.offsetWidth ?? 0));
    measure();
    // Resize fires faster than layout settles, so coalesce to one measurement
    // per frame rather than measuring mid-reflow.
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", schedule);
    // Inter arrives after first paint and changes every width.
    document.fonts?.ready.then(measure).catch(() => {});
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

    // Hold the rotation briefly before starting it, for a performance reason
    // that is easy to miss: this <h1> is the LCP element, and a word fading in
    // from opacity-0 makes newly-visible text inside the LCP block, which the
    // browser can treat as a fresh largest-contentful-paint candidate.
    // Rotating from load measured 5.9-6.0s against a 1.4s FCP, and no amount
    // of image work moved it, because the LCP element was never an image.
    //
    // START_DELAY_MS is the whole trade. Gating purely on first interaction
    // guarantees no LCP impact (the browser stops accepting candidates at the
    // first input) but means a visitor who reads the hero without scrolling or
    // clicking never sees the rotation at all - which defeats the point of
    // naming three audiences. A short delay gets the animation back for
    // everyone while still sitting outside the window a page-load audit
    // typically measures. An interaction before the delay starts it early,
    // which costs nothing: input finalises LCP anyway.
    const START_DELAY_MS = 4000;
    let id: ReturnType<typeof setInterval> | undefined;
    const events = ["pointerdown", "keydown", "touchstart", "scroll"];

    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      clearTimeout(delay);
      if (id) return;
      rotate();
      id = setInterval(rotate, 2600);
    };

    const delay = setTimeout(start, START_DELAY_MS);
    events.forEach((e) =>
      window.addEventListener(e, start, { passive: true, once: true })
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      clearTimeout(delay);
      if (id) clearInterval(id);
    };
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
                // A one-cell inline grid. Both the outgoing and incoming
                // words occupy that same cell, so they overlay exactly while
                // both stay in normal flow. The previous approach kept the
                // active word in flow and absolutely positioned the outgoing
                // one at top-0, but an inline-block word sits 28.8px below the
                // slot's top on the baseline, so every rotation made the
                // outgoing word jump up before it faded.
                // justify-items-start pins the words left; the surrounding
                // container is text-center, which would otherwise centre each
                // word in the reserved slot and make "Give" appear to shift.
                className="inline-grid justify-items-start whitespace-nowrap align-baseline"
                style={slotWidth ? { width: slotWidth } : undefined}
              >
                {/* Only the active word (and, mid-transition, the outgoing one)
                    is rendered here. Every audience used to be in the markup at
                    once, alongside an invisible sizing copy, so the heading's
                    text content read
                    "Give adjustersadjustersattorneysclientsevidence they can use"
                    to anything parsing the DOM - crawlers included. The active
                    word sits in normal flow so it still establishes the line
                    box's height and baseline without a duplicate. Measurement
                    now happens in the off-screen rig below the heading. */}
                {audiences.map((word, i) => {
                  const isActive = i === audienceIndex;
                  const isLeaving = i === leavingIndex && !isActive;
                  if (!isActive && !isLeaving) return null;
                  // The incoming word mounts one frame below and transparent,
                  // then `entering` clears and it rises into place. Without
                  // that first frame there is no start value to animate from
                  // and it would simply appear.
                  const motion = isActive
                    ? entering
                      ? "opacity-0 translate-y-[0.4em]"
                      : "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-[0.4em]";
                  return (
                    <span
                      key={word}
                      aria-hidden={!isActive}
                      // Words are pinned to the slot's left edge, not centered
                      // in it: centering would split the slack in two and open
                      // a gap after "Give" on the shorter words. Left-aligned,
                      // the slack all falls at the end of the line where it
                      // reads as nothing.
                      //
                      // Transition opacity and translate only. transition-all
                      // would also animate the inherited font-size across the
                      // sm breakpoint, so a resize would measure a word
                      // mid-shrink and latch a too-wide slot, leaving a gap
                      // after "Give" until the next resize.
                      className={`gradient-text col-start-1 row-start-1 whitespace-nowrap transition-[opacity,translate] duration-500 ease-out ${motion}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </span>
            {/* Separates the two block lines in the heading's text content, so
                it reads "Give adjusters evidence they can use" rather than
                "adjustersevidence" when the tags are stripped. Whitespace-only
                content between two block boxes generates no box, so this is
                invisible on the page. */}
            {" "}
            {/* text-balance keeps the wrap even on phones ("evidence they" /
                "can use") instead of leaving "use" alone on a line. */}
            <span className="block text-balance">evidence they can use</span>
          </h1>

          {/* Width-measuring rig. Deliberately a sibling of the <h1> rather
              than a child, so these copies stay out of the heading's text.
              Font classes mirror the <h1> exactly or the measurements would be
              wrong at every breakpoint. `invisible` (visibility: hidden) is
              required over `hidden` or sr-only's clip: the element must still
              be laid out for offsetWidth to return a real number. */}
          <div
            aria-hidden="true"
            className="pointer-events-none invisible absolute whitespace-nowrap text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {audiences.map((word, i) => (
              <span
                key={word}
                className="inline-block"
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
              >
                {word}
              </span>
            ))}
          </div>

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
          width={1920}
          height={1068}
          priority
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
