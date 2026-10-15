"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionCTA } from "./SectionCTA";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dayNum, setDayNum] = useState(0);
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let current = 0;
            const target = 14;
            const step = () => {
              current++;
              setDayNum(current);
              if (current < target) {
                setTimeout(step, 80);
              }
            };
            step();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef}>
      <div className="container">
        <div className="process-head">
          <div>
            <div className="eyebrow reveal">{t.process.eyebrow}</div>
            <h2 className="reveal d1">{t.process.title}</h2>
          </div>
          <div className="daycount reveal d2">
            <span>{t.process.day}</span>{" "}
            <b>{String(dayNum).padStart(2, "0")}</b>{" "}
            <span className="of">/ 14</span>
          </div>
        </div>

        <div className="steps">
          {t.process.steps.map((step) => (
            <article key={step.num} className="step reveal">
              <div className="step-meta">
                <span className="num">{step.num}</span>
                <span className="days">{step.days}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>

        <SectionCTA />
      </div>
    </section>
  );
}
