"use client";

import type { CSSProperties } from "react";
import {
  CalendarCheck,
  TrendingUp,
  Zap,
  FileText,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { useReplay } from "@/lib/useReplay";

const bars = [34, 52, 41, 68, 58, 82, 74, 96];

export default function AnimatedDashboard() {
  const iteration = useReplay(6000);

  return (
    <div className="group/card relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-emerald/30 via-transparent to-gold/25 blur-2xl transition-opacity duration-500" />

      <div className="glass-dark relative rounded-3xl p-6 shadow-2xl shadow-black/40 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-lg shadow-emerald/30">
              <TrendingUp size={17} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Panel contable</p>
              <p className="text-[11px] text-slate-400">Sync en tiempo real</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 [animation:ringPulse_1.6s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
            </span>
            Activo
          </span>
        </div>

        <div key={iteration}>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Ingresos mensuales
            </p>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-light">
              +23%
              <ArrowUpRight size={12} />
            </span>
          </div>
          <svg
            viewBox="0 0 260 80"
            preserveAspectRatio="none"
            className="mt-2 h-20 w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="72" x2="260" y2="72" stroke="#1e293b" strokeWidth="1" />
            <path
              d="M0,66 C18,60 30,66 44,58 C60,49 72,54 86,46 C100,38 114,44 128,34 C142,24 156,30 170,20 C184,12 198,18 212,10 C226,4 240,10 260,4 L260,72 L0,72 Z"
              fill="url(#sparkFill)"
            />
            <path
              className="animate-line"
              style={{ "--line-len": "480" } as CSSProperties}
              d="M0,66 C18,60 30,66 44,58 C60,49 72,54 86,46 C100,38 114,44 128,34 C142,24 156,30 170,20 C184,12 198,18 212,10 C226,4 240,10 260,4"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="260" cy="4" r="3.5" fill="#10b981" />
            <circle cx="260" cy="4" r="7" fill="#10b981" opacity="0.25">
              <animate attributeName="r" values="4;10;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Citas de la semana
            </p>
            <CalendarCheck size={14} className="text-emerald-light" />
          </div>
          <div className="mt-3 flex h-16 items-end justify-between gap-2">
            {bars.map((b, i) => (
              <div
                key={i}
                className="animate-bar w-full rounded-md bg-gradient-to-t from-emerald to-emerald-light"
                style={{
                  height: `${b}%`,
                  animationDelay: `${i * 90}ms`,
                  boxShadow: "0 0 14px -4px rgba(16,185,129,0.7)",
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-500">
            {["L", "M", "M", "J", "V", "S", "D", "S"].map((d, i) => (
              <span key={i} className="w-full text-center">{d}</span>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div className="animate-float absolute -right-2 -top-4 hidden rounded-2xl border border-emerald/25 bg-navy/85 p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:flex sm:items-center sm:gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/10 text-emerald-light">
          <FileText size={15} />
        </span>
        <div>
          <p className="text-[11px] font-bold text-white">Documento organizado</p>
          <p className="text-[10px] text-slate-400">RUT · Cámara · Renta ✓</p>
        </div>
        <CheckCircle2 size={14} className="text-emerald-light" />
      </div>

      <div className="animate-float-delayed absolute -bottom-5 -left-2 hidden rounded-2xl border border-gold/30 bg-navy/85 p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:flex sm:items-center sm:gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold-light">
          <Zap size={15} />
        </span>
        <div>
          <p className="text-[11px] font-bold text-white">Cita confirmada</p>
          <p className="text-[10px] text-slate-400">Recordatorio a las 9:00</p>
        </div>
      </div>

      <div className="animate-float-delayed absolute -right-8 top-1/2 hidden h-10 w-10 items-center justify-center rounded-full border border-emerald/20 bg-navy/80 text-emerald-light shadow-lg backdrop-blur-xl lg:flex">
        <span className="animate-spin-slow inline-flex">
          <TrendingUp size={18} />
        </span>
      </div>
      <div className="absolute -left-8 top-14 hidden h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-navy/80 text-gold-light shadow-lg backdrop-blur-xl lg:flex">
        <Zap size={16} />
      </div>
    </div>
  );
}