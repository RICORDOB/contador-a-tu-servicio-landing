"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone, Sparkles } from "lucide-react";

interface Appointment {
  id: string;
  guestName: string;
  guestPhone: string;
  serviceType: string;
  scheduledAt: string;
  status: string;
  createdAt: string;
}

const STATUS_STYLE: Record<string, string> = {
  pendiente: "bg-gold/10 text-gold border-gold/30",
  confirmada: "bg-emerald/10 text-emerald border-emerald/20",
  atendida: "bg-navy/5 text-navy border-navy/10",
  cancelada: "bg-red/10 text-red-600 border-red/20",
};

export default function AdminAppointments() {
  const [rows, setRows] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/appointments")
      .then((r) => r.json())
      .then((d) => {
        setRows(d.appointments ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-navy">Citas registradas</h1>
      <p className="text-sm text-muted">Todas las solicitudes de cita captadas por el asistente.</p>

      <div className="card-modern mt-6 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-sm text-muted">Cargando citas…</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted">
            <CalendarDays size={28} className="text-muted/50" />
            Aún no hay citas registradas.
          </div>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Servicio</th>
                <th className="px-4 py-3">Agendada para</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-medium text-navy">{a.guestName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <Phone size={13} className="text-muted" />
                      {a.guestPhone}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{a.serviceType || "—"}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {a.scheduledAt
                      ? new Date(a.scheduledAt).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[a.status] ?? STATUS_STYLE.pendiente}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}