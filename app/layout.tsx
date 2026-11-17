import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteAnalytics } from "@/components/site-analytics";
import { siteName, siteUrl } from "@/lib/site";
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

// Codici di verifica di Google Search Console e Bing Webmaster Tools (meta tag).
// Si impostano su Vercel; servono un nuovo deploy per comparire.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Psicologa e psicoterapeuta a Milano — Francesca Nadia Lupo",
    template: "%s — Francesca Nadia Lupo",
  },
  description:
    "Psicoterapia individuale e di coppia, sessuologia clinica, psico-cardiologia e psico-oncologia con la Dott.ssa Francesca Nadia Lupo a Milano.",
  authors: [{ name: "Dott.ssa Francesca Nadia Lupo" }],
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  verification: {
    google: googleVerification,
    other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
  },
  robots: { index: true, follow: true },
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
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
