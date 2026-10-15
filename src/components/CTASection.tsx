"use client";

import { useEffect, useRef } from "react";
import { translations as t } from "@/translations";

export function CTASection() {
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
    <section id="cta" ref={sectionRef}>
      <div className="container cta-inner">
        <h2 className="reveal wide">
          {t.cta.titlePre}{" "}
          <span className="soft">{t.cta.titleSoft}</span>
        </h2>
        <div className="reveal d1">
          <a
            className="btn"
            href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.btn}
          </a>
        </div>
        <p className="small reveal d2">{t.cta.small}</p>
      </div>
    </section>
  );
}
