import { NextResponse } from "next/server";
import { requireRole } from "@/lib/admin-auth";
import { listAppointments } from "@/lib/storage";

export async function GET() {
  if (!(await requireRole("developer"))) {
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