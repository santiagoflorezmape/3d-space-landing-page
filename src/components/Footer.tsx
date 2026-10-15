"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        position: "relative",
        padding: "40px 60px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap" as const,
        gap: 16,
      }}
    >
      <p style={{ fontSize: 13, color: "#6b6b80", fontWeight: 400 }}>
        {t.footer.copyright}
      </p>
      <p style={{ fontSize: 13, color: "#6b6b80", fontWeight: 400 }}>
        {t.footer.tagline}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ color: "#a78bfa", textDecoration: "none", cursor: "pointer" }}
        >
          {t.footer.backToTop}
        </a>
      </p>

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
