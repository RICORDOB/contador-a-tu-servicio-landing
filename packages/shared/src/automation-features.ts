export interface AutomationFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  details: string[];
  aiReady: boolean;
}

export const AUTOMATION_FEATURES: AutomationFeature[] = [
  {
    id: "alertas-vencimiento",
    title: "Alertas automáticas de vencimiento",
    description:
      "Recordatorios proactivos por correo y WhatsApp antes de las fechas límite DIAN para renta, ICA y otros impuestos.",
    icon: "bell",
    badge: "Automatización",
    details: [
      "Notificación 30, 15 y 5 días antes del vencimiento",
      "Personalizable por cliente y tipo de impuesto",
      "Integración con WhatsApp Business",
      "Historial de cumplimiento por cliente",
    ],
    aiReady: true,
  },
  {
    id: "gestion-documental",
    title: "Gestión inteligente de documentos",
    description:
      "Organización automática de documentos por tipo, cliente y período, con búsquedas rápidas y alertas de vencimiento documental.",
    icon: "folder",
    badge: "Automatización",
    details: [
      "Clasificación automática por tipo de documento",
      "Alertas de documentos próximos a vencer",
      "Búsqueda por NIT, nombre o período",
      "Exportación masiva en PDF",
    ],
    aiReady: true,
  },
  {
    id: "citas-automaticas",
    title: "Flujo de citas automatizado",
    description:
      "Agendamiento sin fricción: el asistente recoge datos, confirma disponibilidad, envía recordatorio y notifica al contador.",
    icon: "calendar-check",
    badge: "Automatización",
    details: [
      "Chatbot para captura de datos en minutos",
      "Confirmación automática por WhatsApp",
      "Recordatorio 24h antes de la cita",
      "Panel de gestión para el contador",
    ],
    aiReady: true,
  },
  {
    id: "recordatorios-facturas",
    title: "Recordatorios de facturas",
    description:
      "Notificación automática de facturas pendientes de pago con enlace directo al portal de pagos del cliente.",
    icon: "mail",
    badge: "Automatización",
    details: [
      "Envío automático al vencer el plazo de pago",
      "Link directo al portal de pagos",
      "Estado en tiempo real: pendiente / pagada / cancelada",
      "Reporte semanal de cobranza",
    ],
    aiReady: false,
  },
  {
    id: "onboarding-clientes",
    title: "Onboarding automatizado de clientes",
    description:
      "Proceso de bienvenida completo: invitación, activación de cuenta, bienvenida guiada y primera carga de documentos.",
    icon: "user-plus",
    badge: "Automatización",
    details: [
      "Invitación con enlace único de 72h",
      "Activación con configuración de contraseña",
      "Secuencia de bienvenida con tutorial",
      "Solicitud automática de documentos iniciales",
    ],
    aiReady: true,
  },
];

export const AI_ASSISTANTS: AIAssistant[] = [
  {
    id: "gemini",
    name: "Gemini",
    provider: "google",
    description: "Asistente de IA para consultas tributarias rápidas y precisas.",
    status: "available",
    icon: "brain",
  },
  {
    id: "openai",
    name: "ChatGPT",
    provider: "openai",
    description: "Asistente conversacional para asesoría contable personalizada.",
    status: "available",
    icon: "sparkles",
  },
  {
    id: "claude",
    name: "Claude",
    provider: "anthropic",
    description: "Asistente experto en análisis tributario y normativo.",
    status: "coming-soon",
    icon: "scale",
  },
];

export interface AIAssistant {
  id: string;
  name: string;
  provider: string;
  description: string;
  status: "available" | "coming-soon" | "beta";
  icon: string;
}