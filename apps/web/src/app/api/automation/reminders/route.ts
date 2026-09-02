import { NextResponse } from "next/server";
import { obtenerVencimientoRenta, diasRestantes } from "@contador/shared";
import { notifyReminderSummary } from "@/lib/whatsapp";
import { safeEqual } from "@/lib/security";

const CRON_SECRET = process.env.CRON_SECRET ?? "";

function isAuthorized(request: Request): boolean {
  if (!CRON_SECRET) return false;

  // Vercel Cron envía el secreto en el header Authorization: Bearer <CRON_SECRET>.
  const auth = request.headers.get("authorization");
  if (auth) {
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (safeEqual(token, CRON_SECRET)) return true;
  }

  // Backward compat: ?secret=<CRON_SECRET>
  const querySecret = new URL(request.url).searchParams.get("secret");
  if (querySecret && safeEqual(querySecret, CRON_SECRET)) return true;

  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reminders: Array<{ type: string; message: string; client: string }> = [];

  // Fuente de clientes: aquí se listan los deudores con sus 2 últimos dígitos
  // de NIT. En producción se carga desde la tabla de clientes.
  const allClients = [
    { name: "Cliente Demo", nitLast2: "12", email: "demo@example.com" },
  ];

  let whatsappSent = 0;
  const whatsappResults: Array<{ client: string; sent: boolean; reason?: string }> = [];

  for (const client of allClients) {
    const vencimiento = obtenerVencimientoRenta(client.nitLast2);
    if (!vencimiento) continue;

    const days = diasRestantes(vencimiento.fechaLimite);
    if (days <= 30 && days >= 0) {
      const message = `Recordatorio: tu declaración de renta vence en ${days} días (fecha límite: ${vencimiento.fechaLimite}).`;

      reminders.push({ type: "renta_vencimiento", message, client: client.name });

      const result = await notifyReminderSummary({
        client: client.name,
        days,
        fechaLimite: vencimiento.fechaLimite,
      });
      whatsappResults.push({ client: client.name, sent: result.sent, reason: result.reason });
      if (result.sent) whatsappSent += 1;
    }
  }

  return NextResponse.json({
    reminders,
    total: reminders.length,
    whatsappSent,
    whatsappResults,
    timestamp: new Date().toISOString(),
  });
}