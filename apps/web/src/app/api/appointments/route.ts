import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, guestPhone, serviceType, scheduledAt } = body as {
      guestName: string;
      guestPhone: string;
      serviceType: string;
      scheduledAt: string;
    };

    if (!guestName || !guestPhone) {
      return NextResponse.json(
        { error: "Nombre y teléfono son requeridos" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Cita registrada correctamente",
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la cita" },
      { status: 500 }
    );
  }
}