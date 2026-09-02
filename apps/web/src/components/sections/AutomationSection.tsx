import { SITE } from "@contador/shared";
import {
  Bell,
  Folder,
  CalendarCheck,
  Mail,
  UserPlus,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { AUTOMATION_FEATURES } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";

const iconMap = {
  bell: Bell,
  folder: Folder,
  "calendar-check": CalendarCheck,
  mail: Mail,
  "user-plus": UserPlus,
};

export default function AutomationSection() {
  return (
    <section id="automatizacion" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="chip">
            <Zap size={13} />
            Automatización
          </span>
          <h2 className="section-title font-display mt-4">
            {SITE.automation.tagline}
          </h2>
          <p className="section-sub">{SITE.automation.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION_FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Reveal key={feature.id} delay={(i % 3) * 90}>
                <article className="card-modern card-hover group flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile h-12 w-12">
                      <Icon size={22} />
                    </span>
                    <span className="chip">{feature.badge}</span>
                    {feature.aiReady && (
                      <Sparkles size={16} className="text-gold" />
                    )}
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {feature.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-xs text-slate-500"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-emerald"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {feature.aiReady && (
                    <p className="mt-auto pt-4 text-xs font-medium text-emerald">
                      Potenciado con IA <Sparkles size={11} className="inline" />
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="gradient-navy relative mt-14 overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
            >
              <div className="animate-float absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald/25 blur-3xl" />
              <div className="animate-float-delayed absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
            </div>
            <div className="relative">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/20 text-emerald-light">
                <Sparkles size={28} />
              </span>
              <h3 className="font-display mt-5 text-2xl font-bold text-white">
                {SITE.ai.tagline}
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                {SITE.ai.description}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {AUTOMATION_FEATURES.filter((f) => f.aiReady).map((f) => (
                  <span
                    key={f.id}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                  >
                    {f.title}
                  </span>
                ))}
              </div>
              <a href="#contacto" className="btn-primary mt-9 px-7 py-3.5 text-sm">
                Probá nuestro asistente
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}