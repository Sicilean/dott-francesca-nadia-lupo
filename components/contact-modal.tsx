"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { ContactPanel } from "@/components/contact-panel";

type ContactModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal deve essere usato dentro ContactModalProvider.");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) return;
    triggerRef.current?.focus();
  }, [isOpen]);

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen ? <ContactModal /> : null}
    </ContactModalContext.Provider>
  );
}

type ContactCtaProps = {
  /** Visual classes, typically `button-primary` or `button-light`. */
  className?: string;
  children: ReactNode;
  /** Extra handler, e.g. close the mobile menu before the modal opens. */
  onClick?: () => void;
};

export function ContactCta({ className, children, onClick }: ContactCtaProps) {
  const { open } = useContactModal();

  return (
    <button
      type="button"
      className={["contact-cta", className].filter(Boolean).join(" ")}
      onClick={() => {
        onClick?.();
        open();
      }}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}

function ContactModal() {
  const { close } = useContactModal();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const locked = Array.from(document.querySelectorAll<HTMLElement>("body > :not(.contact-modal)"));
    locked.forEach((el) => el.setAttribute("inert", ""));

    function focusables() {
      return Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button, input, textarea, select") ?? [],
      ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
    }

    const first = focusables()[0];
    first?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const start = items[0];
      const end = items[items.length - 1];
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = "";
      locked.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return (
    <div className="contact-modal">
      <button type="button" className="contact-modal-backdrop" onClick={close} aria-label="Chiudi finestra" />
      <div
        ref={dialogRef}
        className="contact-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <header className="contact-modal-head">
          <div className="contact-modal-intro">
            <h2 id={titleId} className="contact-modal-title">
              Richiedi un <em>colloquio.</em>
            </h2>
            <p id={descriptionId} className="contact-modal-lead">
              Puoi chiamare oppure lasciare un messaggio. Il modulo è una dimostrazione e non invia ancora i dati.
            </p>
          </div>
          <button type="button" className="contact-modal-close" onClick={close}>
            Chiudi <X size={18} aria-hidden />
          </button>
        </header>
        <ContactPanel className="contact-modal-grid" />
      </div>
    </div>
  );
}
