import { NextResponse, type NextRequest } from "next/server";
import { verifyTokenRole, getCookieName, type PanelRole } from "@/lib/admin-auth";

const LOGIN_PATHS: Record<PanelRole, string> = {
  developer: "/admin/login",
  contadora: "/contadora/login",
};

const ROLE_BY_PREFIX: Array<[prefix: string, role: PanelRole]> = [
  ["/admin", "developer"],
  ["/contadora", "contadora"],
];

/**
 * Next.js 16: middleware.ts → proxy.ts.
 * Protege cada panel verificando que el rol del token coincida con la ruta.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname === "/contadora/login") {
    return NextResponse.next();
  }

  const match = ROLE_BY_PREFIX.find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  if (!match) return NextResponse.next();

  const [prefix, role] = match;

  const token = req.cookies.get(getCookieName())?.value;
  const tokenRole = token ? await verifyTokenRole(token) : null;

  if (tokenRole === role) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = LOGIN_PATHS[role];
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/contadora/:path*"],
};