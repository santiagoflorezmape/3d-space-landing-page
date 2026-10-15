"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        padding: "180px 60px 120px",
        textAlign: "center",
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <div className="reveal">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 99,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.03)",
            fontSize: 12,
            fontWeight: 500,
            color: "#c4b5fd",
            letterSpacing: 1,
            textTransform: "uppercase" as const,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#a78bfa",
              animation: "pulse 2s infinite",
              display: "inline-block",
            }}
          />
          {t.hero.badge}
        </span>
      </div>

      <h1
        className="reveal reveal-delay-1"
        style={{
          fontSize: "clamp(38px, 6vw, 76px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
          color: "white",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {t.hero.headingPre}{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #c4b5fd, #a78bfa, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t.hero.headingAccent}
        </span>
      </h1>

      <p
        className="reveal reveal-delay-2"
        style={{
          fontSize: "clamp(15px, 1.8vw, 18px)",
          color: "#9896aa",
          maxWidth: 540,
          margin: "0 auto",
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {t.hero.sub}
      </p>

      <div
        className="reveal reveal-delay-3"
        style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          marginTop: 8,
          flexWrap: "wrap" as const,
        }}
      >
        <button
          type="button"
          className="hero-btn-primary"
          onClick={() =>
            window.open(
              "https://cal.com/santiagoflorezmape/infoproduct-zenith",
              "_blank"
            )
          }
        >
          {t.hero.cta1}
        </button>
        <button
          type="button"
          className="hero-btn-outline"
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t.hero.cta2}
        </button>
      </div>

      <p
        className="reveal reveal-delay-3"
        style={{
          fontSize: 13,
          color: "#6b6b80",
          maxWidth: 460,
          margin: "0 auto",
          lineHeight: 1.6,
          fontStyle: "italic",
        }}
      >
        {t.hero.proof}
      </p>

      <div
        className="reveal reveal-delay-4"
        style={{
          display: "flex",
          gap: 48,
          justifyContent: "center",
          marginTop: 24,
          flexWrap: "wrap" as const,
        }}
      >
        {t.hero.stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>
              {stat.num}
              <span style={{ color: "#a78bfa" }}>{stat.accent}</span>
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#9896aa",
                marginTop: 4,
                textTransform: "uppercase" as const,
                letterSpacing: 1.5,
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hero-btn-primary {
          padding: 16px 36px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 99px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          letter-spacing: 0.2px;
        }
        .hero-btn-primary:hover {
          background: #6d28d9;
          transform: translateY(-2px);
        }
        .hero-btn-outline {
          padding: 16px 36px;
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }
        .hero-btn-outline:hover {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.03);
        }
        @media (max-width: 900px) {
          #hero { padding: 160px 24px 100px !important; }
        }
      `}</style>
    </section>
  );
}
