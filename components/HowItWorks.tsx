import { HOW_IT_WORKS_STEPS } from "@/lib/content";
import { Icon } from "@/components/icons";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Simple <span className="gradient-text">Three-Step Process</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Investigation Flow streamlines your workflow from upload to export
          </p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-20" style={{ width: '85%', margin: '0 auto' }}></div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`relative animate-fade-in-up delay-${index * 200}`}
              >
                {/* Step Card */}
                <div className="relative card-luxury h-full group hover:scale-105 transition-all duration-300">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <div className="text-white">
                        <Icon name={step.icon} className="w-10 h-10" />
                      </div>
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-8 px-8 py-6 bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">100% Verifiable</p>
                <p className="text-sm text-slate-600">Professional Quality</p>
              </div>
            </div>

            <div className="h-12 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">Batch Processing</p>
                <p className="text-sm text-slate-600">Multiple Videos at Once</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
