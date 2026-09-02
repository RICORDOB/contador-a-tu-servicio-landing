import { Phone, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    step: "1",
    title: "Agenda",
    description:
      "Escríbenos por el chatbot, llámanos o envíanos un correo. Recogeremos tus datos rápidamente.",
    icon: Phone,
  },
  {
    step: "2",
    title: "Recibí",
    description:
      "Te confirmamos la cita por WhatsApp y te enviamos un recordatorio 24 horas antes.",
    icon: Clock,
  },
  {
    step: "3",
    title: "Resolvé",
    description:
      "Atendemos tus obligaciones tributarias, contables y de gestión con total profesionalismo.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">Cómo funciona</p>
          <h2 className="section-title font-display">
            Tres pasos para estar al día
          </h2>
          <p className="section-sub">
            Nuestro proceso de atención es simple, rápido y sin fricciones.
            Desde la primera consulta hasta la solución de tus obligaciones.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.step} delay={i * 120} className="relative">
                <div className="card-modern card-hover group p-7">
                  <span className="icon-tile h-13 w-13" style={{ height: "3.25rem", width: "3.25rem" }}>
                    <Icon size={24} />
                  </span>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display bg-gradient-to-br from-emerald to-gold bg-clip-text text-5xl font-bold text-transparent">
                      {step.step}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-navy">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-5 top-10 hidden h-8 w-8 items-center justify-center rounded-full border border-emerald/20 bg-white text-emerald shadow-sm sm:flex"
                  >
                    <ArrowRight size={16} />
                  </span>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}