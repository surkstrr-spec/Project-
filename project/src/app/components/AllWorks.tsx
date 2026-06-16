import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/1781064218561.png";
import { useApp } from "../context/AppContext";

function useReveal(threshold = 0.1) {
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
  transform: visible ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});

const ALL_WORKS = [
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "إعلان تقني", en: "Tech Ad" },
    year: "2024",
    title: { ar: "مقطع ثري دي — منتج تقني متحرك", en: "3D Reel — Animated Tech Product" },
    desc: { ar: "مقطع إعلاني ثلاثي الأبعاد لمنتج تقني مع كاميرا سينمائية وإضاءة درامية.", en: "3D ad for a tech product with cinematic camera movement and dramatic lighting." },
    img: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "ريندر منتج", en: "Product Render" },
    cat: { ar: "جمال وعناية", en: "Beauty" },
    year: "2024",
    title: { ar: "فيجوال ثلاثي الأبعاد — عطر فاخر", en: "3D Visual — Luxury Fragrance" },
    desc: { ar: "ريندر فوتوريالستيك لمنتج عطر فاخر مع مواد شفافة وانعكاسات ضوئية دقيقة.", en: "Photorealistic render of a luxury fragrance with transparent materials and precise light reflections." },
    img: "https://images.unsplash.com/photo-1764694187688-454d172e5ca0?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "هوية بصرية", en: "Brand Identity" },
    year: "2024",
    title: { ar: "لوغو متحرك ثلاثي الأبعاد", en: "3D Animated Logo" },
    desc: { ar: "تصميم وتحريك لوغو ثلاثي الأبعاد لشركة ناشئة مع حركة دخول انسيابية.", en: "3D logo design and animation for a startup with a fluid intro motion." },
    img: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "ريندر منتج", en: "Product Render" },
    cat: { ar: "تجميل", en: "Cosmetics" },
    year: "2024",
    title: { ar: "فيجوال ثلاثي الأبعاد — خط مستحضرات", en: "3D Visual — Cosmetics Line" },
    desc: { ar: "تصوير ثري دي لخط متكامل من المستحضرات بإضاءة ناعمة وخلفية نظيفة.", en: "3D photography for a complete cosmetics line with soft lighting and clean background." },
    img: "https://images.unsplash.com/photo-1764694071462-db50e50a3925?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "مقطع تشويقي", en: "Teaser" },
    year: "2023",
    title: { ar: "مقطع تشويقي — إطلاق علامة تجارية", en: "Teaser — Brand Launch" },
    desc: { ar: "مقطع تشويقي ثلاثي الأبعاد لإطلاق علامة تجارية جديدة مع موسيقى تصويرية.", en: "3D teaser for a new brand launch with original soundtrack and motion design." },
    img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "مشهد ثري دي", en: "3D Scene" },
    cat: { ar: "تجريدي", en: "Abstract" },
    year: "2023",
    title: { ar: "مشهد تجريدي — خلفية إعلانية", en: "Abstract Scene — Ad Background" },
    desc: { ar: "مشهد ثلاثي الأبعاد تجريدي استُخدم كخلفية بصرية في حملة إعلانية رقمية.", en: "Abstract 3D scene used as visual background in a digital ad campaign." },
    img: "https://images.unsplash.com/photo-1651611243377-2c15b94ad613?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "بث تلفزيوني", en: "Broadcast" },
    year: "2023",
    title: { ar: "فاصل ثري دي — قناة فضائية", en: "3D Bumper — Satellite Channel" },
    desc: { ar: "فاصل تعريفي ثلاثي الأبعاد لقناة فضائية بجودة بث عالية ومؤثرات جسيمات.", en: "3D ident for a satellite channel with broadcast quality and particle effects." },
    img: "https://images.unsplash.com/photo-1627637819794-fba32f82be16?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "ريندر منتج", en: "Product Render" },
    cat: { ar: "إلكترونيات", en: "Electronics" },
    year: "2022",
    title: { ar: "فيجوال ثلاثي الأبعاد — هاتف ذكي", en: "3D Visual — Smartphone" },
    desc: { ar: "تصوير ثري دي لهاتف ذكي بزوايا متعددة وإضاءة بيئية احترافية.", en: "3D photography of a smartphone with multiple angles and professional ambient lighting." },
    img: "https://images.unsplash.com/photo-1672080070762-764c74ee1227?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: { ar: "موشن جرافيك", en: "Motion Graphics" },
    cat: { ar: "تصور مفاهيمي", en: "Concept" },
    year: "2022",
    title: { ar: "تصور مفاهيمي ثري دي — مستقبلي", en: "Futuristic 3D Concept Visualization" },
    desc: { ar: "تصور مفاهيمي ثري دي لمشروع مستقبلي مع إضاءة نيون وبيئة رقمية.", en: "3D concept visualization for a futuristic project with neon lighting and digital environment." },
    img: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&h=500&fit=crop&auto=format",
  },
];

const FILTERS_AR = ["الكل", "موشن جرافيك", "ريندر منتج", "مشهد ثري دي"];
const FILTERS_EN = ["All", "Motion Graphics", "Product Render", "3D Scene"];

export default function AllWorks() {
  const navigate = useNavigate();
  const { isDark, isAr, toggleTheme, toggleLang } = useApp();
  const [filter, setFilter] = useState(isAr ? "الكل" : "All");

  const bg = isDark ? "#0D0D0D" : "#FFFFFF";
  const fg = isDark ? "#FFFFFF" : "#0D0D0D";
  const card = isDark ? "#111111" : "#F7F7F7";
  const border = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const muted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const dimmed = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.28)";
  const logoFilter = isDark ? "invert(1)" : "none";

  const FILTERS = isAr ? FILTERS_AR : FILTERS_EN;
  const tagMap: Record<string, string> = {
    "موشن جرافيك": "Motion Graphics",
    "ريندر منتج": "Product Render",
    "مشهد ثري دي": "3D Scene",
  };

  const filtered = (filter === "الكل" || filter === "All")
    ? ALL_WORKS
    : ALL_WORKS.filter(w => isAr ? w.tag.ar === filter : w.tag.en === (tagMap[filter] || filter));

  // header reveal
  const headerBlock = useReveal(0.05);
  const gridBlock = useReveal(0.05);

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'Inter', sans-serif", direction: isAr ? "rtl" : "ltr", minHeight: "100vh", transition: "background 0.4s, color 0.4s" }}>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: isDark ? "rgba(13,13,13,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}`, padding: "0 2.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <ImageWithFallback src={logoImg} alt="4DVISUALS" style={{ width: "34px", height: "34px", objectFit: "contain", filter: logoFilter, transition: "filter 0.4s" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: fg }}>4DVISUALS</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button onClick={toggleLang} style={{ background: "none", border: `1px solid ${border}`, borderRadius: "7px", padding: "0.35rem 0.7rem", cursor: "pointer", color: muted, fontSize: "0.8rem", fontWeight: 600, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg; }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}>
              {isAr ? "EN" : "ع"}
            </button>
            <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${border}`, borderRadius: "7px", padding: "0.38rem 0.6rem", cursor: "pointer", color: muted, fontSize: "0.95rem", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.borderColor = fg; }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}>
              {isDark ? "☀" : "☽"}
            </button>
            <button onClick={() => navigate("/")} style={{ background: "none", border: `1px solid ${border}`, borderRadius: "8px", padding: "0.5rem 1.1rem", cursor: "pointer", color: muted, fontSize: "0.88rem", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = fg; e.currentTarget.style.color = fg; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}>
              {isAr ? "← الرئيسية" : "← Home"}
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div ref={headerBlock.ref} style={{ padding: "5rem 2.5rem 3rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ ...reveal(headerBlock.visible) }}>
          <span style={{ color: "#61F0B1", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {isAr ? "معرض الأعمال" : "Portfolio"}
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.04em", marginTop: "0.75rem", marginBottom: "1rem", color: fg }}>
            {isAr ? "كل أعمالنا" : "All Our Work"}
          </h1>
          <p style={{ color: muted, fontSize: "0.97rem", lineHeight: 1.75, maxWidth: "480px" }}>
            {isAr
              ? "كل شيء هنا صُنع بـ Cinema 4D — من ريندر المنتجات إلى الموشن جرافيك الإعلاني."
              : "Everything here was built with Cinema 4D — from product renders to motion graphics ads."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: "0 2.5rem 3rem", maxWidth: "1280px", margin: "0 auto", ...reveal(headerBlock.visible, 0.15) }}>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#61F0B1" : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              color: filter === f ? "#0D0D0D" : muted,
              border: `1px solid ${filter === f ? "#61F0B1" : border}`,
              borderRadius: "100px", padding: "0.45rem 1.1rem", fontSize: "0.85rem",
              fontWeight: filter === f ? 700 : 400, cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (filter !== f) { e.currentTarget.style.borderColor = fg; e.currentTarget.style.color = fg; } }}
              onMouseLeave={e => { if (filter !== f) { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; } }}>
              {f}
            </button>
          ))}
          <span style={{ color: dimmed, fontSize: "0.82rem", marginRight: "0.5rem" }}>
            {filtered.length} {isAr ? "مشروع" : "projects"}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridBlock.ref} style={{ padding: "0 2.5rem 6rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((p, i) => (
            <div key={i} style={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${border}`, cursor: "pointer", transition: "border-color 0.3s, transform 0.3s", background: card, ...reveal(gridBlock.visible, (i % 3) * 0.08) }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "none"; }}>
              <div style={{ position: "relative", height: "210px", overflow: "hidden", background: isDark ? "#1A1A1A" : "#E8E8E8" }}>
                <img src={p.img} alt={isAr ? p.title.ar : p.title.en} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", top: "1rem", right: isAr ? "1rem" : "auto", left: isAr ? "auto" : "1rem", display: "flex", gap: "0.45rem" }}>
                  <span style={{ background: "rgba(97,240,177,0.15)", border: "1px solid rgba(97,240,177,0.3)", color: "#61F0B1", padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600 }}>
                    {isAr ? p.tag.ar : p.tag.en}
                  </span>
                  <span style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)", padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.7rem" }}>
                    {isAr ? p.cat.ar : p.cat.en}
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: "0.85rem", left: isAr ? "auto" : "1rem", right: isAr ? "1rem" : "auto", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>{p.year}</div>
              </div>
              <div style={{ padding: "1.4rem" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.97rem", color: fg, marginBottom: "0.5rem" }}>{isAr ? p.title.ar : p.title.en}</h3>
                <p style={{ color: muted, fontSize: "0.84rem", lineHeight: 1.7 }}>{isAr ? p.desc.ar : p.desc.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom */}
      <div style={{ borderTop: `1px solid ${border}`, padding: "4rem 2.5rem", textAlign: "center" }}>
        <p style={{ color: muted, marginBottom: "1.5rem", fontSize: "0.97rem" }}>
          {isAr ? "عندك مشروع ثلاثي الأبعاد؟" : "Got a 3D project in mind?"}
        </p>
        <a href="https://wa.me/966532484871" target="_blank" rel="noopener noreferrer"
          style={{ background: "#61F0B1", color: "#0D0D0D", padding: "1rem 2.5rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.6rem", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D0D0D"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L0 24l6.335-1.521A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.724.894.944-3.617-.235-.372A9.818 9.818 0 1112 21.818z"/></svg>
          {isAr ? "تواصل معنا الآن" : "Contact Us Now"}
        </a>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 0; }
        @media (max-width: 768px) {
          div[style*="repeat(auto-fill, minmax(320px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
