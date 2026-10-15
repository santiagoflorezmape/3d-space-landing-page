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
        padding: scrolled ? "14px 40px" : "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(24px)",
        background: scrolled ? "rgba(5,5,16,0.92)" : "rgba(5,5,16,0.6)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        transition: "0.4s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/logo.webp"
            alt="Infoproduct Zenith"
            width={36}
            height={36}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: "white",
          }}
        >
          Infoproduct <span style={{ color: "#a78bfa" }}>Zenith</span>
        </div>
      </div>

      <button
        className="lang-btn"
        type="button"
        onClick={cycleLanguage}
        title="Switch language"
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
      </button>

      <style>{`
        .lang-btn {
          height: 36px;
          padding: 0 14px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #e2e0f0;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-family: inherit;
          transition: 0.3s;
        }
        .lang-btn:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
        }
        @media (max-width: 900px) {
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </nav>
  );
}
