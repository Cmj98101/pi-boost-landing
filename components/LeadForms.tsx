"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";
import { DISCOUNT_OFFER, OTHER_ROLE, REPORT_KIT, ROLES, WAITLIST, type LeadList } from "@/lib/leads";

type Status = "idle" | "loading" | "done" | "error";

interface Signup {
  email: string;
  firstName: string;
  role?: string;
  roleOther?: string; // free text when role is "Other"
  website?: string; // honeypot
}

async function subscribe(list: LeadList, signup: Signup): Promise<string | null> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...signup, list }),
    });
    if (res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data.error || "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please check your connection and try again.";
  }
}

const inputClass =
  "input";

/** Required "which describes you" question. Picking "Other" opens a short text field. */
function RoleField({ idPrefix }: { idPrefix: string }) {
  const [role, setRole] = useState("");
  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-role`} className="mb-1 block text-sm font-medium text-slate-700">
          Which describes you?
        </label>
        <select
          id={`${idPrefix}-role`}
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      {role === OTHER_ROLE && (
        <div>
          <label htmlFor={`${idPrefix}-role-other`} className="mb-1 block text-sm font-medium text-slate-700">
            What do you do?
          </label>
          <input
            id={`${idPrefix}-role-other`}
            name="roleOther"
            type="text"
            required
            maxLength={60}
            autoFocus
            placeholder="e.g. Claims adjuster, attorney, SIU"
            className={inputClass}
          />
        </div>
      )}
    </>
  );
}

function Fields({
  idPrefix,
  showRole,
}: {
  idPrefix: string;
  showRole?: boolean;
}) {
  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-first`} className="mb-1 block text-sm font-medium text-slate-700">
          First name
        </label>
        <input
          id={`${idPrefix}-first`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={inputClass}
        />
      </div>
      {showRole && <RoleField idPrefix={idPrefix} />}
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

function readForm(form: HTMLFormElement): Signup {
  const data = new FormData(form);
  return {
    firstName: String(data.get("firstName") || ""),
    email: String(data.get("email") || ""),
    role: String(data.get("role") || ""),
    roleOther: String(data.get("roleOther") || ""),
    website: String(data.get("website") || ""),
  };
}

function ErrorText({ message }: { message: string }) {
  return (
    <p role="alert" className="text-sm text-accent-red">
      {message}
    </p>
  );
}

/** Keeps the form and its success state in one polite live region, so the swap is read out. */
function Live({ children }: { children: React.ReactNode }) {
  return <div role="status" aria-live="polite">{children}</div>;
}

function CheckIcon() {
  return (
    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-green text-ink">
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/**
 * Opt-in for the free report kit. On success it hands over the PDF right away
 * (the Brevo automation also emails it), then offers the waitlist in one click
 * using the details they already typed.
 */
export function ReportKitForm({
  location,
  heading,
}: {
  location: string;
  // Shown above the form only; the success state has its own heading.
  heading?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [signup, setSignup] = useState<Signup | null>(null);
  const [waitlist, setWaitlist] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const details = readForm(e.currentTarget);
    setStatus("loading");
    setError("");
    const err = await subscribe("report-kit", details);
    if (err) {
      setStatus("error");
      setError(err);
      return;
    }
    setSignup(details);
    setStatus("done");
    analytics.leadSignup("report-kit", location);
  }

  async function joinWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!signup) return;
    const data = new FormData(e.currentTarget);
    setWaitlist("loading");
    // Reuse the name and email they just typed; only the role is new.
    const err = await subscribe("waitlist", {
      ...signup,
      role: String(data.get("role") || ""),
      roleOther: String(data.get("roleOther") || ""),
    });
    setWaitlist(err ? "error" : "done");
    if (!err) analytics.leadSignup("waitlist", `${location}_upsell`);
  }

  if (status === "done") {
    return (
      <Live>
      <div className="space-y-5 text-center">
        <CheckIcon />
        <div>
          <p className="display-xs">Your kit is ready</p>
          <p className="mt-1 text-slate-600">
            Download it now. We also emailed a copy to {signup?.email}.
          </p>
        </div>
        <a
          href={REPORT_KIT.downloadUrl}
          download
          className="btn-primary inline-flex w-full items-center justify-center gap-2"
        >
          Download the PDF
        </a>

        <div className="rounded-md border border-hairline bg-surface p-5 text-left">
          {waitlist === "done" ? (
            <p className="font-medium text-ink">
              You&apos;re on the waitlist. We&apos;ll email you as {WAITLIST.productName} takes shape.
            </p>
          ) : (
            <>
              <p className="font-medium text-ink">
                Want reports that write themselves?
              </p>
              <p className="mt-1 text-sm text-slate-600">
                We&apos;re building {WAITLIST.productName} for web, iPhone, and Android: log
                surveillance in the field and turn it into a finished report.
              </p>
              <form onSubmit={joinWaitlist} className="mt-4 space-y-3">
                <RoleField idPrefix={`kit-${location}-upsell`} />
                <button
                  type="submit"
                  disabled={waitlist === "loading"}
                  className="btn-secondary inline-flex w-full items-center justify-center disabled:opacity-60"
                >
                  {waitlist === "loading" ? "Adding you…" : "Add me to the waitlist"}
                </button>
                {waitlist === "error" && <ErrorText message="That didn't work. Please try again." />}
                <p className="text-xs leading-relaxed text-body-mid">
                  By joining, you agree to get emails from Investigation Flow about{" "}
                  {WAITLIST.productName}: progress updates and your early access invite.
                  Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
      </Live>
    );
  }

  return (
    <Live>
    <form onSubmit={onSubmit} className="relative space-y-4">
      {heading && (
        <p className="text-center display-xs">{heading}</p>
      )}
      <Fields idPrefix={`kit-${location}`} />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary inline-flex w-full items-center justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send me the free kit"}
      </button>
      {status === "error" && <ErrorText message={error} />}
      <p className="text-center text-xs leading-relaxed text-body-mid">
        By signing up, you agree to get the kit by email from Investigation Flow, plus
        occasional report-writing tips and product news. Unsubscribe anytime.{" "}
        <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>
      </p>
    </form>
    </Live>
  );
}

/** Waitlist opt-in for the new reporting app. */
export function WaitlistForm({ location }: { location: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const err = await subscribe("waitlist", readForm(e.currentTarget));
    if (err) {
      setStatus("error");
      setError(err);
      return;
    }
    setStatus("done");
    analytics.leadSignup("waitlist", location);
  }

  if (status === "done") {
    return (
      <Live>
      <div className="space-y-4 text-center">
        <CheckIcon />
        <p className="display-xs">You&apos;re on the list</p>
        <p className="text-slate-600">
          Check your inbox for a welcome email. We&apos;ll send progress updates and
          your early access invite as soon as it&apos;s ready.
        </p>
        <a
          href={REPORT_KIT.path}
          className="link-arrow text-sm"
        >
          While you wait: grab the free Surveillance Report Kit →
        </a>
      </div>
      </Live>
    );
  }

  return (
    <Live>
    <form onSubmit={onSubmit} className="relative space-y-4">
      <Fields idPrefix={`waitlist-${location}`} showRole />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary inline-flex w-full items-center justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>
      {status === "error" && <ErrorText message={error} />}
      <p className="text-center text-xs leading-relaxed text-body-mid">
        By joining, you agree to get emails from Investigation Flow about{" "}
        {WAITLIST.productName}: progress updates and your early access invite. No spam,
        unsubscribe anytime.{" "}
        <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>
      </p>
    </form>
    </Live>
  );
}

/**
 * Email-for-a-discount opt-in. The code goes out by email only (Brevo
 * automation on the discount list), so the address has to be real to use it.
 */
export function DiscountForm({
  location,
  onSuccess,
  compact,
}: {
  location: string;
  onSuccess?: () => void;
  // In the popup the heading lives above the form, so skip the form's own.
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const details = readForm(e.currentTarget);
    setStatus("loading");
    setError("");
    const err = await subscribe("discount", details);
    if (err) {
      setStatus("error");
      setError(err);
      return;
    }
    setEmail(details.email);
    setStatus("done");
    analytics.leadSignup("discount", location);
    onSuccess?.();
  }

  if (status === "done") {
    return (
      <Live>
        <div className="space-y-4 text-center">
          <CheckIcon />
          <p className="display-xs">Check your inbox</p>
          <p className="text-slate-600">
            Your {DISCOUNT_OFFER.percent}% off code is on its way to {email}. It can take a
            minute or two. If you don&apos;t see it, check your spam or promotions folder.
          </p>
        </div>
      </Live>
    );
  }

  return (
    <Live>
      <form onSubmit={onSubmit} className="relative space-y-4">
        {!compact && <p className="text-center display-xs">Where should we send your code?</p>}
        <Fields idPrefix={`discount-${location}`} />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary inline-flex w-full items-center justify-center disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : `Email me ${DISCOUNT_OFFER.percent}% off`}
        </button>
        {status === "error" && <ErrorText message={error} />}
        <p className="text-center text-xs leading-relaxed text-body-mid">
          By signing up, you agree to get your discount code by email from Investigation Flow,
          plus occasional product news and offers. Unsubscribe anytime.{" "}
          <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>
        </p>
      </form>
    </Live>
  );
}
