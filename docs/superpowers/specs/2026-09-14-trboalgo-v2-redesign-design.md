# Trboalgo site v2 redesign — design spec

## Overview

The single-page site currently showcases 3 fictional TradingView community
scripts. This redesign aligns it with the real trboalgo.com product line and
adds trust, media, and motion elements the current version lacks. Scope is
one coherent pass over the existing single page — not a new subsystem.

## Hard constraint (carried over, do not relax)

**No shopping cart.** The site only *lists* products. Every purchase action
is an outbound link to the real trboalgo.com product/checkout page. No
cart state, no add-to-cart, no on-site checkout, no cart icon/count, ever.

## Ground truth (fetched live from trboalgo.com, 2026-09-14)

- Brand casing used in the real site's own asset alt-text: **TrboAlgo**.
- 4 real SKUs on `/shop`, each a distinct page with its own price:
  | Name | List price | Sale price | URL |
  |---|---|---|---|
  | TRBOalgo | $89.00 | $39.00 | `/trboalgo` |
  | TRBOpro | $69.00 | $29.00 | `/trbopro` |
  | TRBOalgo + TRBOpro (bundle) | $199.00 | $49.00 | `/trboalgo-pro` |
  | TRBOalgo 2.0 + TRBOpro (bundle deal) | $299.00 | $49.00 | `/bundle-deal` |
  The two bundles carry an "OFFER EXPIRE SOON" badge on the real site.
- Site-wide offer banner on the real site: "ONE-TIME PAYMENT, OWN IT
  FOREVER — 10% OFF! DISCOUNT CODE -EXCL10".
- Real trust signals present: a Stripe-hosted checkout iframe
  (`js.stripe.com`), a "guaranteed safe checkout" badge image, and a
  "100% satisfaction / money-back guarantee" badge image. We will not
  hotlink their image assets (third-party hosted, could rot, and they're
  someone else's proprietary graphics) — we recreate the same three claims
  (secure checkout, Stripe-powered payments, money-back guarantee) with our
  own iconography (lucide-react, already a dependency) and copy.
- Real tutorial video: `https://youtu.be/oZgAAA_F2Ts` ("How to upload
  indicator!!!"). YouTube's own public thumbnail
  (`https://img.youtube.com/vi/oZgAAA_F2Ts/hqdefault.jpg`) is safe to use
  directly (YouTube serves this for any embeddable video, no auth needed).

## 1. Branding

- Replace every "trboalgo" / "Trboalgo" occurrence in `App.tsx` and
  `index.html` with **TrboAlgo**: header wordmark, footer wordmark, `<title>`,
  meta description, `aria-label`s, footer copyright line.
- Keep the existing ϟ bolt mark + dot styling — only the text casing changes.

## 2. Product data (`src/App.tsx`)

Replace the `products` array with the 4 real SKUs above. Each entry:

```ts
{
  name: string,        // e.g. "TRBOalgo"
  url: string,         // real trboalgo.com product URL, opens in new tab
  price: number,       // sale price, e.g. 39
  listPrice: number,   // strikethrough price, e.g. 89
  tag: string,         // short marketing line, from real product page copy
  category: "Trend following" | "Price action" | "Bundles",
  icon: LucideIcon,
  description: string, // AI-written, grounded in real feature copy
  features: string[],  // pulled from real product page feature lists
  variant: number,      // chart illustration variant (existing mechanism)
  badge: "Featured" | "Offer expires soon" | "",
}
```

Assignment:
- TRBOalgo → Trend following, `Layers3` icon, tag "THE SECRET WEAPON OF
  WINNING TRADES", features drawn from its real page (dynamic buy/sell
  signals, auto entry/exit arrows, auto support/resistance zones, trend
  channel, auto trendlines, screener, easy/basic/aggressive modes).
- TRBOpro → Price action, `Activity` icon, tag "7+ PREMIUM INDICATORS",
  features from its real page (entry/exit arrows, trend channel, auto
  trendlines, custom modes).
- TRBOalgo + TRBOpro → Bundles, `Layers3` icon (reuse), tag "TWO INDICATORS,
  ONE PACKAGE", badge "Offer expires soon".
- TRBOalgo 2.0 + TRBOpro → Bundles, `Crosshair` icon, tag "ALL PREMIUM
  INDICATORS, ONE SCRIPT", badge "Featured" (this is their flagship/most
  expensive tier), features from its real page (TRBO Trend, TRBO Screener,
  TRBO Cloud, Order Block, auto trendlines, mode selection, device alerts).

Filter tabs become: `All scripts`, `Trend following`, `Price action`,
`Bundles` (drop the old "Momentum" tab — nothing maps to it anymore).

## 3. Catalog card changes

Each `.product-card` gets, below the existing description/features:
- Price row: `<del>$89.00</del> $39.00` styled with the strikethrough in
  Steel/Smoke and the sale price in Midnight Ink, bold.
- Two actions side by side: the existing "View details" (opens our modal,
  unchanged behavior) as a text-link, and a new primary **"Buy Now"** button
  (Tailwind-built) that links directly to the product's real trboalgo.com
  URL in a new tab — a plain `<a>`, not a cart action.
- If `badge === "Offer expires soon"`, show a small red/amber pill (not the
  existing violet "Featured" pill) reading "OFFER EXPIRES SOON".

The detail modal's existing CTA changes from "View on Trboalgo.com" to
**"Buy Now — $39 (was $89)"**, same outbound link, same no-cart behavior.

## 4. Offer banner

A slim, full-width bar directly above the site header (the very top of the
page, above the nav), reading:
**"One-time payment, own it forever — 10% off with code EXCL10"**, in the
Periwinkle Wash / Indigo Ink palette already established. Built with
Tailwind utilities.

## 5. Trust/payment section

New small row (placed near the catalog, above or below the product grid)
with 3 items, each an icon + short label, Tailwind-built:
- Lock icon — "Guaranteed safe checkout"
- Shield/Award icon — "Money-back guarantee"
- CreditCard icon — "Payments secured by Stripe"

No hotlinked third-party badge images — icons from `lucide-react`, copy
paraphrased from the real site's actual claims.

## 6. Video section

New section placed immediately after the catalog section and before the
"why" section, titled "See it in action", containing a clickable video
thumbnail:
- Initial state: `<img>` of YouTube's public thumbnail
  (`img.youtube.com/vi/oZgAAA_F2Ts/hqdefault.jpg`) with a centered play
  button overlay (Tailwind + lucide `Play` icon).
- On click, swap to a real `<iframe>` embed
  (`https://www.youtube.com/embed/oZgAAA_F2Ts?autoplay=1`) — click-to-load
  pattern, so nothing loads or autoplays until the user asks for it.

## 7. Marquee

The existing `.compatibility` strip ("Different tools. Different markets."
+ Forex/Crypto/Stocks/Indices + "Built for TradingView") becomes a
continuously auto-scrolling marquee:
- Content duplicated once in the DOM for a seamless loop.
- CSS `@keyframes` translateX loop, ~30s linear, `animation-play-state:
  paused` under `prefers-reduced-motion: reduce` (matches the existing
  reduced-motion handling already in `index.css`).
- This is the one new piece of hand-written CSS in the hybrid approach
  (Tailwind has no built-in marquee primitive) — added to `index.css`,
  everything else about the strip's layout stays Tailwind utilities.

## 8. Subtle animation

- **Hero background**: a slow (18–24s), low-opacity, looping gradient
  shift behind the hero content — CSS `@keyframes` on a background-position
  or conic-gradient rotation, very subtle (this is the site's "background
  animations/gradients" ask). Respects `prefers-reduced-motion`.
- **Scroll reveal**: a small reusable hook (`useInView` via
  `IntersectionObserver`) applied to each major section (`why`,
  `how-it-works`, `faq`, `closing`, video section). On first intersection,
  section transitions from `opacity-0 translate-y-3` to `opacity-100
  translate-y-0` over ~400ms. One-shot (doesn't re-trigger on scroll back
  up). Respects `prefers-reduced-motion` (skips straight to visible).

## 9. Shivantra credit

Footer `.footer-top` row gets an added line: "Developed by **Shivantra**",
where "Shivantra" is a link to `https://www.shivantra.com` (new tab),
styled in Indigo Ink to stand out from the surrounding muted footer text.

## 10. Tailwind CSS — hybrid strategy

- `index.css` already declares `@theme` tokens (`--color-indigo-ink`,
  `--color-midnight-ink`, `--color-slate`, `--color-frost`, etc.) via
  Tailwind v4's `@theme` block — these already generate matching utility
  classes (e.g. `bg-indigo-ink`, `text-midnight-ink`).
- All *new* markup from this spec (offer banner, trust row, buy-now
  buttons, price display, video section, marquee wrapper, scroll-reveal
  wrapper) is built with Tailwind utility classes referencing those tokens.
- Every *existing* section's className (`.hero-section`, `.product-card`,
  `.faq-section`, etc.) and its rules in `App.css` are left untouched —
  no risk to the already-verified Stripe design-system work.

## Files touched

- `src/App.tsx` — product data, branding text, new sections/components,
  scroll-reveal hook, buy-now/price markup.
- `src/App.css` — marquee keyframes, hero gradient keyframes (the two
  pieces of new hand-written CSS the hybrid approach calls for).
- `index.html` — title, meta description branding.

## Testing / verification

- `npm run build` must stay clean (TS + Vite).
- Headless-browser pass (Playwright, installed temporarily as before):
  confirm all 4 products render with correct prices/links, buy-now links
  point to the correct real URLs, marquee animates and loops seamlessly,
  scroll-reveal fires once per section, reduced-motion media query
  actually disables the marquee/gradient/reveal animations, video
  thumbnail swaps to a real embed on click, dialog still centers (regression
  check from the earlier margin:auto fix).
- Manual re-read of every text string touched to confirm no leftover
  "Trboalgo"/"trboalgo" casing or stale "community script" language slipped
  back in.
