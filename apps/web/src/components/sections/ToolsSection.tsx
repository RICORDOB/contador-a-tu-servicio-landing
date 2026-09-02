import Link from "next/link";
import { ArrowRight, CalendarDays, Scale } from "lucide-react";
import { TOOLS } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";

const toolIcons = {
  "simulador-sanciones": Scale,
  "calendario-dian": CalendarDays,
};

export default function ToolsSection() {
  return (
    <section id="herramientas" className="border-y border-border bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">Herramientas gratuitas</p>
          <h2 className="section-title font-display">
            Calculadoras tributarias DIAN
          </h2>
          <p className="section-sub">
            Recursos interactivos para estimar sanciones y consultar fechas de
            vencimiento. Disponibles para todos los visitantes, sin registro.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TOOLS.map((tool, i) => {
            const Icon = toolIcons[tool.id as keyof typeof toolIcons];
            return (
              <Reveal key={tool.id} delay={i * 120}>
                <article className="card-modern card-hover group relative overflow-hidden p-7">
                  <span className="absolute right-5 top-5 chip">Disponible</span>
                  <span className="icon-tile h-13 w-13" style={{ height: "3.25rem", width: "3.25rem" }}>
                    <Icon size={24} />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold text-navy">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald transition hover:gap-2.5 hover:text-emerald-light"
                  >
                    {tool.status === "live" ? "Usar herramienta" : "Ver detalle"}
                    <ArrowRight size={15} />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}