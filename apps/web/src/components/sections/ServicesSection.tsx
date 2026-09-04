import {
  Briefcase,
  Building2,
  Calculator,
  FileText,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";
import AnimatedInvoice from "@/components/ui/AnimatedInvoice";

const iconMap = {
  calculator: Calculator,
  users: Users,
  "file-text": FileText,
  shield: Shield,
  building: Building2,
  briefcase: Briefcase,
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:26px_26px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal className="max-w-2xl">
              <p className="section-eyebrow-light">
                <Sparkles size={13} />
                Servicios
              </p>
              <h2 className="section-title-light font-display">
                Soluciones contables para tu negocio
              </h2>
              <p className="section-sub-light">
                Desde la contabilidad diaria hasta la declaración de renta, te
                acompañamos en cada obligación tributaria en Turbo y en todo el
                país.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((service, i) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <Reveal key={service.id} delay={(i % 3) * 90}>
                    <article className="card-dark card-hover card-shimmer card-glow group h-full overflow-hidden p-6">
                      <span className="icon-tile h-12 w-12">
                        <Icon size={22} />
                      </span>
                      <h3 className="font-display mt-5 flex items-center gap-2 text-lg font-semibold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {service.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={180} className="lg:sticky lg:top-[150px] lg:self-start">
            <AnimatedInvoice />
          </Reveal>
        </div>
      </div>
    </section>
  );
}