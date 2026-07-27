const GRUPOS_2025 = [
  { grupo: "1", fecha: "2025-05-12", digitos: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"] },
  { grupo: "2", fecha: "2025-05-14", digitos: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"] },
  { grupo: "3", fecha: "2025-05-16", digitos: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"] },
  { grupo: "4", fecha: "2025-05-20", digitos: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"] },
  { grupo: "5", fecha: "2025-05-22", digitos: ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"] },
  { grupo: "6", fecha: "2025-05-27", digitos: ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"] },
  { grupo: "7", fecha: "2025-06-03", digitos: ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69"] },
  { grupo: "8", fecha: "2025-06-10", digitos: ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"] },
  { grupo: "9", fecha: "2025-06-17", digitos: ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89"] },
  { grupo: "10", fecha: "2025-06-24", digitos: ["90", "91", "92", "93", "94", "95", "96", "97", "98", "99"] },
];

export interface VencimientoRenta {
  ultimosDigitos: string;
  fechaLimite: string;
  grupo: string;
  anioGravable: number;
}

const TABLA: Record<string, Omit<VencimientoRenta, "ultimosDigitos">> = {};

for (const g of GRUPOS_2025) {
  for (const d of g.digitos) {
    TABLA[d] = {
      fechaLimite: g.fecha,
      grupo: `Grupo ${g.grupo}`,
      anioGravable: 2024,
    };
  }
}

export function obtenerVencimientoRenta(
  ultimosDigitos: string
): VencimientoRenta | null {
  const key = ultimosDigitos.padStart(2, "0").slice(-2);
  if (!/^\d{2}$/.test(key)) return null;
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