import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planType = "monthly" } = body;

    // Resolve the hosted checkout URL for the chosen plan.
    // Prefer Lemon Squeezy "Buy" links; fall back to the legacy Stripe vars
    // so the site keeps working during the migration.
    const checkoutUrls: Record<string, string | undefined> = {
      monthly:
        process.env.LEMONSQUEEZY_MONTHLY_CHECKOUT_URL ||
        process.env.STRIPE_MONTHLY_PAYMENT_LINK_URL,
      yearly:
        process.env.LEMONSQUEEZY_YEARLY_CHECKOUT_URL ||
        process.env.STRIPE_YEARLY_PAYMENT_LINK_URL,
      lifetime:
        process.env.LEMONSQUEEZY_LIFETIME_CHECKOUT_URL ||
        process.env.STRIPE_SINGLE_USE_PAYMENT_LINK_URL,
    };
    // Legacy alias for the one-time plan
    checkoutUrls["single-use"] = checkoutUrls.lifetime;

    const checkoutUrl = checkoutUrls[planType] || checkoutUrls.monthly;

    if (!checkoutUrl) {
      console.error(`Checkout URL not configured for: ${planType}`);
      return NextResponse.json(
        { error: "Checkout URL not configured" },
        { status: 500 }
      );
    }

    console.log(`Redirecting to checkout (${planType}):`, checkoutUrl);
    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Payment link error:", error);
    return NextResponse.json(
      { error: "Failed to get payment link" },
      { status: 500 }
    );
  }
}
