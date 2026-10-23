import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In aggiornamento",
  description: "In aggiornamento.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "In aggiornamento",
    description: "In aggiornamento.",
  },
};

export default function HoldingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
      <img
        src="/logo_lupo.svg"
        alt="Francesca Nadia Lupo"
        width={284}
        height={64}
        className="h-14 w-auto max-w-[min(100%,18rem)] sm:h-16"
      />
      <h1 className="section-title mt-10">In aggiornamento</h1>
    </main>
  );
}
