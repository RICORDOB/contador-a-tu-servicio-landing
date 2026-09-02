import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { SITE } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";

const highlights = [
  "Atención personalizada en Turbo y virtual en todo Colombia",
  "Cumplimiento DIAN y obligaciones municipales al día",
  "Automatización de procesos contables para tu tranquilidad",
  "Asistencia con IA para consultas tributarias rápidas",
];

export default function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-16 top-16 h-72 w-72 rounded-full bg-emerald/15 blur-3xl" />
        <div className="animate-float-delayed absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(12,31,63,0.05)_1px,transparent_0)] [background-size:34px_34px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="chip">
                <MapPin size={13} />
                {SITE.location.label}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] text-navy sm:text-5xl lg:text-6xl">
                Tu contador de confianza{" "}
                <span className="text-gradient">en Turbo</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                {SITE.description}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-7 space-y-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contacto" className="btn-primary px-7 py-3.5 text-sm">
                  Solicitar asesoría
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#herramientas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white/70 px-7 py-3.5 text-sm font-semibold text-navy backdrop-blur transition hover:border-emerald/40 hover:text-emerald hover:shadow-lg hover:shadow-emerald/5"
                >
                  Ver herramientas DIAN
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative">
              <div className="card-hover glass rounded-3xl p-7 shadow-2xl shadow-navy/10 sm:p-9">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Sparkles size={14} />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    Nuevo
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="icon-tile h-12 w-12">
                    <Sparkles size={24} />
                  </span>
                  <h2 className="font-display text-2xl font-bold text-navy">
                    Automatización inteligente
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Alertas automáticas, gestión documental, flujo de citas y
                  recordatorios de facturas — todo integrado en una sola
                  plataforma.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="chip">Alertas automáticas</span>
                  <span className="chip">Gestión documental</span>
                  <span className="chip">Flujo de citas</span>
                  <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-navy">
                    Próximamente: IA
                  </span>
                </div>
                <Link
                  href="#automatizacion"
                  className="btn-primary mt-7 w-full px-4 py-3.5 text-sm"
                >
                  Explorar automatizaciones
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="animate-float-delayed absolute -bottom-5 -right-3 hidden rounded-2xl border border-gold/30 gradient-gold px-4 py-2 text-xs font-semibold text-navy shadow-lg shadow-gold/10 sm:block md:right-8">
                + Empresas y personas naturales
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}