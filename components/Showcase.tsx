import Image from "next/image";
import { SHOWCASE_ITEMS } from "@/lib/content";

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Decorative background */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-200/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-200/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            This Is <span className="gradient-text">The Actual App</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            No mockups. Real footage, real case, real screens from Investigation
            Flow running on a Mac.
          </p>
        </div>

        {/* Alternating image / copy rows */}
        <div className="space-y-20 md:space-y-28">
          {SHOWCASE_ITEMS.map((item, index) => (
            <div
              key={item.src}
              className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Copy. On mobile it always sits above the shot; on desktop it
                  alternates sides so the eye zig-zags down the section. */}
              <div
                className={`lg:col-span-4 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wider gradient-text mb-3">
                  {item.eyebrow}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* The screenshots ship as transparent PNGs with their window
                  shadow already baked in, so they need no frame of their own. */}
              <div
                className={`lg:col-span-8 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
