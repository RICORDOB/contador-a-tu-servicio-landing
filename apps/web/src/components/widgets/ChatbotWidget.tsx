"use client";

import { useState, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { AI_PROVIDERS } from "@contador/shared";

interface Message {
  role: "user" | "model";
  text: string;
}

interface Context {
  guestName?: string;
  guestPhone?: string;
  serviceType?: string;
  scheduledAt?: string;
}

const SERVICES = [
  "Asesoría tributaria",
  "Contabilidad integral",
  "Nómina",
  "Declaración de renta",
  "Constitución de empresa",
  "Automatización contable",
];

const TIMES = ["09:00", "10:00", "14:00", "15:00", "16:00"];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState<Context>({});
  const [loading, setLoading] = useState(false);
  const [appointmentStep, setAppointmentStep] = useState<
    "name" | "phone" | "service" | "date" | "time" | "confirm" | "done" | null
  >(null);
  const pendingRef = useRef<Context>({});
  const [sessionId, setSessionId] = useState("");

  function getSessionId() {
    if (sessionId) return sessionId;
    const existing = localStorage.getItem("anita_session");
    if (existing) {
      setSessionId(existing);
      return existing;
    }
    const fresh = crypto.randomUUID();
    localStorage.setItem("anita_session", fresh);
    setSessionId(fresh);
    return fresh;
  }

  function addBot(text: string) {
    setMessages((m) => [...m, { role: "model", text }]);
  }

  function addUser(text: string) {
    setMessages((m) => [...m, { role: "user", text }]);
  }

  function openChat() {
    setOpen(true);
    if (messages.length === 0) {
      addBot(
        "¡Hola! Soy el asistente de Contador a tu Servicio en Turbo, Antioquia."
      );
      addBot(
        "Pregúntame sobre nuestros servicios, automatizaciones o escribe *agendar* para apartar una cita."
      );
    }
  }

  async function confirmAppointment(ctx: Context) {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: ctx.guestName,
          guestPhone: ctx.guestPhone,
          serviceType: ctx.serviceType,
          scheduledAt: ctx.scheduledAt,
        }),
      });
      if (res.ok) {
        addBot("¡Cita registrada! Te contactaremos pronto por WhatsApp.");
      } else {
        addBot(
          "Hubo un error al registrar. Escríbenos a contacto@contadoratuservicio.com"
        );
      }
    } catch {
      addBot("Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
      setAppointmentStep("done");
    }
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    addUser(text);
    setInput("");

    if (appointmentStep && appointmentStep !== "done") {
      handleAppointmentInput(text);
      return;
    }

    if (text.toLowerCase().includes("agendar") || text.toLowerCase().includes("cita")) {
      setAppointmentStep("name");
      addBot("¿Cuál es tu nombre completo?");
      return;
    }

    if (text.toLowerCase().includes("hola") || text.toLowerCase().includes("buenos")) {
      addBot("¡Hola! ¿En qué puedo ayudarte? Puedo responder preguntas sobre nuestros servicios o agendar una cita. Escribe *agendar* para apartar una cita.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", text }],
          sessionId: getSessionId(),
        }),
      });
      const data = await res.json();
      addBot(data.text || "No entendí. ¿Puedes repetirlo?");
      if (data.sessionId) setSessionId(data.sessionId);
    } catch {
      addBot("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function handleAppointmentInput(text: string) {
    switch (appointmentStep) {
      case "name":
        setContext((c) => ({ ...c, guestName: text }));
        setAppointmentStep("phone");
        addBot("¿Tu WhatsApp o teléfono de contacto?");
        break;

      case "phone":
        setContext((c) => ({ ...c, guestPhone: text }));
        setAppointmentStep("service");
        addBot(
          `¿Qué servicio?\n${SERVICES.map((s, i) => `${i + 1}) ${s}`).join("\n")}`
        );
        break;

      case "service": {
        const idx = parseInt(text, 10) - 1;
        const service = SERVICES[idx] ?? text;
        setContext((c) => ({ ...c, serviceType: service }));
        setAppointmentStep("date");
        addBot("¿Fecha preferida? (AAAA-MM-DD, ej: 2026-06-15)");
        break;
      }

      case "date": {
        const date = text.match(/\d{4}-\d{2}-\d{2}/)?.[0];
        if (!date) {
          addBot("Formato inválido. Usa AAAA-MM-DD");
          return;
        }
        setContext((c) => ({ ...c, scheduledAt: date }));
        setAppointmentStep("time");
        addBot(`¿Hora? ${TIMES.join(", ")}`);
        break;
      }

      case "time": {
        const time = TIMES.find((t) => text.includes(t.slice(0, 2))) ?? TIMES[0];
        const datePart = context.scheduledAt?.match(/\d{4}-\d{2}-\d{2}/)?.[0];
        if (!datePart) {
          addBot("Error en la fecha. Escribe *agendar* para reiniciar.");
          setAppointmentStep(null);
          return;
        }
        const iso = new Date(`${datePart}T${time}:00`).toISOString();
        const nextCtx = { ...context, scheduledAt: iso };
        setContext(nextCtx);
        pendingRef.current = nextCtx;
        setAppointmentStep("confirm");
        addBot(
          `Confirma:\n• ${nextCtx.guestName}\n• ${nextCtx.guestPhone}\n• ${nextCtx.serviceType}\n• ${new Date(iso).toLocaleString("es-CO")}\n\nEscribe SI para confirmar.`
        );
        break;
      }

      case "confirm": {
        if (text.toLowerCase().startsWith("s")) {
          confirmAppointment(pendingRef.current);
        } else {
          addBot("Cancelado. Escribe *agendar* para agendar de nuevo.");
          setAppointmentStep(null);
        }
        break;
      }
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={openChat}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald/30 hover:bg-emerald-light transition-all hover:scale-105"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Asistente</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl sm:w-[380px]">
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/20 text-emerald">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">{SITE_NAME}</p>
                <p className="text-xs text-slate-300">Turbo, Antioquia</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "model"
                    ? "bg-slate-100 text-slate-800"
                    : "ml-auto bg-emerald text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 size={16} className="animate-spin" />
                Pensando...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje…"
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none"
              disabled={loading || appointmentStep === "done"}
            />
            <button
              type="submit"
              disabled={loading || appointmentStep === "done"}
              className="rounded-lg bg-emerald p-2 text-white disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const SITE_NAME = "Contador a tu Servicio";