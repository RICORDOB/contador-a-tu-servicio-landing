import { NextResponse } from "next/server";
import { appendAppointment } from "@/lib/storage";
import { notifyNewAppointment } from "@/lib/whatsapp";

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

    const record = await appendAppointment({
      guestName,
      guestPhone,
      serviceType: serviceType ?? "",
      scheduledAt: scheduledAt ?? "",
    });

    // Notificación a la contadora. Nunca lanza: no afecta el registro de la cita.
    await notifyNewAppointment(record);

    return NextResponse.json({
      ok: true,
      message: "Cita registrada correctamente",
      id: record.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la cita" },
      { status: 500 }
    );
  }
}
