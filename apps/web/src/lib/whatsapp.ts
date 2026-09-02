/**
 * Helper de WhatsApp Cloud API (Meta).
 *
 * Envía notificaciones a la contadora mediante mensajes por plantilla.
 * Los mensajes iniciados por el negocio SIEMPRE requieren una plantilla
 * aprobada en Meta Business (no se puede enviar texto libre).
 *
 * Variables de entorno:
 * - WHATSAPP_ACCESS_TOKEN        Token de acceso permanente de la app Meta.
 * - WHATSAPP_PHONE_NUMBER_ID     ID del número de teléfono en Cloud API.
 * - WHATSAPP_CONTADOR_DESTINO    Número E.164 de la contadora (destino).
 * - WHATSAPP_TEMPLATE_CITA       Nombre de la plantilla de nueva cita.
 * - WHATSAPP_TEMPLATE_INVITACION Nombre de la plantilla de nueva invitación.
 * - WHATSAPP_TEMPLATE_LANG       Idioma del template (default "es").
 */

const GRAPH_URL = "https://graph.facebook.com";
const API_VERSION = "v21.0";

function normalizeToE164(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  // Prefijo de país: mantiene el 57 si ya lo trae; si no, lo agrega.
  return digits.startsWith("57") ? digits : `57${digits}`;
}

export interface WhatsAppSendResult {
  sent: boolean;
  reason?: string;
}

/**
 * Envía un mensaje por plantilla vía WhatsApp Cloud API.
 * Nunca lanza excepciones: el fallo se registra y se devuelve en el resultado.
 */
export async function sendWhatsAppTemplate(opts: {
  to: string;
  template: string;
  params?: string[];
}): Promise<WhatsAppSendResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const lang = process.env.WHATSAPP_TEMPLATE_LANG || "es";

  if (!token || !phoneNumberId) {
    console.warn(
      "[whatsapp] Faltan WHATSAPP_ACCESS_TOKEN o WHATSAPP_PHONE_NUMBER_ID; se omite el envío."
    );
    return { sent: false, reason: "not_configured" };
  }

  const to = normalizeToE164(opts.to);
  if (!to) {
    return { sent: false, reason: "invalid_phone" };
  }

  const template: Record<string, unknown> = {
    name: opts.template,
    language: { code: lang },
  };

  if (opts.params && opts.params.length > 0) {
    template.components = [
      {
        type: "body",
        // Los parámetros se inyectan en el orden de los placeholders {{1}}, {{2}}, ...
        parameters: opts.params.map((text) => ({ type: "text", text })),
      },
    ];
  }

  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template,
  };

  try {
    const res = await fetch(
      `${GRAPH_URL}/${API_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[whatsapp] Meta API error", res.status, detail);
      return { sent: false, reason: `api_error:${res.status}` };
    }

    return { sent: true };
  } catch (err) {
    console.error("[whatsapp] Error de conexión", err);
    return { sent: false, reason: "network_error" };
  }
}

/** Notifica a la contadora que un visitante agendó una cita. */
export async function notifyNewAppointment(appointment: {
  guestName: string;
  guestPhone: string;
  serviceType: string;
  scheduledAt: string;
}): Promise<WhatsAppSendResult> {
  const template = process.env.WHATSAPP_TEMPLATE_CITA || "nueva_cita";
  return sendWhatsAppTemplate({
    to: process.env.WHATSAPP_CONTADOR_DESTINO || "",
    template,
    params: [
      appointment.guestName,
      appointment.guestPhone,
      appointment.serviceType || "Sin definir",
      appointment.scheduledAt || "Por confirmar",
    ],
  });
}

/** Notifica a la contadora que se solicitó una invitación al portal. */
export async function notifyNewInvitation(invitation: {
  name: string;
  email: string;
  invitedBy?: string;
}): Promise<WhatsAppSendResult> {
  const template = process.env.WHATSAPP_TEMPLATE_INVITACION || "nueva_invitacion";
  return sendWhatsAppTemplate({
    to: process.env.WHATSAPP_CONTADOR_DESTINO || "",
    template,
    params: [invitation.name, invitation.email, invitation.invitedBy || "No indicado"],
  });
}

/** Envía a la contadora un resumen de recordatorio por vencimiento fiscal. */
export async function notifyReminderSummary(reminder: {
  client: string;
  days: number;
  fechaLimite: string;
}): Promise<WhatsAppSendResult> {
  const template =
    process.env.WHATSAPP_TEMPLATE_RECORDATORIO || "recordatorio_vencimiento";
  return sendWhatsAppTemplate({
    to: process.env.WHATSAPP_CONTADOR_DESTINO || "",
    template,
    params: [
      reminder.client,
      String(reminder.days),
      reminder.fechaLimite,
    ],
  });
}