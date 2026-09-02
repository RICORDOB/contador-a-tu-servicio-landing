import { timingSafeEqual } from "node:crypto";

/**
 * Comparación de cadenas a prueba de timing attacks.
 * Se usa para comparar credenciales sin filtrar información por tiempo.
 */
export function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(String(a));
  const bBuf = Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function normalizeOrigin(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Valida que una petición venga de un origen permitido (defensa CSRF).
 * - Sin header Origin (curl, server-to-server) se considera permitido.
 * - Se acepta el origen propio (NEXT_PUBLIC_APP_URL) y los extra en
 *   ADMIN_ALLOWED_ORIGINS (separados por comas) por si el panel se sirve
 *   desde otro dominio en el futuro.
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowed = [
    process.env.NEXT_PUBLIC_APP_URL,
    ...(process.env.ADMIN_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((o) => o.trim()),
  ]
    .filter((v): v is string => Boolean(v))
    .map(normalizeOrigin);

  return allowed.includes(normalizeOrigin(origin));
}

/** Devuelve `true` si ADMIN_SECRET sigue siendo el valor por defecto de desarrollo. */
export function isDefaultAdminSecret(): boolean {
  return process.env.ADMIN_SECRET === undefined || process.env.ADMIN_SECRET === "";
}