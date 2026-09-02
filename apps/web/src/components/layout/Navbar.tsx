"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@contador/shared";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#automatizacion", label: "Automatización" },
  { href: "#herramientas", label: "Herramientas" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? "border-border shadow-sm shadow-navy/5" : "border-border/80"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-emerald via-emerald-light to-gold transition-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-sm font-bold text-white shadow-md shadow-navy/20 transition group-hover:-translate-y-0.5">
            CS
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-navy sm:text-base">{SITE.name}</p>
            <p className="hidden text-xs text-muted sm:block">{SITE.location.label}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-slate-600 transition hover:text-emerald"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-emerald transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-navy-light hover:shadow-md hover:shadow-navy/20"
          >
            Agenda una cita
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-navy md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-emerald"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="rounded-lg bg-navy px-3 py-2 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Agenda una cita
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}