"use client";

import { Menu, X, LogIn, ChevronDown, Cpu, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@contador/shared";
import { SECTIONS } from "@/lib/section-nav";
import { useSectionNav } from "./SectionProvider";
import SectionLink from "./SectionLink";

const panelLinks = [
  { href: "/admin/login", label: "Panel Developer", icon: Cpu, sub: "Control técnico del sistema" },
  { href: "/contadora/login", label: "Panel Contadora", icon: UserRound, sub: "Gestión operativa de la firma" },
];

export default function Navbar() {
  const { setActive } = useSectionNav();
  const [open, setOpen] = useState(false);
  const [accesoOpen, setAccesoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onDocClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccesoOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-navy/80 backdrop-blur-xl transition-shadow ${
        scrolled ? "border-white/10 shadow-lg shadow-black/20" : "border-white/5"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald via-emerald-light to-gold"
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald-light text-sm font-bold text-white shadow-md shadow-emerald/20 transition duration-300 group-hover:-translate-y-0.5">
            CS
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white sm:text-base">{SITE.name}</p>
            <p className="hidden text-xs text-slate-400 sm:block">{SITE.location.label}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setAccesoOpen(!accesoOpen)}
              onMouseEnter={() => setAccesoOpen(true)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                accesoOpen
                  ? "bg-emerald/15 text-emerald-light"
                  : "text-slate-300 hover:bg-emerald/10 hover:text-emerald-light"
              }`}
            >
              <LogIn size={15} />
              Acceso
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${accesoOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute right-0 top-full w-64 origin-top-right pt-2 transition-all duration-300 ${
                accesoOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
              onMouseLeave={() => setAccesoOpen(false)}
            >
              <div className="glass-dark overflow-hidden rounded-2xl border border-white/10 p-1.5 shadow-2xl shadow-black/50">
                {panelLinks.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setAccesoOpen(false)}
                      className="group/item flex items-center gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-emerald/10"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald to-emerald-light text-white shadow-sm">
                        <Icon size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white transition-colors group-hover/item:text-emerald-light">
                          {p.label}
                        </span>
                        <span className="block text-[11px] text-slate-400">{p.sub}</span>
                      </span>
                      <LogIn size={14} className="text-slate-500 opacity-0 transition group-hover/item:opacity-100" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <SectionLink
            section="contacto"
            className="btn-primary px-4 py-2.5 text-sm"
          >
            Agenda una cita
          </SectionLink>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Secciones
            </p>
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActive(s.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-200 transition hover:bg-emerald/10 hover:text-emerald-light"
                >
                  <Icon size={15} />
                  {s.label}
                </button>
              );
            })}

            <p className="mt-3 px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Acceso a paneles
            </p>
            {panelLinks.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-emerald/10 hover:text-emerald-light"
                >
                  <Icon size={15} />
                  {p.label}
                </Link>
              );
            })}

            <SectionLink
              section="contacto"
              className="btn-primary mt-3 px-3 py-2.5 text-center text-sm"
            >
              Agenda una cita
            </SectionLink>
          </nav>
        </div>
      )}
    </header>
  );
}