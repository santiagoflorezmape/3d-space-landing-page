"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function FitSection() {
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
      id="fit"
      ref={sectionRef}
      style={{ padding: "140px 0", position: "relative" }}
    >
      <div className="container">
        <div className="eyebrow reveal">{t.fit.eyebrow}</div>
        <h2
          className="heading reveal d1"
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            marginBottom: 48,
          }}
        >
          {t.fit.heading}
        </h2>

        <div className="fit-grid">
          <div className="glass fit-card reveal d1">
            <h3
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 24,
                fontFamily: "var(--font-body)",
              }}
            >
              {t.fit.yesTitle}
            </h3>
            <ul className="fit-list">
              {t.fit.yesItems.map((item) => (
                <li key={item}>
                  <span className="fit-check" style={{ color: "var(--accent)" }}>
                    &#x2713;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass fit-card reveal d2">
            <h3
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 24,
                fontFamily: "var(--font-body)",
              }}
            >
              {t.fit.noTitle}
            </h3>
            <ul className="fit-list">
              {t.fit.noItems.map((item) => (
                <li key={item} style={{ color: "var(--muted)" }}>
                  <span className="fit-check" style={{ color: "var(--muted)", opacity: 0.5 }}>
                    &#x2717;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SectionCTA />
      </div>

      <style>{`
        .fit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .fit-card {
          padding: 32px 28px;
        }
        .fit-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .fit-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: var(--soft);
          line-height: 1.65;
          font-weight: 300;
        }
        .fit-check {
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        @media (max-width: 900px) {
          #fit { padding: 100px 0 !important; }
          .fit-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
