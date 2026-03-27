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
        padding: "140px 60px 120px",
        textAlign: "center",
        position: "relative",
        minHeight: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 2,
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
            border: "1px solid rgba(167,139,250,0.15)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 12,
            fontWeight: 500,
            color: "#c4b5fd",
            letterSpacing: 1,
            textTransform: "uppercase" as const,
            backdropFilter: "blur(10px)",
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
          fontSize: "clamp(42px, 7vw, 88px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: -3,
          color: "white",
          maxWidth: 900,
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
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#9896aa",
          maxWidth: 560,
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
          width: "100%",
          maxWidth: 820,
          margin: "0 auto",
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(167,139,250,0.15)",
          background: "black",
          aspectRatio: "16 / 9",
          boxShadow: "0 20px 80px rgba(124,58,237,0.2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: 22,
            background:
              "conic-gradient(from 0deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed)",
            zIndex: -1,
            filter: "blur(20px)",
            opacity: 0.35,
            animation: "vslGlow 6s linear infinite",
          }}
        />
        <iframe
          src="https://www.tella.tv/video/base44-demo-hijl/embed?b=0&title=0&a=0&loop=0&autoPlay=0&t=0&muted=0&wt=0"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Demo video"
        />
      </div>

      <div
        className="reveal reveal-delay-3"
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginTop: 12,
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

      <div
        className="reveal reveal-delay-4"
        style={{
          display: "flex",
          gap: 60,
          justifyContent: "center",
          marginTop: 40,
          flexWrap: "wrap" as const,
        }}
      >
        {t.hero.stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: "white" }}>
              {stat.num}
              <span style={{ color: "#a78bfa" }}>{stat.accent}</span>
            </div>
            <div
              style={{
                fontSize: 12,
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
          padding: 16px 40px;
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
          background: #a78bfa;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(124,58,237,0.5);
        }
        .hero-btn-outline {
          padding: 16px 40px;
          background: transparent;
          color: white;
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 99px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }
        .hero-btn-outline:hover {
          border-color: #a78bfa;
          background: rgba(167,139,250,0.06);
        }
        @media (max-width: 900px) {
          #hero { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
