import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planType = "default" } = body;

    // Get the appropriate payment link based on plan type
    let paymentLinkUrl;

    if (planType === "monthly") {
      paymentLinkUrl = process.env.STRIPE_MONTHLY_PAYMENT_LINK_URL;
    } else if (planType === "yearly") {
      paymentLinkUrl = process.env.STRIPE_YEARLY_PAYMENT_LINK_URL;
    } else {
      // Default to monthly for general CTAs
      paymentLinkUrl = process.env.STRIPE_MONTHLY_PAYMENT_LINK_URL;
    }

    if (!paymentLinkUrl) {
      return NextResponse.json(
        { error: "Payment link not configured" },
        { status: 500 }
      );
    }

    console.log(`Redirecting to Stripe Payment Link (${planType}):`, paymentLinkUrl);
    return NextResponse.json({ url: paymentLinkUrl });
  } catch (error) {
    console.error("Payment link error:", error);
    return NextResponse.json(
      { error: "Failed to get payment link" },
      { status: 500 }
    );
  }
}
