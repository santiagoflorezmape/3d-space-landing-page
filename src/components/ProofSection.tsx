"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

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
    <section id="proof" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow reveal">{t.proof.eyebrow}</div>
        <h2 className="reveal d1 wide">{t.proof.title}</h2>
        <div className="proof-stats reveal d2">
          {t.proof.stats.map((stat) => (
            <div key={stat.label} className="proof-stat-item">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="card proof-card reveal d3">
          <p>{t.proof.body}</p>
          <ul className="chips">
            {t.proof.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
