"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
            {t.services.eyebrow}
          </div>
          <div
            style={{
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: -1.5,
              lineHeight: 1.15,
            }}
          >
            {t.services.headingLine1}
            <br />
            {t.services.headingLine2}
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#9896aa",
              maxWidth: 480,
              margin: "16px auto 0",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {t.services.sub}
          </p>
        </div>

        <div className="services-grid">
          {t.services.items.map((service, i) => (
            <div
              key={service.title}
              className={`service-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(124,58,237,0.1)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#a78bfa",
                  marginBottom: 20,
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#9896aa",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .service-card {
          padding: 36px 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          transition: 0.3s;
          cursor: default;
        }
        .service-card:hover {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
        }
        @media (max-width: 900px) {
          #services { padding: 120px 24px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
