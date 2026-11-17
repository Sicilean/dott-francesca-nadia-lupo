import { ArrowUpRight, Facebook, Mail, Phone } from "lucide-react";
import { contactEmail, contactFacebookHref, contactPhone, contactPhoneHref, sedi } from "@/lib/contact";

type ContactPanelProps = {
  /** Layout classes for the two-column shell (page vs modal). */
  className?: string;
};

export function ContactPanel({ className }: ContactPanelProps) {
  return (
    <div className={className}>
      <div className="contact-direct bg-primary text-primary-foreground">
        <p className="eyebrow text-accent-soft">Contatto diretto</p>
        <a className="contact-phone" href={contactPhoneHref}>
          <Phone aria-hidden />
          <span>
            <span className="contact-label">Telefono</span>
            <span className="contact-phone-number">{contactPhone}</span>
          </span>
        </a>
        <div className="contact-channels">
          <a className="contact-channel" href={`mailto:${contactEmail}`}>
            <Mail aria-hidden />
            <span>
              <span className="contact-label">Email</span>
              <span className="contact-channel-value">{contactEmail}</span>
            </span>
          </a>
          <a className="contact-channel" href={contactFacebookHref} target="_blank" rel="noopener noreferrer">
            <Facebook aria-hidden />
            <span>
              <span className="contact-label">Facebook</span>
              <span className="contact-channel-value">Pagina Facebook</span>
            </span>
            <span className="sr-only">(si apre in una nuova scheda)</span>
          </a>
        </div>
      </div>
      <div className="contact-studi">
        <p className="eyebrow">Gli studi</p>
        <ul className="contact-studi-grid">
          {sedi.map((sede) => (
            <li key={sede.maps}>
              <a className="contact-studio" href={sede.maps} target="_blank" rel="noopener noreferrer">
                <span className="contact-studio-city">{sede.city}</span>
                <span className="contact-studio-address">
                  {sede.lines[0]}
                  <br />
                  {sede.lines[1]}
                </span>
                <span className="contact-studio-link">
                  Indicazioni <ArrowUpRight className="contact-arrow" aria-hidden />
                </span>
                <span className="sr-only">(apre Google Maps)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
