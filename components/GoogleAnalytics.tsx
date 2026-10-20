"use client";

import Script from "next/script";

// One gtag.js load serves both GA4 and Google Ads. Each ID is optional and
// configured independently in Vercel:
//   NEXT_PUBLIC_GA_MEASUREMENT_ID  e.g. G-XXXXXXXXXX
//   NEXT_PUBLIC_GOOGLE_ADS_ID      e.g. AW-123456789
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const loaderId = measurementId || adsId;

  if (!loaderId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${
            measurementId
              ? `gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            debug_mode: ${process.env.NODE_ENV === "development"}
          });`
              : ""
          }
          ${adsId ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
