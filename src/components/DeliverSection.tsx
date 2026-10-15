"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function DeliverSection() {
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
    <section id="deliver" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow reveal">{t.deliver.eyebrow}</div>
        <h2 className="reveal d1">{t.deliver.title}</h2>
        <div className="deliver-grid">
          <ol className="deliver-list">
            {t.deliver.items.map((item) => (
              <li key={item} className="reveal">
                {item}
              </li>
            ))}
          </ol>
          <aside className="card you-do reveal d2">
            <h3>{t.deliver.youDoTitle}</h3>
            <p>{t.deliver.youDoText}</p>
            <div className="hours">
              <b>{t.deliver.youDoHours}</b>
              <span>{t.deliver.youDoHoursLabel}</span>
            </div>
          </aside>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
