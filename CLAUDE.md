# Investigation Flow website

## Design system

`DESIGN-webflow.md` is the source of truth for all visual design on this site. Read it
before building or restyling any page or component, and keep new work consistent with it.

It is a style reference only: keep Investigation Flow's own name, logo, and copy. Never use
Webflow's branding or its proprietary WF Visual Sans font. Inter (with `ss01`) is the
substitute the design file names.

How the design file maps onto this codebase:

- **Tokens** live in the `@theme` block of `app/globals.css`. Use the named colors
  (`ink`, `body`, `body-mid`, `mute`, `hairline`, `canvas`, `accent-*`) instead of raw hex.
  The `slate-*` scale is remapped to the design's neutral grays, so existing `slate-*`
  classes stay on-system.
- **Buttons:** `.btn-primary` (near-black, 4px radius) and `.btn-secondary` (white with a
  hairline border). Never use pill-shaped CTAs, gradients, or accent colors on buttons.
- **Cards:** `.card` (white, hairline border, 8px radius, 32px padding) and `.card-dark`
  (near-black). Add `.shadow-layered` only to a featured card.
- **Type:** weights 400 / 500 / 600 only (never `font-bold`). Headlines are ink, never
  gradient text. Section eyebrows use `.eyebrow`.
- **Accents** (purple, pink, blue, orange, green) are full-fill surfaces such as category
  cards, never buttons or body text.

## Other notes

- `lib/site.ts` holds brand and site config; `lib/config.ts` holds page copy.
- Lead capture goes through Brevo; see `BREVO_SETUP.md`.
