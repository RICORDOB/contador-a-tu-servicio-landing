"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  History,
  Download,
  Upload,
  Trash2,
  FileText,
  ArrowRight,
  Calculator,
  AlertTriangle,
} from "lucide-react";
import { formatCOP, formatearFecha, type ResultadoLiquidacion } from "@contador/shared";
import {
  eliminarCaso,
  exportarCasosJSON,
  importarCasosJSON,
  limpiarCasos,
  type CasoGuardado,
} from "@/lib/liquida/storage";
import { descargarTexto } from "@/lib/liquida/descargas";
import Resultado from "./Resultado";

interface Props {
  casos: CasoGuardado[];
  setCasos: (c: CasoGuardado[]) => void;
  onAbrirCaso: (r: ResultadoLiquidacion) => void;
  onNuevo: () => void;
}

export default function Historial({ casos, setCasos, onAbrirCaso, onNuevo }: Props) {
  const [casoAbierto, setCasoAbierto] = useState<CasoGuardado | null>(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const inputArchivo = useRef<HTMLInputElement>(null);

  function eliminar(id: string) {
    setCasos(eliminarCaso(id));
    if (casoAbierto?.id === id) setCasoAbierto(null);
    setConfirmarEliminar(null);
    setMensaje("Caso eliminado del historial.");
  }

  function exportar() {
    descargarTexto(
      `historial-liquidaciones-${new Date().toISOString().slice(0, 10)}.json`,
      exportarCasosJSON(casos),
      "application/json;charset=utf-8",
    );
  }

  async function importar(e: ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    const r = importarCasosJSON(await archivo.text());
    setCasos(r.casos);
    setMensaje(r.error ? r.error : `Se importaron ${r.importados} caso(s).`);
    if (inputArchivo.current) inputArchivo.current.value = "";
  }

  function vaciarTodo() {
    limpiarCasos();
    setCasos([]);
    setCasoAbierto(null);
    setConfirmarEliminar(null);
    setMensaje("Historial vaciado.");
  }

  if (casoAbierto) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setCasoAbierto(null)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
        >
          <ArrowRight size={14} className="rotate-180" />
          Volver al historial
        </button>
        <Resultado
          resultado={casoAbierto.resultado}
          guardado
          onEditar={() => {
            onAbrirCaso(casoAbierto.resultado);
            setCasoAbierto(null);
          }}
          onGuardar={() => undefined}
          onIrAHistorial={() => setCasoAbierto(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="chip">
            <History size={13} />
            Historial local
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-navy">Liquidaciones guardadas</h2>
          <p className="mt-1 text-sm text-muted">
            Cada caso se guarda solo en este navegador.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportar} disabled={casos.length === 0} className="btn-navy px-3.5 py-2 text-sm disabled:opacity-50">
            <Download size={14} />
            Exportar JSON
          </button>
          <button type="button" onClick={() => inputArchivo.current?.click()} className="btn-navy px-3.5 py-2 text-sm">
            <Upload size={14} />
            Importar JSON
          </button>
          <input ref={inputArchivo} type="file" accept=".json,application/json" onChange={importar} className="sr-only" />
          {casos.length > 0 ? (
            <button type="button" onClick={() => setConfirmarEliminar("__todo__")} className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">
              <Trash2 size={14} />
              Vaciar
            </button>
          ) : null}
        </div>
      </div>

      {mensaje ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-[12.5px] text-emerald-900">
          {mensaje}
        </div>
      ) : null}

      {confirmarEliminar ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-[12.5px] text-rose-900">
          <p className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle size={14} />
            ¿Eliminar datos?
          </p>
          <p className="mt-1">
            {confirmarEliminar === "__todo__"
              ? "Esto elimina todos los casos guardados en este navegador. No elimina los archivos PDF/CSV/JSON ya exportados."
              : "Esto elimina este caso del historial."}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => (confirmarEliminar === "__todo__" ? vaciarTodo() : eliminar(confirmarEliminar))}
              className="rounded-xl bg-rose-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              Sí, eliminar
            </button>
            <button
              type="button"
              onClick={() => setConfirmarEliminar(null)}
              className="rounded-xl border border-border px-3.5 py-2 text-sm font-medium text-navy hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}

      {casos.length === 0 ? (
        <div className="card-modern p-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-muted">
            <History size={22} />
          </span>
          <p className="mt-3 text-[14px] font-medium text-navy">No hay casos guardados todavía</p>
          <p className="mx-auto mt-1 max-w-md text-[12.5px] text-muted">
            Calcula una liquidación y usa «Guardar caso». Los datos quedan solo en este navegador.
          </p>
          <button type="button" onClick={onNuevo} className="btn-primary mt-4 px-4 py-2.5 text-sm">
            <Calculator size={15} />
            Calcular liquidación
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {casos.map((caso) => (
            <div key={caso.id} className="card-modern flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-navy">{caso.titulo}</p>
                <p className="mt-0.5 text-[12px] text-muted">
                  {formatearFecha(caso.entrada.contrato.fechaIngreso)} →{" "}
                  {formatearFecha(caso.entrada.contrato.fechaRetiro)} · {caso.resultado.diasTotales} días
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10.5px] uppercase tracking-wide text-muted">Neto</p>
                  <p className="text-[16px] font-semibold text-emerald">
                    {formatCOP(caso.resultado.netoPagar)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCasoAbierto(caso)}
                  className="btn-navy px-3 py-2 text-xs"
                >
                  <FileText size={13} />
                  Abrir
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmarEliminar(caso.id)}
                  className="inline-flex items-center rounded-xl px-2 py-2 text-muted hover:text-rose-600"
                  aria-label={`Eliminar ${caso.titulo}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
