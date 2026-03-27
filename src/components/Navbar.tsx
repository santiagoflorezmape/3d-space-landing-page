"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/translations";

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  const navLinks = [
    { text: t.nav.services, href: "#services" },
    { text: t.nav.about, href: "#about" },
    { text: t.nav.proof, href: "#testimonials" },
    { text: t.nav.contact, href: "#cta" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        backdropFilter: "blur(20px)",
        background: scrolled ? "rgba(3,0,20,0.85)" : "rgba(3,0,20,0.6)",
        borderBottom: "1px solid rgba(167,139,250,0.15)",
        transition: "0.4s",
      }}
    >
      {/* Logo Group */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/logo.webp"
            alt="Infoproduct Zenith"
            width={40}
            height={40}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(167,139,250,0.5))",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: "white",
          }}
        >
          Infoproduct <span style={{ color: "#a78bfa" }}>Zenith</span>
        </div>
      </div>

      {/* Nav Links */}
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href} style={{ listStyle: "none" }}>
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(link.href)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="nav-link"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      {/* Nav Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Language Switcher */}
        <div ref={langMenuRef} style={{ position: "relative" }}>
          <button
            className="lang-btn"
            type="button"
            onClick={() => setShowLangMenu((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={showLangMenu}
          >
            <span>{currentLang.flag}</span>
            <span>{currentLang.label}</span>
            <span
              style={{
                fontSize: 9,
                opacity: 0.6,
                marginLeft: 2,
                transition: "transform 0.2s",
                display: "inline-block",
                transform: showLangMenu ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          </button>

          {showLangMenu && (
            <div className="lang-dropdown" role="listbox">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={lang.code === language}
                  className={`lang-option${lang.code === language ? " active" : ""}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta-btn"
        >
          {t.nav.getStarted}
        </a>
      </div>

      <style>{`
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link {
          color: #9896aa;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: color 0.3s;
          position: relative;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #a78bfa;
          transition: width 0.3s;
        }
        .nav-link:hover {
          color: #a78bfa;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .lang-btn {
          height: 38px;
          padding: 0 14px;
          border-radius: 99px;
          border: 1px solid rgba(167,139,250,0.15);
          background: rgba(255,255,255,0.04);
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
          border-color: #a78bfa;
          background: rgba(167,139,250,0.1);
        }
        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: rgba(3,0,20,0.95);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 14px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 100px;
          backdrop-filter: blur(20px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.05);
          animation: dropdownFadeIn 0.15s ease;
          z-index: 200;
        }
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #9896aa;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-family: inherit;
          cursor: pointer;
          transition: 0.2s;
          width: 100%;
          text-align: left;
        }
        .lang-option:hover {
          background: rgba(167,139,250,0.08);
          color: #e2e0f0;
        }
        .lang-option.active {
          background: rgba(124,58,237,0.15);
          color: #a78bfa;
        }
        .nav-cta-btn {
          padding: 10px 24px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          text-decoration: none;
          letter-spacing: 0.3px;
        }
        .nav-cta-btn:hover {
          background: #a78bfa;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(124,58,237,0.4);
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-cta-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
