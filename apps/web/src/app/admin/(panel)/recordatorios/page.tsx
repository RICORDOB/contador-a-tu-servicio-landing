"use client";

import { useEffect, useState } from "react";
import { BellRing, CalendarClock } from "lucide-react";

interface Reminder {
  type: string;
  message: string;
  client: string;
  nitLast2: string;
  days: number;
  fechaLimite: string;
}

export default function AdminReminders() {
  const [rows, setRows] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reminders")
      .then((r) => r.json())
      .then((d) => {
        setRows(d.reminders ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-navy">Recordatorios de vencimiento</h1>
      <p className="text-sm text-muted">
        Vista previa de los avisos que se enviarán por WhatsApp (fuente: datos de ejemplo).
      </p>

      <div className="card-modern mt-6 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-sm text-muted">Calculando vencimientos…</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted">
            <BellRing size={28} className="text-muted/50" />
            No hay vencimientos dentro de los próximos 30 días.
          </div>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">NIT</th>
                <th className="px-4 py-3">Vence</th>
                <th className="px-4 py-3">Días</th>
                <th className="px-4 py-3">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r, i) => (
                <tr key={`${r.client}-${i}`} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-medium text-navy">{r.client}</td>
                  <td className="px-4 py-3 text-slate-700">{r.nitLast2}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <CalendarClock size={13} className="text-muted" />
                      {r.fechaLimite}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-medium text-emerald">
                      {r.days} días
                    </span>
                  </td>
                  <td className="max-w-md px-4 py-3 text-xs text-slate-600">{r.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}