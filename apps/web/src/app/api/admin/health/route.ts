import { NextResponse } from "next/server";
import { requireRole } from "@/lib/admin-auth";
import { healthCheck } from "@/lib/db";

const ADK_BACKEND_URL = process.env.ADK_BACKEND_URL;
const TIMEOUT_MS = 3000;

async function checkAgents(): Promise<{ ok: boolean; detail: string }> {
  if (!ADK_BACKEND_URL) {
    return { ok: false, detail: "ADK_BACKEND_URL no configurada" };
  }
  try {
    const res = await fetch(`${ADK_BACKEND_URL.replace(/\/$/, "")}/health`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return { ok: true, detail: "Backend de agentes responde" };
    return { ok: false, detail: `HTTP ${res.status}` };
  } catch {
    return { ok: false, detail: "No se pudo contactar el backend de agentes" };
  }
}

export async function GET() {
  if (!(await requireRole("developer"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const [db, agents] = await Promise.all([healthCheck(), checkAgents()]);
  const agentsConfigured = Boolean(ADK_BACKEND_URL);
  const status = db.ok && (!agentsConfigured || agents.ok) ? "ok" : "degraded";

  return NextResponse.json({
    status,
    timestamp: new Date().toISOString(),
    db,
    agents,
    config: {
      databaseUrl: Boolean(process.env.DATABASE_URL),
      adkBackend: agentsConfigured,
      adminUser: Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASS),
      contadoraUser: Boolean(
        process.env.CONTADORA_USER && process.env.CONTADORA_PASS
      ),
      whatsapp: Boolean(
        process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID
      ),
      cronSecret: Boolean(process.env.CRON_SECRET),
    },
  });
}