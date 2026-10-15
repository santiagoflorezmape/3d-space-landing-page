"use client";

import { translations as t } from "@/translations";

export function Footer() {

  return (
    <footer>
      <p>{t.footer.copyright}</p>
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {t.footer.backToTop}
      </a>
    </footer>
  );
}
