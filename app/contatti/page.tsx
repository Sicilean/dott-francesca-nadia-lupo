import type { Metadata } from "next";
import { ArrowUpRight, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contatti e studi a Milano",
  description: "Contatta la Dott.ssa Francesca Nadia Lupo. Studi a Milano e Opera (MI), telefono 346 0808707.",
};

const sedi = [
  {
    lines: ["Via Bartolomeo D’Alviano, 13", "20146 Milano"],
    maps: "https://www.google.com/maps/search/?api=1&query=Via+Bartolomeo+D%27Alviano+13,+20146+Milano",
  },
  {
    lines: ["Via Dandolo, 1", "20073 Opera (MI)"],
    maps: "https://www.google.com/maps/search/?api=1&query=Via+Dandolo+1,+20073+Opera",
  },
  {
    lines: ["Via Santa Maria Valle, 4", "20123 Milano"],
    maps: "https://www.google.com/maps/search/?api=1&query=Via+Santa+Maria+Valle+4,+20123+Milano",
  },
] as const;

export default function ContattiPage() {
  return (
    <main>
      <PageIntro eyebrow="Contatti" title={<>Iniziamo da<br /><span className="title-rule"><em>una domanda.</em></span></>}>
        Puoi chiamare oppure lasciare un messaggio. Il modulo è una dimostrazione e non invia ancora i dati.
      </PageIntro>
      <section className="site-wrap grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-24">
        <div className="bg-primary p-6 text-primary-foreground sm:p-8 md:p-12">
          <p className="eyebrow text-accent-soft">Le sedi</p>
          <div className="mt-8 space-y-7">
            {sedi.map((sede) => (
              <a
                key={sede.maps}
                className="contact-detail contact-sede"
                href={sede.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin aria-hidden />
                <p>
                  {sede.lines[0]}
                  <br />
                  {sede.lines[1]}
                </p>
                <ArrowUpRight className="contact-arrow" size={16} aria-hidden />
                <span className="sr-only">Apre Google Maps</span>
              </a>
            ))}
            <div className="contact-detail">
              <MapPin aria-hidden />
              <p>
                Quarta sede
                <br />
                Indirizzo in arrivo
              </p>
            </div>
            <div className="contact-detail">
              <Phone aria-hidden />
              <a href="tel:+393460808707">346 0808707</a>
            </div>
            <div className="contact-detail">
              <Mail aria-hidden />
              <a href="mailto:francescanadialupo@yahoo.it">francescanadialupo@yahoo.it</a>
            </div>
            <div className="contact-detail">
              <Facebook aria-hidden />
              <a href="https://www.facebook.com/dallacuraalprendersicura" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
