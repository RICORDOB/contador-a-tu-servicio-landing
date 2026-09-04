import { Phone, Clock, CheckCircle2, ArrowRight, Workflow } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import AnimatedCalendar from "@/components/ui/AnimatedCalendar";

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
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal className="max-w-2xl">
              <p className="section-eyebrow-light">
                <Workflow size={13} />
                Cómo funciona
              </p>
              <h2 className="section-title-light font-display">
                Tres pasos para estar al día
              </h2>
              <p className="section-sub-light">
                Nuestro proceso de atención es simple, rápido y sin fricciones.
                Desde la primera consulta hasta la solución de tus obligaciones.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.step} delay={i * 120} className="relative">
                    <div className="card-dark card-hover card-shimmer card-glow group overflow-hidden p-7">
                      <span className="icon-tile h-12 w-12">
                        <Icon size={24} />
                      </span>
                      <div className="mt-5 flex items-baseline gap-3">
                        <span className="step-number font-display text-5xl font-bold">
                          {step.step}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {step.description}
                      </p>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute -right-7 top-1/2 hidden w-10 -translate-y-1/2 sm:block"
                      >
                        <div className="step-connector mx-auto h-0.5 w-full rounded-full opacity-70" />
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald/30 bg-navy text-emerald-light shadow-sm">
                          <ArrowRight size={11} />
                        </span>
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={180} className="lg:sticky lg:top-[150px] lg:self-start">
            <AnimatedCalendar />
          </Reveal>
        </div>
      </div>
    </section>
  );
}