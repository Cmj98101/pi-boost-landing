"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ThankYou() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Fetch session data to show user details
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-green-600 text-8xl mb-6">✓</div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Welcome to PI Boost!
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Your 7-day free trial has started. You'll receive an email with
              download instructions shortly.
            </p>

            {sessionData && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Trial Details
                </h3>
                <div className="text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trial Period:</span>
                    <span className="font-medium">7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trial Ends:</span>
                    <span className="font-medium">
                      {sessionData.trial_end
                        ? new Date(
                            sessionData.trial_end * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">
                      Active Trial
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Link
                href="/"
                className="btn btn-primary btn-lg text-white block w-full"
              >
                Return to Home
              </Link>

              <p className="text-sm text-gray-500">
                Questions? Contact us at{" "}
                <a
                  href="mailto:support@piboost.com"
                  className="text-primary hover:underline"
                >
                  support@piboost.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

