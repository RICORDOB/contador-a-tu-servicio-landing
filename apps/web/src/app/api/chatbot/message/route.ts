import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: Array<{ role: string; text: string }> };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { text: "No entendí tu mensaje. Por favor escribe de nuevo." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.text || "";
    const lower = lastMessage.toLowerCase();

    const faqs: Record<string, string> = {
      servicios:
        "Ofrecemos contabilidad integral, nómina, declaración de renta, asesoría DIAN, ICA y constitución de empresas.",
      horarios: "Nuestro horario es de lunes a viernes, 8:00 AM a 6:00 PM.",
      precios: "Los costos varían según el servicio y el volumen. Agenda una cita para recibir una cotización personalizada.",
      ubicación: "Estamos ubicados en Turbo, Antioquia, Colombia.",
      documentos: "Los clientes activos acceden a su portal para consultar RUT, Cámara de Comercio y declaraciones.",
      automatización: "Ofrecemos alertas de vencimiento, gestión documental inteligente, flujo de citas automatizado y recordatorios de facturas.",
      ia: "Estamos integrando asistentes de IA para consultas tributarias más rápidas y precisas.",
      agendar: "Para agendar una cita necesito tu nombre, teléfono y servicio preferido.",
    };

    let response = "Para saber más sobre nuestros servicios, visita la sección de Servicios. Para agendar una cita escribe *agendar* o envíanos un correo a contacto@contadoratuservicio.com.";

    for (const [keyword, answer] of Object.entries(faqs)) {
      if (lower.includes(keyword)) {
        response = answer;
        break;
      }
    }

    return NextResponse.json({ text: response });
  } catch {
    return NextResponse.json(
      { text: "Error de conexión. Intenta de nuevo." },
      { status: 500 }
    );
  }
}