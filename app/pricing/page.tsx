import { Suspense } from "react";
import BuyContent from "./BuyContent";

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
