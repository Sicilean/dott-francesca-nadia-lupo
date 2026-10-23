import { NextResponse, type NextRequest } from "next/server";

const HOLDING_PATH = "/in-aggiornamento";

/** Solo questi host vedono la pagina di attesa. Gli altri (localhost, *.vercel.app) vedono il sito. */
const MAINTENANCE_HOSTS = new Set(["francescanadialupo.it", "www.francescanadialupo.it"]);

/**
 * Pagina di attesa sul dominio pubblico.
 * Per pubblicare il sito sul dominio: imposta MAINTENANCE_MODE=false e rifai il deploy,
 * oppure elimina questo file e `app/in-aggiornamento/`.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isMaintenanceHost(request)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = HOLDING_PATH;
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Retry-After", "86400");
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url, 307);
}

function isMaintenanceHost(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "false") return false;
  const host = requestHost(request);
  return MAINTENANCE_HOSTS.has(host);
}

function requestHost(request: NextRequest) {
  return (request.headers.get("host") ?? "").split(":")[0].trim().toLowerCase();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
