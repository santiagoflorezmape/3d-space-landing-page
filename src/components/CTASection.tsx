"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTASection() {
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
      id="cta"
      ref={sectionRef}
      style={{
        padding: "160px 0",
        position: "relative",
        textAlign: "center",
      }}
    >
      <div className="container">
        <h2
          className="heading reveal"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            maxWidth: 700,
            margin: "0 auto 24px",
          }}
        >
          {t.cta.headingLine1}{" "}
          <span className="soft">{t.cta.headingSoft}</span>
        </h2>

        <p
          className="reveal d1"
          style={{
            fontSize: 15,
            color: "var(--muted)",
            maxWidth: 480,
            margin: "0 auto 12px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {t.cta.body}
        </p>

        <p
          className="reveal d1"
          style={{
            fontSize: 13,
            color: "var(--muted)",
            maxWidth: 420,
            margin: "0 auto 36px",
            lineHeight: 1.6,
            fontStyle: "italic",
            fontWeight: 300,
            opacity: 0.7,
          }}
        >
          {t.cta.note}
        </p>

        <div className="reveal d2">
          <a
            className="btn"
            href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.btn}
          </a>
        </div>
      </div>
    </section>
  );
}
