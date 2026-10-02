import { ArrowUpRight, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { contactEmail, contactFacebookHref, contactPhone, contactPhoneHref, sedi } from "@/lib/contact";

type ContactPanelProps = {
  /** Layout classes for the two-column shell (page vs modal). */
  className?: string;
};

export function ContactPanel({ className }: ContactPanelProps) {
  return (
    <div className={className}>
      <div className="contact-sedi bg-primary p-6 text-primary-foreground sm:p-8 md:p-12">
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
            <a href={contactPhoneHref}>{contactPhone}</a>
          </div>
          <div className="contact-detail">
            <Mail aria-hidden />
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div className="contact-detail">
            <Facebook aria-hidden />
            <a href={contactFacebookHref} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
