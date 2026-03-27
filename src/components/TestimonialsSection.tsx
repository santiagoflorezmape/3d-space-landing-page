"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      style={{ padding: "140px 60px", position: "relative", zIndex: 2 }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: 50 }}
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
            {t.testimonials.eyebrow}
          </div>
          <div
            style={{
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: -1.5,
              lineHeight: 1.15,
            }}
          >
            {t.testimonials.headingLine1}
            <br />
            {t.testimonials.headingLine2}
          </div>
        </div>

        <div className="testimonials-grid">
          {t.testimonials.items.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className={`testimonial-card reveal reveal-delay-${i + 1}`}
            >
              <div
                style={{
                  color: "#a78bfa",
                  fontSize: 14,
                  letterSpacing: 3,
                  marginBottom: 16,
                }}
              >
                ★★★★★
              </div>
              <blockquote
                style={{
                  fontSize: 15,
                  color: "#e2e0f0",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  fontStyle: "normal",
                  marginBottom: 24,
                }}
              >
                {testimonial.quote}
              </blockquote>
              <div
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "white",
                    background: testimonial.gradient,
                    flexShrink: 0,
                  }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: "white" }}
                  >
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#9896aa" }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 20px;
        }
        .testimonial-card {
          padding: 36px 32px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 20px;
          transition: 0.4s;
          backdrop-filter: blur(10px);
        }
        .testimonial-card:hover {
          border-color: rgba(167,139,250,0.3);
          transform: translateY(-3px);
        }
        @media (max-width: 900px) {
          #testimonials { padding: 110px 24px !important; }
        }
      `}</style>
    </section>
  );
}
