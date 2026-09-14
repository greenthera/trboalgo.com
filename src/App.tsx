import { useState, useRef, useEffect, useId, type RefObject } from "react";
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
import "./App.css";

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
type Product = (typeof products)[number];
function Chart({
  variant = 0,
  hero = false,
}: {
  variant?: number;
  hero?: boolean;
}) {
  const chartId = useId();
  const values = Array.from(
    { length: 65 },
    (_, i) =>
      158 -
      i * 1.25 +
      Math.sin(i * 0.32 + variant * 2) * 25 +
      Math.sin(i * 1.6) * 6,
  );
  const path = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${20 + i * 7.4} ${v + 24}`)
    .join(" ");
  return (
    <svg
      className="chart-svg"
      viewBox="0 0 550 240"
      role="img"
      aria-label="Illustrative candlestick chart, not live market data"
    >
      <defs>
        <linearGradient
          id={`fill-${chartId}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop stopColor="#7765e8" stopOpacity=".2" />
          <stop offset="1" stopColor="#7765e8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160, 200].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="550"
          y2={y}
          stroke="#e9eaf1"
          strokeWidth=".6"
        />
      ))}
      {[30, 110, 190, 270, 350, 430, 510].map((x) => (
        <line
          key={x}
          x1={x}
          y1="10"
          x2={x}
          y2="215"
          stroke="#e9eaf1"
          strokeWidth=".6"
        />
      ))}
      {variant === 1 && (
        <>
          <rect
            x="10"
            y="66"
            width="480"
            height="21"
            fill="#7765e8"
            opacity=".1"
          />
          <rect
            x="10"
            y="163"
            width="480"
            height="21"
            fill="#7765e8"
            opacity=".1"
          />
        </>
      )}
      <path
        className="chart-area"
        d={`${path} L 494 216 L20 216 Z`}
        fill={`url(#fill-${chartId})`}
      />
      <path className="chart-trend" pathLength="1" d={path} fill="none" stroke="#9789dd" strokeWidth="1.8" />
      <path className="chart-flow" pathLength="1" d={path} fill="none" stroke="#533afd" strokeWidth="3" />
      <circle className="chart-pulse" cx="493.6" cy={values[64] + 24} r="6" fill="#533afd" />
      <circle cx="493.6" cy={values[64] + 24} r="3" fill="#533afd" />
      {values.map((v, i) => {
        const rising = Math.cos(i * 1.6) > -0.25;
        return (
          <g className="chart-candle" style={{ animationDelay: `${i * 35}ms` }} key={i} stroke={rising ? "#6355b3" : "#a8a8bb"}>
            <line x1={20 + i * 7.4} x2={20 + i * 7.4} y1={v - 9} y2={v + 13} />
            <rect
              x={17.8 + i * 7.4}
              y={v - 3}
              width="4.4"
              height={5 + Math.abs(Math.sin(i)) * 7}
              fill={rising ? "#6355b3" : "#c3c2d1"}
              strokeWidth=".5"
            />
          </g>
        );
      })}
      <line
        className="chart-price-line"
        x1="0"
        y1={values[64]}
        x2="505"
        y2={values[64]}
        stroke="#8b7bd4"
        strokeDasharray="3 3"
        opacity=".7"
      />
      <rect
        x="497"
        y={values[64] - 8}
        width="51"
        height="16"
        rx="2"
        fill="#7561cf"
      />
      <text
        x="522"
        y={values[64] + 3}
        textAnchor="middle"
        fontSize="8"
        fill="white"
      >
        67,428.50
      </text>
      {hero && (
        <>
          <rect x="171" y="159" width="32" height="17" rx="3" fill="#533afd" />
          <text x="187" y="170" fontSize="8" fill="white" textAnchor="middle">
            BUY
          </text>
          <path d="M187 156 l-3 4 h6z" fill="#533afd" />
          <rect x="344" y="55" width="34" height="17" rx="3" fill="#eeebfa" />
          <text x="361" y="66" fontSize="8" fill="#7464b1" textAnchor="middle">
            SELL
          </text>
        </>
      )}
      <text x="18" y="235" fontSize="8" fill="#929aaa">
        09:00
      </text>
      <text x="145" y="235" fontSize="8" fill="#929aaa">
        12:00
      </text>
      <text x="274" y="235" fontSize="8" fill="#929aaa">
        15:00
      </text>
      <text x="410" y="235" fontSize="8" fill="#929aaa">
        18:00
      </text>
    </svg>
  );
}
function useInView<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [inView, setInView] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
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
  }, [ref, inView]);
  return inView;
}

function App() {
  const [category, setCategory] = useState("All scripts");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const whyRef = useRef<HTMLElement | null>(null);
  const whyInView = useInView(whyRef);
  const howRef = useRef<HTMLElement | null>(null);
  const howInView = useInView(howRef);
  const faqRef = useRef<HTMLElement | null>(null);
  const faqInView = useInView(faqRef);
  const closingRef = useRef<HTMLElement | null>(null);
  const closingInView = useInView(closingRef);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  const filtered = products.filter(
    (p) =>
      (category === "All scripts" || p.category === category) &&
      `${p.name} ${p.description} ${p.features.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="bg-indigo-ink text-white text-[11px] font-normal text-center py-2 px-4">
        One-time payment, own it forever — 10% off with code{" "}
        <span className="font-semibold tracking-wide">EXCL10</span>
      </div>
      <header className="site-header">
        <div className="container flex items-center justify-between h-full">
          <a href="#" className="wordmark" aria-label="TrboAlgo home">
            <span className="brand-mark">ϟ</span>trbo<span>algo</span>
            <span className="brand-dot">.</span>
          </a>
          <nav
            className={menuOpen ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            <a href="#scripts" onClick={() => setMenuOpen(false)}>
              Script collection
            </a>
            <a href="#why" onClick={() => setMenuOpen(false)}>
              Why TrboAlgo
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQs
            </a>
          </nav>
          <a className="header-cta" href="#scripts">
            Explore scripts <ArrowUpRight size={15} />
          </a>
          <button
            className="mobile-menu"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="little-line" /> BUILT FOR TRADINGVIEW. BUILT
                FOR YOU.
              </div>
              <h1>
                Less noise.
                <br />
                More <span>perspective.</span>
              </h1>
              <p>
                Powerful TradingView scripts that turn complex
                <br className="desktop-break" /> market data into a clearer
                picture. Find your setup.
                <br className="desktop-break" /> Trade with intention.
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-8">
                <a href="#scripts" className="button primary">
                  Explore scripts <ArrowRight size={16} />
                </a>
                <a href="#how-it-works" className="text-link">
                  See how it works <ArrowRight size={15} />
                </a>
              </div>
              <div className="hero-footnote">
                <Code2 size={15} /> Native Pine Script <span>·</span> Works on
                TradingView
              </div>
            </div>
            <div className="hero-visual">
              <div className="chart-window">
                <div className="window-top">
                  <span className="flex items-center gap-2">
                    <span className="tiny-logo">ϟ</span> SCRIPT EXPLORER{" "}
                    <span className="mini-tag">INDICATOR</span>
                  </span>
                  <span className="window-dots">•••</span>
                </div>
                <div className="chart-toolbar">
                  <span>
                    <b>BTCUSD</b>
                    <span className="toolbar-muted">
                      {" "}
                      Bitcoin / U.S. Dollar
                    </span>
                  </span>
                  <span>
                    1h <ChevronDown size={11} />
                  </span>
                </div>
                <div className="chart-price">
                  67,428<span>.50</span>
                  <small>Illustrative preview</small>
                </div>
                <Chart hero />
                <div className="chart-bottom">
                  <span>
                    <span className="tv-mark">Tᵛ</span> TradingView
                  </span>
                  <span>Market clarity, at a glance.</span>
                </div>
              </div>
              <div className="floating-label">
                <span className="floating-icon">
                  <Layers3 size={17} />
                </span>
                <div>
                  One chart. More context.
                  <small>Signals, structure, and trend — together.</small>
                </div>
                <Check size={16} />
              </div>
              <span className="visual-caption">
                YOUR CHARTS. A NEW PERSPECTIVE.
              </span>
            </div>
          </div>
        </section>
        <div className="compatibility-outer">
          <div className="compatibility container">
            <span className="marquee-label">Different tools.<br />Different markets.</span>
            <div className="marquee-viewport">
            <div className="marquee-track">
            {[0, 1, 2, 3].map((i) => (
              <div className="marquee-group" key={i} aria-hidden={i > 0}>
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
              </div>
            ))}
            </div>
            </div>
            <span className="built-on marquee-platform">
              Built for
              <strong><span className="tv-mark">Tᵛ</span> TradingView</strong>
            </span>
          </div>
        </div>
        <section className="catalog container" id="scripts">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE TRBOALGO INDICATOR COLLECTION</div>
              <h2>Your next edge<br />starts <span className="catalog-accent">here.</span></h2>
              <p>
                Discover the TrboAlgo indicator lineup, built for clearer
                analysis.
              </p>
            </div>
            <span className="collection-note">
              <span /> Made for your TradingView charts
            </span>
          </div>
          <div className="catalog-controls">
            <div className="tabs" aria-label="Filter scripts">
              {[
                "All scripts",
                "Trend following",
                "Price action",
                "Bundles",
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={category === c ? "active" : ""}
                  aria-pressed={category === c}
                >
                  {c}
                  {c === "All scripts" && (
                    <span>{String(products.length).padStart(2, "0")}</span>
                  )}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={16} />
              <input
                placeholder="Search scripts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search scripts"
              />
              <SlidersHorizontal size={15} />
            </label>
          </div>
          <div className="product-grid">
            {filtered.map((p) => (
              <article className="product-card" key={p.name}>
                <div className={`product-preview preview-${p.variant}`}>
                  <div className="preview-top">
                    <span>
                      {p.name} <span> / BTCUSD · 1h</span>
                    </span>
                    {p.badge === "Featured" && (
                      <span className="featured">{p.badge}</span>
                    )}
                    {p.badge === "Offer expires soon" && (
                      <span className="offer-badge">{p.badge}</span>
                    )}
                  </div>
                  <Chart variant={p.variant} />
                  <span className="preview-watermark">
                    Illustrative chart · not a script screenshot
                  </span>
                </div>
                <div className="product-content">
                  <div className="product-kicker">
                    <p.icon size={17} />
                    {p.tag}
                  </div>
                  <h3>
                    {p.name}
                    <ArrowUpRight size={21} />
                  </h3>
                  <p>{p.description}</p>
                  <div className="feature-tags">
                    {p.features.slice(0, 2).map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                  <div className="product-price">
                    <span className="text-[11px] text-smoke line-through">
                      ${p.listPrice.toFixed(2)}
                    </span>
                    <span className="text-[15px] font-normal text-midnight-ink">
                      ${p.price.toFixed(2)}
                    </span>
                    <small>one-time payment</small>
                  </div>
                  <div className="product-actions">
                    <button
                      className="product-details-button"
                      onClick={() => setSelected(p)}
                    >
                      View details <ArrowRight size={15} />
                    </button>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="product-buy-button"
                    >
                      Buy Now <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No scripts found</h3>
              <p>Try a different keyword or browse the full collection.</p>
              <button
                className="text-link"
                onClick={() => {
                  setSearch("");
                  setCategory("All scripts");
                }}
              >
                Clear filters <ArrowRight size={15} />
              </button>
            </div>
          )}
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
        <section className="video-section container">
          <div className="video-panel">
          <div className="video-copy">
            <div className="eyebrow">SEE IT IN ACTION</div>
            <h2>From setup<br />to your first signal.</h2>
            <p className="video-description">
              A quick walkthrough of adding a TrboAlgo indicator to your
              TradingView chart.
            </p>
            <div className="video-chapters">
              <span><b>01</b> Add your indicator <ArrowUpRight size={15} /></span>
              <span><b>02</b> Make the chart yours <SlidersHorizontal size={15} /></span>
              <span><b>03</b> Find your perspective <Activity size={15} /></span>
            </div>
            <span className="video-platform"><Code2 size={15} /> Made for TradingView</span>
          </div>
          <div className="video-player">
            {videoPlaying ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/oZgAAA_F2Ts?autoplay=1"
                title="How to upload indicator — TrboAlgo"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                className="video-poster"
                onClick={() => setVideoPlaying(true)}
                aria-label="Play video: How to upload indicator"
              >
                <img
                  src="https://img.youtube.com/vi/oZgAAA_F2Ts/hqdefault.jpg"
                  alt="How to upload indicator — video thumbnail"
                  className="w-full h-full object-cover"
                />
                <span className="video-overlay">
                  <span className="video-play">
                    <Play size={26} fill="currentColor" />
                  </span>
                  <span className="video-caption"><small>THE TRBOALGO WALKTHROUGH</small><strong>A clearer chart starts here.</strong><span>Watch the setup guide <ArrowUpRight size={16} /></span></span>
                </span>
              </button>
            )}
          </div>
          </div>
        </section>
        <section
          id="why"
          ref={whyRef}
          className={`why-section transition-all duration-500 ease-out ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <div className="container">
            <div className="eyebrow">PURPOSE OVER COMPLEXITY</div>
            <div className="why-heading">
              <h2>
                Better tools.
                <br />
                Your own decisions.
              </h2>
              <p>
                Your process comes first. These indicators bring context to
                your charts, so you can spend less time decoding and more
                time understanding.
              </p>
            </div>
            <div className="benefit-grid">
              {[
                {
                  icon: Crosshair,
                  title: "Clarity over clutter",
                  text: "Focus on the signals and market structure that matter to your analysis.",
                },
                {
                  icon: SlidersHorizontal,
                  title: "Your strategy. Your settings.",
                  text: "Shape your charting workflow around your preferred markets and approach.",
                },
                {
                  icon: Zap,
                  title: "Right where you trade",
                  text: "Bring your tools into TradingView, without switching between platforms.",
                },
              ].map((b) => (
                <div key={b.title}>
                  <b.icon size={23} />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          ref={howRef}
          className={`container how-section transition-all duration-500 ease-out ${howInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <div className="eyebrow">FROM DISCOVERY TO YOUR CHART</div>
          <h2>A simpler way to get started.</h2>
          <div className="steps">
            {[
              {
                title: "Find your script",
                text: "Explore the collection and choose a tool that fits the way you analyze markets.",
              },
              {
                title: "Get to know the setup",
                text: "Visit the TrboAlgo shop to review pricing, settings, and access details.",
              },
              {
                title: "Make it your own",
                text: "Once purchased, follow TrboAlgo’s setup guide to add it to your TradingView chart, then explore its settings.",
              },
            ].map((s, i) => (
              <div key={s.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="faq"
          ref={faqRef}
          className={`container faq-section transition-all duration-500 ease-out ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <div>
            <div className="eyebrow">A LITTLE MORE CONTEXT</div>
            <h2>
              Good questions.
              <br />
              Clear answers.
            </h2>
            <a
              href="https://www.trboalgo.com/contact"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Talk to our team <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="faq-list">
            {[
              {
                q: "What are TradingView scripts?",
                a: "Scripts are tools written in Pine Script that run on TradingView charts. They can visualize technical indicators, highlight price patterns, and support your own market analysis.",
              },
              {
                q: "How do I add a script to TradingView?",
                a: "Open a product’s details and follow the link to the TrboAlgo shop. After purchase, follow TrboAlgo’s setup guide to add the indicator to your TradingView chart.",
              },
              {
                q: "Which markets can I use these tools on?",
                a: "Compatibility varies by product, symbol, and timeframe. Read TrboAlgo’s documentation and test the settings on your chosen market before relying on the output.",
              },
              {
                q: "Do these scripts guarantee profitable trades?",
                a: "No. Indicators support analysis and cannot predict outcomes or guarantee returns. Use your own judgment, test your setup, and manage risk.",
              },
            ].map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <ChevronDown size={17} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          ref={closingRef}
          className={`closing container transition-all duration-500 ease-out ${closingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <div>
            <div className="eyebrow">A CLEARER CHART STARTS HERE</div>
            <h2>Find the tool that fits your thinking.</h2>
          </div>
          <a href="#scripts" className="button primary">
            Explore the collection <ArrowRight size={16} />
          </a>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-top">
            <a className="wordmark" href="#">
              <span className="brand-mark">ϟ</span>trbo<span>algo</span>
              <span className="brand-dot">.</span>
            </a>
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
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} TrboAlgo. All rights reserved.
            </span>
            <p>
              Trading involves risk. These tools are for informational purposes
              and do not constitute financial advice. Chart previews are
              illustrative. TrboAlgo is not affiliated with TradingView.
            </p>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        <div className="dialog-content">
          {selected && (
            <>
              <button
                className="close-dialog"
                onClick={() => setSelected(null)}
                aria-label="Close product details"
              >
                <X size={22} />
              </button>
              <div className="eyebrow">{selected.tag}</div>
              <h2>{selected.name}</h2>
              <Chart variant={selected.variant} />
              <p>{selected.description}</p>
              <h3>Explore the capabilities</h3>
              <ul>
                {selected.features.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
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
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
export default App;
