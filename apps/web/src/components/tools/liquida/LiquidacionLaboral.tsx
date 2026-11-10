"use client";

import { useEffect, useState } from "react";
import {
  Calculator,
  Table2,
  History,
  BookOpen,
  ShieldCheck,
  Lock,
  ArrowRight,
  X,
} from "lucide-react";
import {
  FORMULARIO_INICIAL,
  formularioDesdeEntrada,
  type FormularioLiquidacion,
  type ResultadoLiquidacion,
} from "@contador/shared";
import {
  cargarBorrador,
  guardarBorrador,
  guardarCaso,
  listarCasos,
  nuevoId,
  type CasoGuardado,
} from "@/lib/liquida/storage";
import LiquidacionForm from "./LiquidacionForm";
import LoteCsv from "./LoteCsv";
import Historial from "./Historial";
import Guia from "./Guia";
import Legal from "./Legal";

type Vista = "liquidacion" | "lote" | "historial" | "guia" | "legal";

const TABS: { id: Vista; label: string; icon: typeof Calculator }[] = [
  { id: "liquidacion", label: "Liquidación", icon: Calculator },
  { id: "lote", label: "Lote CSV", icon: Table2 },
  { id: "historial", label: "Historial", icon: History },
  { id: "guia", label: "Guía", icon: BookOpen },
  { id: "legal", label: "Legal", icon: ShieldCheck },
];

const CLAVE_AVISO = "liquida-laboral:aviso-aceptado:v1";

export default function LiquidacionLaboral() {
  const [vista, setVista] = useState<Vista>("liquidacion");
  const [formulario, setFormulario] = useState<FormularioLiquidacion>(() => {
    if (typeof window === "undefined") return FORMULARIO_INICIAL;
    return cargarBorrador() ?? FORMULARIO_INICIAL;
  });
  const [casos, setCasos] = useState<CasoGuardado[]>(() => {
    if (typeof window === "undefined") return [];
    return listarCasos();
  });
  const [avisoAceptado, setAvisoAceptado] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem(CLAVE_AVISO) === "1";
    } catch {
      return true;
    }
  });
  const [checkAviso, setCheckAviso] = useState(false);

  useEffect(() => {
    guardarBorrador(formulario);
  }, [formulario]);

  function aceptarAviso() {
    try {
      window.localStorage.setItem(CLAVE_AVISO, "1");
    } catch {
      /* sin almacenamiento */
    }
    setAvisoAceptado(true);
  }

  function guardarCasoActual(resultado: ResultadoLiquidacion) {
    const caso: CasoGuardado = {
      id: nuevoId(),
      creadoEn: new Date().toISOString(),
      titulo: resultado.entrada.empleado.nombre || "Trabajador sin nombre",
      entrada: resultado.entrada,
      resultado,
    };
    setCasos(guardarCaso(caso));
  }

  function abrirCaso(resultado: ResultadoLiquidacion) {
    setFormulario(formularioDesdeEntrada(resultado.entrada));
    setVista("liquidacion");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nuevaLiquidacion() {
    setFormulario(FORMULARIO_INICIAL);
    setVista("liquidacion");
  }

  return (
    <div>
      {/* Selector de pestañas */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const activo = vista === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setVista(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                activo
                  ? "bg-navy text-white shadow-sm"
                  : "border border-border bg-card text-muted hover:border-emerald/40 hover:text-navy"
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {vista === "liquidacion" && (
        <LiquidacionForm
          formulario={formulario}
          setFormulario={setFormulario}
          onGuardarCaso={guardarCasoActual}
          onIrAHistorial={() => setVista("historial")}
        />
      )}
      {vista === "lote" && <LoteCsv />}
      {vista === "historial" && (
        <Historial
          casos={casos}
          setCasos={setCasos}
          onAbrirCaso={abrirCaso}
          onNuevo={nuevaLiquidacion}
        />
      )}
      {vista === "guia" && <Guia />}
      {vista === "legal" && <Legal />}

      {/* Modal de primer uso */}
      {!avisoAceptado ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl">
            <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
              <p className="flex items-center gap-2 text-[15px] font-semibold">
                <ShieldCheck size={18} />
                Antes de continuar
              </p>
              <button
                type="button"
                onClick={() => setAvisoAceptado(true)}
                aria-label="Cerrar"
                className="text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-5 text-[13px] leading-relaxed text-muted">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  Los resultados son <strong className="text-navy">orientativos</strong>{" "}
                  y no reemplazan la revisión de un contador o abogado laboralista.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  Usted es responsable de la exactitud de los datos y de contar con
                  autorización para tratarlos.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  Verifique el salario mínimo, el auxilio de transporte, la UVT y los
                  recargos del año.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  Los datos se guardan solo en este navegador; si el equipo es
                  compartido, use un perfil exclusivo y borre la información al terminar.
                </li>
              </ul>
            </div>
            <div className="border-t border-border p-5">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={checkAviso}
                  onChange={(e) => setCheckAviso(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-emerald focus:ring-emerald"
                />
                <span className="text-[12.5px] leading-snug text-muted">
                  Entiendo y acepto. Los datos no salen de este navegador.
                </span>
              </label>
              <button
                type="button"
                disabled={!checkAviso}
                onClick={aceptarAviso}
                className="btn-primary mt-4 w-full px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continuar
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted">
        <Lock size={13} />
        Cálculo 100% local: tus datos no salen de este navegador.
      </p>
    </div>
  );
}
