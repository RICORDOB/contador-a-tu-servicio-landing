"use client";

import { useState } from "react";
import Link from "next/link";
import {
  obtenerVencimientoRenta,
  diasRestantes,
  formatFecha,
} from "@contador/shared";

export default function CalendarioDianForm() {
  const [digitos, setDigitos] = useState("");
  const [result, setResult] = useState<ReturnType<typeof obtenerVencimientoRenta>>(
    null
  );
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = obtenerVencimientoRenta(digitos);
    if (!res) {
      setError("Ingresa exactamente 2 dígitos numéricos (00-99).");
      setResult(null);
      return;
    }
    setResult(res);
  }

  const dias = result ? diasRestantes(result.fechaLimite) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-white p-6 shadow-sm"
      >
        <label className="block text-sm font-medium text-navy">
          Últimos 2 dígitos de tu NIT o cédula
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Sin dígito de verificación. Ej: si tu NIT termina en 45, ingresa 45.
        </p>
        <input
          type="text"
          inputMode="numeric"
          maxLength={2}
          pattern="\d{2}"
          required
          placeholder="00"
          value={digitos}
          onChange={(e) => setDigitos(e.target.value.replace(/\D/g, "").slice(0, 2))}
          className="mt-3 w-full rounded-lg border border-border px-3 py-3 text-center text-2xl font-bold tracking-widest"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-emerald py-3 text-sm font-semibold text-white"
        >
          Consultar fecha de vencimiento
        </button>
      </form>

      <div className="rounded-2xl border border-border bg-slate-50 p-6">
        {result ? (
          <>
            <p className="text-sm text-slate-600">Declaración de renta — año gravable {result.anioGravable}</p>
            <p className="mt-2 text-2xl font-bold capitalize text-navy">
              {formatFecha(result.fechaLimite)}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {result.grupo} · Dígitos {result.ultimosDigitos}
            </p>
            {dias !== null && (
              <p
                className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
                  dias < 0
                    ? "bg-red-100 text-red-800"
                    : dias <= 30
                      ? "bg-amber-100 text-amber-900"
                      : "bg-emerald/10 text-emerald"
                }`}
              >
                {dias < 0
                  ? `Venció hace ${Math.abs(dias)} días`
                  : dias === 0
                    ? "¡Vence hoy!"
                    : `Faltan ${dias} días`}
              </p>
            )}
            <Link
              href="/#contacto"
              className="mt-6 inline-block text-sm font-medium text-emerald hover:underline"
            >
              ¿Necesitas ayuda con tu declaración? Agenda una cita →
            </Link>
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Ingresa tus 2 dígitos para consultar el calendario DIAN.
          </p>
        )}
      </div>
    </div>
  );
}