import {
  Briefcase,
  Building2,
  Calculator,
  FileText,
  Shield,
  Users,
} from "lucide-react";
import { SERVICES } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";

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
    <section id="servicios" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">Servicios</p>
          <h2 className="section-title font-display">
            Soluciones contables para tu negocio
          </h2>
          <p className="section-sub">
            Desde la contabilidad diaria hasta la declaración de renta, te
            acompañamos en cada obligación tributaria en Turbo y en todo el
            país.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Reveal key={service.id} delay={(i % 3) * 90}>
                <article className="card-modern card-hover group h-full p-6">
                  <span className="icon-tile h-12 w-12">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-semibold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}