"use client";

import { useEffect, useRef } from "react";

export function CTASection() {
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
      id="cta"
      ref={sectionRef}
      style={{
        padding: "100px 60px",
        position: "relative",
        zIndex: 2,
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
          Ready?
        </div>
        <div
          style={{
            fontSize: "clamp(32px, 4.5vw, 52px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: -1.5,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Let&apos;s engineer your
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            next breakthrough
          </span>
        </div>
        <p
          style={{
            fontSize: 16,
            color: "#9896aa",
            maxWidth: 460,
            margin: "0 auto",
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: 36,
          }}
        >
          Book a free strategy session. We&apos;ll audit your funnel, identify
          the biggest growth levers, and map out a 90-day scaling plan — no
          strings attached.
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
          Book Your Free Call →
        </button>
      </div>

      <style>{`
        .cta-box {
          padding: 80px 60px;
          border-radius: 32px;
          border: 1px solid rgba(167,139,250,0.15);
          background: rgba(124,58,237,0.04);
          backdrop-filter: blur(20px);
          text-align: center;
          position: relative;
          overflow: hidden;
          max-width: 800px;
          width: 100%;
        }
        .cta-box::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(124,58,237,0.08), transparent 60%);
          pointer-events: none;
        }
        .cta-btn {
          padding: 18px 48px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 99px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
          position: relative;
          z-index: 1;
        }
        .cta-btn:hover {
          background: #a78bfa;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(124,58,237,0.5);
        }
        @media (max-width: 900px) {
          .cta-box { padding: 50px 30px !important; }
          #cta { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
