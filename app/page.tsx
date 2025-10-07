'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if there's an access_token in the URL hash (from Supabase magic link)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash
      if (hash.includes('access_token=')) {
        // Redirect to the auth callback page with the hash
        router.push(`/auth/callback${hash}`)
      }
    }
  }, [router])

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
