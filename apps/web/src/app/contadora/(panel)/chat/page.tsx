"use client";

import ChatPanel from "@/components/admin/ChatPanel";

export default function ContadoraChatPage() {
  return (
    <ChatPanel
      apiPath="/api/contadora/chat"
      title="Chat interno — Anita"
      subtitle="Tu asistente interno para tareas técnicas, auditoría y automatizaciones."
      intro="Hola tocaya, soy Anita. Soy tu asistente interno de confianza. ¿En qué te ayudo hoy?"
      redirectTo="/contadora/login"
    />
  );
}