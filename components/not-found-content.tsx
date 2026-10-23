import Link from "next/link";

export function NotFoundContent() {
  return (
    <main className="site-wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-4">Pagina non trovata</h1>
      <p className="mt-6 max-w-md text-muted-foreground">La pagina che cerchi non esiste oppure è stata spostata.</p>
      <Link href="/" className="button-primary mt-8">
        Torna alla home
      </Link>
    </main>
  );
}
