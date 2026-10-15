"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function MarqueeSection() {
  const { t } = useLanguage();
  const items = t.marquee.items;

  return (
    <div
      style={{
        padding: "20px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          animation: "marquee 180s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontSize: 11,
              color: "var(--muted)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              letterSpacing: 2.5,
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
                background: "var(--accent)",
                display: "inline-block",
                flexShrink: 0,
                opacity: 0.5,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
