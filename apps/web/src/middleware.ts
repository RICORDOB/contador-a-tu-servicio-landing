import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublic = pathname === "/" || pathname.startsWith("/tools/");
  const isAuth = pathname === "/login" || pathname === "/registro";

  if (isPublic || isAuth) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/chatbot).*)",
  ],
};