# Supabase Database Schema

## Users Table

Create a `users` table with the following structure:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscription_status TEXT NOT NULL DEFAULT 'waitlist' CHECK (subscription_status IN ('waitlist', 'trial', 'active', 'expired')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  trial_start_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)
-- Allow users to read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Allow service role to manage all users (for API routes)
CREATE POLICY "Service role can manage all users" ON users
  FOR ALL USING (auth.role() = 'service_role');
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Stripe Webhook Setup

You'll need to set up a webhook endpoint to handle Stripe events. Create this file:

`app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;

      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { customer_email, subscription } = session;

  if (!customer_email || !subscription) return;

  // Update user status to trial
  await supabase
    .from("users")
    .update({
      subscription_status: "trial",
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscription as string,
      trial_start_date: new Date().toISOString(),
      trial_end_date: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 days from now
      updated_at: new Date().toISOString(),
    })
    .eq("email", customer_email);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { customer, status } = subscription;

  if (status === "active") {
    await supabase
      .from("users")
      .update({
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_customer_id", customer);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { customer } = subscription;

  await supabase
    .from("users")
    .update({
      subscription_status: "expired",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customer);
}
```

## Next Steps

1. Run the SQL commands in your Supabase SQL editor
2. Add the environment variables to your `.env.local`
3. Install dependencies: `npm install`
4. Set up Stripe webhook endpoint in your Stripe dashboard
5. Test the email capture and payment flow

