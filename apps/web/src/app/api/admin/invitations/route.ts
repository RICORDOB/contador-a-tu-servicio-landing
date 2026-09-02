import { NextResponse } from "next/server";
import { requireRole } from "@/lib/admin-auth";
import { listInvitations } from "@/lib/storage";

export async function GET() {
  if (!(await requireRole("developer"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const invitations = await listInvitations();
    return NextResponse.json({ invitations, total: invitations.length });
  } catch {
    return NextResponse.json(
      { error: "Error al leer las invitaciones" },
      { status: 500 }
    );
  }
}