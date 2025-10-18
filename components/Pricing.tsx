import PaymentButton from "./PaymentButton";

export default function Pricing() {
  const plans = [
    {
      name: "Monthly",
      planType: "monthly" as const,
      price: "$49",
      period: "per month",
      description: "Perfect for flexible usage",
      features: [
        "Unlimited video timestamping",
        "Individual & batch processing",
        "Custom timestamp formats",
        "Project management",
        "MP4 & MOV export",
        "Priority email support",
        "Regular updates"
      ],
      highlighted: false
    },
    {
      name: "Yearly",
      planType: "yearly" as const,
      price: "$490",
      period: "per year",
      savings: "Save $98 per year",
      description: "Best value for professionals",
      features: [
        "Everything in Monthly, plus:",
        "2 months free (16% savings)",
        "Priority phone support",
        "Early access to new features",
        "Advanced export options",
        "Dedicated account manager",
        "Custom training session"
      ],
      highlighted: true
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a 7-day free trial. Credit card required.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card bg-white shadow-xl ${plan.highlighted ? 'ring-4 ring-primary transform md:scale-105' : ''}`}
            >
              <div className="card-body p-8">
                {plan.highlighted && (
                  <div className="badge badge-primary badge-lg mb-4">MOST POPULAR</div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="badge badge-success badge-lg mb-4">{plan.savings}</div>
                )}
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <PaymentButton
                  text="Start Free Trial"
                  variant={plan.highlighted ? "primary" : "outline"}
                  size="lg"
                  planType={plan.planType}
                  className={`w-full mb-6 ${plan.highlighted ? 'text-white' : ''}`}
                />
                <div className="divider">Features</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <svg className="w-6 h-6 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={feature.includes('Everything in') ? 'font-semibold' : ''}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 7-day free trial. Cancel anytime, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
