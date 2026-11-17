"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { gtmId } from "@/lib/site";

/**
 * Google Tag Manager (Google Analytics 4) con Consent Mode v2.
 * Il contenitore si carica subito ma con tutti i consensi negati: GA4 non scrive cookie
 * finché il visitatore non preme «Accetta». La scelta resta nel browser (localStorage).
 * «Preferenze cookie» nel footer riapre il banner con l’evento `cookie-preferences`.
 */

const STORAGE_KEY = "fnl-cookie-consent";
type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function applyChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Archiviazione non disponibile: la scelta vale solo per questa pagina.
  }
  window.gtag?.("consent", "update", { analytics_storage: choice });
  if (choice === "denied") clearAnalyticsCookies();
}

/** Cancella i cookie _ga se il consenso viene revocato. */
function clearAnalyticsCookies() {
  const domains = ["", `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, "")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

const bootstrap = `
window.dataLayer = window.dataLayer || [];
window.gtag = function(){ dataLayer.push(arguments); };
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=${gtmId}';
  document.head.appendChild(s);
})();
`;

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("cookie-preferences", reopen);
    return () => window.removeEventListener("cookie-preferences", reopen);
  }, []);

  function choose(choice: Choice) {
    applyChoice(choice);
    setOpen(false);
  }

  return (
    <>
      <Script id="gtm-consent" strategy="afterInteractive">
        {bootstrap}
      </Script>
      {open ? (
        <section className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
          <div className="cookie-banner-text">
            <p id="cookie-banner-title" className="cookie-banner-title">
              Statistiche di visita
            </p>
            <p>
              Con il suo consenso usiamo Google Analytics per capire, in forma aggregata, come viene visitato il sito.
              Nessun uso pubblicitario. Dettagli nella <Link href="/cookie-policy">cookie policy</Link>.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button type="button" className="button-outline justify-center" onClick={() => choose("denied")}>
              Rifiuta
            </button>
            <button type="button" className="button-primary justify-center" onClick={() => choose("granted")}>
              Accetta
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Pulsante del footer che riapre il banner. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("cookie-preferences"))}>
      Preferenze cookie
    </button>
  );
}
