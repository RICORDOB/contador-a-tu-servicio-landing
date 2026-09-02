import { NextResponse } from "next/server";
import {
  signToken,
  getCookieName,
  type PanelRole,
  TOKEN_TTL_SECONDS,
} from "@/lib/admin-auth";
import { consumeRateLimit, getClientIp } from "@/lib/rate-limit";
import { safeEqual, isAllowedOrigin, isDefaultAdminSecret } from "@/lib/security";

const CREDS: Record<PanelRole, { user?: string; pass?: string }> = {
  developer: { user: process.env.ADMIN_USER, pass: process.env.ADMIN_PASS },
  contadora: { user: process.env.CONTADORA_USER, pass: process.env.CONTADORA_PASS },
};

const ROLE_LABEL: Record<PanelRole, string> = {
  developer: "desarrollador",
  contadora: "contadora",
};

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
    const { role, username, password } = body as {
      role?: string;
      username?: string;
      password?: string;
    };

    if (role !== "developer" && role !== "contadora") {
      return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
    }

    const rateKey = `${getClientIp(request)}|${role}|${username ?? ""}`;
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

    const { user: expectedUser, pass: expectedPass } = CREDS[role as PanelRole];

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { error: `Credenciales de ${ROLE_LABEL[role as PanelRole]} no configuradas` },
        { status: 500 }
      );
    }

    const valid =
      safeEqual(username ?? "", expectedUser) &&
      safeEqual(password ?? "", expectedPass);

    if (!valid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const token = await signToken(role as PanelRole);
    const res = NextResponse.json({ ok: true, role });

    res.cookies.set(getCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_TTL_SECONDS,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}