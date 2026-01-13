import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Fetch Stripe session first (needed for email)
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.customer_email) {
      // Return basic success even without email - page can still show downloads
      return NextResponse.json({
        id: session.id,
        customer_email: null,
        trial_end: null,
        subscription_status: "active",
        status: session.payment_status,
      });
    }

    // Try to fetch user from Supabase (may not exist yet if webhook is slow)
    const { data: user } = await supabase
      .from("users")
      .select("trial_end_date, subscription_status")
      .eq("email", session.customer_email.toLowerCase())
      .single();

    // Calculate trial end from now if user not found yet
    const trialEnd = user?.trial_end_date
      ? new Date(user.trial_end_date).getTime() / 1000
      : (Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000; // Default 7 days from now

    return NextResponse.json({
      id: session.id,
      customer_email: session.customer_email,
      trial_end: trialEnd,
      subscription_status: user?.subscription_status || "trial",
      status: session.payment_status,
    });
  } catch (error) {
    console.error("Error fetching checkout session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session data" },
      { status: 500 }
    );
  }
}
