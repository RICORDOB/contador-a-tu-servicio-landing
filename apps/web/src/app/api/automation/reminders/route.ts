import { NextResponse } from "next/server";
import { obtenerVencimientoRenta, diasRestantes } from "@contador/shared";

const CRON_SECRET = process.env.CRON_SECRET ?? "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reminders: Array<{ type: string; message: string; client: string }> = [];

  const allClients = [
    { name: "Cliente Demo", nitLast2: "12", email: "demo@example.com" },
  ];

  for (const client of allClients) {
    const vencimiento = obtenerVencimientoRenta(client.nitLast2);
    if (vencimiento) {
      const days = diasRestantes(vencimiento.fechaLimite);
      if (days <= 30 && days >= 0) {
        reminders.push({
          type: "renta_vencimiento",
          message: `Recordatorio: tu declaración de renta vence en ${days} días (fecha límite: ${vencimiento.fechaLimite}).`,
          client: client.name,
        });
      }
    }
  }

  return NextResponse.json({
    reminders,
    total: reminders.length,
    timestamp: new Date().toISOString(),
  });
}