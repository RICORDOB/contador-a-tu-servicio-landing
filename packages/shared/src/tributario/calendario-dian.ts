const GRUPOS_2026 = [
  { grupo: "1", fecha: "2026-08-12", digitos: ["01", "02"] },
  { grupo: "2", fecha: "2026-08-13", digitos: ["03", "04"] },
  { grupo: "3", fecha: "2026-08-14", digitos: ["05", "06"] },
  { grupo: "4", fecha: "2026-08-18", digitos: ["07", "08"] },
  { grupo: "5", fecha: "2026-08-19", digitos: ["09", "10"] },
  { grupo: "6", fecha: "2026-08-20", digitos: ["11", "12"] },
  { grupo: "7", fecha: "2026-08-21", digitos: ["13", "14"] },
  { grupo: "8", fecha: "2026-08-24", digitos: ["15", "16"] },
  { grupo: "9", fecha: "2026-08-25", digitos: ["17", "18"] },
  { grupo: "10", fecha: "2026-08-26", digitos: ["19", "20"] },
  { grupo: "11", fecha: "2026-08-27", digitos: ["21", "22"] },
  { grupo: "12", fecha: "2026-08-28", digitos: ["23", "24"] },
  { grupo: "13", fecha: "2026-08-31", digitos: ["25", "26"] },
  { grupo: "14", fecha: "2026-09-01", digitos: ["27", "28"] },
  { grupo: "15", fecha: "2026-09-02", digitos: ["29", "30"] },
  { grupo: "16", fecha: "2026-09-03", digitos: ["31", "32"] },
  { grupo: "17", fecha: "2026-09-04", digitos: ["33", "34"] },
  { grupo: "18", fecha: "2026-09-07", digitos: ["35", "36"] },
  { grupo: "19", fecha: "2026-09-08", digitos: ["37", "38"] },
  { grupo: "20", fecha: "2026-09-09", digitos: ["39", "40"] },
  { grupo: "21", fecha: "2026-09-10", digitos: ["41", "42"] },
  { grupo: "22", fecha: "2026-09-11", digitos: ["43", "44"] },
  { grupo: "23", fecha: "2026-09-14", digitos: ["45", "46"] },
  { grupo: "24", fecha: "2026-09-15", digitos: ["47", "48"] },
  { grupo: "25", fecha: "2026-09-16", digitos: ["49", "50"] },
  { grupo: "26", fecha: "2026-09-17", digitos: ["51", "52"] },
  { grupo: "27", fecha: "2026-09-18", digitos: ["53", "54"] },
  { grupo: "28", fecha: "2026-09-21", digitos: ["55", "56"] },
  { grupo: "29", fecha: "2026-09-22", digitos: ["57", "58"] },
  { grupo: "30", fecha: "2026-09-23", digitos: ["59", "60"] },
  { grupo: "31", fecha: "2026-09-24", digitos: ["61", "62"] },
  { grupo: "32", fecha: "2026-09-25", digitos: ["63", "64"] },
  { grupo: "33", fecha: "2026-09-28", digitos: ["65", "66"] },
  { grupo: "34", fecha: "2026-10-01", digitos: ["67", "68"] },
  { grupo: "35", fecha: "2026-10-02", digitos: ["69", "70"] },
  { grupo: "36", fecha: "2026-10-05", digitos: ["71", "72"] },
  { grupo: "37", fecha: "2026-10-06", digitos: ["73", "74"] },
  { grupo: "38", fecha: "2026-10-07", digitos: ["75", "76"] },
  { grupo: "39", fecha: "2026-10-08", digitos: ["77", "78"] },
  { grupo: "40", fecha: "2026-10-09", digitos: ["79", "80"] },
  { grupo: "41", fecha: "2026-10-13", digitos: ["81", "82"] },
  { grupo: "42", fecha: "2026-10-14", digitos: ["83", "84"] },
  { grupo: "43", fecha: "2026-10-15", digitos: ["85", "86"] },
  { grupo: "44", fecha: "2026-10-16", digitos: ["87", "88"] },
  { grupo: "45", fecha: "2026-10-19", digitos: ["89", "90"] },
  { grupo: "46", fecha: "2026-10-20", digitos: ["91", "92"] },
  { grupo: "47", fecha: "2026-10-21", digitos: ["93", "94"] },
  { grupo: "48", fecha: "2026-10-22", digitos: ["95", "96"] },
  { grupo: "49", fecha: "2026-10-23", digitos: ["97", "98"] },
  { grupo: "50", fecha: "2026-10-26", digitos: ["99", "00"] },
];

export interface VencimientoRenta {
  ultimosDigitos: string;
  fechaLimite: string;
  grupo: string;
  anioGravable: number;
}

const TABLA: Record<string, Omit<VencimientoRenta, "ultimosDigitos">> = {};

for (const g of GRUPOS_2026) {
  for (const d of g.digitos) {
    TABLA[d] = {
      fechaLimite: g.fecha,
      grupo: `Grupo ${g.grupo}`,
      anioGravable: 2025,
    };
  }
}

export function obtenerVencimientoRenta(
  ultimosDigitos: string
): VencimientoRenta | null {
  const cleaned = ultimosDigitos.trim();
  if (!/^\d{1,2}$/.test(cleaned)) return null;
  const key = cleaned.padStart(2, "0");
  const entry = TABLA[key];
  if (!entry) return null;
  return { ultimosDigitos: key, ...entry };
}

export function diasRestantes(fechaLimite: string): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const limite = new Date(fechaLimite + "T00:00:00");
  return Math.ceil((limite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatFecha(fecha: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(fecha + "T12:00:00"));
}