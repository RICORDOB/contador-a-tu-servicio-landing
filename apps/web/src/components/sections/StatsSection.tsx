import { Users, FileText, CalendarDays, Mail } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: 50, suffix: "+", label: "Clientes activos", icon: Users },
  { value: 1000, suffix: "+", label: "Documentos gestionados", icon: FileText },
  { value: 300, suffix: "+", label: "Citas agendadas", icon: CalendarDays },
  { value: 98, suffix: "%", label: "Satisfacción del cliente", icon: Mail },
];

export default function StatsSection() {
  return (
    <section className="gradient-navy relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <div className="animate-float absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="section-title font-display text-center text-white">
            Números que respaldan la confianza
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 110}>
                <div className="card-hover rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-md">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-lg shadow-emerald/25">
                    <Icon size={24} />
                  </span>
                  <p className="mt-5 text-4xl font-bold text-white">
                    <CountUp end={stat.value} />
                    <span className="text-emerald-light">{stat.suffix}</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}