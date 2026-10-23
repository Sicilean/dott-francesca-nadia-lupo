import { SiteFrame } from "@/components/site-frame";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteFrame>{children}</SiteFrame>;
}
