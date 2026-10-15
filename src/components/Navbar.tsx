import Image from "next/image";

export function Navbar() {
  return (
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
  );
}
