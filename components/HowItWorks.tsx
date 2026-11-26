import { HOW_IT_WORKS_STEPS } from "@/lib/content";
import { Icon } from "@/components/icons";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Decorative background */}

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="display-lg mb-6">
            Simple Three-Step Process
          </h2>

          <p className="body-lg">
            Investigation Flow streamlines your workflow from upload to export
          </p>
        </div>

        {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`relative animate-fade-in-up delay-${index * 200}`}
              >
                <div className="card h-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-md ${step.accent}`}>
                      <Icon name={step.icon} className="h-7 w-7" />
                    </div>
                    <span className="eyebrow">Step {step.number}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="display-xs mb-3">
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

        {/* Bottom Stats */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="card inline-flex flex-col md:flex-row items-center gap-8 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-accent-green rounded-md flex items-center justify-center">
                <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-ink">100% Verifiable</p>
                <p className="text-sm text-slate-600">Professional Quality</p>
              </div>
            </div>

            <div className="h-12 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-accent-blue rounded-md flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-ink">Batch Processing</p>
                <p className="text-sm text-slate-600">Multiple Videos at Once</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
