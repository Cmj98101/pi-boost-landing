import { NextRequest, NextResponse } from "next/server";
import { LEAD_LISTS, OTHER_ROLE, ROLES, type LeadList } from "@/lib/leads";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

const LIST_ENV: Record<LeadList, string> = {
  "report-kit": "BREVO_REPORT_KIT_LIST_ID",
  waitlist: "BREVO_WAITLIST_LIST_ID",
  discount: "BREVO_DISCOUNT_LIST_ID",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function addContact(
  apiKey: string,
  email: string,
  listId: number,
  attributes: Record<string, string>
) {
  return fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    // updateEnabled: an existing contact is added to the list instead of
    // rejected, so someone who grabbed the kit can still join the waitlist.
    body: JSON.stringify({
      email,
      attributes,
      listIds: [listId],
      updateEnabled: true,
    }),
    cache: "no-store",
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field people never see. Bots fill it; pretend success.
  if (str(body.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const email = str(body.email, 254).toLowerCase();
  const firstName = str(body.firstName, 80);
  const list = body.list as LeadList;
  const role = str(body.role, 80);
  const roleOther = str(body.roleOther, 60);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!LEAD_LISTS.includes(list)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // The waitlist asks every signup which describes them; "Other" needs a description.
  const validRole = (ROLES as readonly string[]).includes(role);
  if (list === "waitlist" && (!validRole || (role === OTHER_ROLE && !roleOther))) {
    return NextResponse.json(
      { error: role === OTHER_ROLE ? "Please tell us what you do." : "Please choose which describes you." },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env[LIST_ENV[list]]);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    console.error(
      `Brevo is not configured: set BREVO_API_KEY and ${LIST_ENV[list]}.`
    );
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  const attributes: Record<string, string> = {};
  if (firstName) attributes.FIRSTNAME = firstName;
  if (validRole) {
    attributes.ROLE = role === OTHER_ROLE && roleOther ? `${OTHER_ROLE}: ${roleOther}` : role;
  }

  try {
    let res = await addContact(apiKey, email, listId, attributes);

    // If the ROLE attribute hasn't been created in Brevo yet, Brevo rejects
    // the whole request. Don't lose the signup over it: retry without ROLE.
    if (res.status === 400 && attributes.ROLE) {
      const detail = await res.text();
      console.error("Brevo rejected the contact, retrying without ROLE:", detail);
      const { ROLE: _role, ...rest } = attributes;
      res = await addContact(apiKey, email, listId, rest);
    }

    if (!res.ok) {
      console.error("Brevo error:", res.status, await res.text());
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brevo request failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }
}
