export const UVT_2025 = 49799;

export const TIPOS_IMPUESTO = [
  { value: "RENTA", label: "Renta" },
  { value: "IVA", label: "IVA" },
  { value: "RETEFUENTE", label: "Retefuente" },
  { value: "ICA", label: "ICA" },
  { value: "OTRO", label: "Otro" },
] as const;

export type TipoImpuesto = (typeof TIPOS_IMPUESTO)[number]["value"];

export interface SancionInput {
  tipoImpuesto: TipoImpuesto;
  baseGravable: number;
  mesesRetraso: number;
  presentoExtemporaneo?: boolean;
}

export interface SancionResult {
  sancionEstimada: number;
  desglose: {
    porcentajeAplicado: number;
    topeUVT: number;
    uvtUtilizado: number;
    montoPorcentaje: number;
    montoTopeUVT: number;
  };
  disclaimer: string;
}

export function calcularSancion(input: SancionInput): SancionResult {
  const uvt = UVT_2025;
  const topeUVT = input.mesesRetraso <= 2 ? 1 : 2;
  const porcentaje = input.mesesRetraso <= 2 ? 0.05 : 0.1;

  const montoPorcentaje = input.baseGravable * porcentaje;
  const montoTopeUVT = topeUVT * uvt;

  let sancion = Math.min(montoPorcentaje, montoTopeUVT);

  if (input.presentoExtemporaneo) {
    sancion *= 0.5;
  }

  return {
    sancionEstimada: Math.round(sancion),
    desglose: {
      porcentajeAplicado: porcentaje,
      topeUVT,
      uvtUtilizado: uvt,
      montoPorcentaje: Math.round(montoPorcentaje),
      montoTopeUVT,
    },
    disclaimer:
      "Estimación orientativa según Arts. 641–643 del Estatuto Tributario. No constituye asesoría legal. Consulte a un contador público.",
  };
}

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}