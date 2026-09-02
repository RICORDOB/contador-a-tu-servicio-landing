"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bot, Loader2, ChevronLeft } from "lucide-react";

interface PanelLoginProps {
  role: "developer" | "contadora";
  title: string;
  subtitle: string;
  redirectTo: string;
  backLabel?: string;
}

export default function PanelLogin({
  role,
  title,
  subtitle,
  redirectTo,
  backLabel = "Volver al inicio",
}: PanelLoginProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, username, password }),
      });
      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Credenciales inválidas");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gradient-navy relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="animate-float absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-slate-300 transition hover:text-white"
        >
          <ChevronLeft size={16} />
          {backLabel}
        </Link>

        <div className="glass rounded-3xl p-8 shadow-2xl shadow-navy/40">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-emerald-light text-white shadow-lg shadow-emerald/25">
              <Bot size={22} />
            </span>
            <div>
              <p className="text-lg font-bold text-navy">{title}</p>
              <p className="text-xs text-muted">{subtitle}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy">Usuario</label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy">Contraseña</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Entrando…
                </span>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}