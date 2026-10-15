"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      style={{ padding: "160px 60px", position: "relative" }}
    >
      <div style={{ maxWidth: 1000, width: "100%", margin: "0 auto" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 60 }}
        >
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
            {t.about.eyebrow}
          </div>
          <div
            style={{
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: -1.5,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {t.about.headingLine1}
            <br />
            {t.about.headingLine2}
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#9896aa",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {t.about.body}
          </p>
        </div>

        <div
          className="reveal reveal-delay-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
            marginBottom: 80,
          }}
        >
          {t.about.values.map((value) => (
            <div
              key={value}
              className="about-item"
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: "rgba(124,58,237,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 11,
                  color: "#a78bfa",
                }}
              >
                &#x2713;
              </span>
              <span style={{ fontSize: 14, color: "#c8c6d8", lineHeight: 1.6, fontWeight: 300 }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="about-fit-grid reveal reveal-delay-2">
          <div className="about-fit-card">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#a78bfa",
                textTransform: "uppercase" as const,
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              {t.about.forYou ? "For you if" : "For you if"}
            </h3>
            {t.about.forYou?.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    color: "#a78bfa",
                    fontSize: 14,
                    lineHeight: "1.6",
                    flexShrink: 0,
                  }}
                >
                  &#x2713;
                </span>
                <span style={{ fontSize: 14, color: "#c8c6d8", lineHeight: 1.6, fontWeight: 300 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="about-fit-card">
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#9896aa",
                textTransform: "uppercase" as const,
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              {t.about.notForYou ? "Not for you if" : "Not for you if"}
            </h3>
            {t.about.notForYou?.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    color: "#6b6b80",
                    fontSize: 14,
                    lineHeight: "1.6",
                    flexShrink: 0,
                  }}
                >
                  &#x2717;
                </span>
                <span style={{ fontSize: 14, color: "#6b6b80", lineHeight: 1.6, fontWeight: 300 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
        }
        .about-fit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .about-fit-card {
          padding: 32px 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
        }
        @media (max-width: 900px) {
          #about { padding: 120px 24px !important; }
          .about-fit-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .about-item { padding: 16px; }
          #about .reveal-delay-1 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
