import Link from "next/link";
import { ArrowRight, CalendarDays, Scale, Sparkles, Wrench } from "lucide-react";
import { TOOLS } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";
import AnimatedChart from "@/components/ui/AnimatedChart";

const toolIcons = {
  "simulador-sanciones": Scale,
  "calendario-dian": CalendarDays,
};

export default function ToolsSection() {
  return (
    <section id="herramientas" className="relative overflow-hidden border-y border-white/10 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:28px_28px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal className="max-w-2xl">
              <p className="section-eyebrow-light">
                <Wrench size={13} />
                Herramientas gratuitas
              </p>
              <h2 className="section-title-light font-display">
                Calculadoras tributarias DIAN
              </h2>
              <p className="section-sub-light">
                Recursos interactivos para estimar sanciones y consultar fechas de
                vencimiento. Disponibles para todos los visitantes, sin registro.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {TOOLS.map((tool, i) => {
                const Icon = toolIcons[tool.id as keyof typeof toolIcons];
                return (
                  <Reveal key={tool.id} delay={i * 120}>
                    <article className="card-dark card-hover card-shimmer card-glow group relative overflow-hidden p-7">
                      <span className="absolute right-5 top-5 chip-dark">Disponible</span>
                      <span className="icon-tile h-12 w-12">
                        <Icon size={24} />
                      </span>
                      <h3 className="font-display mt-5 text-xl font-semibold text-white">
                        {tool.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {tool.description}
                      </p>
                      <Link
                        href={tool.href}
                        className="link-slide mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-light transition-all hover:gap-2.5 hover:text-emerald-light"
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

          <Reveal delay={180} className="lg:sticky lg:top-[150px] lg:self-start">
            <AnimatedChart />
          </Reveal>
        </div>
      </div>
    </section>
  );
}