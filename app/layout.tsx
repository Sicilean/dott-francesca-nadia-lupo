import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ContactModalProvider } from "@/components/contact-modal";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TextMotion } from "@/components/text-motion";
import { SanityLive } from "@/sanity/live";
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
        <ContactModalProvider>
          <a href="#contenuto" className="skip-link">
            Salta al contenuto
          </a>
          <SiteHeader />
          <div id="contenuto">{children}</div>
          <TextMotion />
          <SiteFooter />
          <SanityLive />
        </ContactModalProvider>
      </body>
    </html>
  );
}
