"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AdminChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: "model",
      text: "Hola tocaya, soy Anita. ¿En qué te apoyo hoy? Puedo ayudarte con tareas técnicas, auditoría de reportes o ejecutar automatizaciones como la consulta de información exógena.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionIdRef.current,
        }),
      });

      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await res.json();
      if (res.ok) {
        if (data.sessionId) sessionIdRef.current = data.sessionId;
        setMessages((m) => [...m, { role: "model", text: data.text }]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "model", text: data.error || "Hubo un error. Intenta de nuevo." },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "model", text: "Error de conexión con el asistente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-border bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald/15 text-emerald">
            <Bot size={18} />
          </span>
          <div>
            <h1 className="text-base font-bold text-navy">Chat interno — Anita</h1>
            <p className="text-xs text-muted">
              Asistente privado de la firma (tono técnico). Solo el equipo autorizado.
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
              m.role === "model"
                ? "bg-white text-slate-800"
                : "ml-auto bg-navy text-white"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" />
            Anita está trabajando…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2 border-t border-border bg-white p-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu consulta interna…"
          disabled={loading}
          className="flex-1 rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-emerald"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-emerald px-4 text-white disabled:opacity-50"
          aria-label="Enviar"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
