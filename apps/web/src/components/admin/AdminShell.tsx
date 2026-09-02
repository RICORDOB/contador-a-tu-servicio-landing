"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bot, LogOut, MessageSquare, ExternalLink } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-60 flex-col border-r border-border bg-navy text-white">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald">
            <Bot size={18} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">Contador a tu Servicio</p>
            <p className="text-xs text-slate-300">Panel interno</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          <Link
            href="/admin/chat"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              pathname === "/admin/chat"
                ? "bg-emerald text-white"
                : "text-slate-200 hover:bg-white/10"
            }`}
          >
            <MessageSquare size={17} />
            Chat con Anita
          </Link>
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <ExternalLink size={17} />
            Ver landing
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-white/10"
          >
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
