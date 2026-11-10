"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Table2,
  Upload,
  Download,
  Calculator,
  AlertTriangle,
  Info,
} from "lucide-react";
import { anioVigente, ANIOS_DISPONIBLES, formatCOP } from "@contador/shared";
import {
  parsearLote,
  exportarResultadosCSV,
  exportarErroresCSV,
  plantillaCSV,
  type ResultadoLote,
  type FilaLote,
} from "@/lib/liquida/csv";
import { descargarTexto } from "@/lib/liquida/descargas";

const inputCls =
  "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20 placeholder:text-muted";

export default function LoteCsv() {
  const [anio, setAnio] = useState(String(anioVigente()));
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [textoPegado, setTextoPegado] = useState("");
  const [lote, setLote] = useState<ResultadoLote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalNeto = useMemo(
    () => lote?.filas.reduce((t, f) => t + f.resultado.netoPagar, 0) ?? 0,
    [lote],
  );

  function procesar(texto: string) {
    setError(null);
    const resultado = parsearLote(texto, Number(anio));
    if (resultado.totalFilas === 0) {
      setLote(null);
      setError("No se encontraron filas. Revisa que el archivo tenga encabezados y datos.");
      return;
    }
    setLote(resultado);
  }

  async function alSeleccionarArchivo(e: ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setNombreArchivo(archivo.name);
    procesar(await archivo.text());
  }

  async function descargarPDF(fila: FilaLote) {
    const { descargarPDF: pdf } = await import("@/lib/liquida/pdf");
    pdf(fila.resultado);
  }

  return (
    <div className="space-y-6">
      <div className="card-modern p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
          <span className="icon-tile h-9 w-9">
            <Table2 size={18} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-navy">Liquida varios trabajadores desde un CSV</h2>
            <p className="text-xs text-muted">
              Descarga la plantilla, complétala y súbela. Los errores de una fila no bloquean a las demás.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-navy">Año de parámetros</label>
              <select className={inputCls} value={anio} onChange={(e) => setAnio(e.target.value)}>
                {ANIOS_DISPONIBLES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">Archivo CSV</label>
              <label
                htmlFor="archivoLote"
                className="mt-1 flex h-[42px] cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border bg-slate-50 px-3 text-[12.5px] text-muted transition hover:border-emerald hover:bg-emerald/5"
              >
                <Upload size={15} />
                <span className="truncate">{nombreArchivo || "Seleccionar archivo..."}</span>
              </label>
              <input
                id="archivoLote"
                type="file"
                accept=".csv,text/csv"
                onChange={alSeleccionarArchivo}
                className="sr-only"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy">O pega el CSV</label>
            <textarea
              rows={6}
              className={`${inputCls} font-mono text-[11.5px]`}
              value={textoPegado}
              onChange={(e) => setTextoPegado(e.target.value)}
              placeholder="documento;nombre;fecha_ingreso;fecha_retiro;salario_minimo;..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => procesar(textoPegado)}
              disabled={!textoPegado.trim()}
              className="btn-primary px-4 py-2.5 text-sm disabled:opacity-50"
            >
              <Calculator size={15} />
              Procesar texto
            </button>
            <button
              type="button"
              onClick={() => descargarTexto("plantilla-liquidacion-laboral.csv", plantillaCSV())}
              className="btn-navy px-4 py-2.5 text-sm"
            >
              <Download size={15} />
              Descargar plantilla
            </button>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-[12.5px] text-rose-900">
              <p className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle size={14} />
                {error}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-[11.5px] leading-relaxed text-muted">
        <p className="mb-1 flex items-center gap-1.5 font-medium text-navy">
          <Info size={13} />
          Columnas de la plantilla
        </p>
        <p>
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">documento</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">nombre</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">fecha_ingreso</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">fecha_retiro</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">tipo_contrato</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">salario_basico</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">salario_minimo</code>{" "}
          (si/no), <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">auxilio_transporte</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10.5px]">motivo_terminacion</code>.
        </p>
      </div>

      {lote ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="card-modern p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted">Filas leídas</p>
              <p className="mt-1 text-[20px] font-semibold text-navy">{lote.totalFilas}</p>
            </div>
            <div className="card-modern p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted">Procesadas</p>
              <p className="mt-1 text-[20px] font-semibold text-emerald">{lote.filas.length}</p>
            </div>
            <div className="card-modern p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted">Con errores</p>
              <p className="mt-1 text-[20px] font-semibold text-rose-600">{lote.errores.length}</p>
            </div>
            <div className="card-modern border-emerald/40 bg-emerald/5 p-4">
              <p className="text-[11px] uppercase tracking-wide text-emerald">Neto total</p>
              <p className="mt-1 text-[18px] font-semibold text-navy">{formatCOP(totalNeto)}</p>
            </div>
          </div>

          {lote.filas.length > 0 ? (
            <div className="card-modern overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <h3 className="text-[14px] font-semibold text-navy">Resultados ({lote.filas.length})</h3>
                <button
                  type="button"
                  onClick={() =>
                    descargarTexto("resultados-liquidacion.csv", exportarResultadosCSV(lote.filas))
                  }
                  className="btn-primary px-3.5 py-2 text-sm"
                >
                  <Download size={14} />
                  Resultados CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12.5px]">
                  <thead>
                    <tr className="border-b border-border bg-slate-50/70 text-[11px] uppercase tracking-wide text-muted">
                      <th className="px-4 py-2.5 font-medium">Fila</th>
                      <th className="px-4 py-2.5 font-medium">Trabajador</th>
                      <th className="px-4 py-2.5 text-right font-medium">Días</th>
                      <th className="px-4 py-2.5 text-right font-medium">Neto</th>
                      <th className="px-4 py-2.5 text-right font-medium">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lote.filas.map((fila) => (
                      <tr key={`${fila.fila}-${fila.entrada.empleado.documento}`} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 text-muted">{fila.fila}</td>
                        <td className="px-4 py-3 font-medium text-navy">{fila.entrada.empleado.nombre}</td>
                        <td className="px-4 py-3 text-right text-muted">{fila.resultado.diasTotales}</td>
                        <td className="px-4 py-3 text-right font-semibold text-navy">
                          {formatCOP(fila.resultado.netoPagar)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => descargarPDF(fila)}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-navy hover:bg-slate-100"
                            aria-label={`PDF de ${fila.entrada.empleado.nombre}`}
                          >
                            <Download size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {lote.errores.length > 0 ? (
            <div className="card-modern overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <h3 className="text-[14px] font-semibold text-navy">Filas con errores ({lote.errores.length})</h3>
                <button
                  type="button"
                  onClick={() =>
                    descargarTexto("errores-liquidacion.csv", exportarErroresCSV(lote.errores))
                  }
                  className="btn-navy px-3.5 py-2 text-sm"
                >
                  <Download size={14} />
                  Errores CSV
                </button>
              </div>
              <div className="divide-y divide-border">
                {lote.errores.map((fila) => (
                  <div key={`${fila.fila}-${fila.documento}`} className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-medium text-rose-700">
                        Fila {fila.fila}
                      </span>
                      <span className="text-[12.5px] font-medium text-navy">
                        {fila.nombre || "Sin nombre"}
                      </span>
                    </div>
                    <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-[11.5px] text-rose-700">
                      {fila.errores.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
