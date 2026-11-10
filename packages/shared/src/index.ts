export { SITE } from "./site-config";
export { SERVICES, TOOLS, type Service } from "./services-data";
export { AUTOMATION_FEATURES, AI_ASSISTANTS, type AutomationFeature, type AIAssistant } from "./automation-features";
export { AI_PROVIDERS, type AIProviderId, type AIProviderConfig, type AIRequest, type AIResponse } from "./ai-providers";
export {
  calcularSancion,
  formatCOP,
  UVT_2025,
  TIPOS_IMPUESTO,
  type TipoImpuesto,
  type SancionInput,
  type SancionResult,
} from "./tributario/sanciones";
export {
  obtenerVencimientoRenta,
  diasRestantes,
  formatFecha,
  type VencimientoRenta,
} from "./tributario/calendario-dian";
export {
  calcularLiquidacion,
  ADVERTENCIA_GENERAL,
} from "./liquida/calculo";
export { validarEntrada } from "./liquida/validacion";
export {
  aEntrada,
  FORMULARIO_INICIAL,
  formularioDesdeEntrada,
} from "./liquida/formulario";
export {
  PARAMETROS,
  ANIOS_DISPONIBLES,
  getParametros,
  anioVigente,
} from "./liquida/parametros";
export { formatNumero, formatDias } from "./liquida/formato";
export {
  diffDiasInclusivo,
  fechaValida,
  sumarDias,
  inicioSemestre,
  anioDe,
  formatearFecha,
  hoyISO,
} from "./liquida/fechas";
export type {
  TipoContrato,
  MotivoTerminacion,
  TipoSalario,
  CategoriaConcepto,
  Parametros,
  EntradaLiquidacion,
  Concepto,
  Deduccion,
  ResultadoLiquidacion,
  ErrorValidacion,
  ValidacionEntrada,
  FormularioLiquidacion,
} from "./liquida/types";