"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function AboutSection() {
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
      id="about"
      ref={sectionRef}
      style={{ padding: "140px 0", position: "relative" }}
    >
      <div className="container">
        <div className="eyebrow reveal">{t.about.eyebrow}</div>
        <h2
          className="heading reveal d1"
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            marginBottom: 48,
          }}
        >
          {t.about.heading}
        </h2>

        <div className="deliver-layout">
          <ol className="deliver-list">
            {t.about.values.map((val, i) => (
              <li
                key={val}
                className={`reveal d${Math.min(i + 1, 4)}`}
                style={{
                  fontSize: 14,
                  color: "var(--soft)",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  listStyle: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontSize: 11,
                    lineHeight: "1.7",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  &#x2713;
                </span>
                {val}
              </li>
            ))}
          </ol>

          <aside className="you-do glass reveal d2">
            <h3
              className="heading"
              style={{ fontSize: 22, marginBottom: 12 }}
            >
              {t.about.youDoTitle}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              {t.about.youDoText}
            </p>
            <div className="hours-badge">
              <b
                className="heading"
                style={{ fontSize: 32, display: "block" }}
              >
                {t.about.youDoHours}
              </b>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  fontWeight: 500,
                }}
              >
                {t.about.youDoHoursLabel}
              </span>
            </div>
          </aside>
        </div>

        <SectionCTA />
      </div>

      <style>{`
        .deliver-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 32px;
          align-items: start;
        }
        .deliver-list {
          padding: 0;
          margin: 0;
        }
        .you-do {
          padding: 32px 28px;
          position: sticky;
          top: 100px;
        }
        .hours-badge {
          padding: 16px;
          border-radius: 12px;
          background: rgba(139,115,230,0.06);
          border: 1px solid rgba(139,115,230,0.1);
          text-align: center;
        }
        @media (max-width: 900px) {
          #about { padding: 100px 0 !important; }
          .deliver-layout {
            grid-template-columns: 1fr !important;
          }
          .you-do { position: static; }
        }
      `}</style>
    </section>
  );
}
