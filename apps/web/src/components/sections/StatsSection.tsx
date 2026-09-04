import type { CSSProperties } from "react";
import { Users, FileText, CalendarDays, Mail } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: 50, suffix: "+", label: "Clientes activos", icon: Users },
  { value: 1000, suffix: "+", label: "Documentos gestionados", icon: FileText },
  { value: 300, suffix: "+", label: "Citas agendadas", icon: CalendarDays },
  { value: 98, suffix: "%", label: "Satisfacción del cliente", icon: Mail },
];

const goldParticles = [
  { className: "left-[6%] top-[24%] bg-gold/70", dur: "12s", delay: "0s" },
  { className: "left-[16%] top-[70%] bg-emerald-light/70", dur: "14s", delay: "2s" },
  { className: "left-[30%] top-[14%] bg-gold-light/60", dur: "10s", delay: "4s" },
  { className: "left-[44%] top-[80%] bg-emerald/70", dur: "13s", delay: "1s" },
  { className: "left-[58%] top-[20%] bg-gold/60", dur: "15s", delay: "5s" },
  { className: "left-[70%] top-[72%] bg-gold-light/70", dur: "11s", delay: "3s" },
  { className: "left-[84%] top-[32%] bg-emerald/60", dur: "16s", delay: "6s" },
  { className: "left-[92%] top-[64%] bg-gold/50", dur: "13s", delay: "2s" },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80">
        <div className="animate-float absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        {goldParticles.map((p, i) => (
          <span
            key={i}
            className={`particle h-1.5 w-1.5 rounded-full ${p.className}`}
            style={
              {
                "--p-dur": p.dur,
                "--p-delay": p.delay,
                "--p-x": "18px",
                "--p-opacity": "0.7",
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="section-title-light font-display text-center text-white text-glow-emerald">
            Números que respaldan la confianza
          </h2>
          <p className="section-sub-light mx-auto mt-2 max-w-xl text-center">
            Resultados medibles de la firma contable en Turbo y Urabá.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 110}>
                <div className="card-hover stat-glow group rounded-2xl border border-white/12 bg-white/[0.05] p-7 text-center backdrop-blur-md transition-colors hover:border-gold/40">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-lg shadow-emerald/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Icon size={26} />
                  </span>
                  <p className="font-display mt-5 text-4xl font-bold text-white">
                    <CountUp end={stat.value} />
                    <span className="text-gradient-gold">{stat.suffix}</span>
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