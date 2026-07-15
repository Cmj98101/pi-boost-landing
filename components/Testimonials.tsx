export default function Testimonials() {
  const pillars = [
    {
      title: "Minutes, not hours",
      description:
        "Timestamp, stitch, and export a full day of surveillance footage in the time it used to take just to set up your editor.",
      gradient: "from-purple-500 to-blue-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Holds up in court",
      description:
        "Accurate, verifiable timestamps and clean MP4/MOV exports built to meet court and agency standards, not Hollywood effects.",
      gradient: "from-blue-500 to-cyan-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Made for one job",
      description:
        "No bloated timeline, no learning curve. Just the four tools surveillance video needs: timestamp, stitch, audio, and stills.",
      gradient: "from-cyan-500 to-teal-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-700">
              WHY INVESTIGATION FLOW
            </span>
          </div>

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
          {pillars.map((pillar, index) => (
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
                    {pillar.icon}
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
            {[
              "Native Windows & Mac app",
              "Free trial included",
              "One-time license option",
              "Cancel anytime",
            ].map((badge, index) => (
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
