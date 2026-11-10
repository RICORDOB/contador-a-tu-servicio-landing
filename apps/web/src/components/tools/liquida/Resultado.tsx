"use client";

import {
  CheckCircle2,
  Download,
  Edit3,
  Lock,
  ShieldCheck,
  AlertTriangle,
  Info,
  Save,
  ArrowRight,
  FileText,
} from "lucide-react";
import {
  formatCOP,
  formatDias,
  ADVERTENCIA_GENERAL,
  type ResultadoLiquidacion,
} from "@contador/shared";
import { descargarTexto, slugArchivo } from "@/lib/liquida/descargas";

const ETIQUETAS_MOTIVO: Record<string, string> = {
  renuncia: "Renuncia voluntaria",
  despido_sin_justa: "Despido sin justa causa",
  despido_con_justa: "Despido con justa causa",
  mutuo_acuerdo: "Mutuo acuerdo",
  fin_plazo: "Fin del plazo pactado",
  fin_obra: "Fin de la obra o labor",
};

interface Props {
  resultado: ResultadoLiquidacion;
  guardado: boolean;
  onEditar: () => void;
  onGuardar: () => void;
  onIrAHistorial: () => void;
}

export default function Resultado({
  resultado,
  guardado,
  onEditar,
  onGuardar,
  onIrAHistorial,
}: Props) {
  const { entrada } = resultado;
  const nombre = entrada.empleado.nombre || "Trabajador";

  async function exportarPDF() {
    const { descargarPDF } = await import("@/lib/liquida/pdf");
    descargarPDF(resultado);
  }

  async function exportarCSV() {
    const { exportarResultadosCSV } = await import("@/lib/liquida/csv");
    const csv = exportarResultadosCSV([{ fila: 1, entrada, resultado }]);
    descargarTexto(
      `liquidacion-${slugArchivo(nombre)}-${entrada.contrato.fechaRetiro}.csv`,
      csv,
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="chip">
            <CheckCircle2 size={13} />
            Liquidación calculada
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-navy">{nombre}</h2>
          <p className="mt-1 text-[13px] text-muted">
            {resultado.diasTotales} días ·{" "}
            {ETIQUETAS_MOTIVO[entrada.terminacion.motivo] ?? entrada.terminacion.motivo}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onEditar} className="btn-navy px-3.5 py-2 text-sm">
            <Edit3 size={14} />
            Editar
          </button>
          <button type="button" onClick={onGuardar} className="btn-primary px-3.5 py-2 text-sm">
            <Save size={14} />
            {guardado ? "Guardado" : "Guardar caso"}
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-modern border-emerald/40 bg-gradient-to-br from-emerald/10 to-emerald/5 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-emerald">
            Neto a pagar
          </p>
          <p className="mt-1.5 text-[24px] font-semibold tracking-tight text-navy">
            {formatCOP(resultado.netoPagar)}
          </p>
        </div>
        <div className="card-modern p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            Total devengado
          </p>
          <p className="mt-1.5 text-[19px] font-semibold text-navy">
            {formatCOP(resultado.totalDevengado)}
          </p>
        </div>
        <div className="card-modern p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            Deducciones
          </p>
          <p className="mt-1.5 text-[19px] font-semibold text-navy">
            {formatCOP(resultado.totalDeducciones)}
          </p>
        </div>
        <div className="card-modern p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            Tiempo liquidado
          </p>
          <p className="mt-1.5 text-[19px] font-semibold text-navy">
            {formatDias(resultado.aniosEquivalentes)} años
          </p>
        </div>
      </div>

      {resultado.advertencias.length > 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-[12.5px] text-amber-900">
          <p className="mb-1 flex items-center gap-1.5 font-semibold">
            <AlertTriangle size={14} />
            Advertencias del cálculo
          </p>
          <ul className="list-disc space-y-1 pl-4">
            {resultado.advertencias.map((a, i) => (
              <li key={`${a}-${i}`}>{a}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Devengos */}
      <div className="card-modern overflow-hidden">
        <div className="border-b border-border px-5 py-3.5">
          <h3 className="text-[14px] font-semibold text-navy">Devengos</h3>
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-border bg-slate-50/70 text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-2.5 font-medium">Concepto</th>
                <th className="px-4 py-2.5 text-right font-medium">Base</th>
                <th className="px-4 py-2.5 text-right font-medium">Días</th>
                <th className="px-4 py-2.5 text-right font-medium">Valor</th>
                <th className="px-4 py-2.5 font-medium">Norma</th>
              </tr>
            </thead>
            <tbody>
              {resultado.conceptos.map((c) => (
                <tr key={c.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 align-top">
                    <span className="font-medium text-navy">{c.nombre}</span>
                    {c.detalle ? (
                      <span className="mt-1 block space-y-0.5 font-mono text-[10.5px] leading-relaxed text-muted">
                        {c.detalle.map((linea) => (
                          <span key={linea} className="block">
                            {linea}
                          </span>
                        ))}
                      </span>
                    ) : null}
                    {c.nota ? (
                      <span className="mt-0.5 block max-w-[260px] text-[11px] leading-relaxed text-muted">
                        {c.nota}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-right align-top text-muted">
                    {formatCOP(c.base)}
                  </td>
                  <td className="px-4 py-3 text-right align-top text-muted">
                    {formatDias(c.dias)}
                  </td>
                  <td className="px-4 py-3 text-right align-top font-semibold text-navy">
                    {formatCOP(c.valor)}
                  </td>
                  <td className="px-4 py-3 align-top text-[11px] text-muted">{c.norma}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/80">
                <td colSpan={3} className="px-4 py-3 text-right text-[12px] font-medium text-muted">
                  Total devengado
                </td>
                <td className="px-4 py-3 text-right text-[14px] font-semibold text-navy">
                  {formatCOP(resultado.totalDevengado)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Móvil */}
        <div className="divide-y divide-border md:hidden">
          {resultado.conceptos.map((c) => (
            <div key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[13px] font-medium text-navy">{c.nombre}</span>
                <span className="shrink-0 text-[13px] font-semibold text-navy">
                  {formatCOP(c.valor)}
                </span>
              </div>
              <p className="mt-1 text-[10.5px] text-muted">
                Base {formatCOP(c.base)} · {formatDias(c.dias)} días · {c.norma}
              </p>
              {c.detalle ? (
                <div className="mt-1.5 space-y-0.5 font-mono text-[10.5px] leading-relaxed text-muted">
                  {c.detalle.map((linea) => (
                    <p key={linea}>{linea}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Deducciones */}
      {resultado.deducciones.length > 0 ? (
        <div className="card-modern overflow-hidden">
          <div className="border-b border-border px-5 py-3.5">
            <h3 className="text-[14px] font-semibold text-navy">Deducciones</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-slate-50/70 text-[11px] uppercase tracking-wide text-muted">
                  <th className="px-4 py-2.5 font-medium">Concepto</th>
                  <th className="px-4 py-2.5 text-right font-medium">Base</th>
                  <th className="px-4 py-2.5 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {resultado.deducciones.map((d) => (
                  <tr key={d.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">
                      <span className="font-medium text-navy">{d.nombre}</span>
                      {d.nota ? (
                        <span className="mt-0.5 block text-[11px] text-muted">{d.nota}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right text-muted">{formatCOP(d.base)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-rose-700">
                      -{formatCOP(d.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Acciones */}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={exportarPDF} className="btn-primary px-4 py-2.5 text-sm">
          <Download size={15} />
          Descargar PDF
        </button>
        <button type="button" onClick={exportarCSV} className="btn-navy px-4 py-2.5 text-sm">
          <FileText size={15} />
          Descargar CSV
        </button>
        <button type="button" onClick={onGuardar} className="btn-gold px-4 py-2.5 text-sm">
          <Save size={15} />
          {guardado ? "Caso guardado" : "Guardar en historial"}
        </button>
        {guardado ? (
          <button
            type="button"
            onClick={onIrAHistorial}
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-navy hover:bg-slate-100"
          >
            Ver historial
            <ArrowRight size={14} />
          </button>
        ) : null}
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-[11.5px] leading-relaxed text-muted">
        <p className="mb-1 flex items-center gap-1.5 font-medium text-navy">
          <ShieldCheck size={13} />
          Parámetros y alcance
        </p>
        <p>
          SMMLV {resultado.parametros.anio}: {formatCOP(resultado.parametros.smmlv)} · Auxilio:{" "}
          {formatCOP(resultado.parametros.auxilioTransporte)} · UVT:{" "}
          {formatCOP(resultado.parametros.uvt)}
        </p>
        <p className="mt-2">{ADVERTENCIA_GENERAL}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[11px]">
          <Lock size={11} />
          Cálculo local: los datos no salen de este navegador.
        </p>
      </div>
    </div>
  );
}
