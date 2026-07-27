import { Users, FileText, CalendarDays, Mail } from "lucide-react";

const stats = [
  { value: "50+", label: "Clientes activos", icon: Users },
  { value: "1000+", label: "Documentos gestionados", icon: FileText },
  { value: "300+", label: "Citas agendadas", icon: CalendarDays },
  { value: "98%", label: "Satisfacción del cliente", icon: Mail },
];

export default function StatsSection() {
  return (
    <section className="gradient-navy py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/20 text-emerald">
                  <Icon size={24} />
                </div>
                <p className="mt-4 text-4xl font-bold stat-number">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}