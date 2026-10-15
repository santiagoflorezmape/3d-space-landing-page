"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function SectionCTA() {
  const { t } = useLanguage();

  return (
    <div className="section-cta">
      <a
        className="btn"
        href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.cta.btn}
      </a>
    </div>
  );
}
