import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isAllowedOrigin } from "@/lib/security";

const ADK_BACKEND_URL = process.env.ADK_BACKEND_URL;
const ADK_API_KEY = process.env.ADK_API_KEY;
const ADK_APP_INTERNAL = process.env.ADK_APP_INTERNAL || "anita_interna";

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }

    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { message, sessionId } = body as { message?: string; sessionId?: string };

    if (!message) {
      return NextResponse.json(
        { error: "El mensaje es requerido" },
        { status: 400 }
      );
    }

    if (!ADK_BACKEND_URL) {
      return NextResponse.json(
        { error: "Backend de agentes no configurado" },
        { status: 503 }
      );
    }

    const res = await fetch(`${ADK_BACKEND_URL}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ADK_API_KEY ? { "X-ADK-API-KEY": ADK_API_KEY } : {}),
      },
      body: JSON.stringify({
        app_name: ADK_APP_INTERNAL,
        message,
        session_id: sessionId,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[admin-chat] ADK error", res.status, detail);
      return NextResponse.json(
        { error: "El agente no respondió. Intenta de nuevo." },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      text: data.text || "No respondió.",
      sessionId: data.session_id,
    });
  } catch {
    return NextResponse.json(
      { error: "Error de conexión con el asistente" },
      { status: 500 }
    );
  }
}
