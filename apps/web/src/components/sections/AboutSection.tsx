import {
  Award,
  HeartHandshake,
  Lock,
  TrendingUp,
  Cpu,
  Sparkles,
  Landmark,
  Coins,
  FileSpreadsheet,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import Reveal from "@/components/ui/Reveal";

const values = [
  {
    icon: HeartHandshake,
    title: "Cercanía local",
    description:
      "Conocemos el contexto empresarial de Turbo y la región del Urabá antioqueño.",
  },
  {
    icon: Lock,
    title: "Confidencialidad",
    description:
      "Tus documentos contables se manejan con protocolos seguros y acceso restringido.",
  },
  {
    icon: TrendingUp,
    title: "Enfoque en crecimiento",
    description:
      "Más que cumplir, te ayudamos a entender tus números para tomar mejores decisiones.",
  },
  {
    icon: Award,
    title: "Experiencia DIAN",
    description:
      "Acompañamiento en requerimientos, calendarios tributarios y planeación fiscal.",
  },
  {
    icon: Cpu,
    title: "Automatización",
    description:
      "Usamos herramientas inteligentes para que tu gestión contable sea rápida y sin errores.",
  },
];

const floating: { icon: LucideIcon; cls: string; style: CSSProperties }[] = [
  { icon: Landmark, cls: "text-gold-light", style: { left: "6%", top: "18%" } },
  { icon: Coins, cls: "text-emerald-light", style: { left: "88%", top: "30%" } },
  { icon: FileSpreadsheet, cls: "text-slate-300", style: { left: "12%", top: "72%" } },
  { icon: TrendingUp, cls: "text-emerald-light", style: { left: "78%", top: "78%" } },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {floating.map((f, i) => {
          const Icon = f.icon;
          return (
            <span
              key={i}
              className={`animate-float absolute hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl lg:flex ${f.cls}`}
              style={{ ...f.style, animationDelay: `${i * 2.2}s` }}
            >
              <Icon size={20} />
            </span>
          );
        })}
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal className="lg:sticky lg:top-24">
            <p className="section-eyebrow-light">
              <Sparkles size={13} />
              Nosotros
            </p>
            <h2 className="section-title-light font-display">
              Contabilidad clara, humana y al día
            </h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              En{" "}
              <strong className="font-semibold text-white">
                Contador a tu Servicio
              </strong>{" "}
              combinamos rigor técnico con atención personalizada. Atendemos
              comerciantes, profesionales independientes y empresas de Turbo,
              Antioquia, con servicios presenciales y virtuales.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              Los clientes activos acceden a un portal privado donde consultan
              sus documentos (RUT, Cámara de Comercio, declaraciones). Quienes
              aún no son clientes pueden agendar una cita a través de nuestro
              asistente virtual.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              Estamos integrando herramientas de automatización y asistentes de
              IA para hacer la contabilidad más eficiente, rápida y accesible
              para todos nuestros clientes.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="chip-dark">RUT y Cámara de Comercio</span>
              <span className="chip-dark">Declaraciones tributarias</span>
              <span className="chip-dark">Portal privado</span>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 2) * 100}>
                <article className="card-dark card-hover card-shimmer card-glow group h-full overflow-hidden p-6">
                  <span className="icon-tile h-12 w-12">
                    <value.icon size={22} />
                  </span>
                  <h3 className="font-display mt-4 font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}