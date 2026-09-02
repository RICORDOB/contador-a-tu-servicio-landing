import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calcularSancion,
  formatCOP,
  UVT_2025,
  TIPOS_IMPUESTO,
} from "../tributario/sanciones.ts";
import {
  obtenerVencimientoRenta,
  diasRestantes,
  formatFecha,
} from "../tributario/calendario-dian.ts";

test("TIPOS_IMPUESTO incluye RENTA, IVA, RETEFUENTE, ICA y OTRO", () => {
  const values = TIPOS_IMPUESTO.map((t) => t.value);
  assert.deepEqual(values, ["RENTA", "IVA", "RETEFUENTE", "ICA", "OTRO"]);
});

test("calcularSancion: ≤2 meses aplica 5% con tope de 1 UVT", () => {
  const res = calcularSancion({
    tipoImpuesto: "RENTA",
    baseGravable: 10_000_000,
    mesesRetraso: 2,
  });
  assert.equal(res.desglose.porcentajeAplicado, 0.05);
  assert.equal(res.desglose.topeUVT, 1);
  assert.equal(res.desglose.montoTopeUVT, UVT_2025);
  assert.equal(res.sancionEstimada, Math.min(500_000, UVT_2025));
});

test("calcularSancion: >2 meses aplica 10% con tope de 2 UVT", () => {
  const res = calcularSancion({
    tipoImpuesto: "IVA",
    baseGravable: 50_000_000,
    mesesRetraso: 5,
  });
  assert.equal(res.desglose.porcentajeAplicado, 0.1);
  assert.equal(res.desglose.topeUVT, 2);
  assert.equal(res.sancionEstimada, Math.min(5_000_000, 2 * UVT_2025));
});

test("calcularSancion: extemporáneo reduce la sanción al 50%", () => {
  const base = calcularSancion({
    tipoImpuesto: "ICA",
    baseGravable: 10_000_000,
    mesesRetraso: 2,
  });
  const extemp = calcularSancion({
    tipoImpuesto: "ICA",
    baseGravable: 10_000_000,
    mesesRetraso: 2,
    presentoExtemporaneo: true,
  });
  assert.equal(extemp.sancionEstimada, Math.round(base.sancionEstimada * 0.5));
});

test("calcularSancion: base pequeña nunca supera el tope UVT", () => {
  const res = calcularSancion({
    tipoImpuesto: "OTRO",
    baseGravable: 100_000,
    mesesRetraso: 1,
  });
  assert.ok(res.sancionEstimada <= UVT_2025);
  assert.ok(res.sancionEstimada > 0);
});

test("formatCOP: formatea moneda colombiana sin decimales", () => {
  const normalized = formatCOP(1_234_567).replace(/[\s\u00A0]/g, "");
  assert.equal(normalized, "$1.234.567");
});

test("obtenerVencimientoRenta: mapea los 2 últimos dígitos al grupo correcto", () => {
  assert.equal(obtenerVencimientoRenta("05")?.grupo, "Grupo 3");
  assert.equal(obtenerVencimientoRenta("19")?.grupo, "Grupo 10");
  assert.equal(obtenerVencimientoRenta("42")?.grupo, "Grupo 21");
  assert.equal(obtenerVencimientoRenta("97")?.grupo, "Grupo 49");
});

test("obtenerVencimientoRenta: normaliza entrada de 1 dígito y rechaza inválidos", () => {
  assert.equal(obtenerVencimientoRenta("7")?.ultimosDigitos, "07");
  assert.equal(obtenerVencimientoRenta("5")?.grupo, "Grupo 3");
  assert.equal(obtenerVencimientoRenta("abc"), null);
  assert.equal(obtenerVencimientoRenta(""), null);
});

test("obtenerVencimientoRenta: expone fecha límite y año gravable", () => {
  const res = obtenerVencimientoRenta("00");
  assert.equal(res?.fechaLimite, "2026-10-26");
  assert.equal(res?.anioGravable, 2025);
});

test("diasRestantes: devuelve 0 para la fecha límite (hoy, medianoche)", () => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaStr = hoy.toISOString().slice(0, 10);
  assert.equal(diasRestantes(fechaStr), 0);
});

test("diasRestantes: calcula días positivos hacia una fecha futura", () => {
  const dias = diasRestantes("2099-12-31");
  assert.ok(dias > 0);
});

test("formatFecha: formatea fecha larga en español", () => {
  const out = formatFecha("2025-05-12");
  assert.ok(out.includes("mayo"));
  assert.ok(out.includes("2025"));
});
