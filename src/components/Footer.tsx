"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        padding: "40px 60px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 400 }}>
        {t.footer.copyright}
      </p>
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{
          fontSize: 12,
          color: "var(--muted)",
          textDecoration: "none",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
      >
        {t.footer.backToTop}
      </a>

      <style>{`
        @media (max-width: 900px) {
          footer {
            padding: 30px 24px !important;
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
