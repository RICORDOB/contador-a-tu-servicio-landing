import { SITE } from "@contador/shared";
import type { CSSProperties } from "react";
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
import AnimatedDocuments from "@/components/ui/AnimatedDocuments";
import SectionLink from "@/components/layout/SectionLink";

const iconMap = {
  bell: Bell,
  folder: Folder,
  "calendar-check": CalendarCheck,
  mail: Mail,
  "user-plus": UserPlus,
};

export default function AutomationSection() {
  return (
    <section id="automatizacion" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:28px_28px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal className="max-w-2xl">
              <span className="chip-dark">
                <Zap size={13} />
                Automatización
              </span>
              <h2 className="section-title-light font-display mt-4">
                {SITE.automation.tagline}
              </h2>
              <p className="section-sub-light">{SITE.automation.description}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {AUTOMATION_FEATURES.map((feature, i) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <Reveal key={feature.id} delay={(i % 3) * 90}>
                    <article className="card-dark card-hover card-shimmer card-glow group flex h-full flex-col overflow-hidden p-6">
                      <div className="flex items-center justify-between">
                        <span className="icon-tile h-12 w-12">
                          <Icon size={22} />
                        </span>
                        <span className="chip-dark">{feature.badge}</span>
                        {feature.aiReady && (
                          <Sparkles size={16} className="animate-pulse-slow text-gold-light" />
                        )}
                      </div>
                      <h3 className="font-display mt-5 flex items-center gap-2 text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {feature.description}
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {feature.details.map((detail) => (
                          <li
                            key={detail}
                            className="group/item flex items-start gap-2 text-xs text-slate-500 transition-colors hover:text-emerald-light"
                          >
                            <CheckCircle2
                              size={14}
                              className="mt-0.5 shrink-0 text-emerald-light transition-transform group-hover/item:scale-125"
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      {feature.aiReady && (
                        <p className="mt-auto pt-4 text-xs font-medium text-emerald-light">
                          Potenciado con IA <Sparkles size={11} className="inline" />
                        </p>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={180} className="lg:sticky lg:top-[150px] lg:self-start">
            <AnimatedDocuments />
          </Reveal>
        </div>

        <Reveal>
          <div className="card-dark card-glow relative mt-14 overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
              <div className="animate-float absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald/25 blur-3xl" />
              <div className="animate-float-delayed absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
              {[
                "left-[10%] top-[18%] bg-emerald-light/80",
                "left-[22%] top-[72%] bg-gold/70",
                "left-[48%] top-[10%] bg-white/40",
                "left-[70%] top-[64%] bg-emerald/70",
                "left-[86%] top-[24%] bg-gold-light/80",
              ].map((cls, i) => (
                <span
                  key={i}
                  className={`particle h-1.5 w-1.5 rounded-full ${cls}`}
                  style={
                    {
                      "--p-dur": `${11 + i * 2}s`,
                      "--p-delay": `${i * 1.4}s`,
                      "--p-x": "16px",
                      "--p-opacity": "0.7",
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <div className="relative">
              <span className="highlight-ring relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/20 text-emerald-light">
                <Sparkles size={28} />
              </span>
              <h3 className="font-display mt-6 text-2xl font-bold text-white text-glow-emerald sm:text-3xl">
                {SITE.ai.tagline}
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-slate-300">
                {SITE.ai.description}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {AUTOMATION_FEATURES.filter((f) => f.aiReady).map((f) => (
                  <span
                    key={f.id}
                    className="btn-shine btn-shine-navy"
                    style={{ cursor: "default" }}
                  >
                    {f.title}
                  </span>
                ))}
              </div>
              <SectionLink
                section="contacto"
                className="btn-gold mt-9 px-8 py-3.5 text-sm"
              >
                Probá nuestro asistente
                <ArrowRight size={16} />
              </SectionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}