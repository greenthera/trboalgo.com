import { useState, useRef, useEffect } from "react";
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
import "./App.css";

const products = [
  {
    name: "SuperTrend",
    author: "KivancOzbilgic",
    url: "https://www.tradingview.com/script/r6dAP7yi/",
    tag: "VOLATILITY MEETS DIRECTION",
    category: "Trend following",
    icon: Layers3,
    description:
      "Follow changing trends with an ATR-based overlay. Adjust the period, multiplier, and smoothing method to explore how volatility shapes the trend line.",
    features: [
      "ATR-based trend overlay",
      "Adjustable sensitivity",
      "Trend-change alerts",
    ],
    variant: 0,
    badge: "Featured",
  },
  {
    name: "Support Resistance - Dynamic v2",
    author: "LonesomeTheBlue",
    url: "https://www.tradingview.com/script/va09eWAp-Support-Resistance-Dynamic-v2/",
    tag: "FIND STRUCTURE IN PRICE",
    category: "Price action",
    icon: Activity,
    description:
      "Map support and resistance from pivot-point clusters. Levels adapt as the chart develops, with controls for channel width, pivot sources, and line styling.",
    features: [
      "Dynamic price levels",
      "Pivot-point analysis",
      "Configurable channels",
    ],
    variant: 1,
    badge: "",
  },
  {
    name: "Squeeze Momentum Indicator [LazyBear]",
    author: "LazyBear",
    url: "https://www.tradingview.com/script/nqQ1DT5a-Squeeze-Momentum-Indicator-LazyBear/",
    tag: "READ THE RHYTHM OF VOLATILITY",
    category: "Momentum",
    icon: Crosshair,
    description:
      "Explore volatility compression through Bollinger Bands and Keltner Channels. A momentum histogram adds context as conditions shift between squeeze and release.",
    features: ["Squeeze detection", "Momentum histogram", "Volatility context"],
    variant: 2,
    badge: "",
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
          id={`fill-${variant}-${hero}`}
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
        d={`${path} L 494 216 L20 216 Z`}
        fill={`url(#fill-${variant}-${hero})`}
      />
      <path d={path} fill="none" stroke="#9789dd" strokeWidth="1.8" />
      {values.map((v, i) => {
        const rising = Math.cos(i * 1.6) > -0.25;
        return (
          <g key={i} stroke={rising ? "#6355b3" : "#a8a8bb"}>
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
function App() {
  const [category, setCategory] = useState("All scripts");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  const filtered = products.filter(
    (p) =>
      (category === "All scripts" || p.category === category) &&
      `${p.name} ${p.author} ${p.description} ${p.features.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <header className="site-header">
        <div className="container flex items-center justify-between h-full">
          <a href="#" className="wordmark" aria-label="Trboalgo home">
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
              Why Trboalgo
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
        <section className="catalog container" id="scripts">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE COMMUNITY SCRIPT COLLECTION</div>
              <h2>Your next edge starts here.</h2>
              <p>
                Discover community-built TradingView scripts, curated for
                clearer analysis.
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
                "Momentum",
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
                    {p.badge && <span className="featured">{p.badge}</span>}
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
                  <a
                    className="script-author"
                    href={`https://www.tradingview.com/u/${p.author}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    by {p.author} <ArrowUpRight size={11} />
                  </a>
                  <p>{p.description}</p>
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
            <Code2 size={15} /> Community scripts by their original authors.
            AI-written summaries based on published descriptions.
          </div>
        </section>
        <section id="why" className="why-section">
          <div className="container">
            <div className="eyebrow">PURPOSE OVER COMPLEXITY</div>
            <div className="why-heading">
              <h2>
                Better tools.
                <br />
                Your own decisions.
              </h2>
              <p>
                Your process comes first. These community scripts bring context
                to your charts, so you can spend less time decoding and more
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
        <section id="how-it-works" className="container how-section">
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
                text: "Open the original TradingView publication to review author notes, settings, and access details.",
              },
              {
                title: "Make it your own",
                text: "Use the script’s TradingView page to add it to your chart, then explore its settings.",
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
        <section className="container faq-section" id="faq">
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
                a: "Open a script’s details and follow the View on TradingView link. Sign in to TradingView and use the original publication’s chart controls. Check the author’s notes for setup instructions and updates.",
              },
              {
                q: "Which markets can I use these tools on?",
                a: "Compatibility varies by script, symbol, and timeframe. Read the original author’s documentation and test the settings on your chosen market before relying on the output.",
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
        <section className="closing container">
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
              © {new Date().getFullYear()} Trboalgo. All rights reserved.
            </span>
            <p>
              Trading involves risk. These tools are for informational purposes
              and do not constitute financial advice. Chart previews are
              illustrative. Trboalgo is not affiliated with TradingView.
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
              <a
                className="script-author"
                href={`https://www.tradingview.com/u/${selected.author}/`}
                target="_blank"
                rel="noreferrer"
              >
                by {selected.author} <ArrowUpRight size={12} />
              </a>
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
                Open-source community script. Read the original publication for
                current instructions and author updates. This chart is
                illustrative; the summary is AI-written.
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="button primary"
              >
                View on TradingView <MoveUpRight size={16} />
              </a>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
export default App;
