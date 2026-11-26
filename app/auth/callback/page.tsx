"use client";

import { useEffect, useState } from "react";

export default function AuthCallback() {
  const [status, setStatus] = useState("Authenticating...");
  const [hasToken, setHasToken] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Get access token from URL hash (Supabase redirects with #access_token=...)
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");

      if (token) {
        setHasToken(true);
        setAccessToken(token);
        setStatus(
          "Authentication successful! Click the button below to open Investigation Flow."
        );
      } else {
        setStatus("No access token found in URL");
      }
    } else {
      setStatus("No authentication data found");
    }
  }, []);

  const openDesktopApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault(); // Prevent default anchor behavior

    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");

      if (accessToken) {
        // Trigger deep link to open desktop app
        const deepLink = `investigationflow://auth?access_token=${encodeURIComponent(
          accessToken
        )}`;

        setStatus("Opening Investigation Flow...");

        // Use hidden iframe to trigger deep link without navigation
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = deepLink;
        document.body.appendChild(iframe);

        // Clean up
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1000);

        // Update status after a delay
        setTimeout(() => {
          setStatus(
            "If the app didn't open, click the button again or continue in browser."
          );
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="card shadow-layered max-w-md w-full text-center">
        <div className="mb-6">
          {hasToken ? (
            <svg
              className="w-16 h-16 text-ink mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <div className="w-16 h-16 border-4 border-ink border-t-transparent rounded-full animate-spin mx-auto"></div>
          )}
        </div>

        <h1 className="display-sm mb-4">
          {hasToken ? "✓ Authentication Successful!" : "Processing..."}
        </h1>

        <p className="text-body mb-6">{status}</p>

        {hasToken && (
          <div className="space-y-3">
            <button
              onClick={openDesktopApp}
              className="btn-primary w-full"
            >
              Open Investigation Flow
            </button>

            {/* <p className="text-sm text-gray-500">
              App didn't open?{" "}
              <a href="/app" className="text-blue-600 hover:underline">
                Continue in browser
              </a>{" "}
              or make sure Investigation Flow is installed.
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
}
