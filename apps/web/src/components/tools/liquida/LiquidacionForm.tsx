"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Calculator,
  Scale,
  Users,
  AlertTriangle,
  Info,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import {
  aEntrada,
  calcularLiquidacion,
  validarEntrada,
  getParametros,
  ANIOS_DISPONIBLES,
  anioVigente,
  formatCOP,
  type FormularioLiquidacion,
  type MotivoTerminacion,
  type ResultadoLiquidacion,
  type TipoContrato,
  type TipoSalario,
} from "@contador/shared";
import Resultado from "./Resultado";

const inputCls =
  "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20 placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50";

const ETIQUETAS_CONTRATO: Record<TipoContrato, string> = {
  indefinido: "Término indefinido",
  fijo: "Término fijo",
  obra: "Obra o labor",
};

const ETIQUETAS_SALARIO: Record<TipoSalario, string> = {
  fijo: "Fijo",
  variable: "Variable",
  integral: "Integral",
};

const ETIQUETAS_MOTIVO: Record<MotivoTerminacion, string> = {
  renuncia: "Renuncia voluntaria",
  despido_sin_justa: "Despido sin justa causa",
  despido_con_justa: "Despido con justa causa",
  mutuo_acuerdo: "Mutuo acuerdo",
  fin_plazo: "Fin del plazo pactado",
  fin_obra: "Fin de la obra o labor",
};

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 flex items-start gap-1 text-xs font-medium text-rose-600">
          <AlertTriangle size={12} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs leading-relaxed text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

interface Props {
  formulario: FormularioLiquidacion;
  setFormulario: (f: FormularioLiquidacion) => void;
  onGuardarCaso: (r: ResultadoLiquidacion) => void;
  onIrAHistorial: () => void;
}

export default function LiquidacionForm({
  formulario,
  setFormulario,
  onGuardarCaso,
  onIrAHistorial,
}: Props) {
  const [paso, setPaso] = useState<"formulario" | "resultado">("formulario");
  const [resultadoFinal, setResultadoFinal] = useState<ResultadoLiquidacion | null>(null);
  const [mostrarErrores, setMostrarErrores] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const entrada = useMemo(() => aEntrada(formulario), [formulario]);
  const validacion = useMemo(() => validarEntrada(entrada), [entrada]);
  const erroresPorCampo = useMemo(
    () => new Map(validacion.errores.map((e) => [e.campo, e.mensaje])),
    [validacion.errores],
  );

  const preview = useMemo(() => {
    if (!validacion.ok) return null;
    try {
      return calcularLiquidacion(entrada);
    } catch {
      return null;
    }
  }, [entrada, validacion.ok]);

  const parametros = getParametros(Number(formulario.anioParametros) || anioVigente());
  const error = (campo: string) => (mostrarErrores ? erroresPorCampo.get(campo) : undefined);

  function actualizar<K extends keyof FormularioLiquidacion>(
    campo: K,
    valor: FormularioLiquidacion[K],
  ) {
    setFormulario({ ...formulario, [campo]: valor });
  }

  function calcular() {
    setMostrarErrores(true);
    if (!validacion.ok || !preview) return;
    setResultadoFinal(preview);
    setPaso("resultado");
    setGuardado(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function guardar() {
    if (!resultadoFinal) return;
    onGuardarCaso(resultadoFinal);
    setGuardado(true);
    window.setTimeout(() => setGuardado(false), 2500);
  }

  if (paso === "resultado" && resultadoFinal) {
    return (
      <Resultado
        resultado={resultadoFinal}
        guardado={guardado}
        onEditar={() => setPaso("formulario")}
        onGuardar={guardar}
        onIrAHistorial={onIrAHistorial}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        {/* Trabajador y contrato */}
        <div className="card-modern p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
            <span className="icon-tile h-9 w-9">
              <Users size={18} />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-navy">Trabajador y contrato</h2>
              <p className="text-xs text-muted">Datos mínimos de la relación laboral.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre completo" htmlFor="nombre" error={error("nombre")}>
              <input
                id="nombre"
                className={inputCls}
                value={formulario.nombre}
                onChange={(e) => actualizar("nombre", e.target.value)}
                placeholder="Ana María Pérez"
                autoComplete="off"
              />
            </Field>
            <Field label="Documento" htmlFor="documento" hint="Opcional. Solo identifica el caso.">
              <input
                id="documento"
                className={inputCls}
                value={formulario.documento}
                onChange={(e) => actualizar("documento", e.target.value)}
                placeholder="C.C. 1.234.567.890"
                autoComplete="off"
              />
            </Field>
            <Field label="Tipo de contrato" htmlFor="tipoContrato">
              <div className="relative">
                <select
                  id="tipoContrato"
                  className={`${inputCls} appearance-none pr-9`}
                  value={formulario.tipoContrato}
                  onChange={(e) => actualizar("tipoContrato", e.target.value as TipoContrato)}
                >
                  {Object.entries(ETIQUETAS_CONTRATO).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </Field>
            <Field label="Fecha de ingreso" htmlFor="fechaIngreso" error={error("fechaIngreso")}>
              <input
                id="fechaIngreso"
                type="date"
                className={inputCls}
                value={formulario.fechaIngreso}
                onChange={(e) => actualizar("fechaIngreso", e.target.value)}
              />
            </Field>
            <Field label="Fecha de retiro" htmlFor="fechaRetiro" error={error("fechaRetiro")}>
              <input
                id="fechaRetiro"
                type="date"
                className={inputCls}
                value={formulario.fechaRetiro}
                onChange={(e) => actualizar("fechaRetiro", e.target.value)}
              />
            </Field>
            {formulario.tipoContrato === "fijo" ? (
              <Field
                label="Fecha de fin del contrato"
                htmlFor="fechaFinContrato"
                error={error("fechaFinContrato")}
                hint="Necesaria para la indemnización si se termina antes."
              >
                <input
                  id="fechaFinContrato"
                  type="date"
                  className={inputCls}
                  value={formulario.fechaFinContrato}
                  onChange={(e) => actualizar("fechaFinContrato", e.target.value)}
                />
              </Field>
            ) : null}
          </div>
        </div>

        {/* Salario */}
        <div className="card-modern p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
            <span className="icon-tile h-9 w-9">
              <Calculator size={18} />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-navy">Salario y base de prestaciones</h2>
              <p className="text-xs text-muted">El auxilio entra en cesantías y prima, no en vacaciones.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-emerald/30 bg-emerald/5 p-3">
              <input
                type="checkbox"
                checked={formulario.salarioEsMinimo}
                onChange={(e) => actualizar("salarioEsMinimo", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-emerald focus:ring-emerald"
              />
              <span>
                <span className="block text-sm font-medium text-navy">
                  El trabajador devenga el salario mínimo
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                  Se usa el SMMLV y el auxilio vigentes en cada año del contrato, para
                  liquidar periodos anteriores con el valor correcto.
                </span>
              </span>
            </label>

            <div>
              <span className="block text-sm font-medium text-navy">Tipo de salario</span>
              <div className="mt-1 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                {(["fijo", "variable", "integral"] as const).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    disabled={formulario.salarioEsMinimo}
                    onClick={() => actualizar("tipoSalario", tipo)}
                    className={`rounded-lg px-2 py-1.5 text-[12.5px] font-medium transition ${
                      formulario.salarioEsMinimo
                        ? "cursor-not-allowed opacity-40"
                        : formulario.tipoSalario === tipo
                          ? "bg-card text-navy shadow-sm"
                          : "text-muted hover:text-navy"
                    }`}
                  >
                    {ETIQUETAS_SALARIO[tipo]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Salario básico mensual"
                htmlFor="salarioBasico"
                error={error("salarioBasico")}
                hint={
                  formulario.salarioEsMinimo
                    ? "Automático: SMMLV de cada año."
                    : "Sin auxilio ni pagos variables."
                }
              >
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                    $
                  </span>
                  <input
                    id="salarioBasico"
                    inputMode="numeric"
                    className={`${inputCls} pl-7`}
                    value={formulario.salarioBasico}
                    onChange={(e) => actualizar("salarioBasico", e.target.value)}
                    placeholder={formulario.salarioEsMinimo ? "Automático (SMMLV por año)" : "1.750.905"}
                    disabled={formulario.salarioEsMinimo}
                  />
                </div>
              </Field>

              {formulario.tipoSalario === "variable" && !formulario.salarioEsMinimo ? (
                <Field
                  label="Promedio mensual de variables"
                  htmlFor="promedioVariable"
                  error={error("promedioVariable")}
                  hint="Comisiones, bonos u horas extras (12 meses)."
                >
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                      $
                    </span>
                    <input
                      id="promedioVariable"
                      inputMode="numeric"
                      className={`${inputCls} pl-7`}
                      value={formulario.promedioVariable}
                      onChange={(e) => actualizar("promedioVariable", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </Field>
              ) : (
                <Field label="Año de parámetros" htmlFor="anioParametros" hint="Define SMMLV, auxilio y UVT.">
                  <div className="relative">
                    <select
                      id="anioParametros"
                      className={`${inputCls} appearance-none pr-9`}
                      value={formulario.anioParametros}
                      onChange={(e) => actualizar("anioParametros", e.target.value)}
                    >
                      {ANIOS_DISPONIBLES.map((anio) => (
                        <option key={anio} value={anio}>
                          {anio}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                    />
                  </div>
                </Field>
              )}
            </div>

            {formulario.salarioEsMinimo ? (
              <p className="flex items-center gap-1.5 text-xs text-emerald">
                <CheckCircle2 size={13} />
                Auxilio de transporte incluido automáticamente.
              </p>
            ) : (
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={formulario.recibeAuxilioTransporte}
                  onChange={(e) => actualizar("recibeAuxilioTransporte", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-emerald focus:ring-emerald"
                />
                <span>
                  <span className="block text-sm font-medium text-navy">
                    Recibe auxilio de transporte
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    Aplica hasta 2 SMMLV ({formatCOP(parametros.smmlv * 2)}).
                  </span>
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Terminación y ajustes */}
        <div className="card-modern p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
            <span className="icon-tile h-9 w-9">
              <Scale size={18} />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-navy">Terminación y ajustes</h2>
              <p className="text-xs text-muted">El motivo define la indemnización.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Motivo de terminación" htmlFor="motivo">
              <div className="relative">
                <select
                  id="motivo"
                  className={`${inputCls} appearance-none pr-9`}
                  value={formulario.motivo}
                  onChange={(e) => actualizar("motivo", e.target.value as MotivoTerminacion)}
                >
                  {Object.entries(ETIQUETAS_MOTIVO).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </Field>

            <Field
              label="Días de vacaciones disfrutados"
              htmlFor="diasVacacionesDisfrutados"
              error={error("diasVacacionesDisfrutados")}
              hint="Días ya tomados y pagados."
            >
              <input
                id="diasVacacionesDisfrutados"
                type="number"
                min="0"
                step="0.5"
                className={inputCls}
                value={formulario.diasVacacionesDisfrutados}
                onChange={(e) => actualizar("diasVacacionesDisfrutados", e.target.value)}
              />
            </Field>

            <Field
              label="Días de salario pendiente"
              htmlFor="diasSalarioPendiente"
              error={error("diasSalarioPendiente")}
              hint="Días del último periodo sin pagar."
            >
              <input
                id="diasSalarioPendiente"
                type="number"
                min="0"
                step="0.5"
                className={inputCls}
                value={formulario.diasSalarioPendiente}
                onChange={(e) => actualizar("diasSalarioPendiente", e.target.value)}
              />
            </Field>

            <Field
              label="Cesantías consignadas hasta"
              htmlFor="cesantiasConsignadasHasta"
              error={error("cesantiasConsignadasHasta")}
              hint="Si ya consignaste al fondo, solo se liquida lo posterior."
            >
              <input
                id="cesantiasConsignadasHasta"
                type="date"
                className={inputCls}
                value={formulario.cesantiasConsignadasHasta}
                onChange={(e) => actualizar("cesantiasConsignadasHasta", e.target.value)}
              />
            </Field>

            <Field
              label="Última prima pagada hasta"
              htmlFor="ultimoPagoPrima"
              error={error("ultimoPagoPrima")}
              hint="Por defecto se asume pagada la del semestre anterior."
            >
              <input
                id="ultimoPagoPrima"
                type="date"
                className={inputCls}
                value={formulario.ultimoPagoPrima}
                onChange={(e) => actualizar("ultimoPagoPrima", e.target.value)}
              />
            </Field>

            <Field label="Otras deducciones" htmlFor="otrasDeducciones" hint="Préstamos, libranzas o embargos.">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                  $
                </span>
                <input
                  id="otrasDeducciones"
                  inputMode="numeric"
                  className={`${inputCls} pl-7`}
                  value={formulario.otrasDeducciones}
                  onChange={(e) => actualizar("otrasDeducciones", e.target.value)}
                  placeholder="0"
                />
              </div>
            </Field>

            <Field
              label="Retención en la fuente"
              htmlFor="retencionFuente"
              error={error("retencionFuente")}
              hint="Valor manual; no se calcula sola."
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                  $
                </span>
                <input
                  id="retencionFuente"
                  inputMode="numeric"
                  className={`${inputCls} pl-7`}
                  value={formulario.retencionFuente}
                  onChange={(e) => actualizar("retencionFuente", e.target.value)}
                  placeholder="0"
                />
              </div>
            </Field>
          </div>

          {formulario.tipoContrato === "indefinido" &&
          formulario.motivo === "despido_sin_justa" ? (
            <label className="mt-4 flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={formulario.preavisoDado}
                onChange={(e) => actualizar("preavisoDado", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-emerald focus:ring-emerald"
              />
              <span className="text-sm text-navy">
                Se dio preaviso de 30 días (si no, se suma el periodo).
              </span>
            </label>
          ) : null}

          <label className="mt-4 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={formulario.incluirSancionMora}
              onChange={(e) => actualizar("incluirSancionMora", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border text-emerald focus:ring-emerald"
            />
            <span className="text-sm text-navy">
              Incluir sanción por mora (un día de salario por día de retraso).
            </span>
          </label>

          {formulario.incluirSancionMora ? (
            <div className="mt-3">
              <Field
                label="Fecha de pago de la liquidación"
                htmlFor="fechaPagoLiquidacion"
                error={error("fechaPagoLiquidacion")}
              >
                <input
                  id="fechaPagoLiquidacion"
                  type="date"
                  className={inputCls}
                  value={formulario.fechaPagoLiquidacion}
                  onChange={(e) => actualizar("fechaPagoLiquidacion", e.target.value)}
                />
              </Field>
            </div>
          ) : null}
        </div>
      </div>

      {/* Preview */}
      <aside className="h-fit space-y-4 lg:sticky lg:top-24">
        <div className="card-modern overflow-hidden">
          <div className="bg-navy px-5 py-4 text-white">
            <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-white/60">
              Neto estimado
            </p>
            <p className="mt-1 text-[30px] font-semibold tracking-tight">
              {preview ? formatCOP(preview.netoPagar) : "—"}
            </p>
            <p className="mt-1 text-[11.5px] text-white/60">
              {preview
                ? `${preview.diasTotales} días · ${preview.conceptos.length} conceptos`
                : "Completa los datos para ver el cálculo"}
            </p>
          </div>

          <div className="space-y-2.5 p-5 text-[12.5px]">
            <div className="flex items-center justify-between">
              <span className="text-muted">Total devengado</span>
              <span className="font-medium text-navy">
                {preview ? formatCOP(preview.totalDevengado) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Deducciones</span>
              <span className="font-medium text-navy">
                {preview ? formatCOP(preview.totalDeducciones) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Base de prestaciones</span>
              <span className="font-medium text-navy">
                {preview ? formatCOP(preview.basePrestaciones) : "—"}
              </span>
            </div>

            {preview && preview.advertencias.length > 0 ? (
              <div className="flex items-start gap-1.5 rounded-lg bg-amber-50 px-2.5 py-2 text-[11px] text-amber-800">
                <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                {preview.advertencias.length} advertencia(s) para revisar.
              </div>
            ) : null}
          </div>

          <div className="border-t border-border p-5">
            <button
              type="button"
              onClick={calcular}
              className="btn-primary w-full px-5 py-3 text-sm"
            >
              Calcular liquidación
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {mostrarErrores && !validacion.ok ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-[12.5px] text-rose-900">
            <p className="mb-1 flex items-center gap-1.5 font-semibold">
              <AlertTriangle size={14} />
              Revisa estos datos
            </p>
            <ul className="list-disc space-y-0.5 pl-4">
              {validacion.errores.map((item) => (
                <li key={item.campo}>{item.mensaje}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rounded-xl border border-border bg-card p-4 text-[11.5px] leading-relaxed text-muted">
          <p className="mb-1 flex items-center gap-1.5 font-medium text-navy">
            <Info size={13} />
            Antes de pagar
          </p>
          <p>
            Verifica el motivo de terminación, los días de vacaciones y si las
            cesantías ya fueron consignadas. Resultado orientativo, no reemplaza a
            un contador o abogado laboralista.
          </p>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
          <Lock size={12} />
          Tus datos no salen de este navegador.
        </p>
      </aside>
    </div>
  );
}
