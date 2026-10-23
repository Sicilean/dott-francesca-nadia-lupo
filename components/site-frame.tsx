import type { ReactNode } from "react";
import { ContactModalProvider } from "@/components/contact-modal";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TextMotion } from "@/components/text-motion";
import { SanityLive } from "@/sanity/live";

export type SiteFrameProps = {
  /** Contenuto delle pagine pubbliche, con navigazione e footer. */
  children: ReactNode;
};

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <ContactModalProvider>
      <a href="#contenuto" className="skip-link">
        Salta al contenuto
      </a>
      <SiteHeader />
      <div id="contenuto">{children}</div>
      <TextMotion />
      <SiteFooter />
      <SanityLive />
    </ContactModalProvider>
  );
}
