
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "./styles.css";

const WA_NUMBER = "2349169619444";

const facts = [
  ["5%", "Extra Strength Minoxidil"],
  ["60 ml", "2 fl oz pack"],
  ["Included", "Derma roller"],
  ["WhatsApp", "Direct order support"],
];

const faqs = [
  {
    q: "How do I place an order?",
    a: "Tap any Order on WhatsApp button. Your selected quantity will be included in the message so the seller can confirm current price, availability, delivery fee and payment details.",
  },
  {
    q: "What is included in the kit?",
    a: "The product shown is Ulthimo Men's Extra Strength 5% Minoxidil Hair Regrowth Kit with a derma roller. Confirm the exact pack contents with the seller before payment.",
  },
  {
    q: "Is the current price shown on the website?",
    a: "No. Pricing and delivery costs can change, so the current total is confirmed directly on WhatsApp before you pay.",
  },
  {
    q: "How soon can I expect results?",
    a: "Individual results vary and consistent use may be required over time. Follow the product label carefully and speak with a qualified healthcare professional if you are unsure whether 5% minoxidil is appropriate for you.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [faqOpen, setFaqOpen] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.querySelector(".hero");
      if (hero) {
        const shift = Math.min(window.scrollY * 0.08, 42);
        hero.style.setProperty("--hero-parallax", `${shift}px`);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("show")),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const whatsappLink = useMemo(() => {
    const message = `Hello, I would like to order the Ulthimo 5% Minoxidil Hair Regrowth Kit. Quantity: ${qty}. Please confirm the current price, availability, delivery fee and payment details.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [qty]);

  const go = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav">
          <button className="brand" onClick={() => go("top")} aria-label="Go to homepage">
            <span className="brand-mark">U</span>
            <span className="brand-text"><b>ULTHIMO</b><small>ADVANCED FORMULA</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <button onClick={() => go("product")}>The Kit</button>
            <button onClick={() => go("details")}>Details</button>
            <button onClick={() => go("order")}>Order</button>
            <button onClick={() => go("faq")}>FAQ</button>
          </nav>

          <a className="nav-order" href={whatsappLink} target="_blank" rel="noreferrer">
            <MessageCircle size={17}/> Order on WhatsApp
          </a>

          <button className="menu" onClick={() => setMenuOpen(v => !v)} aria-label="Open navigation menu">
            {menuOpen ? <X/> : <Menu/>}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav container">
            <button onClick={() => go("product")}>The Kit</button>
            <button onClick={() => go("details")}>Details</button>
            <button onClick={() => go("order")}>Order</button>
            <button onClick={() => go("faq")}>FAQ</button>
            <a href={whatsappLink} target="_blank" rel="noreferrer">Order on WhatsApp</a>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-overlay" />

          <div className="container hero-inner">
            <div className="hero-copy hero-motion">
              <span className="eyebrow hero-eyebrow"><CircleCheck size={16}/> Men's Extra Strength Hair Regrowth Kit</span>
              <h1>
                <span className="line">A simple routine</span>
                <span className="line accent">for fuller-looking,</span>
                <span className="line">stronger hair.</span>
              </h1>
              <p className="hero-description">
                Ulthimo brings together 5% Minoxidil and a derma roller in one convenient kit — giving customers a clear product overview and a direct WhatsApp ordering path.
              </p>

              <div className="hero-actions hero-actions-motion">
                <a className="btn gold" href={whatsappLink} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowRight size={18}/></a>
                <button className="btn ghost" onClick={() => go("product")}>See what's inside</button>
              </div>

              <div className="hero-trust hero-trust-motion">
                <span><Check size={14}/> 5% Minoxidil</span>
                <span><Check size={14}/> 60 ml / 2 fl oz</span>
                <span><Check size={14}/> Derma roller included</span>
              </div>
            </div>
          </div>

          <div className="hero-facts">
            <div className="container fact-grid">
              {facts.map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="product" className="product-section">
          <div className="container product-grid">
            <div className="product-media reveal">
              <div className="image-frame">
                <img src="/product-editorial.jpg" alt="Ulthimo Hair Regrowth Kit"/>
              </div>
            </div>

            <div className="product-copy reveal">
              <span className="kicker">WHAT'S INSIDE</span>
              <h2>One kit. A clear, consistent routine.</h2>
              <p>Everything is brought together in one straightforward pack. Review the label, follow the directions carefully and keep your routine consistent.</p>

              <div className="product-list">
                <div><PackageCheck/><span><b>Men's Extra Strength 5% Minoxidil</b><small>The topical formula stated on the product packaging.</small></span></div>
                <div><Sparkles/><span><b>Derma roller included</b><small>A complete kit setup in one convenient pack.</small></span></div>
                <div><ShieldCheck/><span><b>Unscented formula</b><small>Clearly stated on the product packaging shown.</small></span></div>
              </div>

              <a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">Check availability <ArrowRight size={17}/></a>
            </div>
          </div>
        </section>

        <section id="details" className="detail-section">
          <div className="container detail-grid">
            <div className="detail-copy reveal">
              <span className="kicker light">PRODUCT DETAILS</span>
              <h2>A closer look at the kit.</h2>
              <p>Review the product presentation, check the size on the pack and see the kit from more than one angle before placing your order.</p>

              <div className="detail-points">
                <div><span>01</span><p><b>5% Minoxidil</b><small>Extra strength formula as shown on the product box.</small></p></div>
                <div><span>02</span><p><b>60 ml / 2 fl oz</b><small>The pack size printed on the front of the box.</small></p></div>
                <div><span>03</span><p><b>Derma roller included</b><small>Presented as part of the complete hair regrowth kit.</small></p></div>
              </div>
            </div>

            <div className="detail-media reveal">
              <div className="detail-gallery">
                <figure className="detail-card detail-card-main">
                  <img src="/details-main.jpg" alt="Ulthimo product presentation"/>
                </figure>
                <figure className="detail-card detail-card-accent">
                  <img src="/details-accent.jpg" alt="Ulthimo product close-up"/>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="order" className="order-section">
          <div className="container order-grid">
            <div className="order-visual reveal">
              <img src="/product-order.jpg" alt="Ulthimo Hair Regrowth Kit product pack"/>
              <div className="visual-label"><span className="live-dot"/><b>Order directly on WhatsApp</b></div>
            </div>

            <div className="order-panel reveal">
              <span className="kicker">ORDER ON WHATSAPP</span>
              <h2>Choose your quantity. We'll handle the rest.</h2>
              <p>Continue to WhatsApp to confirm the current price, stock availability, delivery fee and payment details with the seller.</p>

              <div className="order-specs">
                <div><span>Product</span><b>Ulthimo Hair Regrowth Kit</b></div>
                <div><span>Pack size</span><b>60 ml / 2 fl oz</b></div>
                <div><span>Included</span><b>Derma roller</b></div>
              </div>

              <div className="quantity-row">
                <span>Select quantity</span>
                <div className="quantity">
                  <button onClick={() => setQty(q => Math.max(1,q-1))} aria-label="Decrease quantity"><Minus size={17}/></button>
                  <strong>{qty}</strong>
                  <button onClick={() => setQty(q => q+1)} aria-label="Increase quantity"><Plus size={17}/></button>
                </div>
              </div>

              <a className="btn gold full" href={whatsappLink} target="_blank" rel="noreferrer">Continue to WhatsApp <ArrowRight size={18}/></a>
              <small className="order-note">No payment is taken on this page. Your order total is confirmed in chat.</small>
            </div>
          </div>
        </section>

        <section className="routine-section">
          <div className="container">
            <div className="section-title reveal">
              <span className="kicker">HOW TO USE</span>
              <h2>Keep the routine simple and consistent.</h2>
            </div>
            <div className="routine-grid">
              <article className="reveal"><span>01</span><h3>Prepare</h3><p>Start with a clean, dry scalp and read the label carefully before use.</p></article>
              <article className="reveal"><span>02</span><h3>Apply</h3><p>Use the product consistently according to the instructions on the packaging.</p></article>
              <article className="reveal"><span>03</span><h3>Reorder</h3><p>Restock through WhatsApp so your routine stays uninterrupted.</p></article>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-card reveal">
              <div>
                <span className="kicker light">READY TO ORDER?</span>
                <h2>Speak with us directly on WhatsApp.</h2>
                <p>Ask for the current price, delivery fee, stock availability and payment details in one quick conversation.</p>
              </div>
              <a className="btn gold" href={whatsappLink} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={18}/></a>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="container faq-grid">
            <div className="faq-intro reveal">
              <span className="kicker">FAQ</span>
              <h2>Everything you need to know before you order.</h2>
              <p>Quick answers to common questions about the kit and the ordering process.</p>
            </div>
            <div className="faq-list reveal">
              {faqs.map((item, i) => (
                <div className={`faq ${faqOpen === i ? "open" : ""}`} key={item.q}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}>
                    <span>{item.q}</span>
                    <ChevronDown size={18}/>
                  </button>
                  <div className="answer"><p>{item.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="notice">
          <div className="container">
            <p><strong>Important:</strong> This page is for product presentation and ordering support, not medical advice. 5% minoxidil may not be suitable for everyone. Read the label carefully and consult a qualified healthcare professional where appropriate. Individual results vary.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand"><span className="brand-mark">U</span><span><b>ULTHIMO</b><small>ADVANCED FORMULA</small></span></div>
          </div>
          <div className="footer-nav">
            <button onClick={() => go("product")}>The Kit</button>
            <button onClick={() => go("details")}>Details</button>
            <button onClick={() => go("order")}>Order</button>
            <button onClick={() => go("faq")}>FAQ</button>
          </div>
          <div className="footer-contact">
            <span>Order & support</span>
            <a href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={16}/> 0916 961 9444</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>Ulthimo Hair Regrowth Kit</span>
          <span>Premium WhatsApp ordering page</span>
        </div>
      </footer>

      <a className="wa-float" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={20}/><span>Order now</span></a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
