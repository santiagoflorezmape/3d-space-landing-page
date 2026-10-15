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
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="container" style={{ textAlign: "center" }}>
        <div className="eyebrow reveal">{t.hero.badge}</div>

        <h1
          className="heading reveal d1"
          style={{
            fontSize: "clamp(36px, 5.5vw, 64px)",
            maxWidth: 780,
            margin: "0 auto 24px",
          }}
        >
          {t.hero.headingPre}{" "}
          {t.hero.headingAccent}{" "}
          <span className="soft">{t.hero.headingSoft}</span>
        </h1>

        <p
          className="reveal d2"
          style={{
            fontSize: "clamp(14px, 1.6vw, 17px)",
            color: "var(--muted)",
            maxWidth: 520,
            margin: "0 auto 32px",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          {t.hero.sub}
        </p>

        {/* VSL placeholder */}
        <div className="reveal d3 vsl-container">
          <div className="vsl-placeholder glass">
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.6 }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span
              style={{
                fontSize: 13,
                color: "var(--muted)",
                marginTop: 12,
                fontWeight: 400,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {t.vsl.placeholder}
            </span>
          </div>
        </div>

        {/* CTA button — under the VSL */}
        <div className="reveal d3" style={{ marginTop: 32 }}>
          <a
            className="btn"
            href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.btn}
          </a>
        </div>

        <p
          className="reveal d4"
          style={{
            fontSize: 13,
            color: "var(--muted)",
            maxWidth: 460,
            margin: "28px auto 0",
            lineHeight: 1.65,
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          {t.hero.proof}
        </p>

        <div
          className="reveal d4"
          style={{
            display: "flex",
            gap: 56,
            justifyContent: "center",
            marginTop: 40,
            flexWrap: "wrap",
          }}
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                className="heading"
                style={{ fontSize: 40, fontWeight: 400 }}
              >
                {stat.num}
                <span style={{ color: "var(--accent-soft)", fontSize: 32 }}>
                  {stat.accent}
                </span>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 180px 0 120px;
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vsl-container {
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
        }
        .vsl-placeholder {
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px dashed rgba(139,115,230,0.15) !important;
          background: rgba(139,115,230,0.03) !important;
        }
        @media (max-width: 900px) {
          .hero-section { padding: 150px 0 80px !important; }
        }
      `}</style>
    </section>
  );
}
