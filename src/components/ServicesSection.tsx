"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    icon: "🚀",
    title: "Funnel Architecture",
    desc: "High-converting sales funnels built from first principles — VSLs, webinars, challenges, and application funnels that print revenue on autopilot.",
  },
  {
    icon: "📡",
    title: "Traffic & Acquisition",
    desc: "Organic traffic engines, strategic partnerships, and viral content systems that drive qualified leads on autopilot — without dependency on any single channel.",
  },
  {
    icon: "⚡",
    title: "Conversion Optimization",
    desc: "Data-driven CRO that turns traffic into buyers. A/B testing, copy optimization, checkout flow engineering, and behavioral analytics at scale.",
  },
  {
    icon: "🧠",
    title: "Offer Engineering",
    desc: 'Irresistible offer stacks designed using value-equation frameworks. Positioning, pricing strategy, and packaging that makes saying "no" impossible.',
  },
  {
    icon: "📊",
    title: "Analytics & Attribution",
    desc: "Full-stack tracking, attribution modeling, and custom dashboards. Know exactly which dollar produces which result — no more guessing.",
  },
  {
    icon: "🔁",
    title: "Retention Systems",
    desc: "Email/SMS nurture sequences, community engines, and ascension ladders that maximize lifetime value and turn customers into evangelists.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
      style={{ padding: "100px 60px", position: "relative", zIndex: 2 }}
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
            What We Build
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
            End-to-end growth
            <br />
            infrastructure
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#9896aa",
              maxWidth: 500,
              margin: "16px auto 0",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Every lever of growth — engineered, optimized, and scaled under one
            roof.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(124,58,237,0.15)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 12,
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
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .service-card {
          padding: 40px 32px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 20px;
          transition: 0.4s;
          cursor: default;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #a78bfa, transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .service-card:hover {
          border-color: #a78bfa;
          transform: translateY(-4px);
          background: rgba(167,139,250,0.06);
        }
        .service-card:hover::before {
          opacity: 1;
        }
        @media (max-width: 900px) {
          #services { padding: 80px 24px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
