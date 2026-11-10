"use client";

import { BookOpen, Info } from "lucide-react";
import { PARAMETROS, ANIOS_DISPONIBLES, formatCOP } from "@contador/shared";

const FORMULAS = [
  { c: "Cesantías", f: "(Salario + Auxilio) × días / 360", n: "Art. 249 CST · Ley 50 de 1990" },
  { c: "Intereses", f: "Cesantías × días × 12% / 360", n: "Ley 52 de 1975 · Art. 99 Ley 50 de 1990" },
  { c: "Prima", f: "(Salario + Auxilio) × días / 360", n: "Arts. 306 a 308 CST" },
  { c: "Vacaciones", f: "Salario × 15 / 360 × días pendientes", n: "Arts. 186 a 192 CST" },
  { c: "Indemnización", f: "Variable según contrato y salario", n: "Art. 64 CST · Ley 789 de 2002" },
  { c: "Sanción por mora", f: "1 día de salario por día de retraso", n: "Art. 65 CST" },
];

const FAQ = [
  {
    q: "¿Cómo liquido un contrato que empezó en un año y terminó en otro con salario mínimo?",
    a: "Marca «El trabajador devenga el salario mínimo». El motor divide el periodo por año (y por semestre para la prima) y usa el SMMLV y el auxilio vigentes en cada tramo. Las vacaciones y la indemnización usan el SMMLV del año de retiro.",
  },
  {
    q: "¿El auxilio de transporte entra en las vacaciones?",
    a: "No. El auxilio no es salario, así que no se incluye en vacaciones ni en indemnización. Sí se suma a la base de cesantías y prima.",
  },
  {
    q: "¿Cómo se cuenta el tiempo?",
    a: "Se cuentan los días calendario reales (365 en un año completo) y se dividen por 360 para obtener la proporción legal de prestaciones.",
  },
];

export default function Guia() {
  return (
    <div className="space-y-8">
      <div>
        <span className="chip">
          <BookOpen size={13} />
          Guía de referencia
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-navy">Cómo se calcula cada concepto</h2>
        <p className="mt-1 text-sm text-muted">
          Fórmulas, parámetros vigentes y preguntas frecuentes. Información orientativa.
        </p>
      </div>

      <section>
        <h3 className="mb-3 text-[16px] font-semibold text-navy">Fórmulas</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FORMULAS.map((f) => (
            <div key={f.c} className="card-modern p-4">
              <p className="text-[13.5px] font-semibold text-navy">{f.c}</p>
              <p className="mt-1.5 rounded-lg bg-slate-50 px-3 py-2 font-mono text-[11.5px] text-navy">
                {f.f}
              </p>
              <p className="mt-1.5 text-[11px] text-muted">{f.n}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[16px] font-semibold text-navy">Parámetros por año (SMMLV / auxilio / UVT)</h3>
        <div className="card-modern overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-slate-50/70 text-[11px] uppercase tracking-wide text-muted">
                  <th className="px-4 py-2.5 font-medium">Año</th>
                  <th className="px-4 py-2.5 text-right font-medium">SMMLV</th>
                  <th className="px-4 py-2.5 text-right font-medium">Auxilio</th>
                  <th className="px-4 py-2.5 text-right font-medium">UVT</th>
                </tr>
              </thead>
              <tbody>
                {ANIOS_DISPONIBLES.map((anio) => {
                  const p = PARAMETROS[anio];
                  return (
                    <tr key={anio} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-2.5 font-medium text-navy">{anio}</td>
                      <td className="px-4 py-2.5 text-right text-muted">{formatCOP(p.smmlv)}</td>
                      <td className="px-4 py-2.5 text-right text-muted">{formatCOP(p.auxilioTransporte)}</td>
                      <td className="px-4 py-2.5 text-right text-muted">{formatCOP(p.uvt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="border-t border-border px-4 py-3 text-[11.5px] text-muted">
            Valores por decreto anual. Nota 2026: el Decreto 1469 de 2025 fue suspendido
            provisionalmente y reafirmado en febrero de 2026. Verifica la fuente oficial.
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[16px] font-semibold text-navy">Preguntas frecuentes</h3>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <div key={item.q} className="card-modern p-5">
              <h4 className="flex items-start gap-2 text-[13.5px] font-semibold text-navy">
                <Info size={15} className="mt-0.5 shrink-0 text-emerald" />
                {item.q}
              </h4>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
