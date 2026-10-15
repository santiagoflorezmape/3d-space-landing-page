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
        padding: "160px 60px",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="cta-box reveal">
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase" as const,
            letterSpacing: 3,
            color: "#a78bfa",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {t.cta.eyebrow}
        </div>
        <div
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: -1.5,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {t.cta.headingLine1}
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.cta.headingAccent}
          </span>
        </div>
        <p
          style={{
            fontSize: 15,
            color: "#9896aa",
            maxWidth: 440,
            margin: "0 auto",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: 20,
          }}
        >
          {t.cta.body}
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#6b6b80",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.6,
            fontStyle: "italic",
            marginBottom: 32,
          }}
        >
          {t.cta.note}
        </p>
        <button
          type="button"
          className="cta-btn"
          onClick={() =>
            window.open(
              "https://cal.com/santiagoflorezmape/infoproduct-zenith",
              "_blank"
            )
          }
        >
          {t.cta.btn}
        </button>
      </div>

      <style>{`
        .cta-box {
          padding: 72px 56px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          text-align: center;
          max-width: 720px;
          width: 100%;
        }
        .cta-btn {
          padding: 16px 44px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 99px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }
        .cta-btn:hover {
          background: #6d28d9;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .cta-box { padding: 48px 28px !important; }
          #cta { padding: 120px 24px !important; }
        }
      `}</style>
    </section>
  );
}
