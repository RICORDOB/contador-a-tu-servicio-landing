import { NextResponse } from "next/server";
import { signAdminToken, getAdminCookieName } from "@/lib/admin-auth";
import { consumeRateLimit, getClientIp } from "@/lib/rate-limit";
import { safeEqual, isAllowedOrigin, isDefaultAdminSecret } from "@/lib/security";

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }

    if (process.env.NODE_ENV === "production" && isDefaultAdminSecret()) {
      return NextResponse.json(
        { error: "ADMIN_SECRET no configurado" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };

    const rateKey = `${getClientIp(request)}|${username ?? ""}`;
    const rate = await consumeRateLimit(rateKey);

    if (rate.limited) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta más tarde." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const expectedUser = process.env.ADMIN_USER;
    const expectedPass = process.env.ADMIN_PASS;

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { error: "Credenciales de administrador no configuradas" },
        { status: 500 }
      );
    }

    // Comparación a prueba de timing attacks.
    const valid =
      safeEqual(username ?? "", expectedUser) &&
      safeEqual(password ?? "", expectedPass);

    if (!valid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const token = await signAdminToken();
    const res = NextResponse.json({ ok: true });

    res.cookies.set(getAdminCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 12,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}