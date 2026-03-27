"use client";

import { useEffect, useState } from "react";
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
  const { language, setLanguage, t } = useLanguage();

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  const navLinks = [
    { text: t.nav.services, href: "#services" },
    { text: t.nav.about, href: "#about" },
    { text: t.nav.proof, href: "#testimonials" },
    { text: t.nav.contact, href: "#cta" },
  ];

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
        {/* Language Cycle Toggle */}
        <button
          className="lang-btn"
          type="button"
          onClick={cycleLanguage}
          title="Switch language"
        >
          <span>{currentLang.flag}</span>
          <span>{currentLang.label}</span>
        </button>

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
          transform: scale(1.05);
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
