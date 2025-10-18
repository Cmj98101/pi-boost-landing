import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists in waitlist
    const { data: existingEmail, error: checkError } = await supabase
      .from("email_waitlist")
      .select("id, email")
      .eq("email", email.toLowerCase())
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing email:", checkError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // If email already exists, return success (don't tell user it's duplicate for privacy)
    if (existingEmail) {
      console.log("Email already exists in waitlist:", email);
      return NextResponse.json({ success: true });
    }

    // Insert new email into waitlist
    const { error: insertError } = await supabase
      .from("email_waitlist")
      .insert({
        name: name || null,
        email: email.toLowerCase(),
        source: "landing_page",
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("Error adding email to waitlist:", insertError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    console.log("Successfully added email to waitlist:", email);

    // TODO: Send welcome email via SendGrid/Resend
    // This would be implemented based on your email service choice

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

