"use client";

import { useEffect, useState } from "react";
import { Link2, CalendarDays, Users, BellRing, Activity, Database } from "lucide-react";
import { useRouter } from "next/navigation";

interface Health {
  status: string;
  db: { ok: boolean; detail: string };
  agents: { ok: boolean; detail: string };
  config: Record<string, boolean>;
}

interface StatData {
  appointments?: number;
  invitations?: number;
  reminders?: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [health, setHealth] = useState<Health | null>(null);
  const [stats, setStats] = useState<StatData>({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      const [h, a] = await Promise.all([
        fetch("/api/admin/health").then((r) => r.json()),
        fetch("/api/admin/appointments").then((r) => r.json()),
      ]);
      const invites = await fetch("/api/admin/invitations").then((r) => r.json());
      const rem = await fetch("/api/admin/reminders").then((r) => r.json());
      if (!mounted) return;
      setHealth(h);
      setStats({
        appointments: a.total ?? 0,
        invitations: invites.total ?? 0,
        reminders: rem.total ?? 0,
      });
    }
    load().catch(() => mounted && setHealth(null));
    return () => {
      mounted = false;
    };
  }, []);

  if (!health) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted">
        Cargando estado del sistema…
      </div>
    );
  }

  const statusBadge =
    health.status === "ok"
      ? { label: "APERATIVO", cls: "bg-emerald/10 text-emerald border-emerald/20" }
      : { label: "DEGRADADO", cls: "bg-gold/10 text-gold border-gold/30" };

  const cards = [
    { label: "Citas registradas", value: stats.appointments, icon: CalendarDays, href: "/admin/citas" },
    { label: "Invitaciones", value: stats.invitations, icon: Users, href: "/admin/invitaciones" },
    { label: "Recordatorios activos", value: stats.reminders, icon: BellRing, href: "/admin/recordatorios" },
    { label: "Estado del sistema", value: health.status, icon: Activity, href: "/admin" },
  ];

  const services: Array<{ key: string; label: string }> = [
    { key: "databaseUrl", label: "PostgreSQL (DATABASE_URL)" },
    { key: "adkBackend", label: "Backend de agentes (ADK)" },
    { key: "adminUser", label: "Credenciales developer" },
    { key: "contadoraUser", label: "Credenciales contadora" },
    { key: "whatsapp", label: "WhatsApp Cloud API" },
    { key: "cronSecret", label: "Cron (CRON_SECRET)" },
  ];

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard del sistema</h1>
          <p className="text-sm text-muted">Resumen técnico y de negocio en tiempo real.</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge.cls}`}>
          {statusBadge.label}
        </span>
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
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <Icon size={20} />
                </div>
                <Link2 size={16} className="text-muted" />
              </div>
              <p className="mt-4 text-2xl font-bold text-navy">{String(c.value)}</p>
              <p className="text-xs text-muted">{c.label}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="card-modern p-6">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-emerald" />
            <h2 className="font-semibold text-navy">Integraciones y configuración</h2>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {services.map((s) => (
              <li key={s.key} className="flex items-center justify-between py-3 text-sm">
                <span className="text-slate-700">{s.label}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    health.config[s.key]
                      ? "bg-emerald/10 text-emerald"
                      : "bg-red/10 text-red-600"
                  }`}
                >
                  {health.config[s.key] ? "OK" : "PENDIENTE"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-modern p-6">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-emerald" />
            <h2 className="font-semibold text-navy">Diagnóstico</h2>
          </div>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Base de datos</p>
              <p className={`mt-1 text-sm font-semibold ${health.db.ok ? "text-emerald" : "text-red-600"}`}>
                {health.db.ok ? "Conectada" : health.db.detail}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Backend de agentes</p>
              <p className={`mt-1 text-sm font-semibold ${health.agents.ok ? "text-emerald" : "text-red-600"}`}>
                {health.agents.ok ? health.agents.detail : health.agents.detail}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}