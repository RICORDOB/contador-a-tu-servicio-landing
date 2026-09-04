"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { CalendarCheck, Clock3, FileText } from "lucide-react";
import { useReplay } from "@/lib/useReplay";

const DAY_LETTERS = ["L", "M", "M", "J", "V", "S", "D"];
const TEAR_PAGES = 5;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const monthLabel = (d: Date) => cap(d.toLocaleDateString("es-CO", { month: "long", year: "numeric" }));

const sheetStyle = (i: number): CSSProperties =>
  ({
    "--px": `${i * 2.5}px`,
    "--py": `${i * 2.5}px`,
    "--pr": `${i * 0.7}deg`,
    animationDelay: `${0.45 + i * 0.5}s`,
  }) as CSSProperties;

export default function AnimatedCalendar() {
  const [now, setNow] = useState<Date | null>(null);
  const iteration = useReplay(4500);

  useEffect(() => {
    // Fecha real del cliente (el servidor renderiza UTC y causaría mismatch de hydration).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
  }, []);

  if (!now) {
    return (
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
    );
  }

  const y = now.getFullYear();
  const m = now.getMonth();
  const today = now.getDate();
  const firstOffset = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: firstOffset + daysInMonth }, (_, i) =>
    i >= firstOffset ? i - firstOffset + 1 : null
  );
  const due15 = 15 >= today ? 15 : null;

  const tearMonths = Array.from({ length: TEAR_PAGES }, (_, i) =>
    new Date(y, m - (i + 1), 1)
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-emerald/25 via-transparent to-gold/20 blur-2xl" />

      <div className="tear-stage relative mx-auto aspect-[4/5] w-full max-w-[340px]">
        {/* Hoja final: mes actual */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-[#f8fafc] shadow-2xl shadow-black/40 ring-1 ring-white/20">
          <div className="flex h-[16%] items-center justify-between bg-gradient-to-br from-navy to-navy-light px-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-white">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-emerald to-emerald-light text-[9px] font-bold text-white">
                CS
              </span>
              Contador a tu Servicio
            </span>
            <span className="text-[10px] font-semibold text-gold-light">{y}</span>
          </div>

          <div className="flex items-center justify-between px-4 pt-2.5">
            <p className="font-display text-base font-bold text-navy">{monthLabel(now)}</p>
            <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold text-emerald">
              hoy · día {today}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 px-4 pt-2 text-center">
            {DAY_LETTERS.map((d) => (
              <div key={d} className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                {d}
              </div>
            ))}
            {cells.map((d, i) =>
              d === null ? (
                <span key={i} />
              ) : (
                <span key={i} className="relative flex aspect-square items-center justify-center">
                  {d === due15 && (
                    <span className="cal-due2 absolute inset-0 rounded-md border border-gold/70" />
                  )}
                  <span
                    className={`relative flex aspect-square w-full items-center justify-center rounded-md font-mono text-[11px] tabular-nums ${
                      d === today
                        ? "z-[1] bg-emerald font-bold text-white shadow-md shadow-emerald/40"
                        : "text-navy"
                    }`}
                  >
                    {d}
                  </span>
                  {d === today && (
                    <span className="cal-today-pulse absolute inset-0 rounded-md ring-2 ring-emerald/40" />
                  )}
                  {d === due15 && d !== today && (
                    <span className="absolute -top-1 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-navy">
                      !
                    </span>
                  )}
                </span>
              )
            )}
          </div>

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-gold/40 bg-gold/10 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-navy">
              <Clock3 size={12} />
              Próximo vencimiento DIAN
            </span>
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-navy tabular-nums">
              <FileText size={11} />
              día {due15 ?? "15 próximo mes"}
            </span>
          </div>
        </div>

        {/* Pila superior: hojas que se arrancan */}
        <div key={iteration} className="absolute inset-0 z-10">
          {tearMonths.map((mm, i) => (
            <div
              key={i}
              className="tear-page overflow-hidden rounded-2xl bg-[#f8fafc]"
              style={sheetStyle(i)}
            >
              <div className="flex h-[16%] items-center justify-between bg-gradient-to-br from-navy-light to-navy px-4">
                <span className="text-xs font-bold text-white">{monthLabel(mm)}</span>
                <span className="text-[10px] text-gold-light">hoja del mes</span>
              </div>
              <div className="flex h-[38%] items-center justify-center px-4">
                <p className="font-display text-center text-3xl font-bold text-slate-300">
                  {monthLabel(mm)}
                </p>
              </div>
              <div className="space-y-1.5 px-5 opacity-60">
                {[34, 56, 42, 64, 30].map((w, j) => (
                  <div key={j} className="h-2 rounded bg-slate-200" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Espiral superior */}
        <div className="pointer-events-none absolute -top-[5px] inset-x-6 z-20" aria-hidden>
          <div className="flex justify-between">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full border border-white/40 bg-gradient-to-b from-slate-300 to-slate-400 shadow" />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[10px] text-slate-400">
        Siempre sincronizado con el mes y el día actuales. <CalendarCheck size={10} className="inline text-emerald-light" />
      </p>
    </div>
  );
}