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
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <div className="container hero-inner">
        <div className="eyebrow reveal">{t.hero.badge}</div>
        <h1 className="reveal d1">
          {t.hero.titlePre}{" "}
          <span className="soft">{t.hero.titleSoft}</span>
        </h1>
        <p className="lead reveal d2">{t.hero.sub}</p>

        <div className="reveal d3 vsl-container">
          <div className="vsl-placeholder">
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
                fontWeight: 500,
                letterSpacing: 1,
                textTransform: "uppercase" as const,
              }}
            >
              {t.vsl.placeholder}
            </span>
          </div>
        </div>

        <div className="reveal d3" style={{ marginTop: 32 }}>
          <a
            className="btn"
            href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hero.btn}
          </a>
        </div>

        <p className="proofline reveal d4">{t.hero.proof}</p>
      </div>
    </section>
  );
}
