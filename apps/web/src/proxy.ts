import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.ADMIN_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "admin_token";

async function isAuthed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Next.js 16 renombró middleware.ts → proxy.ts.
 * Protege la ruta /admin redirigiendo al login si no hay sesión válida.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (await isAuthed(req)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
  // proxy no permite configurar runtime edge; usa nodejs por defecto.
};