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
  title: "Infoproduct Zenith",
  description:
    "We architect unstoppable growth systems for info-product brands — turning expertise into empires through precision funnels, organic content, and conversion science.",
  metadataBase: new URL("https://infoproduct-zenith.vercel.app"),
  icons: {
    icon: "/seo/icon.webp",
    apple: "/seo/icon.webp",
    shortcut: "/seo/icon.webp",
  },
  openGraph: {
    type: "website",
    title: "Infoproduct Zenith — Growth Operating Agency",
    description:
      "We architect unstoppable growth systems for info-product brands — turning expertise into empires through precision funnels, organic content, and conversion science.",
    images: [
      {
        url: "/seo/og.png",
        width: 2560,
        height: 1440,
        alt: "Infoproduct Zenith",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infoproduct Zenith — Growth Operating Agency",
    description:
      "We architect unstoppable growth systems for info-product brands — turning expertise into empires through precision funnels, organic content, and conversion science.",
    images: ["/seo/og.png"],
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
