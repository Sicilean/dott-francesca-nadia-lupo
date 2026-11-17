import { JsonLd } from "@/components/json-ld";
import { SiteFrame } from "@/components/site-frame";
import { siteSchema } from "@/lib/structured-data";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteFrame>
      {children}
      <JsonLd data={siteSchema()} />
    </SiteFrame>
  );
}
