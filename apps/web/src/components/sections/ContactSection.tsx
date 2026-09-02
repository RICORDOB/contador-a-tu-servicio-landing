import { MessageCircle, MapPin, Mail, Phone, Zap, ArrowUpRight } from "lucide-react";
import { SITE } from "@contador/shared";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section id="contacto" className="border-t border-border bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="section-eyebrow">Contacto</p>
            <h2 className="section-title font-display">
              Hablemos de tus obligaciones tributarias
            </h2>
            <p className="section-sub">
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
                  <p className="font-medium text-navy">Ubicación</p>
                  <p className="text-sm text-slate-600">
                    {SITE.location.label}, {SITE.location.country}
                  </p>
                </div>
              </li>
              <li className="group flex items-start gap-4">
                <span className="icon-tile h-11 w-11 shrink-0">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-medium text-navy">Teléfono</p>
                  <p className="text-sm text-slate-600">{SITE.contact.phone}</p>
                </div>
              </li>
              <li className="group flex items-start gap-4">
                <span className="icon-tile h-11 w-11 shrink-0">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-medium text-navy">Correo</p>
                  <p className="text-sm text-slate-600">{SITE.contact.email}</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-hover glass rounded-3xl p-7 shadow-xl shadow-navy/5 sm:p-9">
              <div className="flex items-center gap-4">
                <span className="icon-tile h-14 w-14 rounded-2xl">
                  <MessageCircle size={26} />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-navy">
                    Asistente virtual
                  </p>
                  <p className="text-sm text-muted">Activo en la esquina inferior</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                El bot recogerá tus datos (nombre, teléfono, servicio y fecha
                preferida) y enviará la confirmación de la cita a nuestro
                equipo por WhatsApp. No necesitas ser cliente para agendar una
                primera consulta.
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald/25 bg-emerald/5 p-4 text-sm text-slate-700">
                <Zap size={17} className="mt-0.5 shrink-0 text-emerald" />
                <p>
                  <strong className="text-navy">
                    Automatización disponible:
                  </strong>{" "}
                  Alertas de vencimiento, gestión documental y recordatorios de
                  facturas. También integraremos asistentes de IA próximamente.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${SITE.contact.email}?subject=Consulta%20contable%20-%20Turbo`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/15 transition hover:-translate-y-0.5 hover:bg-navy-light"
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