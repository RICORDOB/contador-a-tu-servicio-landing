import { obtenerVencimientoRenta, diasRestantes } from "@contador/shared";

export interface Reminder {
  type: string;
  message: string;
  client: string;
  nitLast2: string;
  days: number;
  fechaLimite: string;
}

const DEFAULT_CLIENTS = [
  { name: "Cliente Demo", nitLast2: "12", email: "demo@example.com" },
];

/**
 * Calcula los recordatorios de vencimiento de renta para una lista de clientes
 * (dentro de los próximos 30 días). La fuente real de clientes aún es una
 * lista de ejemplo; al existir la tabla de clientes se reemplaza aquí.
 */
export function buildRemindersFromClients(
  clients: Array<{ name: string; nitLast2: string }>
): Reminder[] {
  const reminders: Reminder[] = [];
  for (const client of clients) {
    const vencimiento = obtenerVencimientoRenta(client.nitLast2);
    if (!vencimiento) continue;
    const days = diasRestantes(vencimiento.fechaLimite);
    if (days <= 30 && days >= 0) {
      reminders.push({
        type: "renta_vencimiento",
        message: `Recordatorio: tu declaración de renta vence en ${days} días (fecha límite: ${vencimiento.fechaLimite}).`,
        client: client.name,
        nitLast2: client.nitLast2,
        days,
        fechaLimite: vencimiento.fechaLimite,
      });
    }
  }
  return reminders;
}

/** Recordatorios con los datos de ejemplo actuales. */
export function buildDemoReminders(): Reminder[] {
  return buildRemindersFromClients(DEFAULT_CLIENTS);
}