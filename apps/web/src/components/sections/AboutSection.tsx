import { Award, HeartHandshake, Lock, TrendingUp, Cpu } from "lucide-react";

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
    <section id="nosotros" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
              Nosotros
            </p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              Contabilidad clara, humana y al día
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              En <strong className="font-semibold text-navy">Contador a tu Servicio</strong>{" "}
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="hover-lift rounded-2xl border border-border bg-card p-5"
              >
                <value.icon size={22} className="text-emerald" />
                <h3 className="mt-3 font-semibold text-navy">{value.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}