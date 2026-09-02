import { Award, HeartHandshake, Lock, TrendingUp, Cpu } from "lucide-react";
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

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal className="lg:sticky lg:top-24">
            <p className="section-eyebrow">Nosotros</p>
            <h2 className="section-title font-display">
              Contabilidad clara, humana y al día
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              En{" "}
              <strong className="font-semibold text-navy">
                Contador a tu Servicio
              </strong>{" "}
              combinamos rigor técnico con atención personalizada. Atendemos
              comerciantes, profesionales independientes y empresas de Turbo,
              Antioquia, con servicios presenciales y virtuales.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Los clientes activos acceden a un portal privado donde consultan
              sus documentos (RUT, Cámara de Comercio, declaraciones). Quienes
              aún no son clientes pueden agendar una cita a través de nuestro
              asistente virtual.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Estamos integrando herramientas de automatización y asistentes de
              IA para hacer la contabilidad más eficiente, rápida y accesible
              para todos nuestros clientes.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 2) * 100}>
                <article className="card-modern card-hover group h-full p-6">
                  <span className="icon-tile h-12 w-12">
                    <value.icon size={22} />
                  </span>
                  <h3 className="font-display mt-4 font-semibold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
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