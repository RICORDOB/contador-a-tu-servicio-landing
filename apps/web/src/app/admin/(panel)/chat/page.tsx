"use client";

import ChatPanel from "@/components/admin/ChatPanel";

export default function AdminChatPage() {
  return (
    <ChatPanel
      apiPath="/api/admin/chat"
      title="Chat interno — Anita"
      subtitle="Asistente privado de la firma (tono técnico). Solo el equipo autorizado."
      intro="Hola tocaya, soy Anita. ¿En qué te apoyo hoy? Puedo ayudarte con tareas técnicas, auditoría de reportes o ejecutar automatizaciones como la consulta de información exógena."
      redirectTo="/admin/login"
    />
  );
}