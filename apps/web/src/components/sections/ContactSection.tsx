import { MessageCircle, MapPin, Mail, Phone, Zap } from "lucide-react";
import { SITE } from "@contador/shared";

export default function ContactSection() {
  return (
    <section id="contacto" className="border-t border-border bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
              Contacto
            </p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
              Hablemos de tus obligaciones tributarias
            </h2>
            <p className="mt-4 text-slate-600">
              Escríbenos o agenda una cita con nuestro asistente virtual.
              También contamos con herramientas de automatización para
              que nunca te atrases en tus obligaciones.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin size={18} className="mt-0.5 text-emerald" />
                <span>
                  <strong className="block font-medium text-navy">Ubicación</strong>
                  {SITE.location.label}, {SITE.location.country}
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Phone size={18} className="mt-0.5 text-emerald" />
                <span>
                  <strong className="block font-medium text-navy">Teléfono</strong>
                  {SITE.contact.phone}
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Mail size={18} className="mt-0.5 text-emerald" />
                <span>
                  <strong className="block font-medium text-navy">Correo</strong>
                  {SITE.contact.email}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="font-semibold text-navy">Asistente virtual</p>
                <p className="text-sm text-muted">Activo en la esquina inferior</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              El bot recogerá tus datos (nombre, teléfono, servicio y fecha
              preferida) y enviará la confirmación de la cita a nuestro equipo
              por WhatsApp. No necesitas ser cliente para agendar una primera
              consulta.
            </p>

            <div className="mt-4 rounded-xl border border-dashed border-emerald/30 bg-emerald/5 p-4 text-sm text-slate-700">
              <strong className="text-navy">Automatización disponible:</strong> Alertas de vencimiento, gestión documental y recordatorios de facturas. También integraremos asistentes de IA próximamente.
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <a
                href={`mailto:${SITE.contact.email}?subject=Consulta%20contable%20-%20Turbo`}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-light"
              >
                <Mail size={16} />
                Enviar correo
              </a>
              <a
                href={`https://wa.me/${SITE.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-light"
              >
                <Zap size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}