import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contatti e studi a Milano",
  description: "Contatta la Dott.ssa Francesca Nadia Lupo. Studi a Milano e Opera (MI), telefono 346 0808707.",
};

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
            <div className="contact-detail">
              <MapPin />
              <p>
                Via Bartolomeo D’Alviano, 13
                <br />
                20146 Milano
              </p>
            </div>
            <div className="contact-detail">
              <MapPin />
              <p>
                Via Dandolo, 1
                <br />
                20073 Opera (MI)
              </p>
            </div>
            <div className="contact-detail">
              <MapPin />
              <p>
                Via Santa Maria Valle, 4
                <br />
                20123 Milano
              </p>
            </div>
            <div className="contact-detail">
              <Phone />
              <a href="tel:+393460808707">346 0808707</a>
            </div>
            <div className="contact-detail">
              <Mail />
              <span>Email disponibile su richiesta</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
