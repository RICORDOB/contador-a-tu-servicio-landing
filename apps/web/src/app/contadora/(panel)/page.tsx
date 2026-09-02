"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, BellRing, Clock3 } from "lucide-react";

interface DashboardData {
  appointments: number;
  pending: number;
  invitations: number;
  reminders: number;
}

export default function ContadoraDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [apt, inv, rem] = await Promise.all([
        fetch("/api/contadora/appointments").then((r) => r.json()),
        fetch("/api/contadora/invitations").then((r) => r.json()),
        fetch("/api/contadora/reminders").then((r) => r.json()),
      ]);
      if (!mounted) return;
      const appointments = apt.appointments ?? [];
      setData({
        appointments: appointments.length,
        pending: appointments.filter((a: { status: string }) => a.status === "pendiente").length,
        invitations: inv.total ?? 0,
        reminders: rem.total ?? 0,
      });
    }
    load().catch(() => mounted && setData({ appointments: 0, pending: 0, invitations: 0, reminders: 0 }));
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted">
        Cargando resumen…
      </div>
    );
  }

  const cards = [
    { label: "Citas totales", value: data.appointments, icon: CalendarDays, href: "/contadora/citas" },
    { label: "Pendientes por atender", value: data.pending, icon: Clock3, href: "/contadora/citas" },
    { label: "Clientes (invitaciones)", value: data.invitations, icon: Users, href: "/contadora/clientes" },
    { label: "Recordatorios activos", value: data.reminders, icon: BellRing, href: "/contadora/recordatorios" },
  ];

  return (
    <div className="p-6 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Hola, Ana María 👋</h1>
        <p className="text-sm text-muted">Resumen operativo de la firma hoy.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => router.push(c.href)}
              className="card-modern p-5 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <Icon size={20} />
              </div>
              <p className="mt-4 text-2xl font-bold text-navy">{String(c.value)}</p>
              <p className="text-xs text-muted">{c.label}</p>
            </button>
          );
        })}
      </div>

      <div className="card-modern mt-8 p-6">
        <h2 className="font-semibold text-navy">Bienvenida a tu panel</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Desde aquí puedes revisar las citas que agendan tus clientes, contactarlos por WhatsApp,
          ver las invitaciones al portal y anticiparte a los vencimientos tributarios. Usa el chat
          interno para pedirle a Anita el soporte técnico que necesites.
        </p>
      </div>
    </div>
  );
}