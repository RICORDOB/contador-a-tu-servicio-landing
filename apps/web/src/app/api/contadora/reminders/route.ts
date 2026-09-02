import { NextResponse } from "next/server";
import { requireRole } from "@/lib/admin-auth";
import { buildDemoReminders } from "@/lib/reminders";

export async function GET() {
  if (!(await requireRole("contadora"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const reminders = buildDemoReminders();
  return NextResponse.json({ reminders, total: reminders.length });
}