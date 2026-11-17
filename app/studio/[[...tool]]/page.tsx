import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/** Lo studio non va indicizzato. Accesso con l'account Sanity. */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
