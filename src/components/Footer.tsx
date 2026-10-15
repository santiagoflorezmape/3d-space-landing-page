"use client";

import { translations as t } from "@/translations";

export function Footer() {

  return (
    <footer>
      <p>{t.footer.copyright}</p>
      <p className="footer-disclaimer">
        This website is not part of the YouTube, Google, or Facebook website; Google Inc or Facebook Inc. Also, this website is NOT endorsed by YouTube, Google or Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc. YOUTUBE is a trademark of GOOGLE Inc.
      </p>
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
