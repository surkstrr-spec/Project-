import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import logoImg from "../imports/1781064218561.png";
import { useApp } from "./context/AppContext";

// ── scroll reveal hook ──────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
});

// ── translations ─────────────────────────────────────────────
const T = {
  ar: {
    nav: ["خدماتنا", "أعمالنا", "من نحن", "تواصل معنا"],
    cta: "اطلب مشروعك",
    eyebrow: "وكالة متخصصة في الثري دي · Cinema 4D",
    h1a: "نصنع إعلاناتك",
    h1b: "من عالم ثلاثي الأبعاد",
    sub: "Cinema 4D ليست بس برنامج عندنا — هي الطريقة اللي نفكر فيها. كل إعلان نبنيه من الصفر، نحرّكه بعناية، ونسلّمه وإحنا فخورين فيه.",
    viewWork: "شاهد أعمالنا",
    startProject: "ابدأ مشروعك ←",
    tools: "أدواتنا",
    stats: [
      { v: "200+", l: "مشروع موشن جرافيك" },
      { v: "98%", l: "عملاء راضون" },
      { v: "60+", l: "علامة تجارية" },
      { v: "7+", l: "سنوات في الثري دي" },
    ],
    servLabel: "ما نقدمه",
    servTitle: "شيء واحد، نتقنه كثيراً",
    servDesc: "ما عندنا عشرين خدمة — عندنا خدمة واحدة نقدمها بشكل صح.",
    servCard: {
      title: "3D Motion Graphics",
      sub: "الإعلان الثلاثي الأبعاد المتحرك",
      body: "نبدأ من فكرتك، نبني المشهد في Cinema 4D، نضيف الحركة، ونسلّم لك مقطعاً إعلانياً يفرق فعلاً عن اللي شافه الناس قبل كذا.",
      steps: ["الأسلوب والتصور", "النمذجة الثلاثية", "التحريك والإضاءة", "الريندر والتسليم"],
      tags: ["Cinema 4D"],
    },
    projLabel: "معرض الأعمال",
    projTitle: "شغل نفخر فيه",
    viewAll: "عرض كل الأعمال ←",
    aboutLabel: "من نحن",
    aboutTitle: "نعيش في عالم الثري دي",
    aboutP1: "4DVISUALS وكالة سعودية — ما عندنا مكاتب فاخرة كثيرة، عندنا Cinema 4D وشغف بالتصميم الثلاثي الأبعاد.",
    aboutP2: "كل مشروع نتعامل معه وكأنه الأول. ما نكرر قوالب ولا نبيع حلول جاهزة — نبني كل شيء من الصفر.",
    checks: ["ريندر فوتوريالستيك بأعلى جودة", "موشن جرافيك بمعايير بث دولية", "تسليم دايم في الموعد"],
    testiLabel: "آراء العملاء",
    testiTitle: "يتكلمون بدلاً عنّا",
    ctaSec: "تواصل معنا",
    ctaTitle: "فكرتك تستحق مشهداً استثنائياً",
    ctaSub: "سواء كان إعلاناً تجارياً أو موشن ثلاثي الأبعاد — اتواصل معنا وإحنا نشوف كيف نحوله لشيء يستاهل.",
    msgNow: "راسلنا الآن",
    moreInfo: "تفاصيل أكثر",
    phone: "+966 53 248 4871",
    loc: "المملكة العربية السعودية",
    footerCopy: "جميع الحقوق محفوظة.",
    socials: ["Instagram"],
  },
  en: {
    nav: ["Services", "Work", "About", "Contact"],
    cta: "Start a Project",
    eyebrow: "Specialized 3D Studio · Cinema 4D",
    h1a: "We Build Your Ads",
    h1b: "in Three Dimensions",
    sub: "Cinema 4D isn't just a tool for us — it's how we think. Every ad we make starts from scratch, gets animated with care, and goes out the door with pride.",
    viewWork: "View Our Work",
    startProject: "Start a Project →",
    tools: "Our Tools",
    stats: [
      { v: "200+", l: "Motion Projects" },
      { v: "98%", l: "Happy Clients" },
      { v: "60+", l: "Brands Served" },
      { v: "7+", l: "Years in 3D" },
    ],
    servLabel: "What We Do",
    servTitle: "One thing. Done right.",
    servDesc: "We don't offer twenty services — we offer one and we do it really well.",
    servCard: {
      title: "3D Motion Graphics",
      sub: "Animated 3D Advertising",
      body: "We start from your idea, build the scene in Cinema 4D, add motion, and hand you an ad that people actually remember.",
      steps: ["Concept & Style", "3D Modeling", "Animation & Lighting", "Render & Delivery"],
      tags: ["Cinema 4D", "Redshift", "After Effects", "Octane"],
    },
    projLabel: "Our Work",
    projTitle: "Work we're proud of",
    viewAll: "View All Work →",
    aboutLabel: "About Us",
    aboutTitle: "We Live in 3D",
    aboutP1: "4DVISUALS is a Saudi studio — we don't have fancy offices, we have Cinema 4D and a real passion for 3D design.",
    aboutP2: "Every project gets treated like our first. No templates, no shortcuts — we build everything from scratch.",
    checks: ["Photorealistic renders at the highest quality", "Motion graphics built to broadcast standards", "Always delivered on time"],
    testiLabel: "Client Reviews",
    testiTitle: "They say it better than us",
    ctaSec: "Get In Touch",
    ctaTitle: "Your idea deserves an exceptional scene",
    ctaSub: "Whether it's a commercial ad or a 3D motion piece — reach out and let's figure out how to make it something worth watching.",
    msgNow: "Message Us Now",
    moreInfo: "Learn More",
    phone: "+966 53 248 4871",
    loc: "Saudi Arabia",
    footerCopy: "All rights reserved.",
    socials: ["Instagram", "Behance", "YouTube"],
  },
};

const PROJECTS_HOME = [
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "إعلان تجاري", en: "Commercial Ad" },
    title: { ar: "مقطع ثري دي — منتج تقني", en: "3D Ad — Tech Product" },
    img: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "ريندر منتج", en: "Product Render" },
    cat: { ar: "عطور وجمال", en: "Beauty" },
    title: { ar: "فيجوال ثلاثي الأبعاد — عطر فاخر", en: "3D Visual — Luxury Fragrance" },
    img: "https://images.unsplash.com/photo-1764694187688-454d172e5ca0?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "هوية بصرية", en: "Brand Identity" },
    title: { ar: "موشن ثلاثي الأبعاد — لوغو متحرك", en: "3D Motion — Animated Logo" },
    img: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?w=800&h=500&fit=crop&auto=format",
  },
];

const TESTIMONIALS = [
  {
    name: "محمد الشمري / Mohammed Al-Shammari",
    role: { ar: "مدير تسويق، مجموعة الأندلس", en: "Marketing Director, Al-Andalus Group" },
    text: { ar: "شافت الإعلان اللي صمموه فريقنا وقال ما صدق إنه موشن وما صوّر. هذا هو الفرق.", en: "Our team saw the ad and couldn't believe it was motion graphics and not filmed. That's the difference." },
    avatar: "MS",
  },
  {
    name: "نورة العتيبي / Noura Al-Otaibi",
    role: { ar: "Brand Manager، شركة لمسة", en: "Brand Manager, Lamsa" },
    text: { ar: "اللوغو المتحرك اللي سلموه لنا أصبح الشيء اللي ميّزنا عن المنافسين. ما توقعنا بكل صراحة.", en: "The animated logo they delivered became what set us apart from competitors. Honestly didn't expect it." },
    avatar: "NA",
  },
  {
    name: "فيصل الدوسري / Faisal Al-Dosari",
    role: { ar: "مؤسس، ستوديو فضاء", en: "Founder, Fadaa Studio" },
    text: { ar: "تعاملت مع أكثر من جهة في مجال الثري دي — 4DVISUALS فيهم شيء ثاني. يفهمون الفكرة قبل ما تكملها.", en: "I've worked with several 3D studios — 4DVISUALS have something different. They get the idea before you finish explaining it." },
    avatar: "FD",
  },
];

const TOOLS = ["Cinema 4D"];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let st: number | null = null;
    const step = (ts: number) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ v, l, isDark }: { v: string; l: string; isDark: boolean }) {
  const { ref, visible } = useReveal(0.3);
  const num = parseInt(v.replace(/\D/g, "")) || 0;
  const suffix = v.replace(/[0-9]/g, "");
  const animated = useCountUp(num, 1800, visible);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "0 2rem", borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, ...reveal(visible) }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#61F0B1", fontSize: "3.5rem", fontWeight: 700, lineHeight: 1 }}>
        {animated}{suffix}
      </div>
      <div style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", marginTop: "0.6rem", fontSize: "0.9rem" }}>{l}</div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { isDark, isAr, toggleTheme, toggleLang } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = isAr ? T.ar : T.en;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const bg = isDark ? "#0D0D0D" : "#FFFFFF";
  const fg = isDark ? "#FFFFFF" : "#0D0D0D";
  const card = isDark ? "#111111" : "#F7F7F7";
  const border = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const muted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const dimmed = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.28)";
  const navBg = isDark ? "rgba(13,13,13,0.95)" : "rgba(255,255,255,0.95)";
  const navBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const gridLine = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)";
  const logoFilter = isDark ? "invert(1)" : "none";
  const sectionAlt = isDark ? "rgba(255,255,255,0.015)" : "#F9F9F9";

  // Reveal blocks
  const hero = useReveal(0.05);
  const statsBlock = useReveal();
  const servBlock = useReveal();
  const projBlock = useReveal();
  const aboutBlock = useReveal();
  const testiBlock = useReveal();
  const ctaBlock = useReveal();

  const NAV_HREFS = ["#services", "#projects", "#about", "#contact"];

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'Inter', sans-serif", direction: isAr ? "rtl" : "ltr", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>

      {/* ── Navbar ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? navBg : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${navBorder}` : "none", transition: "all 0.35s ease", padding: "0 2.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "74px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ImageWithFallback src={logoImg} alt="4DVISUALS" style={{ width: "38px", height: "38px", objectFit: "contain", filter: logoFilter, transition: "filter 0.4s" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: fg }}>4DVISUALS</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-desktop">
            {t.nav.map((label, i) => (
              <a key={i} href={NAV_HREFS[i]} style={{ color: muted, textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                {label}
              </a>
            ))}
            {/* Lang toggle */}
            <button onClick={toggleLang} title="Switch language" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: `1px solid ${border}`, borderRadius: "8px", padding: "0.38rem 0.75rem", cursor: "pointer", color: muted, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.05em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg; }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}>
              {isAr ? "EN" : "ع"}
            </button>
            {/* Theme toggle */}
            <button onClick={toggleTheme} title="Toggle theme" style={{ background: "none", border: `1px solid ${border}`, borderRadius: "8px", padding: "0.42rem 0.65rem", cursor: "pointer", color: muted, fontSize: "1rem", lineHeight: 1, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg; }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}>
              {isDark ? "☀" : "☽"}
            </button>
            <a href="#contact" style={{ background: "#61F0B1", color: "#0D0D0D", padding: "0.55rem 1.35rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.88rem", fontWeight: 700, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              {t.cta}
            </a>
          </div>

          {/* mobile bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="nav-mobile">
            <button onClick={toggleLang} style={{ background: "none", border: `1px solid ${border}`, borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer", color: muted, fontSize: "0.78rem", fontWeight: 600 }}>{isAr ? "EN" : "ع"}</button>
            <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${border}`, borderRadius: "6px", padding: "0.3rem 0.5rem", cursor: "pointer", color: muted, fontSize: "0.9rem" }}>{isDark ? "☀" : "☽"}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: "22px", height: "1.5px", background: fg, margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: isDark ? "#111" : "#FFF", borderTop: `1px solid ${navBorder}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {t.nav.map((label, i) => (
              <a key={i} href={NAV_HREFS[i]} onClick={() => setMenuOpen(false)} style={{ color: muted, textDecoration: "none" }}>{label}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{ background: "#61F0B1", color: "#0D0D0D", padding: "0.7rem 1.2rem", borderRadius: "6px", textDecoration: "none", fontWeight: 700, textAlign: "center" }}>
              {t.cta}
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", padding: "9rem 2.5rem 5rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`, backgroundSize: "72px 72px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(97,240,177,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0", left: "-10%", width: "500px", height: "500px", background: isDark ? "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 65%)" : "radial-gradient(circle, rgba(97,240,177,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div ref={hero.ref} style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative" }}>
          <div style={{ ...reveal(hero.visible, 0) }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", border: `1px solid ${border}`, borderRadius: "100px", padding: "0.4rem 1.1rem", marginBottom: "2.5rem", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#61F0B1", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ color: muted, fontSize: "0.82rem", fontWeight: 500 }}>{t.eyebrow}</span>
            </div>
          </div>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: "0.4rem", color: fg, maxWidth: "900px", ...reveal(hero.visible, 0.1) }}>
            {t.h1a}
          </h1>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: "2rem", maxWidth: "900px", ...reveal(hero.visible, 0.18) }}>
            <span style={{ color: "#61F0B1" }}>{t.h1b}</span>
          </h1>

          <p style={{ color: muted, fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, maxWidth: "580px", marginBottom: "3rem", ...reveal(hero.visible, 0.26) }}>
            {t.sub}
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "5rem", ...reveal(hero.visible, 0.34) }}>
            <a href="#projects" style={{ background: fg, color: bg, padding: "1rem 2.4rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              {t.viewWork}
            </a>
            <a href="#contact" style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)"}`, color: fg, padding: "1rem 2.4rem", borderRadius: "8px", textDecoration: "none", fontWeight: 500, fontSize: "1rem", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#61F0B1"; e.currentTarget.style.color = "#61F0B1"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)"; e.currentTarget.style.color = fg; }}>
              {t.startProject}
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", borderTop: `1px solid ${border}`, paddingTop: "2rem", ...reveal(hero.visible, 0.42) }}>
            <span style={{ color: dimmed, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t.tools}</span>
            {TOOLS.map((tool) => (
              <span key={tool} style={{ color: muted, fontSize: "0.82rem", fontWeight: 500 }}>{tool}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "5rem 2.5rem", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, background: sectionAlt }}>
        <div ref={statsBlock.ref} style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
          {t.stats.map((s) => <StatCard key={s.l} v={s.v} l={s.l} isDark={isDark} />)}
        </div>
      </section>

      {/* ── Service (single) ── */}
      <section id="services" style={{ padding: "8rem 2.5rem" }}>
        <div ref={servBlock.ref} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem", ...reveal(servBlock.visible) }}>
            <span style={{ color: "#61F0B1", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{t.servLabel}</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, marginTop: "0.75rem", letterSpacing: "-0.03em", color: fg }}>{t.servTitle}</h2>
            <p style={{ color: muted, marginTop: "0.75rem", maxWidth: "400px", lineHeight: 1.7, fontSize: "0.95rem" }}>{t.servDesc}</p>
          </div>

          <div style={{ ...reveal(servBlock.visible, 0.15) }}>
            <div style={{ border: `1px solid ${border}`, borderRadius: "20px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="service-grid">
              {/* left: info */}
              <div style={{ padding: "3rem", borderRight: `1px solid ${border}`, background: card }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem", lineHeight: 1 }}>⬡</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: fg, marginBottom: "0.3rem" }}>{t.servCard.title}</h3>
                <p style={{ color: "#61F0B1", fontSize: "0.82rem", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>{t.servCard.sub}</p>
                <p style={{ color: muted, lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "2rem" }}>{t.servCard.body}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {t.servCard.tags.map(tag => (
                    <span key={tag} style={{ border: `1px solid ${border}`, color: muted, padding: "0.3rem 0.8rem", borderRadius: "100px", fontSize: "0.78rem" }}>{tag}</span>
                  ))}
                </div>
              </div>
              {/* right: process */}
              <div style={{ padding: "3rem" }}>
                <p style={{ color: dimmed, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2rem" }}>{isAr ? "العملية" : "The Process"}</p>
                {t.servCard.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: i < 3 ? "1.75rem" : "0" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#61F0B1", fontSize: "0.78rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={{ paddingTop: "0.35rem" }}>
                      <div style={{ color: fg, fontSize: "0.97rem", fontWeight: 600 }}>{step}</div>
                      {i < 3 && <div style={{ width: "1px", height: "24px", background: border, marginTop: "0.75rem", marginRight: isAr ? "0" : "auto", marginLeft: isAr ? "auto" : "0" }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: "8rem 2.5rem", background: sectionAlt, borderTop: `1px solid ${border}` }}>
        <div ref={projBlock.ref} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem", ...reveal(projBlock.visible) }}>
            <div>
              <span style={{ color: "#61F0B1", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{t.projLabel}</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, marginTop: "0.75rem", letterSpacing: "-0.03em", color: fg }}>{t.projTitle}</h2>
            </div>
            <button onClick={() => navigate("/works")} style={{ background: "none", border: "none", cursor: "pointer", color: muted, fontSize: "0.88rem", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"}`, paddingBottom: "2px", transition: "color 0.2s", padding: "0 0 2px 0" }}
              onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderBottomColor = fg; }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderBottomColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"; }}>
              {t.viewAll}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gridTemplateRows: "auto auto", gap: "1.5rem" }} className="grid-projects">
            {PROJECTS_HOME.map((p, i) => (
              <div key={i} style={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${border}`, cursor: "pointer", transition: "border-color 0.3s, transform 0.3s", gridRow: i === 0 ? "1 / 3" : "auto", ...reveal(projBlock.visible, i * 0.12) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "none"; }}>
                <div style={{ position: "relative", height: i === 0 ? "400px" : "180px", overflow: "hidden", background: isDark ? "#1A1A1A" : "#E8E8E8" }}>
                  <img src={p.img} alt={isAr ? p.title.ar : p.title.en} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 55%)" }} />
                  <div style={{ position: "absolute", top: "1rem", right: isAr ? "1rem" : "auto", left: isAr ? "auto" : "1rem", display: "flex", gap: "0.45rem" }}>
                    <span style={{ background: "rgba(97,240,177,0.15)", border: "1px solid rgba(97,240,177,0.3)", color: "#61F0B1", padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600 }}>{isAr ? p.tag.ar : p.tag.en}</span>
                    <span style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.7rem" }}>{isAr ? p.cat.ar : p.cat.en}</span>
                  </div>
                </div>
                <div style={{ background: isDark ? "#111" : "#F0F0F0", padding: i === 0 ? "1.75rem" : "1.25rem", borderTop: `1px solid ${border}` }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: fg, fontSize: i === 0 ? "1.05rem" : "0.92rem" }}>{isAr ? p.title.ar : p.title.en}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "8rem 2.5rem" }}>
        <div ref={aboutBlock.ref} style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "center" }} className="grid-responsive">
          <div style={{ ...reveal(aboutBlock.visible) }}>
            <span style={{ color: "#61F0B1", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{t.aboutLabel}</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: "0.75rem", marginBottom: "1.75rem", letterSpacing: "-0.03em", color: fg }}>{t.aboutTitle}</h2>
            <p style={{ color: muted, lineHeight: 1.9, marginBottom: "1.25rem", fontSize: "0.97rem" }}>{t.aboutP1}</p>
            <p style={{ color: isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)", lineHeight: 1.9, marginBottom: "2.5rem", fontSize: "0.95rem" }}>{t.aboutP2}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {t.checks.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0.85rem 1rem", border: `1px solid ${border}`, borderRadius: "10px", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#61F0B1")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = border)}>
                  <span style={{ color: "#61F0B1", flexShrink: 0 }}>✓</span>
                  <span style={{ color: muted, fontSize: "0.9rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", ...reveal(aboutBlock.visible, 0.15) }}>
            {[
              { label: "Cinema 4D", pct: 98 },
              { label: "3D Rendering", pct: 96 },
              { label: "Motion Design", pct: 95 },
              { label: "Compositing", pct: 88 },
            ].map((s) => (
              <div key={s.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: "14px", padding: "1.5rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#61F0B1")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = border)}>
                <div style={{ color: fg, fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.3rem" }}>{s.label}</div>
                <div style={{ height: "3px", background: border, borderRadius: "2px", overflow: "hidden", marginTop: "0.9rem" }}>
                  <div style={{ height: "100%", width: `${s.pct}%`, background: "#61F0B1", borderRadius: "2px" }} />
                </div>
                <div style={{ color: dimmed, fontSize: "0.75rem", marginTop: "0.5rem", textAlign: "left" }}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "8rem 2.5rem", background: sectionAlt, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div ref={testiBlock.ref} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4.5rem", textAlign: "center", ...reveal(testiBlock.visible) }}>
            <span style={{ color: "#61F0B1", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{t.testiLabel}</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, marginTop: "0.75rem", letterSpacing: "-0.03em", color: fg }}>{t.testiTitle}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((tst, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: "18px", padding: "2.25rem", transition: "border-color 0.2s, transform 0.3s", ...reveal(testiBlock.visible, i * 0.1) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "none"; }}>
                <div style={{ color: "#61F0B1", fontSize: "2rem", lineHeight: 1, marginBottom: "1.25rem" }}>❝</div>
                <p style={{ color: muted, lineHeight: 1.85, marginBottom: "1.75rem", fontSize: "0.93rem" }}>{isAr ? tst.text.ar : tst.text.en}</p>
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #61F0B1, #3bca8f)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0D0D0D", fontWeight: 700, fontSize: "0.78rem", flexShrink: 0 }}>{tst.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: fg }}>{tst.name}</div>
                    <div style={{ color: dimmed, fontSize: "0.78rem", marginTop: "0.2rem" }}>{isAr ? tst.role.ar : tst.role.en}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ padding: "8rem 2.5rem" }}>
        <div ref={ctaBlock.ref} style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ border: `1px solid ${border}`, borderRadius: "28px", padding: "clamp(3.5rem, 7vw, 6rem)", textAlign: "center", position: "relative", overflow: "hidden", background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)", ...reveal(ctaBlock.visible) }}>
            <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse, rgba(97,240,177,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            <span style={{ color: "#61F0B1", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", position: "relative" }}>{t.ctaSec}</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.04em", marginTop: "1rem", marginBottom: "1rem", color: fg, position: "relative" }}>
              {t.ctaTitle.split("استثنائياً")[0]}{t.ctaTitle.includes("استثنائياً") ? <span style={{ color: "#61F0B1" }}>استثنائياً</span> : null}
              {t.ctaTitle.split("exceptional")[0]}{t.ctaTitle.includes("exceptional") ? <><br /><span style={{ color: "#61F0B1" }}>exceptional</span></> : null}
            </h2>
            <p style={{ color: muted, maxWidth: "520px", margin: "0 auto 3rem", lineHeight: 1.85, position: "relative" }}>{t.ctaSub}</p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem", position: "relative" }}>
              <a href="https://wa.me/966532484871" target="_blank" rel="noopener noreferrer"
                style={{ background: "#61F0B1", color: "#0D0D0D", padding: "1.1rem 2.75rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", transition: "opacity 0.2s", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D0D0D"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L0 24l6.335-1.521A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.724.894.944-3.617-.235-.372A9.818 9.818 0 1112 21.818z"/></svg>
                {t.msgNow}
              </a>
              <a href="#services" style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)"}`, color: fg, padding: "1.1rem 2.75rem", borderRadius: "10px", textDecoration: "none", fontWeight: 500, fontSize: "1rem", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#61F0B1"; e.currentTarget.style.color = "#61F0B1"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)"; e.currentTarget.style.color = fg; }}>
                {t.moreInfo}
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "3rem", color: dimmed, fontSize: "0.83rem", flexWrap: "wrap", position: "relative" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#61F0B1"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L0 24l6.335-1.521A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.724.894.944-3.617-.235-.372A9.818 9.818 0 1112 21.818z"/></svg>
                {t.phone}
              </span>
              <span>📍 {t.loc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "3rem 2.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ImageWithFallback src={logoImg} alt="4DVISUALS" style={{ width: "30px", height: "30px", objectFit: "contain", filter: logoFilter, transition: "filter 0.4s" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: muted }}>4DVISUALS</span>
          </div>
          <div style={{ color: dimmed, fontSize: "0.82rem" }}>© {new Date().getFullYear()} 4DVISUALS. {t.footerCopy}</div>
          <div style={{ display: "flex", gap: "1.75rem" }}>
            {t.socials.map((s) => (
              <a key={s} href="#" style={{ color: dimmed, textDecoration: "none", fontSize: "0.82rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = dimmed)}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
          .grid-responsive { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .grid-projects { grid-template-columns: 1fr !important; }
          .grid-projects > div { grid-row: auto !important; }
          .service-grid { grid-template-columns: 1fr !important; }
          .service-grid > div:first-child { border-right: none !important; border-bottom: 1px solid ${border}; }
        }
        @media (min-width: 901px) {
          .nav-mobile { display: none !important; }
        }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
    </div>
  );
}
