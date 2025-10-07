export default function Testimonials() {
  const testimonials = [
    {
      quote: "PI Boost has completely transformed how we document surveillance footage. The timestamp customization is exactly what we needed, and the batch processing saves us hours every week.",
      author: "Sarah Mitchell",
      role: "Senior Private Investigator",
      company: "Mitchell & Associates"
    },
    {
      quote: "Finally, a tool built specifically for PIs. The interface is intuitive, and the project management features help us stay organized across multiple cases. Highly recommend!",
      author: "James Rodriguez",
      role: "Lead Investigator",
      company: "Rodriguez Investigations"
    },
    {
      quote: "The export quality is exceptional. Our timestamped videos are court-ready and professional. PI Boost is now an essential tool in our workflow.",
      author: "Emily Chen",
      role: "Private Investigator",
      company: "Chen Security Services"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Professional Investigators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what private investigators are saying about PI Boost
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="text-primary mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
