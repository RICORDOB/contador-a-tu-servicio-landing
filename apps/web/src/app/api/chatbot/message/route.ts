import { NextResponse } from "next/server";

const ADK_BACKEND_URL = process.env.ADK_BACKEND_URL;
const ADK_API_KEY = process.env.ADK_API_KEY;
const ADK_APP_PUBLIC = process.env.ADK_APP_PUBLIC || "anita_contadora";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, sessionId } = body as {
      messages: Array<{ role: string; text: string }>;
      sessionId?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { text: "No entendí tu mensaje. Por favor escribe de nuevo." },
        { status: 400 }
      );
    }

    if (!ADK_BACKEND_URL) {
      return NextResponse.json(
        {
          text: "El asistente está en mantenimiento. Escríbenos a contacto@contadoratuservicio.com",
        },
        { status: 503 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.text || "";

    const res = await fetch(`${ADK_BACKEND_URL}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ADK_API_KEY ? { "X-ADK-API-KEY": ADK_API_KEY } : {}),
      },
      body: JSON.stringify({
        app_name: ADK_APP_PUBLIC,
        message: lastMessage,
        session_id: sessionId,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[chatbot] ADK error", res.status, detail);
      return NextResponse.json(
        { text: "Hubo un problema con el asistente. Intenta de nuevo." },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      text: data.text || "No entendí. ¿Puedes repetirlo?",
      sessionId: data.session_id,
    });
  } catch {
    return NextResponse.json(
      { text: "Error de conexión. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
