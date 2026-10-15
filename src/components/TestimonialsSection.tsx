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
      <div style={{ maxWidth: 720, width: "100%", margin: "0 auto" }}>
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

        <div className="testimonial-card reveal reveal-delay-1">
          <div
            style={{
              color: "#a78bfa",
              fontSize: 13,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <blockquote
            style={{
              fontSize: 16,
              color: "#c8c6d8",
              lineHeight: 1.8,
              fontWeight: 300,
              fontStyle: "normal",
              marginBottom: 28,
            }}
          >
            &ldquo;{t.testimonials.quote}&rdquo;
          </blockquote>
          <div
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                flexShrink: 0,
              }}
            >
              CS
            </div>
            <div>
              <div
                style={{ fontSize: 15, fontWeight: 600, color: "white" }}
              >
                {t.testimonials.name}
              </div>
              <div style={{ fontSize: 13, color: "#9896aa" }}>
                {t.testimonials.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-card {
          padding: 40px 36px;
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
          .testimonial-card { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}
