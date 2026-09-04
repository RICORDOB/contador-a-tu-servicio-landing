import type { CSSProperties } from "react";
import { ArrowRight, CheckCircle2, MapPin, Sparkles, Bot, ShieldCheck } from "lucide-react";
import { SITE } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";
import AnimatedDashboard from "@/components/ui/AnimatedDashboard";
import SectionLink from "@/components/layout/SectionLink";

const highlights = [
  "Atención personalizada en Turbo y virtual en todo Colombia",
  "Cumplimiento DIAN y obligaciones municipales al día",
  "Automatización de procesos contables para tu tranquilidad",
  "Asistencia con IA para consultas tributarias rápidas",
];

const particles = [
  { className: "left-[8%] top-[22%] h-1.5 w-1.5 bg-emerald/70", "--p-dur": "11s", "--p-delay": "0s", "--p-x": "22px", "--p-opacity": "0.7" },
  { className: "left-[18%] top-[64%] h-2 w-2 bg-gold/60", "--p-dur": "14s", "--p-delay": "2s", "--p-x": "-18px", "--p-opacity": "0.6" },
  { className: "left-[34%] top-[12%] h-1 w-1 bg-emerald-light/80", "--p-dur": "9s", "--p-delay": "4s", "--p-x": "16px", "--p-opacity": "0.8" },
  { className: "left-[46%] top-[76%] h-1.5 w-1.5 bg-gold-light/70", "--p-dur": "13s", "--p-delay": "1s", "--p-x": "-24px", "--p-opacity": "0.55" },
  { className: "left-[62%] top-[30%] h-1 w-1 bg-emerald/60", "--p-dur": "10s", "--p-delay": "6s", "--p-x": "20px", "--p-opacity": "0.65" },
  { className: "left-[78%] top-[14%] h-2 w-2 bg-gold/50", "--p-dur": "15s", "--p-delay": "3s", "--p-x": "-14px", "--p-opacity": "0.5" },
  { className: "left-[88%] top-[58%] h-1.5 w-1.5 bg-emerald/70", "--p-dur": "12s", "--p-delay": "5s", "--p-x": "18px", "--p-opacity": "0.6" },
  { className: "left-[52%] top-[88%] h-1 w-1 bg-gold-light/70", "--p-dur": "16s", "--p-delay": "7s", "--p-x": "14px", "--p-opacity": "0.5" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-16 top-16 h-80 w-80 rounded-full bg-emerald/20 blur-3xl" />
        <div className="animate-float-delayed absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-navy-light/30 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:34px_34px]" />
        {particles.map((p, i) => (
          <span
            key={i}
            className={`particle rounded-full ${p.className}`}
            style={
              {
                "--p-dur": p["--p-dur"],
                "--p-delay": p["--p-delay"],
                "--p-x": p["--p-x"],
                "--p-opacity": p["--p-opacity"],
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="chip-dark">
                <MapPin size={13} />
                {SITE.location.label}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl text-balance text-glow-emerald">
                Tu contador de confianza{" "}
                <span className="text-gradient-gold">en Turbo</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                {SITE.description}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-7 space-y-2.5">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-light transition-transform duration-300 group-hover:scale-125"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <SectionLink section="contacto" className="btn-primary px-7 py-3.5 text-sm">
                  Solicitar asesoría
                  <ArrowRight size={16} />
                </SectionLink>
                <SectionLink section="herramientas" className="btn-navy px-7 py-3.5 text-sm">
                  Ver herramientas DIAN
                </SectionLink>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-light" />
                  Información confidencial
                </span>
                <span className="flex items-center gap-1.5">
                  <Bot size={14} className="text-gold-light" />
                  Asistente con IA 24/7
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </span>
                  Respuesta rápida
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative">
              <AnimatedDashboard />

              <div className="animate-float-delayed absolute -bottom-5 -right-3 hidden rounded-2xl border border-gold/30 gradient-gold px-4 py-2 text-xs font-semibold text-navy shadow-lg shadow-gold/20 sm:block md:right-8">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} />
                  + Empresas y personas naturales
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}