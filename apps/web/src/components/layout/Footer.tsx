"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Bot,
  Zap,
  LogIn,
  Cpu,
  UserRound,
} from "lucide-react";
import { SITE } from "@contador/shared";
import { useSectionNav } from "./SectionProvider";
import type { SectionId } from "@/lib/section-nav";
import { EXORENTA_URL } from "@/lib/exorenta";

const serviceShortcuts: { label: string; section: SectionId }[] = [
  { label: "Contabilidad", section: "servicios" },
  { label: "Nómina", section: "servicios" },
  { label: "Declaración de renta", section: "servicios" },
  { label: "Asesoría DIAN", section: "servicios" },
];

const autoShortcuts: { label: string; section: SectionId }[] = [
  { label: "Alertas de vencimiento", section: "automatizacion" },
  { label: "Gestión de documentos", section: "automatizacion" },
  { label: "Flujo de citas", section: "proceso" },
  { label: "Recordatorios de facturas", section: "automatizacion" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const { setActive } = useSectionNav();

  const jump = (section: SectionId) => {
    if (window.location.pathname !== "/") {
      router.push("/");
    }
    setActive(section);
  };

  return (
    <footer className="relative mt-4 border-t border-white/10 bg-[#061020] text-slate-200">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald to-emerald-light text-xs font-bold text-white shadow-lg shadow-emerald/25">
                CS
              </span>
              <p className="text-lg font-semibold text-white">{SITE.name}</p>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-400">{SITE.tagline}</p>
            <div className="mt-4 flex items-start gap-2 text-sm text-slate-400">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {SITE.location.label}, {SITE.location.country}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald/30 bg-emerald/10 text-emerald transition-transform duration-300 hover:-translate-y-0.5">
                <Bot size={16} />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 hover:-translate-y-0.5">
                <Zap size={16} />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition-transform duration-300 hover:-translate-y-0.5">
                <Mail size={16} />
              </span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">Servicios</p>
            <ul className="mt-4 space-y-2 text-sm">
              {serviceShortcuts.map((s) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => jump(s.section)}
                    className="transition-colors hover:text-emerald-light"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={EXORENTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-emerald-light"
                >
                  ExoRenta · Consultas DIAN
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Automatización</p>
            <ul className="mt-4 space-y-2 text-sm">
              {autoShortcuts.map((s) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => jump(s.section)}
                    className="transition-colors hover:text-emerald-light"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Acceso</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/admin/login"
                  className="group flex items-center gap-2.5 transition-colors hover:text-emerald-light"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/10 text-emerald transition group-hover:bg-emerald/20">
                    <Cpu size={14} />
                  </span>
                  <span>
                    <span className="block">Panel Developer</span>
                    <span className="block text-xs text-slate-500">Control técnico</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contadora/login"
                  className="group flex items-center gap-2.5 transition-colors hover:text-emerald-light"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold transition group-hover:bg-gold/20">
                    <UserRound size={14} />
                  </span>
                  <span>
                    <span className="block">Panel Contadora</span>
                    <span className="block text-xs text-slate-500">Gestión operativa</span>
                  </span>
                </Link>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <LogIn size={15} className="text-emerald" />
                Acceso restringido por rol
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
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
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {year} {SITE.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}