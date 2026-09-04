"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useReplay } from "@/lib/useReplay";

const bars = [
  { v: 62, gold: false },
  { v: 48, gold: false },
  { v: 74, gold: true },
  { v: 55, gold: false },
  { v: 38, gold: false },
  { v: 66, gold: false },
  { v: 30, gold: false },
  { v: 20, gold: false },
];

export default function AnimatedChart() {
  const iteration = useReplay(5000);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-gold/20 via-transparent to-emerald/15 blur-2xl" />

      <div className="glass-dark relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-navy/40 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold-light">
              <TrendingDown size={16} />
            </span>
            <div>
              <p className="text-[13px] font-bold text-white">Sanciones estimadas</p>
              <p className="text-[10px] text-slate-400">Simulación DIAN 2026</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald/30 bg-emerald/10 px-2 py-1 text-[10px] font-bold text-emerald-light">
            <TrendingUp size={11} />
            −18%
          </span>
        </div>

        <div key={iteration} className="mt-5 flex h-32 items-end justify-between gap-2">
          {bars.map((b, i) => (
            <div key={i} className="flex w-full flex-col items-center gap-1">
              <div className="flex h-28 w-full items-end">
                <div
                  className={`animate-bar-grow w-full rounded-md ${
                    b.gold
                      ? "bg-gradient-to-t from-gold to-gold-light shadow-lg shadow-gold/40"
                      : "bg-gradient-to-t from-emerald/70 to-emerald-light shadow-lg shadow-emerald/30"
                  }`}
                  style={{ height: `${b.v}%`, animationDelay: `${0.25 + i * 0.12}s` }}
                />
              </div>
              <span className="font-mono text-[9px] text-slate-500 tabular-nums">S{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald/25 bg-emerald/10 px-3 py-2.5">
          <span className="flex items-center gap-2 text-[11px] font-medium text-emerald-light">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 [animation:ringPulse_1.6s_ease-out_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            Ahorro con fecha a tiempo
          </span>
          <span className="font-mono text-xs font-bold text-white tabular-nums">$ 128.400</span>
        </div>

        <p className="mt-3 text-[10px] text-slate-500">
          Estimación referencial según el Estatuto Tributario. Sin carácter de declaración.
        </p>
      </div>
    </div>
  );
}