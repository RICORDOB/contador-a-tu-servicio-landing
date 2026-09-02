import { NextResponse } from "next/server";
import { requireRole } from "@/lib/admin-auth";
import { listAppointments, updateAppointmentStatus, APPOINTMENT_STATUSES } from "@/lib/storage";
import { isAllowedOrigin } from "@/lib/security";

export async function GET() {
  if (!(await requireRole("contadora"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const appointments = await listAppointments();
    return NextResponse.json({ appointments, total: appointments.length });
  } catch {
    return NextResponse.json(
      { error: "Error al leer las citas" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  if (!(await requireRole("contadora"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body as { id?: string; status?: string };

    if (!id || !status || !APPOINTMENT_STATUSES.includes(status as never)) {
      return NextResponse.json(
        { error: "Datos de la cita inválidos" },
        { status: 400 }
      );
    }

    const updated = await updateAppointmentStatus(id, status as (typeof APPOINTMENT_STATUSES)[number]);
    if (!updated) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, appointment: updated });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la cita" },
      { status: 500 }
    );
  }
}