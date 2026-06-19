import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// Use service role for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const resend = new Resend(process.env.RESEND_API_KEY);

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
  console.log("=== WEBHOOK: handleCheckoutCompleted started ===");

  const { subscription, mode } = session;
  let customerEmail = session.customer_email;

  // Try customer_details.email (available for one-time payments)
  if (!customerEmail && session.customer_details?.email) {
    console.log("Using customer_details.email");
    customerEmail = session.customer_details.email;
  }

  // If still no email, fetch from customer object
  if (!customerEmail && session.customer) {
    console.log("Fetching customer email from Stripe customer:", session.customer);
    const customer = await stripe.customers.retrieve(session.customer as string);
    if (customer && !customer.deleted && 'email' in customer) {
      customerEmail = customer.email;
    }
  }

  console.log("Session:", JSON.stringify({
    customer_email: customerEmail,
    customer_details_email: session.customer_details?.email,
    mode: mode,
    subscription: subscription
  }));

  if (!customerEmail) {
    console.error("No customer email found in session, customer_details, or customer object");
    return;
  }

  const now = new Date().toISOString();
  const emailLower = customerEmail.toLowerCase();

  // Get or create Stripe customer ID
  let stripeCustomerId = session.customer as string | null;

  // If no customer in session, try to find or create one
  if (!stripeCustomerId) {
    console.log("No customer in session, searching for existing customer...");

    // Search for existing customer by email
    const customers = await stripe.customers.list({ email: emailLower, limit: 1 });

    if (customers.data.length > 0) {
      stripeCustomerId = customers.data[0].id;
      console.log("Found existing Stripe customer:", stripeCustomerId);
    } else {
      // Create new Stripe customer
      const newCustomer = await stripe.customers.create({ email: emailLower });
      stripeCustomerId = newCustomer.id;
      console.log("Created new Stripe customer:", stripeCustomerId);
    }
  }

  console.log("Using Stripe customer ID:", stripeCustomerId);

  // Determine subscription status based on payment mode
  const isSubscription = mode === "subscription" && !!subscription;
  const isOneTime = mode === "payment";

  let userId: string;
  let isNewUser = false;

  // Step 1: Check if auth user already exists
  const { data: existingAuthUsers } = await supabase.auth.admin.listUsers();
  const existingAuthUser = existingAuthUsers?.users?.find(
    (u) => u.email?.toLowerCase() === emailLower
  );

  if (existingAuthUser) {
    console.log("Auth user already exists:", existingAuthUser.id);
    userId = existingAuthUser.id;
  } else {
    // Step 2: Create new auth user (no password - they'll set it via magic link)
    console.log("Creating new auth user for:", emailLower);
    const { data: newAuthUser, error: authError } = await supabase.auth.admin.createUser({
      email: emailLower,
      email_confirm: true, // Auto-confirm email since they paid
    });

    if (authError) {
      console.error("Error creating auth user:", authError);
      throw authError;
    }

    userId = newAuthUser.user.id;
    isNewUser = true;
    console.log("Created auth user:", userId);
  }

  // Step 3: Check if public.users record exists
  const { data: existingPublicUser } = await supabase
    .from("users")
    .select("id, max_devices, subscription_status")
    .eq("id", userId)
    .single();

  // Build user data
  const userData: Record<string, unknown> = {
    stripe_customer_id: stripeCustomerId,
    updated_at: now,
  };

  if (isSubscription) {
    userData.subscription_status = "trial";
    userData.stripe_subscription_id = subscription as string;
    userData.trial_start_date = now;
    userData.trial_end_date = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    userData.max_devices = 2; // Subscriptions get 2 devices
  } else if (isOneTime) {
    userData.subscription_status = "active";
    // Each one-time purchase adds +1 device
    const currentDevices = existingPublicUser?.max_devices || 0;
    userData.max_devices = currentDevices + 1;
    console.log(`One-time purchase: increasing max_devices from ${currentDevices} to ${currentDevices + 1}`);
  }

  if (existingPublicUser) {
    // Update existing public.users record
    const { error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", userId);

    if (error) {
      console.error("Error updating public user:", error);
      throw error;
    }
  } else {
    // Create new public.users record
    const { error } = await supabase
      .from("users")
      .insert({
        id: userId,
        email: emailLower,
        ...userData,
        created_at: now,
      });

    if (error) {
      console.error("Error inserting public user:", error);
      throw error;
    }
  }

  console.log(`User created/updated for ${customerEmail} (${isSubscription ? "subscription" : "one-time"})`);

  // Step 4: Generate magic link for account setup
  let magicLink: string | null = null;
  if (isNewUser) {
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: emailLower,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/account-setup`,
      },
    });

    if (linkError) {
      console.error("Error generating magic link:", linkError);
      // Don't throw - we can still send email without magic link
    } else {
      magicLink = linkData.properties.action_link;
      console.log("Generated magic link for:", emailLower);
    }
  }

  // Step 5: Send welcome email with download links and magic link
  console.log("=== WEBHOOK: About to send welcome email ===");
  await sendWelcomeEmail(customerEmail, isSubscription, magicLink);
  console.log("=== WEBHOOK: Welcome email function completed ===");
}

async function sendWelcomeEmail(email: string, isSubscription: boolean, magicLink: string | null) {
  const macosDownloadUrl = process.env.NEXT_PUBLIC_MACOS_DOWNLOAD_URL || "#";
  const windowsDownloadUrl = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "#";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://investigationflow.com";

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Investigation Flow <chris@systumboost.com>",
      to: email,
      subject: "Welcome to Investigation Flow - Download Your App",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #7c3aed; margin-bottom: 8px;">Welcome to Investigation Flow!</h1>
            <p style="color: #64748b; font-size: 18px;">Your ${isSubscription ? "7-day free trial" : "license"} is now active.</p>
          </div>

          <div style="background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px;">
            <h2 style="color: white; margin-bottom: 24px;">Download Your App</h2>
            <div style="display: inline-block; margin: 8px;">
              <a href="${macosDownloadUrl}" style="display: inline-block; background: white; color: #7c3aed; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Download for macOS
              </a>
            </div>
            <div style="display: inline-block; margin: 8px;">
              <a href="${windowsDownloadUrl}" style="display: inline-block; background: white; color: #7c3aed; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Download for Windows
              </a>
            </div>
          </div>

          ${magicLink ? `
          <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin-bottom: 32px; text-align: center;">
            <h3 style="margin-top: 0; color: #166534;">Set Up Your Account</h3>
            <p style="color: #166534; margin-bottom: 16px;">
              Click below to set your password and access your account dashboard.
            </p>
            <a href="${magicLink}" style="display: inline-block; background: #22c55e; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Set Up Account →
            </a>
            <p style="color: #166534; font-size: 12px; margin-top: 12px; margin-bottom: 0;">
              This link expires in 24 hours.
            </p>
          </div>
          ` : ""}

          <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h3 style="margin-top: 0; color: #1e293b;">Getting Started</h3>
            <ol style="color: #475569; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Download and install Investigation Flow</li>
              <li style="margin-bottom: 8px;">Open the app and enter your email (${email}) to activate</li>
              <li style="margin-bottom: 8px;">Start timestamping your first video!</li>
            </ol>
          </div>

          ${isSubscription ? `
          <div style="background: #fef3c7; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h3 style="margin-top: 0; color: #92400e;">Trial Information</h3>
            <p style="color: #92400e; margin-bottom: 0;">
              Your 7-day free trial has started. You won't be charged until the trial ends.
              Cancel anytime by emailing chris@systumboost.com.
            </p>
          </div>
          ` : ""}

          <div style="text-align: center; color: #64748b; font-size: 14px;">
            <p>Need help? Reply to this email or contact <a href="mailto:chris@systumboost.com" style="color: #7c3aed;">chris@systumboost.com</a></p>
            <p style="margin-top: 24px;">
              <a href="${appUrl}" style="color: #7c3aed;">Investigation Flow</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Don't throw - email failure shouldn't break the webhook
  }
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
