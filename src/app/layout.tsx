import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";


const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infoproduct Zenith — Premium Launch Sprint",
  description:
    "Turn your audience into a premium program. A 14-day, done-with-you launch: offer, funnel, content plan and the sales calls.",
  metadataBase: new URL("https://infoproduct-zenith.vercel.app"),
  icons: {
    icon: [
      { url: "/icon.webp", type: "image/webp" },
      { url: "/seo/icon.webp", type: "image/webp" },
    ],
    apple: [{ url: "/icon.webp", type: "image/webp" }],
    shortcut: [{ url: "/icon.webp", type: "image/webp" }],
  },
  openGraph: {
    type: "website",
    title: "Infoproduct Zenith — Premium Launch Sprint",
    description:
      "Turn your audience into a premium program. A 14-day, done-with-you launch: offer, funnel, content plan and the sales calls.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 2560,
        height: 1440,
        alt: "Infoproduct Zenith",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infoproduct Zenith — Premium Launch Sprint",
    description:
      "Turn your audience into a premium program. A 14-day, done-with-you launch: offer, funnel, content plan and the sales calls.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
