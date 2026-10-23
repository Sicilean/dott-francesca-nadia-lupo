import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ContactCta } from "@/components/contact-modal";
import { ContactBand } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Psicologa e psicoterapeuta a Milano",
  description:
    "Psicoterapia individuale e di coppia, sessuologia clinica, psico-cardiologia e psico-oncologia con la Dott.ssa Francesca Nadia Lupo a Milano.",
};

const areas = [
  { title: "Terapia di gruppo", featured: true },
  { title: "Psicoterapia individuale" },
  { title: "Psicoterapia di coppia" },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-art" aria-hidden>
          <img src="/foto-home.png" alt="" />
        </div>
        <div className="site-wrap relative z-10 grid items-start gap-10 py-12 lg:min-h-[720px] lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-20 lg:pt-24">
          <div>
            <p className="eyebrow">Psicologa · Psicoterapeuta · Milano</p>
            <h1 className="hero-title mt-5">
              Dare forma
              <br />
              <span className="title-rule">
                a ciò che <em>senti.</em>
              </span>
            </h1>
            <p className="mt-12 max-w-xl text-lg leading-8 text-muted-foreground">
              Uno spazio di ascolto e cura in cui emozioni, relazioni e cambiamenti possono trovare parole nuove.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ContactCta className="button-primary">
                Richiedi un colloquio <ArrowUpRight size={18} />
              </ContactCta>
              <Link href="/percorsi" className="button-outline">
                Scopri i percorsi
              </Link>
            </div>
          </div>
          <div className="hero-side">
            <p className="font-fraunces text-2xl leading-snug">
              “Le nostre storie possono apparire confuse. Insieme possiamo osservarne linee, colori e significati.”
            </p>
            <ArrowDown className="mt-8" />
          </div>
        </div>
      </section>

      <section className="site-wrap grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12 lg:py-24">
        <div>
          <p className="eyebrow">Chi sono</p>
          <h2 className="section-title mt-5">
            Competenze diverse,
            <br />
            <em>un solo ascolto.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Psicologa e psicoterapeuta ad orientamento psicoanalitico individuale e di gruppo, specialista in
            sessuologia clinica e terapia di coppia.
          </p>
          <Link href="/chi-sono" className="text-link mt-8">
            Conosci Francesca <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="portrait-slot portrait-home lg:order-first">
          <Image
            src="/foto-sito.jpg"
            alt="Dott.ssa Francesca Nadia Lupo"
            width={487}
            height={731}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="portrait-home-img"
          />
        </div>
      </section>

      <section className="bg-soft py-14 lg:py-24">
        <div className="site-wrap">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Aree di intervento</p>
              <h2 className="section-title mt-4">
                Percorsi che prendono
                <br />
                <em>forme differenti.</em>
              </h2>
            </div>
            <Link href="/percorsi" className="text-link">
              Tutte le aree <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="home-areas mt-14">
            {areas.map((area) => (
              <Link
                href="/percorsi"
                key={area.title}
                className={area.featured ? "home-area home-area-featured" : "home-area"}
              >
                <h3>
                  {area.featured ? <span className="home-area-kicker">In evidenza</span> : null}
                  {area.title}
                </h3>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap py-14 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Orizzonti psicologici</p>
          <h2 className="section-title mt-5">
            Pensieri che aprono
            <br />
            <em>nuovi punti di vista.</em>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Articoli, podcast e racconti per avvicinare la psicologia alla vita quotidiana. Uno spazio speciale è
            dedicato alle parole degli adolescenti.
          </p>
          <Link href="/blog" className="button-primary mt-8">
            Leggi gli articoli <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
