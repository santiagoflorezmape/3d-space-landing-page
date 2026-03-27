"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function MarqueeSection() {
  const { t } = useLanguage();
  const items = t.marquee.items;

  return (
    <div
      style={{
        padding: "28px 0",
        borderTop: "1px solid rgba(167,139,250,0.06)",
        borderBottom: "1px solid rgba(167,139,250,0.06)",
        overflow: "hidden",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontSize: 14,
              color: "#9896aa",
              fontWeight: 500,
              whiteSpace: "nowrap",
              textTransform: "uppercase" as const,
              letterSpacing: 2,
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
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
