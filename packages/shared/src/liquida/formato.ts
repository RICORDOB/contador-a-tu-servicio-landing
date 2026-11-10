// `formatCOP` se reexporta desde @contador/shared (tributario/sanciones) para
// mantener una única fuente de verdad del formato de moneda colombiana.

const formatoNumero = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 2,
})

export function formatNumero(valor: number): string {
  return formatoNumero.format(valor)
}

export function formatDias(valor: number): string {
  return formatoNumero.format(Number(valor.toFixed(2)))
}
