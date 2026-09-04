"use client";

import { useEffect, useRef, useState } from "react";
import { Equal, Play } from "lucide-react";

type Phase = "typing" | "equal" | "result" | "hold";

interface Operation {
  label: string;
  expr: string;
  numeric: number;
}

const operations: Operation[] = [
  { label: "Renta", expr: "12.500.000 × 35%", numeric: 4375000 },
  { label: "UVT", expr: "49.799 × 2", numeric: 99598 },
  { label: "Sanciones", expr: "8.000.000 × 10%", numeric: 800000 },
  { label: "IVA", expr: "2.150.000 × 19%", numeric: 408500 },
];

const keypad: string[][] = [
  ["C", "(", ")", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["00", "0", ".", "="],
];

const fmt = (n: number) => n.toLocaleString("es-CO");

export default function AnimatedCalculator() {
  const [opIndex, setOpIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const opIndexRef = useRef(opIndex);

  useEffect(() => {
    opIndexRef.current = opIndex;
  }, [opIndex]);

  const op = operations[opIndex];

  useEffect(() => {
    const currentTimers = timers.current;
    const run = () => {
      const current = operations[opIndexRef.current];
      setPhase("typing");
      setTyped("");

      let i = 0;
      currentTimers.push(
        setTimeout(function type() {
          i += 1;
          setTyped(current.expr.slice(0, i));
          if (i < current.expr.length) {
            currentTimers.push(setTimeout(type, 55));
          } else {
            currentTimers.push(setTimeout(() => setPhase("equal"), 300));
            currentTimers.push(
              setTimeout(() => {
                setPhase("result");
              }, 750)
            );
            currentTimers.push(
              setTimeout(() => {
                setPhase("hold");
                setOpIndex((v) => (v + 1) % operations.length);
                currentTimers.push(setTimeout(run, 1100));
              }, 2100)
            );
          }
        }, 400)
      );
    };
    run();
    return () => currentTimers.forEach(clearTimeout);
  }, []);

  const [counted, setCounted] = useState(0);
  useEffect(() => {
    if (phase !== "result") return;
    const numeric = operations[opIndex].numeric;
    setCounted(0);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1);
      setCounted(Math.round(numeric * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [phase, opIndex]);

  const isVerticalKey = (k: string) => ["÷", "×", "−", "+"].includes(k);
  const isNumKey = (k: string) => /^[0-9,]+$/.test(k);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-emerald/20 via-transparent to-gold/15 blur-2xl" />

      <div className="glass-dark relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-navy/40 sm:p-6">
        {/* Barra superior */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/25 text-emerald-light">
              <Equal size={15} />
            </span>
            <div>
              <p className="text-[13px] font-bold text-white">Módulo de cálculo</p>
              <p className="text-[10px] text-slate-400">Motor tributario en vivo</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 [animation:ringPulse_1.6s_ease-out_infinite]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
            </span>
            Calculando
          </span>
        </div>

        {/* Pantalla */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-navy/70 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {op.label}
            </p>
            <p className="text-[10px] text-slate-500">
              UVT 2025 · {fmt(49799)}
            </p>
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <p className="font-mono text-sm text-slate-300 tabular-nums">
              {phase === "equal" || phase === "result" || phase === "hold"
                ? op.expr
                : typed}
              {phase === "typing" && (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-emerald-light" />
              )}
            </p>
            <p className="font-mono text-3xl font-bold text-white tabular-nums sm:text-4xl">
              {phase === "result" || phase === "hold"
                ? fmt(counted)
                : "\u00A0"}
            </p>
          </div>

          {/* Progreso sutil */}
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald to-emerald-light transition-all duration-200"
              style={{
                width:
                  phase === "typing"
                    ? `${(typed.length / op.expr.length) * 100}%`
                    : phase === "result" || phase === "hold"
                      ? "100%"
                      : "100%",
              }}
            />
          </div>
        </div>

        {/* Teclado */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {keypad.flat().map((k) => {
            const isEqual = k === "=";
            const activeEq = isEqual && (phase === "equal" || phase === "result");
            return (
              <button
                key={k}
                type="button"
                disabled
                aria-hidden
                className={`relative flex h-11 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-200 ${
                  isEqual
                    ? "border-emerald/40 bg-gradient-to-br from-emerald to-emerald-light text-white shadow-lg shadow-emerald/30"
                    : isNumKey(k)
                      ? "border-white/10 bg-white/5 font-mono text-white hover:bg-white/10"
                      : isVerticalKey(k)
                        ? "border-gold/25 bg-gold/10 text-gold-light hover:bg-gold/20"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                } ${activeEq ? "scale-105 shadow-emerald/60 [animation:glowPulse_0.8s_ease-in-out_infinite]" : ""}`}
              >
                {activeEq ? <Play size={13} className="mr-1" /> : null}
                {k}
              </button>
            );
          })}
        </div>

        {/* Pie */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
          <span>Estimación referencial · sin carácter de declaración</span>
          <span className="font-mono tabular-nums">cálculo 0{opIndex + 1}/0{operations.length}</span>
        </div>
      </div>
    </div>
  );
}