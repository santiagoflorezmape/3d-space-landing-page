"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function ProblemSection() {
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
    <section id="problem" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow reveal">{t.problem.eyebrow}</div>
        <h2 className="reveal d1 wide">{t.problem.title}</h2>
        <div className="problem-grid">
          {t.problem.items.map((item, i) => (
            <div key={item} className={`card pain reveal d${Math.min(i + 1, 4)}`}>
              <span className="gem" />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <p className="closer reveal">{t.problem.closer}</p>
        <SectionCTA />
      </div>
    </section>
  );
}
