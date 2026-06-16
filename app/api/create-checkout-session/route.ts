import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planType = "monthly" } = body;

    // Get the appropriate payment link based on billing option
    let paymentLinkUrl;

    switch (planType) {
      case "monthly":
        paymentLinkUrl = process.env.STRIPE_MONTHLY_PAYMENT_LINK_URL;
        break;
      case "yearly":
        paymentLinkUrl = process.env.STRIPE_YEARLY_PAYMENT_LINK_URL;
        break;
      case "lifetime":
      case "single-use": // legacy alias
        paymentLinkUrl = process.env.STRIPE_SINGLE_USE_PAYMENT_LINK_URL;
        break;
      default:
        paymentLinkUrl = process.env.STRIPE_MONTHLY_PAYMENT_LINK_URL;
    }

    if (!paymentLinkUrl) {
      console.error(`Payment link not configured for: ${planType}`);
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
