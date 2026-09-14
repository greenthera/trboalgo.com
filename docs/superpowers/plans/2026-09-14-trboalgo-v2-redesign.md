# Trboalgo v2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fictional product catalog with trboalgo.com's real 4 SKUs, rebrand to "TrboAlgo", and add trust badges, a video section, a marquee, subtle scroll/gradient animation, and a Shivantra credit — all via outbound links only (no cart), new pieces built with Tailwind utilities.

**Architecture:** Single-page React app, no new components extracted — everything stays inline in `App.tsx` matching the existing pattern (the file is already organized as one flat component tree with a `Chart` helper). New CSS (marquee keyframes, hero gradient keyframes) goes in `App.css` next to the existing hand-written rules it neighbors. No test framework exists in this project; verification is `npm run build` (TypeScript + Vite) plus a temporary headless-Playwright pass per task, matching how every prior change in this project was verified.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 (already configured via `@theme` in `index.css`), lucide-react icons, existing hand-written `App.css` for pre-existing sections.

---

## Before you start

Playwright is not a permanent dependency (it's installed and removed per-task in this project's established pattern, see prior git history in `package.json`). For any task with a visual check:

```bash
cd /Users/work/Desktop/Projects/trboalgo
npm install -D playwright --no-audit --no-fund
npx playwright install chromium   # no-op if already cached
```

And after the task's visual check passes:

```bash
npm uninstall playwright --no-audit --no-fund
```

Dev server for checks: `npm run dev -- --port 5183` (kill any prior listener first with `lsof -ti:5183 -sTCP:LISTEN | xargs -r kill`).

---

### Task 1: Branding — TrboAlgo casing

**Files:**
- Modify: `index.html`
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `index.html`**

In `index.html`, replace:
```html
    <title>Trboalgo — Less noise. More perspective.</title>
```
with:
```html
    <title>TrboAlgo — Less noise. More perspective.</title>
```
And replace the `meta name="description"` content's leading product framing if it says "Trboalgo" anywhere (currently it doesn't reference the brand name, so this may be a no-op — confirm by grep first: `grep -n "Trboalgo\|trboalgo" index.html`).

- [ ] **Step 2: Update `App.tsx` wordmark, aria-labels, footer copyright**

Find and replace each of these exact occurrences in `src/App.tsx`:

1. Header wordmark aria-label:
```tsx
<a href="#" className="wordmark" aria-label="Trboalgo home">
```
→
```tsx
<a href="#" className="wordmark" aria-label="TrboAlgo home">
```

2. Footer copyright line:
```tsx
              © {new Date().getFullYear()} Trboalgo. All rights reserved.
```
→
```tsx
              © {new Date().getFullYear()} TrboAlgo. All rights reserved.
```

3. Footer disclaimer:
```tsx
              illustrative. Trboalgo is not affiliated with TradingView.
```
→
```tsx
              illustrative. TrboAlgo is not affiliated with TradingView.
```

Note: the visible wordmark text itself (`trbo<span>algo</span>`) is a stylized
two-tone render (bold "trbo" + regular "algo") — leave that JSX markup as-is,
it's a deliberate visual treatment, not a plain-text casing issue. Only the
plain-text occurrences above (aria-labels, copyright, disclaimer) need fixing.

- [ ] **Step 3: Verify no stale casing remains**

Run: `grep -n "Trboalgo" src/App.tsx index.html`
Expected: no output (all replaced), except none should remain — if the
wordmark JSX itself doesn't literally contain the string "Trboalgo" (it
doesn't — it's split into `trbo` + `algo` spans), this should be clean.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds with no errors.

---

### Task 2: Real product data

**Files:**
- Modify: `src/App.tsx` (the `products` array and `Product` type usage)

- [ ] **Step 1: Replace the `products` array**

Replace the entire current `products` array (starts with `const products = [`
through the closing `];` before `type Product = ...`) with:

```tsx
const products = [
  {
    name: "TRBOalgo",
    url: "https://www.trboalgo.com/trboalgo",
    price: 39,
    listPrice: 89,
    tag: "THE SECRET WEAPON OF WINNING TRADES",
    category: "Trend following",
    icon: Layers3,
    description:
      "The original TrboAlgo indicator: non-repainted buy and sell signals, auto-detected support and resistance zones, and trend channel visualization. Switch between easy, basic, and aggressive modes to match your style.",
    features: [
      "Dynamic buy & sell signals",
      "Auto entry & exit arrows",
      "Auto-detected support/resistance zones",
      "Built-in multi-market screener",
    ],
    variant: 0,
    badge: "",
  },
  {
    name: "TRBOpro",
    url: "https://www.trboalgo.com/trbopro",
    price: 29,
    listPrice: 69,
    tag: "7+ PREMIUM INDICATORS",
    category: "Price action",
    icon: Activity,
    description:
      "A leaner, faster-to-learn version of the TrboAlgo engine: clear entry/exit signals, trend channel context, and auto trendline detection, tuned for traders who want the core signal set without the extras.",
    features: [
      "Auto entry & exit arrows",
      "Trend channel visualization",
      "Auto trendline detection",
      "Easy, basic & aggressive modes",
    ],
    variant: 1,
    badge: "",
  },
  {
    name: "TRBOalgo + TRBOpro",
    url: "https://www.trboalgo.com/trboalgo-pro",
    price: 49,
    listPrice: 199,
    tag: "TWO INDICATORS, ONE PACKAGE",
    category: "Bundles",
    icon: Layers3,
    description:
      "Get TRBOalgo and TRBOpro as two individual scripts in one purchase — the full signal set plus the leaner companion tool, both non-repainted and ready for your chart.",
    features: [
      "Two full indicator scripts",
      "Dynamic buy & sell signals",
      "Auto support/resistance zones",
      "Built-in multi-market screener",
    ],
    variant: 2,
    badge: "Offer expires soon",
  },
  {
    name: "TRBOalgo 2.0 + TRBOpro",
    url: "https://www.trboalgo.com/bundle-deal",
    price: 49,
    listPrice: 299,
    tag: "ALL PREMIUM INDICATORS, ONE SCRIPT",
    category: "Bundles",
    icon: Crosshair,
    description:
      "The flagship bundle: TRBO Trend, TRBO Screener, TRBO Cloud, and order-block detection combined into a single script, with sharper entry/exit signals and adjustable sensitivity for advanced setups.",
    features: [
      "TRBO Trend & TRBO Cloud heat meter",
      "Order block detection",
      "Multi-timeframe screener",
      "Device alerts (with TradingView subscription)",
    ],
    variant: 0,
    badge: "Featured",
  },
];
```

- [ ] **Step 2: Update the category filter tabs**

Find:
```tsx
              {[
                "All scripts",
                "Trend following",
                "Price action",
                "Momentum",
              ].map((c) => (
```
Replace with:
```tsx
              {[
                "All scripts",
                "Trend following",
                "Price action",
                "Bundles",
              ].map((c) => (
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: succeeds. TypeScript will structurally infer the new `price`/
`listPrice` fields on the `Product` type automatically (it's derived via
`type Product = (typeof products)[number]`) — no manual type edit needed.

---

### Task 3: Product card price row + Buy Now button

**Files:**
- Modify: `src/App.tsx` (product card JSX inside `.product-grid`)
- Modify: `src/App.css` (small additions for the new price/badge/buy-now classes)

- [ ] **Step 1: Add the offer-expires badge alongside the existing featured badge**

Find:
```tsx
                    {p.badge && <span className="featured">{p.badge}</span>}
```
Replace with:
```tsx
                    {p.badge === "Featured" && (
                      <span className="featured">{p.badge}</span>
                    )}
                    {p.badge === "Offer expires soon" && (
                      <span className="offer-badge">{p.badge}</span>
                    )}
```

- [ ] **Step 2: Add price row and Buy Now button, replace the single "Explore script" button**

Find:
```tsx
                  <div className="feature-tags">
                    {p.features.slice(0, 2).map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                  <button
                    className="product-link"
                    onClick={() => setSelected(p)}
                  >
                    Explore script <ArrowRight size={16} />
                  </button>
```
Replace with:
```tsx
                  <div className="feature-tags">
                    {p.features.slice(0, 2).map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[11px] text-smoke line-through">
                      ${p.listPrice.toFixed(2)}
                    </span>
                    <span className="text-[15px] font-normal text-midnight-ink">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      className="product-link !border-t-0 !w-auto !p-0"
                      onClick={() => setSelected(p)}
                    >
                      View details
                    </button>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-indigo-ink hover:bg-indigo-hover text-white text-[11px] font-normal rounded px-3 py-2 transition-colors"
                    >
                      Buy Now <ArrowUpRight size={13} />
                    </a>
                  </div>
```

- [ ] **Step 3: Add the `.offer-badge` CSS rule**

In `src/App.css`, find the existing `.featured` rule:
```css
.featured {
    background: #e8e9ff;
    color: #7f71e6;
    padding: 4px 7px;
    border-radius: 9999px;
    font-size: 7px;
    font-weight: 400
}
```
Add immediately after it:
```css
.offer-badge {
    background: #fdecec;
    color: #c14343;
    padding: 4px 7px;
    border-radius: 9999px;
    font-size: 7px;
    font-weight: 400
}
```

- [ ] **Step 4: Remove the now-redundant bottom border/full-width styling conflict**

The existing `.product-link` CSS rule includes `border-top`, `width: 100%`,
and `padding: 17px 0` — the `!border-t-0 !w-auto !p-0` Tailwind overrides in
Step 2 neutralize those for this specific usage so it sits inline next to
the Buy Now button instead of as a full-width bottom row. No CSS file change
needed here — Tailwind's `!` important modifier handles the override. Confirm
this renders correctly in Step 6's visual check; if the override doesn't
look right, adjust the Tailwind classes on the button directly (not the
shared `.product-link` CSS rule, since the dialog... note: `.product-link`
is only used in this one place in the card; the dialog uses a different
class (`button primary`) for its own CTA, so no cross-usage risk).

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Visual check**

Start the dev server, screenshot the catalog section, confirm: each card
shows a struck-through list price + sale price, a "View details" link and a
violet "Buy Now" button side by side, and the two bundle cards show the red
"OFFER EXPIRES SOON" pill while the flagship bundle also still shows its
violet "Featured" pill (a card can show both if `badge` were both — it
isn't, `badge` is a single string per product, so only one pill shows;
confirm this matches the design intent of one pill per card).

---

### Task 4: Dialog Buy Now CTA

**Files:**
- Modify: `src/App.tsx` (dialog content)

- [ ] **Step 1: Replace the dialog's detail-note and CTA**

Find:
```tsx
              <p className="detail-note">
                Official Trboalgo indicator. Visit the shop for current
                pricing and access details. This chart is illustrative; the
                summary is AI-written.
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="button primary"
              >
                View on Trboalgo.com <MoveUpRight size={16} />
              </a>
```
Replace with:
```tsx
              <p className="detail-note">
                Official TrboAlgo indicator. This chart is illustrative; the
                summary is AI-written.
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="button primary"
              >
                Buy Now — ${selected.price.toFixed(2)}{" "}
                <span className="line-through opacity-60 ml-1">
                  ${selected.listPrice.toFixed(2)}
                </span>
                <MoveUpRight size={16} />
              </a>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: succeeds.

---

### Task 5: Offer banner

**Files:**
- Modify: `src/App.tsx` (add a bar above `<header>`)

- [ ] **Step 1: Add the offer bar as the first element inside the top-level fragment**

Find:
```tsx
  return (
    <>
      <header className="site-header">
```
Replace with:
```tsx
  return (
    <>
      <div className="bg-indigo-ink text-white text-[11px] font-normal text-center py-2 px-4">
        One-time payment, own it forever — 10% off with code{" "}
        <span className="font-semibold tracking-wide">EXCL10</span>
      </div>
      <header className="site-header">
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Visual check**

Screenshot the top of the page. Confirm the violet bar renders above the
header, full width, centered text, readable at mobile width (400px) without
wrapping awkwardly — if the text wraps to two lines on mobile, that's
acceptable (it's a `text-center` block, will wrap gracefully).

---

### Task 6: Trust/payment badges row

**Files:**
- Modify: `src/App.tsx` (import `Lock`, `ShieldCheck`, `CreditCard` from
  lucide-react; add the row after the catalog's `.catalog-note`)

- [ ] **Step 1: Add the three new icons to the lucide-react import**

Find:
```tsx
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Activity,
  Layers3,
  Crosshair,
  X,
  Menu,
  Code2,
  ChartNoAxesCombined,
  MoveUpRight,
  Zap,
} from "lucide-react";
```
Replace with:
```tsx
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Activity,
  Layers3,
  Crosshair,
  X,
  Menu,
  Code2,
  ChartNoAxesCombined,
  MoveUpRight,
  Zap,
  Lock,
  ShieldCheck,
  CreditCard,
  Play,
} from "lucide-react";
```
(`Play` is added here too — it's needed by Task 7's video section, importing
it once now avoids a second import-block edit.)

- [ ] **Step 2: Add the trust row after the catalog note**

Find:
```tsx
          <div className="catalog-note">
            <Code2 size={15} /> Trboalgo's own indicators. AI-written
            summaries based on published feature lists.
          </div>
        </section>
```
Replace with:
```tsx
          <div className="catalog-note">
            <Code2 size={15} /> TrboAlgo's own indicators. AI-written
            summaries based on published feature lists.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 pt-8 border-t border-frost text-[11px] text-steel">
            <span className="flex items-center gap-2">
              <Lock size={15} className="text-indigo-ink" /> Guaranteed safe
              checkout
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-indigo-ink" /> Money-back
              guarantee
            </span>
            <span className="flex items-center gap-2">
              <CreditCard size={15} className="text-indigo-ink" /> Payments
              secured by Stripe
            </span>
          </div>
        </section>
```

(Note: this also fixes the stale "Trboalgo's" casing left in the catalog
note — Task 1's grep in Task 1 Step 3 runs before this task, so re-run
`grep -n "Trboalgo" src/App.tsx` after this task too, since this exact
string wasn't touched by Task 1 — it's a separate occurrence.)

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: succeeds.

---

### Task 7: Video section

**Files:**
- Modify: `src/App.tsx` (add `useState` for video-loaded toggle if not
  already imported — it already is, at the top: `useState, useRef,
  useEffect`; add the new section between the catalog `</section>` and the
  `<section id="why" ...>`)

- [ ] **Step 1: Add local state for the click-to-play thumbnail**

Find:
```tsx
  const [selected, setSelected] = useState<Product | null>(null);
```
Replace with:
```tsx
  const [selected, setSelected] = useState<Product | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
```

- [ ] **Step 2: Insert the video section**

Find (this is the closing of the catalog `<section>` from Task 6's edit,
immediately followed by the "why" section):
```tsx
        </section>
        <section id="why" className="why-section">
```
Replace with:
```tsx
        </section>
        <section className="container py-12">
          <div className="max-w-xl">
            <div className="eyebrow">SEE IT IN ACTION</div>
            <h2 className="mt-4">Watch it on a real chart.</h2>
            <p className="mt-3 text-slate text-[13px]">
              A quick walkthrough of adding a TrboAlgo indicator to your
              TradingView chart.
            </p>
          </div>
          <div className="relative mt-8 max-w-2xl rounded overflow-hidden border border-frost aspect-video bg-black">
            {videoPlaying ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/oZgAAA_F2Ts?autoplay=1"
                title="How to upload indicator — TrboAlgo"
                allow="accelerate-computation; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                className="group relative w-full h-full block"
                onClick={() => setVideoPlaying(true)}
                aria-label="Play video: How to upload indicator"
              >
                <img
                  src="https://img.youtube.com/vi/oZgAAA_F2Ts/hqdefault.jpg"
                  alt="How to upload indicator — video thumbnail"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-indigo-ink shadow-none">
                    <Play size={26} fill="currentColor" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </section>
        <section id="why" className="why-section">
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Visual check**

Screenshot the new section, confirm the thumbnail + play button render.
Click the play button, confirm the iframe swaps in (via a Playwright
`click` + a follow-up check that a `<iframe>` element now exists in the
section's DOM).

---

### Task 8: Marquee for the compatibility strip

**Files:**
- Modify: `src/App.tsx` (duplicate the strip's content, wrap in a marquee
  container)
- Modify: `src/App.css` (add the `@keyframes` and reduced-motion rule)

- [ ] **Step 1: Wrap the compatibility content in a marquee track, duplicated once**

Find:
```tsx
        <div className="compatibility container">
          <span>Different tools. Different markets.</span>
          <div>
            <Activity size={17} /> Forex
          </div>
          <div>
            <span className="bitcoin">₿</span> Crypto
          </div>
          <div>
            <ChartNoAxesCombined size={18} /> Stocks
          </div>
          <div>
            <Layers3 size={17} /> Indices
          </div>
          <span className="built-on">
            Built for{" "}
            <strong>
              <span className="tv-mark">Tᵛ</span> TradingView
            </strong>
          </span>
        </div>
```
Replace with:
```tsx
        <div className="compatibility-outer">
          <div className="compatibility container marquee-track">
            {[0, 1].map((i) => (
              <div className="marquee-group" key={i} aria-hidden={i === 1}>
                <span>Different tools. Different markets.</span>
                <div>
                  <Activity size={17} /> Forex
                </div>
                <div>
                  <span className="bitcoin">₿</span> Crypto
                </div>
                <div>
                  <ChartNoAxesCombined size={18} /> Stocks
                </div>
                <div>
                  <Layers3 size={17} /> Indices
                </div>
                <span className="built-on">
                  Built for{" "}
                  <strong>
                    <span className="tv-mark">Tᵛ</span> TradingView
                  </strong>
                </span>
              </div>
            ))}
          </div>
        </div>
```

Note: this changes `.compatibility`'s role from "the content row" to "the
scrolling track" — its existing CSS (`display:flex; padding-block:48px;
border-top/bottom`) still applies to the track wrapper correctly, since flex
with two `.marquee-group` children lays them out side by side, which is
exactly what the marquee needs. `aria-hidden` on the second (duplicate)
group prevents screen readers from announcing the content twice.

- [ ] **Step 2: Add marquee CSS**

In `src/App.css`, find the `.compatibility` rule block and its media-query
overrides (search `.compatibility {`). Immediately after the base
`.compatibility { ... }` rule (before `.compatibility>div { ... }`), add:

```css
.compatibility-outer {
    overflow: hidden
}

.marquee-track {
    width: max-content;
    animation: marquee-scroll 32s linear infinite
}

.marquee-group {
    display: flex;
    align-items: center;
    gap: 22px;
    flex-shrink: 0;
    padding-inline: 22px
}

@keyframes marquee-scroll {
    from {
        transform: translateX(0)
    }
    to {
        transform: translateX(-50%)
    }
}

@media(prefers-reduced-motion:reduce) {
    .marquee-track {
        animation: none
    }
}
```

- [ ] **Step 3: Remove the now-conflicting `justify-content: space-between` from `.compatibility`**

The existing `.compatibility` rule has `justify-content: space-between`,
which fought the marquee's continuous-scroll layout (it would space out the
two duplicate groups instead of letting them sit flush for a seamless
loop). Find:
```css
.compatibility {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 48px;
    border-top: 1px solid #e5edf5;
    border-bottom: 1px solid #e5edf5;
    font-size: 12px;
    color: #64748d
}
```
Replace with:
```css
.compatibility {
    display: flex;
    align-items: center;
    padding-block: 48px;
    border-top: 1px solid #e5edf5;
    border-bottom: 1px solid #e5edf5;
    font-size: 12px;
    color: #64748d
}
```

- [ ] **Step 4: Adjust the mobile `.compatibility` override**

The 700px media query currently has `.compatibility{flex-wrap:wrap;
justify-content:center;gap:22px;padding-block:32px}` — `flex-wrap:wrap` and
a fixed `justify-content` don't make sense for a horizontally-scrolling
marquee track at any width. Find (inside the `@media(max-width:700px)`
block):
```css
    .compatibility {
        flex-wrap: wrap;
        justify-content: center;
        gap: 22px;
        padding-block: 32px
    }
```
Replace with:
```css
    .compatibility {
        padding-block: 32px
    }
```

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Visual check**

Load the page, wait ~2s, take two screenshots of the compatibility strip
0.5s apart, confirm the content has visibly shifted left between the two
(proof the animation is running). Then check with
`page.emulateMedia({ reducedMotion: 'reduce' })` that a `getComputedStyle`
check on `.marquee-track` reports `animationName: 'none'` (proof the
reduced-motion override works).

---

### Task 9: Hero background gradient animation

**Files:**
- Modify: `src/App.css` (`.hero-section` rule + new keyframes)

- [ ] **Step 1: Replace the static hero gradient with an animated one**

Find:
```css
.hero-section {
    background: linear-gradient(110deg, #ffffff 43%, #f8fafd 100%);
    overflow: hidden
}
```
Replace with:
```css
.hero-section {
    background: linear-gradient(110deg, #ffffff 43%, #f8fafd 100%);
    background-size: 200% 200%;
    animation: hero-gradient-shift 22s ease-in-out infinite;
    overflow: hidden
}

@keyframes hero-gradient-shift {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}
```

- [ ] **Step 2: Confirm the existing reduced-motion rule covers this**

`index.css` already has:
```css
@media(prefers-reduced-motion:reduce) {
  html {
    scroll-behavior: auto
  }

  * {
    transition: none !important
  }
}
```
This covers `transition`, not `animation`. Add `animation: none !important`
alongside it. In `src/index.css`, find:
```css
  * {
    transition: none !important
  }
```
Replace with:
```css
  * {
    transition: none !important;
    animation: none !important
  }
```
(This one rule now also covers Task 8's marquee, replacing the need for the
separate reduced-motion block added in Task 8 Step 2 — but leave that block
in place too; redundant coverage of the same media query is harmless and
keeps each feature's CSS self-contained and independently readable.)

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Visual check**

Screenshot the hero at t=0 and t=11s (half the 22s cycle), confirm the
gradient's visual position has shifted (subtle, but the `background-position`
computed style should differ between the two captures).

---

### Task 10: Scroll-reveal on sections

**Files:**
- Modify: `src/App.tsx` (add a `useInView` hook + apply to 4 sections)

- [ ] **Step 1: Add the `useInView` hook**

Find:
```tsx
function App() {
```
Insert immediately before it:
```tsx
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function App() {
```

- [ ] **Step 2: Instantiate one hook call per section to reveal**

Find:
```tsx
  const [videoPlaying, setVideoPlaying] = useState(false);
```
Replace with:
```tsx
  const [videoPlaying, setVideoPlaying] = useState(false);
  const whyReveal = useInView<HTMLElement>();
  const howReveal = useInView<HTMLElement>();
  const faqReveal = useInView<HTMLElement>();
  const closingReveal = useInView<HTMLElement>();
```

- [ ] **Step 3: Apply the ref + conditional classes to each section**

Find:
```tsx
        <section id="why" className="why-section">
```
Replace with:
```tsx
        <section
          id="why"
          ref={whyReveal.ref}
          className={`why-section transition-all duration-500 ease-out ${whyReveal.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
```

Find:
```tsx
        <section id="how-it-works" className="container how-section">
```
Replace with:
```tsx
        <section
          id="how-it-works"
          ref={howReveal.ref}
          className={`container how-section transition-all duration-500 ease-out ${howReveal.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
```

Find:
```tsx
        <section className="container faq-section" id="faq">
```
Replace with:
```tsx
        <section
          id="faq"
          ref={faqReveal.ref}
          className={`container faq-section transition-all duration-500 ease-out ${faqReveal.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
```

Find:
```tsx
        <section className="closing container">
```
Replace with:
```tsx
        <section
          ref={closingReveal.ref}
          className={`closing container transition-all duration-500 ease-out ${closingReveal.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
```

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: succeeds. TypeScript must accept `ref={whyReveal.ref}` on a
`<section>` — `useInView<HTMLElement>()` types the ref as
`RefObject<HTMLElement | null>`, which matches.

- [ ] **Step 5: Visual check**

Load the page at full height (so all sections are already near-viewport) —
instead, to actually test the reveal, load at viewport height 800px,
confirm the "why" section (which starts well below the fold) has
`opacity: 0` in its initial computed style, then scroll it into view and
confirm `opacity` transitions to `1` within ~600ms. Also verify with
`emulateMedia({ reducedMotion: 'reduce' })` that sections are immediately
at `opacity: 1` with no transition delay (the hook's early-return path).

---

### Task 11: Shivantra credit in footer

**Files:**
- Modify: `src/App.tsx` (footer-top row)

- [ ] **Step 1: Add the credit line**

Find:
```tsx
            <span>Built for clarity. Designed for traders.</span>
            <a
              href="https://in.tradingview.com/scripts/"
              target="_blank"
              rel="noreferrer"
            >
              Explore TradingView <ArrowUpRight size={14} />
            </a>
```
Replace with:
```tsx
            <span>Built for clarity. Designed for traders.</span>
            <span className="text-steel">
              Developed by{" "}
              <a
                href="https://www.shivantra.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-ink hover:text-indigo-hover font-normal"
              >
                Shivantra
              </a>
            </span>
            <a
              href="https://in.tradingview.com/scripts/"
              target="_blank"
              rel="noreferrer"
            >
              Explore TradingView <ArrowUpRight size={14} />
            </a>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Visual check**

Screenshot the footer, confirm "Developed by Shivantra" renders with
"Shivantra" as a distinctly colored link, and that the `footer-top` row
(which is `display:flex` with 3 children now instead of 2) doesn't overflow
or wrap awkwardly at 1400px and at 400px viewport widths. If the row feels
cramped at mobile width (the existing `@media(max-width:700px)` rule already
hides `.footer-top>span` and shrinks gaps — the new credit `<span>` will be
hidden by the existing `.footer-top>span{display:none}` mobile rule too,
which is fine/consistent with how the "Built for clarity..." span already
behaves on mobile).

---

### Task 12: Full-page final verification

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: clean, no TS errors, no warnings.

- [ ] **Step 2: Grep for leftover stale text**

Run:
```bash
grep -in "trboalgo" src/App.tsx | grep -v "TrboAlgo\|trboalgo\.com\|www\.trboalgo"
```
Expected: no output (every remaining lowercase "trboalgo" occurrence should
only be part of a URL like `www.trboalgo.com`, never standalone brand text).

Run:
```bash
grep -in "community script\|original author" src/App.tsx
```
Expected: no output.

- [ ] **Step 3: Full headless-browser pass**

Install Playwright per "Before you start", start the dev server, then in
one script: screenshot full page, confirm all 4 products render with
correct names/prices/Buy Now hrefs (assert each `href` matches the 4 real
URLs from Task 2), open the dialog for one product and confirm its Buy Now
button text includes the correct price, click the video thumbnail and
confirm the iframe appears, confirm the offer bar text is present, confirm
the trust row's 3 items are present, confirm the marquee track's
`transform` changes over a 1s window, confirm the dialog still centers
(`margin: auto` regression check from the earlier fix), confirm no
`console.error` was logged during the whole interaction sequence.

- [ ] **Step 4: Clean up**

```bash
rm -f check.cjs
npm uninstall playwright --no-audit --no-fund
lsof -ti:5183 -sTCP:LISTEN | xargs -r kill 2>/dev/null
```

- [ ] **Step 5: Report to user**

Summarize what changed, confirm `npm run build` is clean, and explicitly
remind that nothing has been committed or pushed (per the user's
instruction) — `git status --short` should show the modified/untracked
files ready for the user's own commit.

---

## Self-review notes

- **Spec coverage:** all 10 spec sections map to a task — branding (1),
  product data (2), catalog price/Buy Now (3), dialog CTA (4), offer banner
  (5), trust badges (6), video (7), marquee (8), hero gradient + scroll
  reveal (9, 10), Shivantra credit (11), Tailwind-for-new-pieces is woven
  through every task's added markup rather than a standalone task (by
  design — it's a styling approach, not a discrete feature).
- **No cart, confirmed:** every purchase action (Task 3's Buy Now button,
  Task 4's dialog CTA) is a plain outbound `<a href>` to a real
  trboalgo.com URL, opened in a new tab. No component holds cart state, no
  "add to cart" verb appears anywhere in the plan.
- **Type consistency:** `Product` type is inferred structurally from the
  `products` array (`type Product = (typeof products)[number]`, unchanged
  from the existing code) — adding `price`/`listPrice` fields in Task 2
  flows through automatically to every later usage (`selected.price` in
  Task 4) without a manual type edit.
