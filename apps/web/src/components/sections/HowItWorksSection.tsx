import { Phone, Clock, CheckCircle2, ArrowRight } from "lucide-react";

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
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
            Cómo funciona
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            Tres pasos para estar al día
          </h2>
          <p className="mt-4 text-slate-600">
            Nuestro proceso de atención es simple, rápido y sin fricciones.
            Desde la primera consulta hasta la solución de tus obligaciones.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative hover-lift rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                  <Icon size={22} />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-navy/20">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-semibold text-navy">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden absolute -right-4 top-8 sm:block">
                    <ArrowRight size={20} className="text-emerald/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}