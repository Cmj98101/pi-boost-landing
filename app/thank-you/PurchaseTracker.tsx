"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { getConfig } from "@/lib/config";

// Reports a completed purchase to GA4, Google Ads and PostHog.
//
// Buyers land here from the "Continue" button on Lemon Squeezy's confirmation
// modal (Product → Confirmation modal → Button link). The same link works for
// every product:
//   https://www.investigationflow.com/thank-you?order_id=[order_id]&total=[total]
// Lemon Squeezy fills in the bracketed link variables. `order_id` de-duplicates
// reloads; `total` (e.g. "$199.00") is the amount actually paid. An optional
// `plan` (monthly | yearly | lifetime) is used as a fallback value. All are
// optional.
//
// Google Ads needs NEXT_PUBLIC_GOOGLE_ADS_ID (AW-…) and
// NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL (the label from the conversion action).

const STORAGE_PREFIX = "if_purchase_tracked_";

// Lemon Squeezy formats totals like "$1,234.00"; keep only the number.
function parseTotal(total: string | null): number | undefined {
  if (!total || total.startsWith("[")) return undefined;
  const amount = Number.parseFloat(total.replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

function planValue(plan: string | null): number | undefined {
  if (!plan) return undefined;
  const option = getConfig("pricing").options.find((o) => o.id === plan);
  return option?.price;
}

function Tracker() {
  const params = useSearchParams();

  useEffect(() => {
    const orderId = params.get("order_id") || undefined;
    const plan = params.get("plan");
    const value = parseTotal(params.get("total")) ?? planValue(plan);

    // Ignore unsubstituted placeholders such as "[order_id]".
    const transactionId =
      orderId && !orderId.startsWith("[") ? orderId : undefined;

    const dedupeKey = STORAGE_PREFIX + (transactionId ?? "no-id");
    try {
      if (transactionId && window.localStorage.getItem(dedupeKey)) return;
    } catch {
      // Storage unavailable: Google still de-duplicates on transaction_id.
    }

    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL;

    let sent = false;
    let attempts = 0;

    const send = () => {
      const gtag = (window as any).gtag;
      if (typeof gtag !== "function") return false;

      const common = {
        currency: "USD",
        ...(value !== undefined ? { value } : {}),
        ...(transactionId ? { transaction_id: transactionId } : {}),
      };

      gtag("event", "purchase", {
        ...common,
        ...(plan ? { items: [{ item_id: plan, item_name: plan }] } : {}),
      });

      if (adsId && adsLabel) {
        gtag("event", "conversion", {
          send_to: `${adsId}/${adsLabel}`,
          ...common,
        });
      }
      return true;
    };

    // gtag.js loads lazily, so wait for it (up to ~15s).
    const timer = window.setInterval(() => {
      attempts += 1;
      if (!sent && send()) {
        sent = true;
        try {
          if (transactionId) window.localStorage.setItem(dedupeKey, "1");
        } catch {
          /* ignore */
        }
      }
      if (sent || attempts >= 60) window.clearInterval(timer);
    }, 250);

    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("purchase_completed", {
        plan: plan ?? undefined,
        value,
        order_id: transactionId,
      });
    }

    return () => window.clearInterval(timer);
  }, [params]);

  return null;
}

export default function PurchaseTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
