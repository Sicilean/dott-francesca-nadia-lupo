"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ContactCta } from "@/components/contact-modal";
import { contactPhone, contactPhoneHref, sedi } from "@/lib/contact";

const nav = [
  ["/", "Home"],
  ["/chi-sono", "Chi sono"],
  ["/percorsi", "Percorsi"],
  ["/blog", "Orizzonti"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const main = document.getElementById("contenuto");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    function focusables() {
      return Array.from(
        document.querySelectorAll<HTMLElement>(
          ".site-header a, .site-header button, #menu-mobile a, #menu-mobile button",
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={open ? "site-header site-header-open" : "site-header"}>
        <div className="site-wrap flex h-[5.5rem] items-center justify-between gap-4 lg:h-28 lg:gap-6">
          <Link href="/" className="brand-mark" aria-label="Francesca Nadia Lupo, home" onClick={() => setOpen(false)}>
            <img src="/logo_lupo.svg" alt="" width={284} height={64} />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigazione principale">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className={pathname === href ? "nav-link nav-link-active" : "nav-link"}>
                {label}
              </Link>
            ))}
          </nav>
          <ContactCta className="button-primary header-cta hidden lg:inline-flex">
            Prendi contatto <ArrowUpRight size={17} />
          </ContactCta>
          <button
            className="icon-button lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && (
        <nav id="menu-mobile" className="mobile-menu" aria-label="Navigazione mobile" aria-modal="true">
          <div className="mobile-menu-art" aria-hidden />
          <div className="site-wrap mobile-menu-inner">
            <p className="eyebrow">Naviga</p>
            <div className="mobile-menu-links">
              {nav.map(([href, label]) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={(event) => {
                      if (href === pathname) {
                        event.preventDefault();
                        setOpen(false);
                      }
                    }}
                    className={active ? "mobile-link mobile-link-active" : "mobile-link"}
                  >
                    {active ? <em>{label}</em> : label}
                  </Link>
                );
              })}
            </div>
            <div className="mobile-menu-foot">
              <p className="font-fraunces text-xl leading-snug sm:text-2xl">
                Ogni percorso comincia da una conversazione.
              </p>
              <ContactCta className="button-primary" onClick={() => setOpen(false)}>
                Prendi contatto <ArrowUpRight size={17} />
              </ContactCta>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="footer-grid site-wrap">
        <div className="footer-brand">
          <img
            src="/logo_lupo.svg"
            alt="Francesca Nadia Lupo"
            className="footer-logo"
            width={284}
            height={64}
          />
          <p className="footer-bio">
            Psicologa, psicoterapeuta ad orientamento psicoanalitico, sessuologa clinica e terapeuta di coppia.
          </p>
          <ContactCta className="button-primary header-cta">
            Prendi contatto <ArrowUpRight size={17} />
          </ContactCta>
        </div>
        <div className="footer-col">
          <p className="eyebrow footer-label text-accent-soft">Naviga</p>
          <div className="footer-links">
            {nav.slice(1).map(([href, label]) => (
              <Link key={href} href={href} className="footer-link">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <p className="eyebrow footer-label text-accent-soft">Studio</p>
          <div className="footer-links">
            {sedi.map((sede) => (
              <a
                key={sede.maps}
                href={sede.maps}
                className="footer-link footer-sede"
                target="_blank"
                rel="noopener noreferrer"
              >
                {sede.lines[0]}
                <br />
                {sede.lines[1]}
                <span className="sr-only">Apre Google Maps</span>
              </a>
            ))}
            <a href={contactPhoneHref} className="footer-link footer-phone">
              {contactPhone}
            </a>
          </div>
        </div>
      </div>
      <div className="site-wrap flex flex-col gap-2 border-t border-surface-dark-line py-5 text-xs text-surface-dark-muted sm:flex-row sm:justify-between">
        <span>© 2026 Francesca Nadia Lupo</span>
        <span>Privacy · Cookie policy</span>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="site-wrap grid gap-8 py-14 lg:grid-cols-[160px_1fr] lg:py-28">
        <div className="hidden lg:block" aria-hidden />
        <div>
          {breadcrumb}
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title mt-5">{title}</h1>
          <div className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="site-wrap grid items-end gap-8 pb-20 pt-14 lg:grid-cols-[1fr_auto] lg:pb-24 lg:pt-20">
        <div>
          <p className="eyebrow text-accent-soft">Un primo passo</p>
          <h2 className="section-title mt-4 max-w-3xl">
            Ogni percorso comincia da una conversazione.
          </h2>
        </div>
        <ContactCta className="button-light">
          Scrivi a Francesca <ArrowUpRight size={18} />
        </ContactCta>
      </div>
      <div className="band-rule" aria-hidden>
        <img src="/linea_lupo.svg" alt="" />
      </div>
    </section>
  );
}
