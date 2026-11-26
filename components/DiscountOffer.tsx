"use client";

import { useEffect, useRef, useState } from "react";
import { DiscountForm } from "@/components/LeadForms";
import { DISCOUNT_OFFER } from "@/lib/leads";
import { SITE_CONFIG } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

// When the popup opens after someone lands on the homepage.
const DELAY_MS = 4000;
// After someone closes it, keep it away this long. After a signup, never again.
const SNOOZE_DAYS = 14;
const STORAGE_KEY = "if_discount_popup";

// Prices come from the pricing config so the offer never drifts from /pricing.
const PLAN_LABEL: Record<string, string> = {
  monthly: "First month",
  yearly: "First year",
  lifetime: "Lifetime license",
};
const usd = (n: number) => "$" + (Number.isInteger(n) ? n.toString() : n.toFixed(2));
const PRICES = SITE_CONFIG.pricing.options
  .filter((o) => PLAN_LABEL[o.id] && o.price > 0)
  .map((o) => ({
    id: o.id,
    label: PLAN_LABEL[o.id],
    full: usd(o.price),
    offer: usd(Math.round(o.price * (100 - DISCOUNT_OFFER.percent)) / 100),
  }));

type Stored = { state: "dismissed" | "signed-up"; at: number };

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function writeStored(state: Stored["state"]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    // Storage blocked (private mode): the popup may show again next visit. Fine.
  }
}

function shouldShow(): boolean {
  const stored = readStored();
  if (!stored) return true;
  if (stored.state === "signed-up") return false;
  return Date.now() - stored.at > SNOOZE_DAYS * 24 * 60 * 60 * 1000;
}

/**
 * Email-for-a-discount popup, rendered on the homepage only (app/page.tsx).
 * Opens once, a few seconds after landing. Uses the native <dialog>, so
 * Escape, focus handling and the backdrop come from the browser.
 */
export default function DiscountOffer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    if (!shouldShow()) return;
    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      // Don't stack on top of another open dialog.
      if (!dialog || dialog.open || document.querySelector("dialog[open]")) return;
      dialog.showModal();
      // Focus the panel, not the close button or a field: no stray focus ring,
      // and no keyboard jumping up on phones. Tab still reaches everything.
      contentRef.current?.focus();
      trackEvent("discount_popup_shown", { location: "home" });
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  // Runs for the close button and Escape alike.
  function onClose() {
    if (!signedUp) {
      writeStored("dismissed");
      trackEvent("discount_popup_dismissed", { location: "home" });
    }
  }

  function onSignedUp() {
    setSignedUp(true);
    writeStored("signed-up");
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Clicking the backdrop does nothing on purpose: the popup closes only
      // from the X button (or Escape, which keyboard users rely on).
      aria-labelledby="discount-popup-title"
      className="discount-popup m-auto w-[calc(100%-32px)] max-w-md rounded-lg border border-hairline bg-canvas p-0 text-ink shadow-layered"
    >
      <div ref={contentRef} tabIndex={-1} className="relative p-8 outline-none">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-md text-body-mid transition-colors hover:bg-surface hover:text-ink"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!signedUp && (
          <div className="mb-6">
            <p className="eyebrow-sm pr-10">New customer offer</p>
            <h2 id="discount-popup-title" className="display-sm mt-2 pr-10">
              Get {DISCOUNT_OFFER.percent}% off Investigation Flow
            </h2>
            <p className="mt-2 text-body-mid">
              One code, any plan. Use it on your first month, your first year, or a Lifetime license.
            </p>
            {PRICES.length > 0 && (
              <dl className="mt-4 divide-y divide-hairline rounded-md border border-hairline text-sm">
                {PRICES.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-4 py-2">
                    <dt className="text-body">{p.label}</dt>
                    <dd>
                      <span className="mr-2 text-body-mid line-through">{p.full}</span>
                      <span className="font-medium text-ink">{p.offer}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
        {signedUp && (
          <h2 id="discount-popup-title" className="sr-only">
            Discount code sent
          </h2>
        )}

        <DiscountForm location="home_popup" onSuccess={onSignedUp} compact />
      </div>
    </dialog>
  );
}
