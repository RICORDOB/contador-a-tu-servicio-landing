"use client";

import { BellRing, FileText, FolderOpen, CheckCircle2 } from "lucide-react";
import { useReplay } from "@/lib/useReplay";

const files = [
  { name: "RUT_Vigente.pdf", size: "240 KB" },
  { name: "Camara_Comercio.pdf", size: "410 KB" },
  { name: "Declaracion_2025.pdf", size: "188 KB" },
  { name: "Factura_001.pdf", size: "96 KB" },
];

export default function AnimatedDocuments() {
  const iteration = useReplay(4600);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-gold/20 via-transparent to-emerald/15 blur-2xl" />

      <div className="glass-dark relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-navy/40 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold-light">
              <FolderOpen size={16} />
            </span>
            <div>
              <p className="text-[13px] font-bold text-white">Gestión documental</p>
              <p className="text-[10px] text-slate-400">Clasificación automática</p>
            </div>
          </div>
          <span className="relative">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/10 text-emerald-light">
              <BellRing size={15} />
            </span>
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60 [animation:ringPulse_1.6s_ease-out_infinite]" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald" />
            </span>
          </span>
        </div>

        <div key={iteration}>
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div
                key={f.name}
                className="slide-in-right flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5"
                style={{ animationDelay: `${0.35 + i * 0.22}s` }}
              >
                <span className="flex items-center gap-2 text-xs text-slate-300">
                  <FileText size={13} className="text-gold-light" />
                  {f.name}
                </span>
                <span className="font-mono text-[10px] text-slate-500 tabular-nums">{f.size}</span>
              </div>
            ))}
          </div>

          <div
            className="pop-in mt-4 flex items-center justify-between rounded-lg border border-emerald/25 bg-emerald/10 px-3 py-3"
            style={{ animationDelay: "1.5s" }}
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-emerald-light">
              <CheckCircle2 size={14} />
              Carpeta Turbo_2026 ordenada
            </span>
            <span className="font-mono text-[10px] text-emerald-light tabular-nums">4/4</span>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-slate-500">
          Cada documento se clasifica por tipo, cliente y período automáticamente.
        </p>
      </div>
    </div>
  );
}