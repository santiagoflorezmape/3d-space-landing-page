import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
