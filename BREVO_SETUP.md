# Lead magnet + waitlist: Brevo setup

The site has three opt-ins that add contacts to Brevo:

| Page | Brevo list | What the visitor gets |
|---|---|---|
| `/surveillance-report-template` | **Report Kit** | The PDF right away on the page, plus a copy by email. A one-click "add me to the waitlist" button after signup. |
| `/waitlist` | **App Waitlist** | A welcome email, then progress updates. |
| Homepage popup (4 seconds after landing, homepage only) | **Discount** | A 20% off code for any plan (first month, first year, or Lifetime), **by email only** (never shown on the site). |

The forms post to `app/api/subscribe/route.ts`, which calls Brevo's
`POST /v3/contacts` with your API key on the server. The key never reaches the browser.

---

## 1. One-time Brevo setup (about 20 minutes)

1. **Authenticate your sending domain.** Brevo → Settings → Senders, Domains & Dedicated IPs →
   Domains → add `investigationflow.com` and add the DKIM, DMARC, and Brevo code DNS records it
   gives you. Without this, emails land in spam. Use a sender like `yourname@investigationflow.com`.
   Mail from a person's name gets more replies than mail from `noreply`.
2. **Create two lists.** Contacts → Lists → Create a list:
   - `Report Kit`
   - `App Waitlist`
   - `Discount`

   Open each list and note its **ID** (the number in the URL or the list table).
3. **Create the ROLE attribute.** Contacts → Settings → Contact attributes → Add a new attribute:
   name `ROLE`, type **Text**. (The waitlist form requires it. Values are the four choices, and
   "Other" is saved as `Other: <what they typed>`, so segment with "starts with Other". If the
   attribute is missing, signups still work, they just won't have a role saved.)
4. **Create an API key.** Settings (top right) → SMTP & API → API Keys → Generate a new API key.
   Copy it right away; Brevo shows it only once.

## 2. Environment variables

Add these to `.env` locally and to Vercel (Project → Settings → Environment Variables,
Production + Preview), then redeploy:

```
BREVO_API_KEY=xkeysib-...
BREVO_REPORT_KIT_LIST_ID=3
BREVO_WAITLIST_LIST_ID=4
BREVO_DISCOUNT_LIST_ID=5
```

If any are missing, the form shows "Signups are temporarily unavailable" and the server
log says which variable to set.

## 3. Automations (the emails)

Brevo → Automations → Create an automation → **Custom**, entry point
**"Contact added to a list"**. Build one automation per list.

Personalize with `{{ contact.FIRSTNAME | default : "there" }}`.

### A. Report Kit sequence (list: Report Kit)

**Email 1, send immediately. Subject: Your Surveillance Report Kit**

> Hi {{ contact.FIRSTNAME | default : "there" }},
>
> Here's your kit: [Download the Surveillance Report Kit (PDF)](https://www.investigationflow.com/downloads/surveillance-report-kit.pdf)
>
> If you only read one page, make it the phrase swaps on page 3. Rewriting opinions as
> observations is the quickest way to make a report hold up when an attorney reads it.
>
> One question: what's the most annoying part of writing your surveillance reports?
> Just hit reply. I read every answer, and they're shaping what we build next.
>
> [Your name]
> Investigation Flow

(That reply question matters more than anything else in this setup. The answers are your
product research and your marketing copy.)

**Wait 2 days → Email 2. Subject: The 3 words that get reports picked apart**

> Short tip from the kit: "easily," "obviously," and "suspicious" are opinions. Opposing
> counsel will ask how you know. Describe the movement instead:
> "bent at the waist to pick up a garden hose and returned to standing without holding onto anything."
>
> More rewrites like that on page 3 of your kit.

**Wait 3 days → Email 3. Subject: We're building something for your reports**

> We built Investigation Flow to take the pain out of surveillance video. Now we're
> building the reporting side: an app for web, iPhone, and Android where you log what you
> see in the field and it becomes a clean, objective report draft.
>
> Want early access? [Join the waitlist](https://www.investigationflow.com/waitlist). One click, no cost.

Add a step before Email 3: **condition "Contact is in list App Waitlist" → if yes, exit**, so
people who already joined aren't asked again.

### B. Waitlist welcome (list: App Waitlist)

**Email 1, send immediately. Subject: You're on the list**

> Hi {{ contact.FIRSTNAME | default : "there" }},
>
> Thanks for joining the waitlist. You'll hear from us when there's something real to show,
> with screenshots, not hype, and you'll get access before the public launch.
>
> Two quick questions (just reply, a sentence is plenty):
> 1. Which report formats do your clients make you use?
> 2. What do you use to write reports today: Word, Google Docs, case management software, something else?
>
> [Your name]

### C. Progress updates (manual, about once a month)

Campaigns → Create → send to **App Waitlist**. A simple format that works:

- **What we shipped**, one or two screenshots
- **What's next**
- **One question** for them to reply to

Consistency matters more than polish. A short monthly email keeps the list warm until launch.

### D. 20% discount (list: Discount)

**First, create the code in Lemon Squeezy:** Store → Discounts → New discount.

- Code: something short, like `WELCOME20`
- Amount: **20%**
- Duration: **Once** (Monthly: first month only. Yearly: first year only. Lifetime: the one payment.)
- Limit to products: the **Monthly**, **Yearly**, and **Lifetime** variants. Leave team plans
  out unless you want the code to work on them too.
- Optional: an expiry date or a redemption limit

If you change the percent, also change `DISCOUNT_OFFER.percent` in `lib/leads.ts` so the
popup matches. The popup's prices come from the pricing config, so they update on their own.

**Email 1, send immediately. Subject: Your 20% off code for Investigation Flow**

> Hi {{ contact.FIRSTNAME | default : "there" }},
>
> Here's your code for 20% off Investigation Flow: **WELCOME20**
>
> It works on any plan: your first month, your first year, or a Lifetime license.
> Enter it at checkout: https://www.investigationflow.com/pricing
>
> Not ready yet? The free trial gives you 25 video conversions with every feature unlocked:
> https://www.investigationflow.com/download
>
> [Your name]

**Email 2, 3 days later, only if they haven't bought:** a short reminder with the code and one
line on what the app saves them (timestamps verified, clips stitched, stills pulled in minutes).

## 4. Tracking

Each signup fires a GA4 `generate_lead` event (also sent to PostHog) with `lead_list`
set to `report-kit`, `waitlist`, or `discount` (`location` is `home_popup`). The popup also
fires `discount_popup_shown` and `discount_popup_dismissed`, so you can see how many people
see it, close it, or sign up. In GA4 → Admin → Events, mark `generate_lead` as a
**key event** to count it as a conversion.

## 5. Getting people to the page

Where the pages are linked on the site today:

- **Footer, every page:** "Free Report Template" and "Mobile App Waitlist".
- **Sitemap:** both pages are in `app/sitemap.ts`, so Google can find them.
- **Each other:** the kit's success screen offers the waitlist, and the waitlist's success
  screen links to the kit.
- **Not in the top nav or on the homepage** (except the discount section). Add links there if
  you want more traffic.

A lead magnet only works if people see it. Cheap ways to send traffic:

- Link `/surveillance-report-template` from the end of each tutorial on `/learn` and in YouTube video descriptions.
- Post the phrase-swap examples in PI Facebook groups, LinkedIn, and forums, with the link for the full kit.
- Add the link to the email Lemon Squeezy sends existing customers.
- The page targets the search "surveillance report template", so it can rank on its own over time.

## 6. Updating the kit

The PDF is generated from `lead-magnet/surveillance-report-kit.html`. After editing it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$PWD/public/downloads/surveillance-report-kit.pdf" \
  "file://$PWD/lead-magnet/surveillance-report-kit.html"
```

The new app's placeholder name ("Investigation Flow Reports") lives in `lib/leads.ts`, and
the feature list on `/waitlist` lives at the top of `app/waitlist/page.tsx`.
