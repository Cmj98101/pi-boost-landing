import { Suspense } from "react";
import type { Metadata } from "next";
import BuyContent from "../pricing/BuyContent";

export const metadata: Metadata = {
  title: "Pricing | Investigation Flow",
  description:
    "Monthly, yearly, or a one-time lifetime license for Investigation Flow. Volume pricing for agencies running the app on multiple computers.",
  alternates: {
    canonical: "https://www.investigationflow.com/pricing",
  },
};

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium">Loading plans...</p>
      </div>
    </div>
  );
}

export default function Buy() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BuyContent />
    </Suspense>
  );
}
