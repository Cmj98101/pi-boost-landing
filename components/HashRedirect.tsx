"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Handles Supabase magic-link callbacks that land on the homepage with an
 * access_token in the URL hash. Kept as a tiny client component so the rest of
 * the page can render on the server.
 */
export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      if (hash.includes("access_token=")) {
        router.push(`/auth/callback${hash}`);
      }
    }
  }, [router]);

  return null;
}
