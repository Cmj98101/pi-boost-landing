import PaymentButton from "./PaymentButton";

export default function CTA() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Streamline Your Video Timestamping?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join hundreds of private investigators who trust PI Boost for professional video documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <PaymentButton
              text="Start Your 7-Day Free Trial"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 border-0"
            />
            <a href="#features" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">
              View Features
            </a>
          </div>
          <p className="text-sm opacity-75">
            Credit card required • Cancel anytime • Full access during trial
          </p>
        </div>
      </div>
    </section>
  );
}
