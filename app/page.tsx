import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import HashRedirect from "@/components/HashRedirect";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HashRedirect />
      <Navigation />
      <Hero />
      <LiveDemo />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
