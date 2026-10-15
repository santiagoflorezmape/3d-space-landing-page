"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/translations";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function Navbar() {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <a className="brand" href="#hero" aria-label="Infoproduct Zenith">
        <span className="brand-mark">
          <Image
            src="/images/logo.webp"
            alt=""
            width={34}
            height={34}
          />
        </span>
        <span className="brand-name">
          Infoproduct <em>Zenith</em>
        </span>
      </a>

      <div className="lang">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={lang.code === language ? "on" : ""}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </>
  );
}
