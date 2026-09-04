import type { CSSProperties } from "react";
import { MessageCircle, MapPin, Mail, Phone, Zap, ArrowUpRight } from "lucide-react";
import { SITE } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section id="contacto" className="gradient-deep relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { c: "left-[12%] top-[20%] bg-emerald-light/70", d: "11s", del: "0s" },
          { c: "left-[30%] top-[70%] bg-gold/60", d: "14s", del: "2s" },
          { c: "left-[64%] top-[14%] bg-gold-light/60", d: "12s", del: "4s" },
          { c: "left-[84%] top-[56%] bg-emerald/60", d: "15s", del: "1s" },
          { c: "left-[44%] top-[84%] bg-white/30", d: "13s", del: "5s" },
        ].map((p, i) => (
          <span
            key={i}
            className={`particle h-1.5 w-1.5 rounded-full ${p.c}`}
            style={
              {
                "--p-dur": p.d,
                "--p-delay": p.del,
                "--p-x": "18px",
                "--p-opacity": "0.6",
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="section-eyebrow text-emerald-light">Contacto</p>
            <h2 className="section-title-light font-display text-glow-emerald">
              Hablemos de tus obligaciones tributarias
            </h2>
            <p className="section-sub-light max-w-xl">
              Escríbenos o agenda una cita con nuestro asistente virtual.
              También contamos con herramientas de automatización para que
              nunca te atrases en tus obligaciones.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="group flex items-start gap-4">
                <span className="icon-tile h-11 w-11 shrink-0">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-medium text-white">Ubicación</p>
                  <p className="text-sm text-slate-300">
                    {SITE.location.label}, {SITE.location.country}
                  </p>
                </div>
              </li>
              <li className="group flex items-start gap-4">
                <span className="icon-tile-gold h-11 w-11 shrink-0">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-medium text-white">Teléfono</p>
                  <p className="text-sm text-slate-300">{SITE.contact.phone}</p>
                </div>
              </li>
              <li className="group flex items-start gap-4">
                <span className="icon-tile h-11 w-11 shrink-0">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-medium text-white">Correo</p>
                  <p className="text-sm text-slate-300">{SITE.contact.email}</p>
                </div>
              </li>
            </ul>

            <a
              href={`https://wa.me/${SITE.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-9 px-6 py-3.5 text-sm"
            >
              <Zap size={16} />
              Escríbenos por WhatsApp
              <ArrowUpRight size={15} />
            </a>
          </Reveal>

          <Reveal delay={140}>
            <div className="glass-dark card-hover relative overflow-hidden rounded-3xl p-7 shadow-2xl shadow-navy/30 sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald/20 blur-3xl"
              />
              <div className="relative flex items-center gap-4">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/25 text-emerald-light">
                  <MessageCircle size={26} />
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 [animation:ringPulse_1.6s_ease-out_infinite]" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald" />
                  </span>
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    Asistente virtual
                  </p>
                  <p className="text-sm text-slate-300">Activo en la esquina inferior</p>
                </div>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-slate-300">
                El bot recogerá tus datos (nombre, teléfono, servicio y fecha
                preferida) y enviará la confirmación de la cita a nuestro
                equipo por WhatsApp. No necesitas ser cliente para agendar una
                primera consulta.
              </p>

              <div className="relative mt-5 flex items-start gap-3 rounded-2xl border border-emerald/30 bg-emerald/10 p-4 text-sm text-slate-200 backdrop-blur">
                <Zap size={17} className="mt-0.5 shrink-0 text-emerald-light" />
                <p>
                  <strong className="text-white">
                    Automatización disponible:
                  </strong>{" "}
                  Alertas de vencimiento, gestión documental y recordatorios de
                  facturas. También integraremos asistentes de IA próximamente.
                </p>
              </div>

              <div className="relative mt-7 flex items-center gap-2 text-xs text-slate-300">
                <span className="flex gap-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </span>
                Anita responde en segundos, todo el día.
              </div>

              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${SITE.contact.email}?subject=Consulta%20contable%20-%20Turbo`}
                  className="btn-navy px-5 py-3.5 text-sm"
                >
                  <Mail size={16} />
                  Enviar correo
                </a>
                <a
                  href={`https://wa.me/${SITE.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-3.5 text-sm"
                >
                  <Zap size={16} />
                  WhatsApp
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}