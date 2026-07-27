import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { SITE } from "@contador/shared";

const highlights = [
  "Atención personalizada en Turbo y virtual en todo Colombia",
  "Cumplimiento DIAN y obligaciones municipales al día",
  "Automatización de procesos contables para tu tranquilidad",
  "Asistencia con IA para consultas tributarias rápidas",
];

export default function HeroSection() {
  return (
    <section className="gradient-hero border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-emerald/5 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full bg-gold/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-1 text-xs font-medium text-emerald">
              <MapPin size={14} />
              {SITE.location.label}
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Tu contador de confianza{" "}
              <span className="text-emerald">en Turbo</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {SITE.description}
            </p>

            <ul className="mt-6 space-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-light"
              >
                Solicitar asesoría
                <ArrowRight size={16} />
              </a>
              <a
                href="#herramientas"
                className="inline-flex items-center justify-center rounded-xl border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-emerald/30 hover:text-emerald"
              >
                Ver herramientas DIAN
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-gold" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Nuevo
                </p>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={24} className="text-emerald" />
                <h2 className="text-2xl font-bold text-navy">
                  Automatización inteligente
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Alertas automáticas, gestión documental, flujo de citas y
                recordatorios de facturas — todo integrado en una sola plataforma.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-medium text-emerald">
                  Alertas automáticas
                </span>
                <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-medium text-emerald">
                  Gestión documental
                </span>
                <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-medium text-emerald">
                  Flujo de citas
                </span>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-navy">
                  Próximamente: IA
                </span>
              </div>
              <Link
                href="#automatizacion"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
              >
                Explorar automatizaciones
              </Link>
            </div>

            <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-medium text-navy sm:block">
              + Empresas y personas naturales
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}