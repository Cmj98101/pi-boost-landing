# Turning This Repo Into a Reusable Starter Kit

This is a working audit of `pi-boost-landing` (investigationflow.com) for the purpose of
spinning up future SaaS landing pages faster. It answers: what's already generic and
reusable, what's hardcoded to this brand, and what commands to run next time to fork
this into a new project.

## What's already reusable, no changes needed

- **Component library** (`components/*.tsx`) — Navigation, Footer, Hero, Features, FAQ,
  HowItWorks, Testimonials, CTA, EmailCapture, LiveDemo, DownloadButton, PaymentButton,
  PlatformIcon. These are generic layout/interaction patterns; only the copy inside them
  is brand-specific (see below).
- **Config-driven content** (`lib/config.ts`) — hero copy, pricing tiers, and download
  flags already live in one typed object instead of scattered through components. This
  is the single biggest thing that makes rebrand-by-editing-one-file possible. Keep this
  pattern in every future project.
- **Tailwind v4 theme tokens** (`app/globals.css`, the `@theme` block) — navy, purple,
  gold, and slate color scales are already defined as CSS variables in one place. A new
  brand palette is a find-and-replace of hex values in that one block.
- **Env-var-driven integrations** — Lemon Squeezy checkout URLs, Supabase keys, GA
  measurement ID, and desktop download URLs are all read from `.env` (see
  `LEMONSQUEEZY_*`, `SUPABASE_*`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
  `NEXT_PUBLIC_*_DOWNLOAD_URL`). None of these are hardcoded in source.
- **API routes** (`app/api/create-checkout-session`, `app/api/email-capture`) — generic
  Lemon Squeezy checkout + Supabase email-capture patterns, reusable as-is.
- **`sitemap.ts` / `robots.ts` pattern** — just needs the `baseUrl` constant and route
  list updated per project.

## What's hardcoded to Investigation Flow

| What | Where | Notes |
|---|---|---|
| Brand name "Investigation Flow" | 19 files: `app/layout.tsx`, `lib/config.ts`, `components/{FAQ,Features,Footer,HowItWorks,LiveDemo,Navigation,Testimonials}.tsx`, all page files under `app/` (pricing, buy, download, updates, auth/callback, and the 4 comparison pages) | Grep for `"Investigation Flow"` to find every occurrence. |
| Domain `investigationflow.com` | 17 files, mainly canonical URLs, `sitemap.ts`, `robots.ts`, structured data in `app/layout.tsx`, and `support@investigationflow.com` mailto links in `Footer.tsx` / `FAQ.tsx` / `lib/config.ts` | Grep for `"investigationflow.com"`. |
| Ahrefs analytics key | `app/layout.tsx` (`data-key="8RGaHpym6HopAd3PLKhSqw"`) | Hardcoded, not an env var. Move to `.env` in the next project, or just swap the literal. |
| Lemon Squeezy affiliate store slug | `app/layout.tsx` (`window.lemonSqueezyAffiliateConfig = { store: "investigationflow" }`) | Must match the new project's Lemon Squeezy store slug. |
| Logo/favicon assets | `public/logo-full.png`, `public/logo-full-white.png`, `public/favicon.svg` | Swap files, keep the same filenames so component references don't need edits. |
| Comparison pages | `app/imovie-alternative`, `app/investigation-video-editor-alternative`, `app/v3-video-editor-alternative`, `app/wondershare-alternative` | 100% niche-specific competitor content. Delete these for a new project rather than templating them, and remove their links from `Footer.tsx`'s "Compare" column and `sitemap.ts`. |
| Supabase schema | `SUPABASE_SCHEMA.md`, `migrations/*.sql` | Specific to this product's data model (name fields, license keys). New project needs its own schema. |
| Changelog entries | `lib/updates.ts` | Reset to `export const updates = []` for a new project. |

## Two ways to package this

**Option A — GitHub template repository (fastest for a clean start).**
Mark this repo a template, then `gh` scaffolds a brand-new repo with no shared git
history in one command:

```bash
gh api -X PATCH repos/Cmj98101/pi-boost-landing -f is_template=true
gh repo create my-new-app --template Cmj98101/pi-boost-landing --private --clone
```

Only do this once the repo is in a state you're happy shipping as a base (see cleanup
note below).

**Option B — scripted rebrand on a fresh clone.** Works without touching this repo's
GitHub settings at all. Use this if you want to keep iterating on this repo without
marking it a template yet.

## Step-by-step runbook (Option B)

Run these on a **fresh clone in a new directory**, never inside this working copy — this
repo is the live investigationflow.com production site.

```bash
# 1. Fresh clone, new remote
git clone https://github.com/Cmj98101/pi-boost-landing.git my-new-app
cd my-new-app
git remote remove origin

# 2. Rebrand: swap the product name and domain everywhere
grep -rl "Investigation Flow" --include="*.tsx" --include="*.ts" --include="*.md" . \
  | xargs sed -i '' 's/Investigation Flow/New Product Name/g'

grep -rl "investigationflow\.com" --include="*.tsx" --include="*.ts" . \
  | xargs sed -i '' 's/investigationflow\.com/newdomain.com/g'

grep -rl "support@investigationflow.com" --include="*.tsx" --include="*.ts" . \
  | xargs sed -i '' 's/support@investigationflow\.com/support@newdomain.com/g'

# 3. Swap analytics/affiliate identifiers in app/layout.tsx by hand:
#    - ahrefs data-key
#    - lemonSqueezyAffiliateConfig store slug
#    - structured data logo URL

# 4. Swap brand assets (keep the same filenames)
#    public/logo-full.png, public/logo-full-white.png, public/favicon.svg

# 5. Update the color palette in app/globals.css's @theme block
#    (navy-*, purple-*, gold-*, slate-* hex values)

# 6. Remove the niche-specific comparison pages and their links
rm -rf app/imovie-alternative app/investigation-video-editor-alternative \
       app/v3-video-editor-alternative app/wondershare-alternative
# then remove the matching "Compare" links in components/Footer.tsx
# and the matching entries in app/sitemap.ts

# 7. Reset the changelog
#    lib/updates.ts -> export const updates = []

# 8. Set up new accounts and drop the keys into .env:
#    - Lemon Squeezy store + product variants (checkout URLs)
#    - Supabase project (run migrations/*.sql as a starting schema, then adjust)
#    - GA4 property (NEXT_PUBLIC_GA_MEASUREMENT_ID)
#    - Ahrefs (optional)

# 9. Install and verify locally
npm install
npm run dev
npx tsc --noEmit
```

## Cleanup to do before using this as a template

- `CONFIG_GUIDE.md` is stale — it documents a `showPricing` flag and a `Pricing.tsx`
  component that no longer exist in `lib/config.ts`. Fix or delete it before templating,
  so the next project doesn't inherit a misleading doc.
- Consider moving the ahrefs key and Lemon Squeezy affiliate store slug in
  `app/layout.tsx` into `.env`, matching the pattern already used for GA and Supabase.
  That would shrink step 3 above to "edit `.env`" instead of "edit `layout.tsx` by hand."
