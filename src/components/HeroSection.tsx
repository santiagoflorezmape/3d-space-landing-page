"use client";

import { useEffect, useRef } from "react";
import { translations as t } from "@/translations";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <div className="container hero-inner">
        <div className="eyebrow reveal">{t.hero.badge}</div>
        <h1 className="reveal d1">{t.hero.titlePre}</h1>
        <p className="lead reveal d2">{t.hero.sub}</p>

        <div className="reveal d3 vsl-container">
          <div className="vsl-embed">
            <iframe
              src="https://www.tella.tv/video/base44-demo-hijl/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=1"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 22,
              }}
            />
          </div>
        </div>

        <div className="reveal d3" style={{ marginTop: 32 }}>
          <a
            className="btn"
            href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hero.btn}
          </a>
        </div>

      </div>
    </section>
  );
}
