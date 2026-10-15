"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function FAQSection() {
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
    <section id="faq" ref={sectionRef}>
      <div className="container narrow">
        <div className="eyebrow reveal">{t.faq.eyebrow}</div>
        <h2 className="reveal d1">{t.faq.title}</h2>
        <div className="faq-list reveal d2">
          {t.faq.items.map((item) => (
            <details key={item.q}>
              <summary><span>{item.q}</span></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
