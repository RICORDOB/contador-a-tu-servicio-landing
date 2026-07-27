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

const iconMap = {
  bell: Bell,
  folder: Folder,
  "calendar-check": CalendarCheck,
  mail: Mail,
  "user-plus": UserPlus,
};

export default function AutomationSection() {
  return (
    <section id="automatizacion" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-1 text-xs font-medium text-emerald">
            <Zap size={14} />
            Automatización
          </div>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            {SITE.automation.tagline}
          </h2>
          <p className="mt-4 text-slate-600">
            {SITE.automation.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION_FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <article
                key={feature.id}
                className="group hover-lift rounded-2xl border border-border bg-card p-6 transition hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald transition group-hover:bg-emerald/20">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <span className="rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-medium text-emerald">
                      {feature.badge}
                    </span>
                  </div>
                  {feature.aiReady && (
                    <Sparkles size={16} className="text-gold" />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">
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
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald">
                    Potenciado con IA <Sparkles size={12} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-navy p-6 sm:p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald/20 text-emerald mb-4">
            <Sparkles size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white">
            {SITE.ai.tagline}
          </h3>
          <p className="mt-2 text-slate-300">
            {SITE.ai.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {AUTOMATION_FEATURES.filter((f) => f.aiReady).map((f) => (
              <span
                key={f.id}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white"
              >
                {f.title}
              </span>
            ))}
          </div>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-light"
          >
            Probá nuestro asistente
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}