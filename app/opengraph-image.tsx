import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { professional } from "@/lib/site";

/** Anteprima social predefinita (1200×630): logo, qualifica, sedi e foto della dottoressa. */
export const alt = "Dott.ssa Francesca Nadia Lupo, psicologa e psicoterapeuta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const publicDir = path.join(process.cwd(), "public");
  const [photo, logo] = await Promise.all([
    readFile(path.join(publicDir, "foto-sito.jpg")),
    readFile(path.join(publicDir, "logo_lupo.svg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f4ee" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
            padding: "72px 64px 64px 72px",
          }}
        >
          <img src={logoSrc} width={560} height={126} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 50, lineHeight: 1.1, color: "#3e3268" }}>{professional.jobTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 27, lineHeight: 1.4, color: "#5b5675" }}>
              <span style={{ whiteSpace: "nowrap" }}>Psicoterapia individuale, di coppia e di gruppo</span>
              <span style={{ whiteSpace: "nowrap" }}>Sessuologia clinica, psico-cardiologia</span>
              <span style={{ whiteSpace: "nowrap" }}>e psico-oncologia</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#e0634f", letterSpacing: 1 }}>
            Milano · Opera · Piacenza
          </div>
        </div>
        <img src={photoSrc} width={440} height={630} style={{ objectFit: "cover", objectPosition: "50% 20%" }} alt="" />
      </div>
    ),
    size,
  );
}
