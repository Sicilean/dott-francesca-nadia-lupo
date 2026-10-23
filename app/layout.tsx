import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-next",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-h1",
});

export const metadata: Metadata = {
  title: {
    default: "Psicologa e psicoterapeuta a Milano — Francesca Nadia Lupo",
    template: "%s — Francesca Nadia Lupo",
  },
  description:
    "Psicoterapia individuale e di coppia, sessuologia clinica, psico-cardiologia e psico-oncologia con la Dott.ssa Francesca Nadia Lupo a Milano.",
  authors: [{ name: "Dott.ssa Francesca Nadia Lupo" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
