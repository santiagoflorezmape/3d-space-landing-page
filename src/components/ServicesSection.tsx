"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function ServicesSection() {
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
      id="services"
      ref={sectionRef}
      style={{ padding: "140px 0", position: "relative" }}
    >
      <div className="container">
        <div className="eyebrow reveal">{t.services.eyebrow}</div>
        <h2
          className="heading reveal d1"
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            marginBottom: 16,
          }}
        >
          {t.services.heading}
        </h2>
        <p
          className="reveal d2"
          style={{
            fontSize: 15,
            color: "var(--muted)",
            maxWidth: 500,
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: 56,
          }}
        >
          {t.services.sub}
        </p>

        <div className="steps">
          {t.services.items.map((step, i) => (
            <article
              key={step.title}
              className={`step glass reveal d${Math.min(i + 1, 4)}`}
            >
              <div className="step-meta">
                <span className="step-num">{step.num}</span>
                <span className="step-days">{step.days}</span>
              </div>
              <h3
                className="heading"
                style={{ fontSize: "clamp(20px, 2.5vw, 26px)", marginBottom: 12 }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                {step.desc}
              </p>
            </article>
          ))}
        </div>

        <SectionCTA />
      </div>

      <style>{`
        .steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .step {
          padding: 32px 36px;
        }
        .step-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .step-num {
          font-size: 12px;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 1px;
        }
        .step-days {
          font-size: 11px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 500;
        }
        @media (max-width: 900px) {
          #services { padding: 100px 0 !important; }
          .step { padding: 24px 20px; }
        }
      `}</style>
    </section>
  );
}
