import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/lib/admin-auth";
import { isAllowedOrigin } from "@/lib/security";

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAdminCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
  return res;
}
