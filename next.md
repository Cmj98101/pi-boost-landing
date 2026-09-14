# SEO Checklist

Audit and implementation for `pi-boost-landing` (Investigation Flow).
Every claim below was verified against the running production build, not assumed.

**Status: all code-side items are done.** What remains is work that can only
happen outside the repo — Search Console signup, device testing, and backlinks.

Legend: `[x]` done · `[ ]` outstanding (needs you, not code)

---

## Done

### Terms of Service page — `/terms`
The footer's "Terms of Service" link pointed at `href="#"` on every page.

- [x] Wrote `app/terms/page.tsx` — 19 sections covering the license grant, seat
      activation and transfer, the 25-conversion free trial, subscription vs.
      Lifetime (V1) billing, refunds, your-content/your-responsibilities,
      acceptable use, IP, warranty disclaimer, liability cap, and governing law.
      Content is drawn from the real pricing model in `lib/config.ts`.
- [x] Pointed the footer link at `/terms`
- [x] Added `/terms` to the sitemap
- [x] **Not legal advice.** This is a solid starting template, but it makes
      jurisdiction and refund commitments you should have a lawyer confirm —
      particularly Sections 6 (Refunds), 14 (Limitation of Liability), and 16
      (Governing Law), which currently says "the state in which Investigation
      Flow is established" and needs your actual state named.

### OG images — the biggest gap, now closed
Every share on X, LinkedIn, Slack, and iMessage was rendering a blank card:
`layout.tsx` declared `twitter: { card: "summary_large_image" }` with no image.

- [x] Built `lib/og.tsx` — a shared 1200x630 card renderer using Next's
      `ImageResponse`, so cards are generated from code at build time and stay
      in sync with the brand. No design tool, no binary assets to maintain.
- [x] Added tailored cards for **all 12 pages** (home, pricing, download, learn,
      terms, privacy, contact, updates, and the four comparison pages)
- [x] Verified all 12 render as valid 1200x630 PNGs and that every page emits
      `og:image` + `twitter:image`
- [x] Caught a subtle Next.js behaviour on the way: a page that declares its own
      `openGraph` block does **not** inherit the root `opengraph-image`. That
      silently left `/terms`, `/privacy`, `/contact`, and `/updates` with no
      card until each got its own.

### Broken links
- [x] Fixed the dead footer "Terms of Service" link (was `href="#"`)
- [x] Crawled every internal link from `/`: **19 URLs, zero broken.** The only
      non-200s are `/download/mac` and `/download/windows`, which 302 correctly.
- [x] Confirmed both download targets are live on GitHub Releases (v1.0.0 macOS
      `.dmg` and Windows `.exe`), so the env vars are set in production
- [x] Confirmed the apex domain 308s to `www` — the canonical host is correct
      and there is no duplicate-content split
- [x] **Removed the in-browser demo entirely** (you retired the subdomain). This
      went well beyond the 8 dead CTA buttons: the demo was used as a
      *competitive differentiator* against named companies, so leaving it would
      have shipped false comparative claims. Replaced across:
      - 8 CTA buttons -> "Download Free Trial" pointing at `/download`
      - 4 comparison-table rows: "Try free in your browser" -> "Free trial
        before you buy". The Wondershare row stays a genuine win (their trial
        watermarks output, yours does not); the V3 and IVE rows now state the
        honest near-parity position instead of a stale advantage.
      - 4 FAQ answers, 2 hero paragraphs, 4 "why switch" cards, 4 final-CTA
        paragraphs
      - Deleted `components/DemoLink.tsx`, `demoUrl` in `lib/config.ts`, and
        `analytics.demoClicked` - all dead once the demo was gone

### Meta titles and descriptions
- [x] Rewrote five over-length titles and four over-length descriptions, keyword-first:

| Page | Title before → after | Desc before → after |
|---|---|---|
| home | 77 → **52** | 164 → **134** |
| `/wondershare-alternative` | 99 → **58** | 191 → **143** |
| `/imovie-alternative` | 81 → **59** | 173 → **140** |
| `/investigation-video-editor-alternative` | 79 → **52** | 222 → **133** |
| `/v3-video-editor-alternative` | 62 → **47** | 182 → **134** |

      The longer, more descriptive phrasing was kept for the `openGraph` titles,
      which have no 60-character budget.

### Header hierarchy
- [x] `/pricing` was the worst offender: H1 → H3 skipped H2 entirely, then
      H3 → H4. Added a screen-reader-only "Plans and pricing" H2, promoted the
      team section to H2, demoted its nested contact heading to H3, and promoted
      the Lifetime disclaimer to H2.
- [x] Promoted the four footer column headings from H3 to H2. This surfaced on
      `/contact`, a sparse page with no content H2s, where the footer's H3s
      followed the H1 directly and created a skip on every such page.
- [x] **Verified across all 13 pages: exactly one H1, first heading is the H1,
      zero skipped levels.**

### Images
- [x] `logo-full.png` **114 KB → 9.6 KB (92% smaller)** — it was a 1682px-wide
      PNG rendering at ~40px tall, loaded in the nav on every page *with
      `priority`*, so it was being preloaded ahead of real content
- [x] `logo-full-white.png` **63 KB → 6.1 KB (90% smaller)** — footer, every page
- [x] `hero.webp` **104 KB → 66 KB (36% smaller)**, resized 2400px → 1920px
- [x] Deleted `demo-preview.png` — 94 KB, referenced nowhere
- [x] Updated the `width`/`height` props and added `sizes="200px"` to both logos
      so Next stops generating oversized srcset candidates
- [x] **Combined: the logo payload on every single page drops 161 KB (91%).**
      Originals backed up in the session scratchpad.

### Core Web Vitals
Baseline you captured (PSI mobile, Sep 14): **Performance 73 · LCP 5.9s (red) ·
FCP 1.4s · TBT 170ms · CLS 0 · SI 4.5s.** FCP, TBT, and CLS are all green, so
LCP was the only real problem and the work targeted it specifically.

- [x] Measured rather than guessed: the prerendered homepage is 219 KB raw but
      **39.6 KB gzipped**, so `inlineCss` + daisyUI was *not* the bottleneck
- [x] Killed the preload contention — a 114 KB PNG logo marked `priority` was
      competing with the actual LCP element for bandwidth on slow 4G
- [x] Cut the hero source from 2400px to 1920px, which reduces both transfer
      bytes and the server-side transcode time on a cold image-optimizer cache
- [x] Moved Lemon Squeezy `affiliate.js` off the critical path — it was a raw
      `<script defer>` in `<head>`; now `next/script` with `lazyOnload`
- [x] Audited the rest of the third-party load and found it already well-tuned:
      GA is `lazyOnload`, PostHog defers session recording to first interaction,
      Ahrefs is `lazyOnload`. Left alone.
- [ ] **Re-run PageSpeed Insights after deploying** and compare against the 73
      baseline. LCP should improve materially; the remaining flagged items
      ("Legacy JavaScript 33 KiB", "efficient cache lifetimes 23 KiB") come from
      Next's polyfill chunk and third-party scripts and are largely not fixable
      from here.

### Schema markup
- [x] **Added `offers` to `SoftwareApplication`** — no price was exposed to
      Google before. Now an `AggregateOffer` spanning $19.99–$299 with all three
      plans broken out, driven off `lib/config.ts` so schema and pricing cannot
      drift apart.
- [x] **Added `FAQPage` to the homepage** — the accordion rendered seven real
      Q&As that search engines could not identify as a FAQ
- [x] Extracted FAQ copy to `lib/faq.ts` so the accordion and the schema read
      from one source — a schema/markup mismatch is exactly what gets penalised
- [x] Added `BreadcrumbList` to all four comparison pages
- [x] Verified every JSON-LD block parses and emits the expected types
- [x] **Deliberately skipped a separate `Product` node on `/pricing`.** The
      sitewide `SoftwareApplication` already carries full per-plan offer detail
      on that page; a second node would duplicate the same offers on the same
      URL, which is worse than not having it. Flagging since this was on the
      original list.
- [ ] Add `aggregateRating` **only once real, verifiable reviews exist**.
      `showFullTestimonials` is still `false`. Fabricated ratings risk a manual
      action — do not add this preemptively.
- [ ] Validate in Google's Rich Results Test once deployed (needs a public URL)

### Internal linking
Each comparison page previously had exactly **one** inbound link sitewide.

- [x] Built `lib/comparisons.ts` + `components/RelatedComparisons.tsx` — each
      comparison page now cross-links to its three siblings. Adding a new
      comparison page wires it into every sibling automatically.
- [x] Added a comparison link row to the homepage FAQ, where "how does this
      compare to X?" is the natural next question
- [x] Added the missing "Home" crumb to the `/learn/<slug>` breadcrumb so the
      visible UI matches the BreadcrumbList schema
- [x] Correction to the original audit: `/learn/<slug>` **already had** a visible
      breadcrumb. I reported it as missing; it was not.
- [ ] Next/previous links between tutorials — deferred, there is only one
      tutorial today. Worth doing at three or more.

### Indexing hygiene
- [x] Confirmed **zero** `noindex` tags exist — nothing was blocking indexing
- [x] Added `robots: { index: false }` to `/auth/callback` via a new layout.
      It's a client component so it couldn't export metadata, and it was
      inheriting the root canonical — **declaring itself as the homepage.**
- [x] Verified canonicals on all 13 pages
- [x] Verified `robots.txt` and `sitemap.xml` (now 13 URLs including `/terms`)
- [x] Search Console plumbing: `layout.tsx` reads
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and emits the meta tag only when
      set, so an empty tag never ships

---

## Outstanding — needs you, not code

### Verify Search Console
- [x] Property signed up and verified (done by you)
- [x] Env vars confirmed present in Vercel (done by you)
- [ ] **Submit `https://www.investigationflow.com/sitemap.xml`** in Search
      Console after this deploys — the sitemap gained `/terms` and the
      descriptions changed, so a resubmit gets it recrawled sooner.
- [ ] Set up Bing Webmaster Tools too — this audience skews Windows desktop
- Note: if you verified via DNS TXT or the HTML-file method, you do **not** need
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. The meta tag is only emitted when that
  var is set, so leaving it unset is harmless.

### Mobile responsiveness
Tailwind breakpoints are used consistently and `Navigation.tsx` has a real
mobile menu, so the foundation is sound. PSI reported no mobile-usability
errors. Still needs human eyes:

- [ ] Test at 375px (iPhone SE), 390px, and 768px
- [ ] Check the pricing team-seat slider and comparison tables — always the
      first things to break
- [ ] Confirm tap targets are >=44px in the mobile nav

### Backlink strategy — ongoing, slowest to pay off
- [ ] **Directories:** AlternativeTo, Capterra, G2, GetApp, Product Hunt,
      SaaSHub, Slant. Your four comparison pages are built to catch exactly this
      traffic — AlternativeTo especially.
- [ ] **Industry associations:** state PI associations, NCISS, NALI. Member
      directories and resource pages are high-relevance, low-competition links.
- [ ] **Communities:** r/PrivateInvestigator, PI Facebook groups. Participate
      genuinely; links follow.
- [ ] **Content-led:** `/learn` is the linkable asset. Expand it, then pitch to
      PI training sites and licensing-course providers.
- [ ] **YouTube:** your tutorials are already there — link each description back
      to the matching `/learn/<slug>` page. Free, immediate, entirely in your
      control.
- [ ] **Microsoft Store listing** (`STORE_LISTING.md`) — confirm it links back
- [ ] Track in Ahrefs; analytics is already on the account

---

## Verification performed

Against a real production build (`next build` + `next start`):

- 35 routes build clean; `tsc --noEmit` passes
- 19 internal URLs crawled from `/` — zero broken links
- 12/12 pages emit a valid 1200x630 `og:image`
- 13/13 pages: one H1, no skipped heading levels
- All JSON-LD parses; verified types per page
- `robots.txt` and 13-URL `sitemap.xml` render correctly
- Apex → www redirect confirmed live (308)
