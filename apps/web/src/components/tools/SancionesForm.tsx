"use client";

import { useState } from "react";
import {
  calcularSancion,
  formatCOP,
  TIPOS_IMPUESTO,
  type TipoImpuesto,
} from "@contador/shared";

export default function SancionesForm() {
  const [tipoImpuesto, setTipoImpuesto] = useState<TipoImpuesto>("RENTA");
  const [baseGravable, setBaseGravable] = useState("");
  const [mesesRetraso, setMesesRetraso] = useState("1");
  const [presentoExtemporaneo, setPresentoExtemporaneo] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calcularSancion> | null>(
    null
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const base = parseFloat(baseGravable.replace(/\D/g, "")) || 0;
    const meses = parseInt(mesesRetraso, 10) || 1;
    if (base <= 0) return;
    setResult(
      calcularSancion({
        tipoImpuesto,
        baseGravable: base,
        mesesRetraso: Math.min(60, Math.max(1, meses)),
        presentoExtemporaneo,
      })
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="card-modern card-hover p-7"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy">
              Tipo de impuesto
            </label>
            <select
              value={tipoImpuesto}
              onChange={(e) => setTipoImpuesto(e.target.value as TipoImpuesto)}
              className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
            >
              {TIPOS_IMPUESTO.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy">
              Base gravable (COP)
            </label>
            <input
              type="text"
              inputMode="numeric"
              required
              placeholder="Ej: 50000000"
              value={baseGravable}
              onChange={(e) => setBaseGravable(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy">
              Meses de retraso
            </label>
            <input
              type="number"
              min={1}
              max={60}
              required
              value={mesesRetraso}
              onChange={(e) => setMesesRetraso(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={presentoExtemporaneo}
              onChange={(e) => setPresentoExtemporaneo(e.target.checked)}
              className="accent-emerald"
            />
            Presentó extemporáneamente (reducción 50%)
          </label>
        </div>
        <button
          type="submit"
          className="btn-primary mt-6 w-full py-3 text-sm"
        >
          Calcular sanción estimada
        </button>
      </form>

      <div className="card-modern bg-slate-50 p-7">
        {result ? (
          <>
            <p className="text-sm text-slate-600">Sanción estimada</p>
            <p className="mt-1 text-4xl font-bold text-navy">
              {formatCOP(result.sancionEstimada)}
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Porcentaje aplicado</dt>
                <dd>{(result.desglose.porcentajeAplicado * 100).toFixed(0)}%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Tope UVT</dt>
                <dd>{result.desglose.topeUVT} UVT</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">UVT vigente</dt>
                <dd>{formatCOP(result.desglose.uvtUtilizado)}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-amber-800">
              {result.disclaimer}
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Completa el formulario para ver el resultado estimado.
          </p>
        )}
      </div>
    </div>
  );
}