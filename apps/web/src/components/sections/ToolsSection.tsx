import Link from "next/link";
import { ArrowRight, CalendarDays, Scale } from "lucide-react";
import { TOOLS } from "@contador/shared";

const toolIcons = {
  "simulador-sanciones": Scale,
  "calendario-dian": CalendarDays,
};

export default function ToolsSection() {
  return (
    <section id="herramientas" className="border-y border-border bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
            Herramientas gratuitas
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            Calculadoras tributarias DIAN
          </h2>
          <p className="mt-4 text-slate-600">
            Recursos interactivos para estimar sanciones y consultar fechas de
            vencimiento. Disponibles para todos los visitantes, sin registro.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TOOLS.map((tool) => {
            const Icon = toolIcons[tool.id as keyof typeof toolIcons];
            return (
              <article
                key={tool.id}
                className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 hover-lift"
              >
                <span className="absolute right-4 top-4 rounded-full bg-emerald/15 px-2.5 py-0.5 text-xs font-medium text-emerald">
                  Disponible
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-navy">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald hover:text-emerald-light"
                >
                  {tool.status === "live" ? "Usar herramienta" : "Ver detalle"}
                  <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}