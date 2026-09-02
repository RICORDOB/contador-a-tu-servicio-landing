import { NextResponse } from "next/server";
import { requireRole } from "@/lib/admin-auth";
import { listInvitations } from "@/lib/storage";

export async function GET() {
  if (!(await requireRole("contadora"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const invitations = await listInvitations();
    return NextResponse.json({ invitations, total: invitations.length });
  } catch {
    return NextResponse.json(
      { error: "Error al leer los clientes" },
      { status: 500 }
    );
  }
}