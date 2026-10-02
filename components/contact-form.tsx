"use client";

import { type FormEvent, useId, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const phoneId = `${formId}-phone`;
  const messageId = `${formId}-message`;

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <p className="eyebrow">Per maggiori informazioni</p>
      <div>
        <label htmlFor={nameId}>Nome e cognome</label>
        <input
          id={nameId}
          name="name"
          autoComplete="name"
          autoCapitalize="words"
          required
          placeholder="Come ti chiami?"
        />
      </div>
      <div>
        <label htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="La tua email"
        />
      </div>
      <div>
        <label htmlFor={phoneId}>
          Telefono <span>(facoltativo)</span>
        </label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Il tuo numero"
        />
      </div>
      <div>
        <label htmlFor={messageId}>Messaggio</label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          placeholder="Scrivi qui il motivo del contatto, senza inserire dati sanitari sensibili."
        />
      </div>
      <label className="privacy-check">
        <input type="checkbox" name="privacy" required />
        <span>Ho letto l’informativa privacy e acconsento al trattamento dei dati.</span>
      </label>
      <button className="button-primary justify-center" type="submit">
        Prepara la richiesta
      </button>
      {sent && <p className="form-note">Grazie. Questa è un’anteprima: il messaggio non è stato inviato.</p>}
    </form>
  );
}
