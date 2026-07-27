import Link from "next/link";
import { MapPin, Mail, Phone, Clock, Bot, Zap } from "lucide-react";
import { SITE } from "@contador/shared";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="gradient-navy text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">{SITE.name}</p>
            <p className="mt-2 text-sm text-slate-300">{SITE.tagline}</p>
            <div className="mt-4 flex items-start gap-2 text-sm text-slate-300">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {SITE.location.label}, {SITE.location.country}
              </span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">Servicios</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#servicios" className="hover:text-emerald-light">
                  Contabilidad
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-emerald-light">
                  Nómina
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-emerald-light">
                  Declaración de renta
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-emerald-light">
                  Asesoría DIAN
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Automatización</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#automatizacion" className="hover:text-emerald-light">
                  Alertas de vencimiento
                </a>
              </li>
              <li>
                <a href="#automatizacion" className="hover:text-emerald-light">
                  Gestión de documentos
                </a>
              </li>
              <li>
                <a href="#automatizacion" className="hover:text-emerald-light">
                  Flujo de citas
                </a>
              </li>
              <li>
                <a href="#automatizacion" className="hover:text-emerald-light">
                  Recordatorios de facturas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold" />
                {SITE.contact.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold" />
                {SITE.contact.email}
              </li>
              <li className="flex items-center gap-2">
                <Clock size={15} className="text-gold" />
                {SITE.contact.hours}
              </li>
            </ul>
            <div className="mt-4 flex gap-4">
              <Bot size={16} className="text-emerald" />
              <Zap size={16} className="text-gold" />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {year} {SITE.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}