import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularLiquidacion } from "../liquida/calculo.ts";
import { sumarDias } from "../liquida/fechas.ts";
import { validarEntrada } from "../liquida/validacion.ts";
import type { EntradaLiquidacion } from "../liquida/types.ts";

function entrada(
  parcial: {
    empleado?: Partial<EntradaLiquidacion["empleado"]>;
    contrato?: Partial<EntradaLiquidacion["contrato"]>;
    terminacion?: Partial<EntradaLiquidacion["terminacion"]>;
    anioParametros?: number;
  } = {},
): EntradaLiquidacion {
  return {
    empleado: { nombre: "Ana Pérez", documento: "123456", ...parcial.empleado },
    contrato: {
      tipo: "indefinido",
      fechaIngreso: "2026-01-01",
      fechaRetiro: "2026-12-31",
      fechaFinContrato: "",
      tipoSalario: "fijo",
      salarioBasico: 1_750_905,
      promedioVariable: 0,
      recibeAuxilioTransporte: true,
      salarioEsMinimo: false,
      ...parcial.contrato,
    },
    terminacion: {
      motivo: "renuncia",
      preavisoDado: true,
      diasVacacionesDisfrutados: 0,
      diasSalarioPendiente: 0,
      cesantiasConsignadasHasta: "",
      ultimoPagoPrima: "",
      incluirSancionMora: false,
      fechaPagoLiquidacion: "",
      otrasDeducciones: 0,
      retencionFuente: 0,
      ...parcial.terminacion,
    },
    anioParametros: parcial.anioParametros ?? 2026,
  };
}

function concepto(resultado: ReturnType<typeof calcularLiquidacion>, id: string) {
  return resultado.conceptos.find((item) => item.id === id);
}

test("liquidación fija: un año completo 2026 con salario mínimo + auxilio", () => {
  const r = calcularLiquidacion(entrada());
  assert.equal(r.diasTotales, 365);
  assert.equal(r.auxilioAplica, true);
  assert.equal(r.basePrestaciones, 2_000_000);
  assert.equal(concepto(r, "cesantias")?.valor, 2_027_778);
  assert.equal(concepto(r, "intereses_cesantias")?.valor, 246_713);
  assert.equal(concepto(r, "prima")?.valor, 1_022_222);
  assert.equal(concepto(r, "vacaciones")?.valor, 887_612);
  assert.equal(r.netoPagar, 4_184_325);
});

test("salario mínimo por año: 2024 completo (bisiesto)", () => {
  const r = calcularLiquidacion(
    entrada({
      contrato: {
        fechaIngreso: "2024-01-01",
        fechaRetiro: "2024-12-31",
        salarioEsMinimo: true,
      },
    }),
  );
  assert.equal(r.diasTotales, 366);
  assert.equal(r.salarioOrdinario, 1_300_000); // SMMLV 2024
  assert.equal(r.auxilio, 162_000);
  assert.equal(concepto(r, "cesantias")?.valor, 1_486_367);
  assert.equal(concepto(r, "intereses_cesantias")?.valor, 181_337);
  assert.equal(concepto(r, "prima")?.valor, 747_244);
  assert.equal(concepto(r, "cesantias")?.detalle?.length, 1);
});

test("salario mínimo segmentando por año: 2024-2025", () => {
  const r = calcularLiquidacion(
    entrada({
      contrato: {
        fechaIngreso: "2024-01-01",
        fechaRetiro: "2025-12-31",
        salarioEsMinimo: true,
      },
    }),
  );
  assert.equal(r.diasTotales, 731);
  assert.equal(r.salarioOrdinario, 1_423_500); // SMMLV del año de retiro
  assert.equal(concepto(r, "cesantias")?.valor, 3_132_416);
  assert.equal(concepto(r, "intereses_cesantias")?.valor, 381_606);
  assert.equal(concepto(r, "vacaciones")?.valor, 1_445_248);
  assert.equal(concepto(r, "cesantias")?.detalle?.length, 2);
});

test("despido sin justa causa: indemnización según tabla", () => {
  const r = calcularLiquidacion(
    entrada({
      contrato: {
        fechaRetiro: "2026-06-30",
        salarioBasico: 4_000_000,
        recibeAuxilioTransporte: false,
      },
      terminacion: { motivo: "despido_sin_justa", ultimoPagoPrima: "2025-12-31" },
    }),
  );
  assert.equal(r.diasTotales, 181);
  assert.equal(concepto(r, "indemnizacion")?.valor, 2_011_111);
});

test("renuncia no genera indemnización", () => {
  const r = calcularLiquidacion(entrada({ terminacion: { motivo: "renuncia" } }));
  assert.equal(concepto(r, "indemnizacion"), undefined);
});

test("validación: rechaza nombre vacío y fecha inválida", () => {
  const v = validarEntrada(
    entrada({
      empleado: { nombre: "   " },
      contrato: { fechaIngreso: "2026-02-30" },
    }),
  );
  assert.equal(v.ok, false);
  assert.ok(v.errores.some((e) => e.campo === "nombre"));
  assert.ok(v.errores.some((e) => e.campo === "fechaIngreso"));
});

test("propiedades: el neto siempre cuadra y no hay valores negativos", () => {
  const casos = [
    entrada(),
    entrada({
      contrato: { fechaIngreso: "2020-01-01", fechaRetiro: "2024-06-30", salarioBasico: 2_500_000 },
      terminacion: { motivo: "despido_sin_justa" },
    }),
    entrada({
      contrato: { fechaIngreso: "2021-03-15", fechaRetiro: "2025-11-30", salarioEsMinimo: true },
    }),
    entrada({
      contrato: {
        tipo: "fijo",
        fechaIngreso: "2023-01-01",
        fechaRetiro: "2024-06-30",
        fechaFinContrato: "2025-01-01",
        salarioBasico: 3_000_000,
      },
      terminacion: { motivo: "despido_sin_justa" },
    }),
  ];

  for (const e of casos) {
    const r = calcularLiquidacion(e);
    assert.equal(r.netoPagar, r.totalDevengado - r.totalDeducciones);
    assert.ok(r.diasTotales > 0);
    assert.ok(r.conceptos.every((c) => c.valor >= 0));
    assert.ok(r.deducciones.every((d) => d.valor >= 0));
  }
});
