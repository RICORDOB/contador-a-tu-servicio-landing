"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone, MessageCircle, RefreshCw } from "lucide-react";

const APPOINTMENT_STATUSES = ["pendiente", "confirmada", "atendida", "cancelada"];

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

function waLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("57") ? digits : `57${digits}`;
  const text = encodeURIComponent("Hola, te escribimos de Contador a tu Servicio para confirmar tu cita.");
  return `https://wa.me/${normalized}?text=${text}`;
}

export default function ContadoraAppointments() {
  const [rows, setRows] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/contadora/appointments");
    const d = await res.json();
    setRows(d.appointments ?? []);
    setLoading(false);
  }

  useEffect(() => {
    let mounted = true;
    fetch("/api/contadora/appointments")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setRows(d.appointments ?? []);
        setLoading(false);
      })
      .catch(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  async function changeStatus(id: string, status: string) {
    setUpdating(id);
    try {
      await fetch("/api/contadora/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      await load();
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Citas agendadas</h1>
          <p className="text-sm text-muted">Confirmá, atendé o cancelá las citas de tus clientes.</p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm text-navy transition hover:border-emerald/30"
        >
          <RefreshCw size={15} />
          Actualizar
        </button>
      </div>

      <div className="card-modern mt-6 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-sm text-muted">Cargando citas…</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted">
            <CalendarDays size={28} className="text-muted/50" />
            Aún no hay citas agendadas.
          </div>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Servicio</th>
                <th className="px-4 py-3">Agendada para</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{a.guestName}</p>
                    <p className="text-xs text-muted">{a.guestPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{a.serviceType || "—"}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {a.scheduledAt
                      ? new Date(a.scheduledAt).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      disabled={updating === a.id}
                      onChange={(e) => changeStatus(a.id, e.target.value)}
                      className="rounded-lg border border-border bg-white px-2 py-1 text-xs font-medium outline-none focus:border-emerald"
                      aria-label={`Estado de la cita de ${a.guestName}`}
                    >
                      {APPOINTMENT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={waLink(a.guestPhone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-light"
                      >
                        <MessageCircle size={13} />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${a.guestPhone.replace(/\D/g, "")}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-navy transition hover:border-emerald/30"
                      >
                        <Phone size={13} />
                        Llamar
                      </a>
                    </div>
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