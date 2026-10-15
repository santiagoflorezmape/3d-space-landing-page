"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function MarqueeSection() {
  const { t } = useLanguage();
  const items = t.marquee.items;

  return (
    <div
      style={{
        padding: "24px 0",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          animation: "marquee 200s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontSize: 13,
              color: "#9896aa",
              fontWeight: 500,
              whiteSpace: "nowrap",
              textTransform: "uppercase" as const,
              letterSpacing: 2,
              opacity: 0.4,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#7c3aed",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
