"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function GuaranteeSection() {
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
    <section id="guarantee" ref={sectionRef}>
      <div className="container">
        <div className="card guarantee reveal">
          <h3>{t.guarantee.title}</h3>
          <p>{t.guarantee.text}</p>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
