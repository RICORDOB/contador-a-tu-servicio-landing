import {
  Briefcase,
  Building2,
  Calculator,
  FileText,
  Shield,
  Users,
} from "lucide-react";
import { SERVICES } from "@contador/shared";

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
    <section id="servicios" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
            Servicios
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            Soluciones contables para tu negocio
          </h2>
          <p className="mt-4 text-slate-600">
            Desde la contabilidad diaria hasta la declaración de renta, te
            acompañamos en cada obligación tributaria en Turbo y en todo el
            país.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <article
                key={service.id}
                className="group hover-lift rounded-2xl border border-border bg-card p-6 transition hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition group-hover:bg-emerald/10 group-hover:text-emerald">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}