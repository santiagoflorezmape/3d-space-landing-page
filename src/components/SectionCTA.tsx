import { translations as t } from "@/translations";

export function SectionCTA() {

  return (
    <div className="section-cta">
      <a
        className="btn"
        href="https://cal.com/santiagoflorezmape/infoproduct-zenith"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.cta.btn}
      </a>
    </div>
  );
}
