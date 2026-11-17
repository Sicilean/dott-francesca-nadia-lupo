"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Statistiche Vercel senza cookie. Le visite allo studio Sanity non vengono contate. */
export function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={(event) => (new URL(event.url).pathname.startsWith("/studio") ? null : event)} />
      <SpeedInsights beforeSend={(event) => (new URL(event.url).pathname.startsWith("/studio") ? null : event)} />
    </>
  );
}
