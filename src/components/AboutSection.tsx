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
      style={{ padding: "100px 60px", position: "relative", zIndex: 2 }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        <div className="about-grid">
          {/* Engine Visual */}
          <div className="about-visual reveal">
            <div className="engine-visual">
              {/* Orbit paths */}
              <div className="orbit-path orbit-1">
                <span className="orbit-node" style={{ top: -4, left: "50%", transform: "translateX(-50%)", background: "#c4b5fd" }} />
              </div>
              <div className="orbit-path orbit-2">
                <span className="orbit-node" style={{ bottom: -4, left: "50%", transform: "translateX(-50%)", background: "#a78bfa" }} />
              </div>
              <div className="orbit-path orbit-3">
                <span className="orbit-node" style={{ top: "50%", right: -4, transform: "translateY(-50%)", background: "#7c3aed" }} />
              </div>

              {/* Engine core */}
              <div className="engine-core">
                <div className="gear gear-1" />
                <div className="gear gear-2" />
                <div className="gear gear-3" />
                <div className="engine-dot" />
              </div>

              {/* Labels */}
              <div className="engine-label label-1">{t.about.labelFunnels}</div>
              <div className="engine-label label-2">{t.about.labelAnalytics}</div>
              <div className="engine-label label-3">{t.about.labelGrowth}</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div
              className="reveal"
              style={{
                fontSize: 12,
                textTransform: "uppercase" as const,
                letterSpacing: 3,
                color: "#a78bfa",
                fontWeight: 600,
                marginBottom: 16,
                textAlign: "left",
              }}
            >
              {t.about.eyebrow}
            </div>
            <div
              className="reveal reveal-delay-1"
              style={{
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 800,
                color: "white",
                letterSpacing: -1.5,
                lineHeight: 1.15,
                textAlign: "left",
                marginBottom: 24,
              }}
            >
              {t.about.headingLine1}
              <br />
              {t.about.headingLine2}
            </div>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: 16,
                color: "#9896aa",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: 32,
              }}
            >
              {t.about.body}
            </p>
            <div
              className="reveal reveal-delay-3"
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {t.about.values.map((value) => (
                <div
                  key={value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 15,
                    color: "#e2e0f0",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#a78bfa",
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .about-visual {
          position: relative;
          height: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .engine-visual {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .engine-core {
          position: relative;
          width: 160px;
          height: 160px;
        }
        .gear {
          position: absolute;
          border-radius: 50%;
          border: 2.5px solid var(--accent, #a78bfa);
          animation: gearSpin 10s linear infinite;
        }
        .gear::before {
          content: "";
          position: absolute;
          top: 50%;
          left: -8px;
          right: -8px;
          height: 2.5px;
          background: inherit;
          opacity: 0.4;
          transform: translateY(-50%);
          border: none;
          background: var(--accent, #a78bfa);
        }
        .gear::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -8px;
          bottom: -8px;
          width: 2.5px;
          background: var(--accent, #a78bfa);
          opacity: 0.4;
          transform: translateX(-50%);
        }
        .gear-1 {
          width: 160px;
          height: 160px;
          top: 0;
          left: 0;
          border-color: #a78bfa;
          opacity: 0.7;
        }
        .gear-1::before, .gear-1::after { background: #a78bfa; }
        .gear-2 {
          width: 110px;
          height: 110px;
          top: 25px;
          left: 25px;
          border-color: #c4b5fd;
          animation-direction: reverse;
          animation-duration: 7s;
          opacity: 0.5;
        }
        .gear-2::before, .gear-2::after { background: #c4b5fd; }
        .gear-3 {
          width: 60px;
          height: 60px;
          top: 50px;
          left: 50px;
          border-color: #7c3aed;
          animation-duration: 4s;
          opacity: 0.8;
        }
        .gear-3::before, .gear-3::after { background: #7c3aed; }
        .engine-dot {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #a78bfa;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 30px #a78bfa, 0 0 60px #7c3aed;
          animation: enginePulse 2s ease-in-out infinite;
        }
        .orbit-path {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(167,139,250,0.1);
        }
        .orbit-node {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .orbit-1 {
          width: 260px;
          height: 260px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: gearSpin 20s linear infinite;
        }
        .orbit-2 {
          width: 340px;
          height: 340px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: gearSpin 30s linear infinite reverse;
        }
        .orbit-3 {
          width: 420px;
          height: 420px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: gearSpin 25s linear infinite;
        }
        .engine-label {
          position: absolute;
          padding: 6px 14px;
          border-radius: 99px;
          border: 1px solid rgba(167,139,250,0.15);
          background: rgba(255,255,255,0.04);
          font-size: 10px;
          font-weight: 600;
          color: #c4b5fd;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          animation: labelFloat 4s ease-in-out infinite;
        }
        .label-1 { top: 10px; right: -20px; animation-delay: 0s; }
        .label-2 { bottom: 30px; left: -30px; animation-delay: 1.3s; }
        .label-3 { top: 50%; right: -50px; animation-delay: 2.6s; }
        @media (max-width: 900px) {
          #about { padding: 80px 24px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-visual { height: 300px !important; }
        }
      `}</style>
    </section>
  );
}
