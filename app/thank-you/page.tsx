import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

export default function ThankYou() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
