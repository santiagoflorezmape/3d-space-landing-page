"use client";

import { useEffect, useRef } from "react";
import { translations as t } from "@/translations";
import { SectionCTA } from "./SectionCTA";

export function DeliverSection() {
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
          <div className="deliver-sidebar">
            <aside className="card you-do reveal d2">
              <h3>{t.deliver.youDoTitle}</h3>
              <p>{t.deliver.youDoText}</p>
            </aside>
            <aside className="card guarantee reveal d3">
              <h3>{t.deliver.guaranteeTitle}</h3>
              <p>{t.deliver.guaranteeText}</p>
            </aside>
          </div>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
