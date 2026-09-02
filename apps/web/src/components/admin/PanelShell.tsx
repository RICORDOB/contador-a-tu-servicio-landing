"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  LayoutDashboard,
  CalendarDays,
  Users,
  BellRing,
  MessageSquare,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import type { PanelRole } from "@/lib/admin-auth";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV: Record<PanelRole, { items: NavItem[]; title: string; subtitle: string }> = {
  developer: {
    title: "Panel de desarrollador",
    subtitle: "Control total del sistema",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/citas", label: "Citas", icon: CalendarDays },
      { href: "/admin/invitaciones", label: "Invitaciones", icon: Users },
      { href: "/admin/recordatorios", label: "Recordatorios", icon: BellRing },
      { href: "/admin/chat", label: "Chat con Anita", icon: MessageSquare },
    ],
  },
  contadora: {
    title: "Panel de la contadora",
    subtitle: "Gestión operativa de la firma",
    items: [
      { href: "/contadora", label: "Dashboard", icon: LayoutDashboard },
      { href: "/contadora/citas", label: "Citas", icon: CalendarDays },
      { href: "/contadora/clientes", label: "Clientes", icon: Users },
      { href: "/contadora/recordatorios", label: "Recordatorios", icon: BellRing },
      { href: "/contadora/chat", label: "Chat con Anita", icon: MessageSquare },
    ],
  },
};

export default function PanelShell({
  role,
  children,
}: {
  role: PanelRole;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { items, title, subtitle } = NAV[role];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    const destination = role === "developer" ? "/admin/login" : "/contadora/login";
    router.push(destination);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-navy text-white">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald">
            <Bot size={18} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold">Contador a tu Servicio</p>
            <p className="text-xs text-slate-300">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 text-xs text-slate-300">
          <ShieldCheck size={14} className="text-emerald" />
          {title}
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald text-white"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
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

      <main className="ml-60 min-h-screen">{children}</main>
    </div>
  );
}