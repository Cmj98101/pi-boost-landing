import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planType = "monthly", quantity } = body;

    // Resolve the hosted Lemon Squeezy checkout URL for the chosen plan.
    const checkoutUrls: Record<string, string | undefined> = {
      monthly: process.env.LEMONSQUEEZY_MONTHLY_CHECKOUT_URL,
      yearly: process.env.LEMONSQUEEZY_YEARLY_CHECKOUT_URL,
      lifetime: process.env.LEMONSQUEEZY_LIFETIME_CHECKOUT_URL,
      // Team plans use native Lemon Squeezy volume pricing; the buyer's seat
      // count is passed through as the checkout quantity. If a dedicated team
      // variant isn't configured, fall back to the MATCHING individual link
      // (yearly→yearly, monthly→monthly) so the billing choice is respected.
      "team-monthly":
        process.env.LEMONSQUEEZY_TEAM_MONTHLY_CHECKOUT_URL ||
        process.env.LEMONSQUEEZY_MONTHLY_CHECKOUT_URL,
      "team-yearly":
        process.env.LEMONSQUEEZY_TEAM_YEARLY_CHECKOUT_URL ||
        process.env.LEMONSQUEEZY_YEARLY_CHECKOUT_URL,
    };
    // Legacy alias for the one-time plan
    checkoutUrls["single-use"] = checkoutUrls.lifetime;

    let checkoutUrl = checkoutUrls[planType] || checkoutUrls.monthly;

    if (!checkoutUrl) {
      console.error(`Checkout URL not configured for: ${planType}`);
      return NextResponse.json(
        { error: "Checkout URL not configured" },
        { status: 500 }
      );
    }

    // For team plans, pre-set the seat count on the Lemon Squeezy checkout.
    const seats = Math.floor(Number(quantity));
    if (Number.isFinite(seats) && seats > 1) {
      const separator = checkoutUrl.includes("?") ? "&" : "?";
      checkoutUrl = `${checkoutUrl}${separator}quantity=${Math.min(seats, 999)}`;
    }

    console.log(`Redirecting to checkout (${planType}, qty ${quantity}):`, checkoutUrl);
    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Payment link error:", error);
    return NextResponse.json(
      { error: "Failed to get payment link" },
      { status: 500 }
    );
  }
}
