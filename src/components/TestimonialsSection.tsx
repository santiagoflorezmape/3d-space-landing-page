"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function TestimonialsSection() {
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
      id="testimonials"
      ref={sectionRef}
      style={{ padding: "140px 0", position: "relative" }}
    >
      <div className="container">
        <div className="eyebrow reveal">{t.testimonials.eyebrow}</div>
        <h2
          className="heading reveal d1"
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            maxWidth: 600,
            marginBottom: 48,
          }}
        >
          {t.testimonials.heading}
        </h2>

        <div className="proof-card glass reveal d2">
          <div className="proof-stat">
            <b
              className="heading"
              style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
            >
              {t.testimonials.stat}
            </b>
            <span
              style={{
                fontSize: 13,
                color: "var(--muted)",
                fontWeight: 400,
                marginTop: 4,
              }}
            >
              {t.testimonials.statLabel}
            </span>
          </div>
          <div className="proof-body">
            <p
              style={{
                fontSize: 14,
                color: "var(--soft)",
                lineHeight: 1.75,
                fontWeight: 300,
                marginBottom: 20,
              }}
            >
              {t.testimonials.body}
            </p>
            <div className="chips">
              {t.testimonials.chips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <SectionCTA />
      </div>

      <style>{`
        .proof-card {
          padding: 40px 36px;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 36px;
          align-items: start;
        }
        .proof-stat {
          display: flex;
          flex-direction: column;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          padding: 6px 14px;
          border-radius: 99px;
          border: 1px solid var(--border);
          background: rgba(139,115,230,0.04);
          font-size: 11px;
          color: var(--soft);
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        @media (max-width: 900px) {
          #testimonials { padding: 100px 0 !important; }
          .proof-card {
            grid-template-columns: 1fr !important;
            padding: 28px 24px;
          }
        }
      `}</style>
    </section>
  );
}
