"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/translations";

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "\u{1F1FA}\u{1F1F8}", label: "EN" },
  { code: "es", flag: "\u{1F1EA}\u{1F1F8}", label: "ES" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  const cycleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex].code);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        padding: scrolled ? "12px 40px" : "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(20px)",
        background: scrolled ? "rgba(6,6,15,0.88)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            position: "relative",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/logo.webp"
            alt="Infoproduct Zenith"
            width={32}
            height={32}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: -0.3,
            color: "white",
            fontFamily: "var(--font-body)",
          }}
        >
          Infoproduct{" "}
          <em
            style={{
              fontStyle: "italic",
              fontFamily: "var(--font-heading)",
              fontSize: 17,
              fontWeight: 400,
              color: "var(--accent-soft)",
            }}
          >
            Zenith
          </em>
        </span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            style={{
              padding: "6px 12px",
              borderRadius: 99,
              border: "none",
              background:
                lang.code === language
                  ? "rgba(139,115,230,0.12)"
                  : "transparent",
              color:
                lang.code === language ? "white" : "var(--muted)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              letterSpacing: 0.5,
              transition: "0.3s",
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          nav { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </nav>
  );
}
