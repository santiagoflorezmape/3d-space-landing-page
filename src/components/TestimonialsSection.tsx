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
            {t.testimonials.eyebrow}
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
                  fontSize: 13,
                  letterSpacing: 2,
                  marginBottom: 16,
                }}
              >
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <blockquote
                style={{
                  fontSize: 14,
                  color: "#c8c6d8",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  fontStyle: "normal",
                  marginBottom: 24,
                }}
              >
                {testimonial.quote}
              </blockquote>
              <div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
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
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .testimonial-card {
          padding: 32px 28px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          transition: 0.3s;
        }
        .testimonial-card:hover {
          border-color: rgba(255,255,255,0.1);
        }
        @media (max-width: 900px) {
          #testimonials { padding: 120px 24px !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
