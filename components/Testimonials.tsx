import { PILLARS, TRUST_BADGES } from "@/lib/content";
import { Icon } from "@/components/icons";

export default function Testimonials() {
  return (
    <section
      id="why"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Decorative background */}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="display-lg mb-6">
            Built Around the{" "}
            Real Surveillance Workflow
          </h2>

          <p className="body-lg max-w-3xl mx-auto">
            Adding a date and time stamp to modern surveillance footage is a
            known headache. General editors like Premiere have no easy way to do
            it. Investigation Flow was built specifically to fix that.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <div
              key={index}
              className={`animate-fade-in-up delay-${index * 100}`}
            >
              <div className="card h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-md ${pillar.accent}`}
                  >
                    <Icon name={pillar.icon} className="h-7 w-7" />
                  </div>
                </div>

                <h3 className="display-xs mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Honest trust badges (no fabricated reviews) */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="card inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-6">
            {TRUST_BADGES.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-ink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium text-ink">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
