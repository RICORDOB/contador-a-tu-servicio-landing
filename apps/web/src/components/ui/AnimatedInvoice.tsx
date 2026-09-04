"use client";

import { FileText, BadgeCheck } from "lucide-react";
import { useReplay } from "@/lib/useReplay";

const rows = [
  { label: "Servicios contables", amount: "$ 850.000" },
  { label: "Nómina y seguridad social", amount: "$ 620.000" },
  { label: "Declaración de renta", amount: "$ 1.200.000" },
  { label: "Asesoría DIAN", amount: "$ 380.000" },
];

export default function AnimatedInvoice() {
  const iteration = useReplay(5600);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-emerald/20 via-transparent to-gold/15 blur-2xl" />

      <div className="glass-dark relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-navy/40 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-navy-light text-xs font-bold text-white ring-1 ring-emerald/40">
              CS
            </span>
            <div>
              <p className="text-[13px] font-bold text-white">Factura 2026-0148</p>
              <p className="text-[10px] text-slate-400">Emitida en Turbo, Antioquia</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 [animation:ringPulse_1.6s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
            </span>
            Procesando
          </span>
        </div>

        <div key={iteration}>
          <div className="mt-4 space-y-2">
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="invoice-row flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5"
                style={{ animationDelay: `${0.3 + i * 0.24}s` }}
              >
                <span className="flex items-center gap-2 text-xs text-slate-300">
                  <FileText size={13} className="text-emerald-light" />
                  {r.label}
                </span>
                <span className="font-mono text-xs text-white tabular-nums">{r.amount}</span>
              </div>
            ))}

            <div
              className="invoice-row flex items-center justify-between rounded-lg border border-emerald/25 bg-emerald/10 px-3 py-3"
              style={{ animationDelay: "1.3s" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-light">
                Total
              </span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                $ 3.050.000
              </span>
            </div>
          </div>

          <div className="relative mt-4 flex h-10 items-center justify-center">
            <span
              className="stamp-in inline-flex items-center gap-1.5 rounded-lg border-2 border-emerald-light px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-light"
              style={{ animationDelay: "1.9s" }}
            >
              <BadgeCheck size={14} />
              Pagada
            </span>
          </div>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald to-emerald-light"
            style={{ width: "100%" }}
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-500">
          Contabilidad automatizada · registros al día con la DIAN
        </p>
      </div>
    </div>
  );
}