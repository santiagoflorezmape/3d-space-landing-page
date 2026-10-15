"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function FitSection() {
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
    <section id="fit" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow reveal">{t.fit.eyebrow}</div>
        <h2 className="reveal d1">{t.fit.title}</h2>
        <div className="fit-grid">
          <div className="card fit yes reveal d1">
            <h3>{t.fit.yesTitle}</h3>
            <ul>
              {t.fit.yesItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card fit no reveal d2">
            <h3>{t.fit.noTitle}</h3>
            <ul>
              {t.fit.noItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
