import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log("Testing Resend with API key:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Investigation Flow <noreply@investigationflow.com>",
      to: "mickaelj98@gmail.com", // Your email
      subject: "Test Email from Investigation Flow",
      html: "<h1>Test Email</h1><p>If you see this, Resend is working!</p>",
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Caught error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
