export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Professional Video Timestamping for Private Investigators
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Add precise timestamps to your surveillance footage with ease. Individual or batch processing - simple, fast, and reliable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#pricing" className="btn btn-primary btn-lg text-white">
              Start 7-Day Free Trial
            </a>
            <a href="#features" className="btn btn-outline btn-lg">
              Learn More
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 max-w-4xl mx-auto">
            <img
              src="/app-screenshot.png"
              alt="PI Boost Application Interface"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
