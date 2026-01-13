# Landing Page Configuration Guide

This landing page has been configured with a modular system that allows you to easily switch between **early access/beta mode** and **launch mode**.

## Quick Start

To switch between modes, edit `/lib/config.ts`:

```typescript
export const SITE_CONFIG = {
  mode: 'early-access' as SiteMode,  // Change to 'launch' when ready
  showPricing: false,                 // Set to true to show pricing section
  // ...
}
```

## Configuration Options

### Site Mode
- `'early-access'` - Beta/founding user messaging focused on getting early testers
- `'launch'` - Full launch messaging focused on conversions and sales

### Feature Flags
- `showPricing: boolean` - Show/hide the entire pricing section

## What Changes Between Modes

### Early Access Mode (`mode: 'early-access'`)
**Hero Section:**
- Badge: "Limited Beta Access - Join Our Founding Users"
- Headline: Emphasizes exclusive beta program
- CTA: "Join Beta Program"
- Email form success message highlights founding user community

**CTA Section:**
- Headline: "Ready to Become a Founding User?"
- Benefits focus on lifetime free access and shaping the product
- Badge: "Limited to First 50 Investigators"
- Stats show: Free access, 50 spots available, 24/7 founder access

**Email Capture:**
- Title: "Join Our Exclusive Beta"
- Features: Free lifetime access, priority support, founding user community
- Button: "Claim My Beta Access"
- Footer: Limited to first 50 users

**Pricing:**
- Hidden by default (showPricing: false)

---

### Launch Mode (`mode: 'launch'`)
**Hero Section:**
- Badge: "Launching Soon - Join the Waitlist"
- Headline: Standard product pitch
- CTA: "Get Early Access"
- Email form success message is standard waitlist confirmation

**CTA Section:**
- Headline: "Ready to Transform Your Video Workflow?"
- Benefits focus on ease of use and trial
- No badge
- Stats show: $29 starting price, 7-day trial, 50% off for first 100

**Email Capture:**
- Title: "Get Early Access"
- Features: 7-day trial, email support, all features, cancel anytime
- Button: "Join Waitlist"
- Footer: Includes 7-day free trial

**Pricing:**
- Can be shown by setting showPricing: true
- Shows 3 tiers: Solo ($29), Professional ($79), Agency ($199)

## Customizing Content

All content is defined in `/lib/config.ts`. You can edit:

1. **Hero content** - Headlines, CTAs, badges
2. **CTA content** - Headlines, benefits, stats, badges
3. **Email capture** - Titles, button text, success messages, features
4. **Pricing tiers** - Names, prices, features, descriptions

## Example: Switching to Launch Mode

```typescript
// In /lib/config.ts
export const SITE_CONFIG = {
  mode: 'launch' as SiteMode,  // Changed from 'early-access'
  showPricing: true,            // Show pricing section
  // ... rest of config
}
```

Save the file and the entire site will update automatically!

## Components Using the Config

- `/components/Hero.tsx` - Uses hero and emailCapture content
- `/components/CTA.tsx` - Uses cta content
- `/components/Pricing.tsx` - Uses pricing config and showPricing flag
- `/components/EmailCapture.tsx` - Uses emailCapture content

## Benefits of This System

✅ **No code changes needed** - Just update the config file
✅ **Preview both modes** - Easy to A/B test or compare
✅ **Keep all content safe** - Launch copy is preserved when in beta mode
✅ **Type-safe** - TypeScript ensures you don't have typos
✅ **Single source of truth** - All messaging in one place

## Need Help?

If you need to add new fields or modify the structure, edit the type definitions and config object in `/lib/config.ts`.
