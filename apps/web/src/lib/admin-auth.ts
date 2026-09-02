import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type PanelRole = "developer" | "contadora";

const SECRET = process.env.ADMIN_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "cn_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 12;

export function getSecretKey() {
  return new TextEncoder().encode(SECRET);
}

export function getCookieName() {
  return COOKIE_NAME;
}

/** Firma un token JWT con el rol del panel. */
export function signToken(role: PanelRole) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

/** Valida un token (puro; utilizable desde proxy y rutas). Devuelve el rol o null. */
export async function verifyTokenRole(token: string): Promise<PanelRole | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role === "developer" || payload.role === "contadora") {
      return payload.role as PanelRole;
    }
    return null;
  } catch {
    return null;
  }
}

/** Rol de la sesión actual (server components / route handlers). */
export async function getSessionRole(): Promise<PanelRole | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyTokenRole(token);
}

/** Comprueba que la sesión tenga exactamente el rol indicado. */
export async function requireRole(role: PanelRole): Promise<boolean> {
  return (await getSessionRole()) === role;
}

export { TOKEN_TTL_SECONDS };