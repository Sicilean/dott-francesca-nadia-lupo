"use client";

import { type FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div>
        <label htmlFor="name">Nome e cognome</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          autoCapitalize="words"
          required
          placeholder="Come ti chiami?"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required placeholder="La tua email" />
      </div>
      <div>
        <label htmlFor="phone">
          Telefono <span>(facoltativo)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Il tuo numero" />
      </div>
      <div>
        <label htmlFor="message">Messaggio</label>
        <textarea
          id="message"
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
