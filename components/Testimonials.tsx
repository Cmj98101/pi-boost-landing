import { PILLARS, TRUST_BADGES } from "@/lib/content";
import { Icon } from "@/components/icons";

export default function Testimonials() {
  return (
    <section
      id="why"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Built Around the{" "}
            <span className="gradient-text">Real Surveillance Workflow</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
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
              <div className="card-luxury h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${pillar.gradient} rounded-2xl flex items-center justify-center shadow-lg text-white`}
                  >
                    <Icon name={pillar.icon} className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
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
          <div className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-8 py-6 bg-white rounded-2xl shadow-lg border border-slate-200">
            {TRUST_BADGES.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
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
                <span className="font-semibold text-slate-900">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
