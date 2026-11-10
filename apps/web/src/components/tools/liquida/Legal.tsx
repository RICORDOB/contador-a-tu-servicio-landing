"use client";

import { ShieldCheck, Lock, AlertTriangle, Info } from "lucide-react";
import { ADVERTENCIA_GENERAL } from "@contador/shared";

export default function Legal() {
  return (
    <div className="space-y-6">
      <div>
        <span className="chip">
          <ShieldCheck size={13} />
          Aviso legal y privacidad
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-navy">Tus datos y esta herramienta</h2>
        <p className="mt-1 text-sm text-muted">
          Esta herramienta de estimación funciona 100% en tu navegador. No envía tus
          datos a ningún servidor.
        </p>
      </div>

      <div className="card-modern border-emerald/40 bg-emerald/5 p-5">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-navy">
          <AlertTriangle size={16} className="text-gold" />
          Resultado orientativo
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{ADVERTENCIA_GENERAL}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-modern p-5">
          <p className="flex items-center gap-2 text-[14px] font-semibold text-navy">
            <Lock size={16} className="text-emerald" />
            Privacidad
          </p>
          <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-muted">
            <li>• Los datos (nombre, documento, salario, fechas) se guardan solo en tu navegador (localStorage).</li>
            <li>• No hay analítica, cookies ni llamadas a terceros en esta herramienta.</li>
            <li>• Los archivos PDF/CSV/JSON se generan en tu dispositivo; tú decides dónde guardarlos.</li>
          </ul>
        </div>
        <div className="card-modern p-5">
          <p className="flex items-center gap-2 text-[14px] font-semibold text-navy">
            <Info size={16} className="text-emerald" />
            Responsabilidad
          </p>
          <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-muted">
            <li>• Eres responsable de la exactitud de los datos ingresados.</li>
            <li>• Verifica el salario mínimo, auxilio, UVT y recargos del año.</li>
            <li>• Casos especiales (fuero, aprendices, salario integral, sector público) requieren revisión de un profesional.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-[11.5px] leading-relaxed text-muted">
        <p className="flex items-center gap-1.5 font-medium text-navy">
          <ShieldCheck size={13} />
          Casos que esta herramienta no cubre
        </p>
        <p className="mt-1">
          Sector público, cesantías retroactivas anteriores a 1990, convenciones
          colectivas, salario en especie, fuero sindical/maternidad/salud y estabilidad
          laboral reforzada. Consulta a un contador o abogado laboralista.
        </p>
      </div>
    </div>
  );
}
