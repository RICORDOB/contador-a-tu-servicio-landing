"use client";

import { useEffect, useState } from "react";
import { Mail, Users } from "lucide-react";

interface Invitation {
  id: string;
  token: string;
  email: string;
  name: string;
  invitedBy?: string;
  createdAt: string;
}

export default function ContadoraClients() {
  const [rows, setRows] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contadora/invitations")
      .then((r) => r.json())
      .then((d) => {
        setRows(d.invitations ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-navy">Clientes</h1>
      <p className="text-sm text-muted">Quienes han solicitado acceso al portal de clientes.</p>

      <div className="card-modern mt-6 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-sm text-muted">Cargando clientes…</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-sm text-muted">
            <Users size={28} className="text-muted/50" />
            Aún no hay clientes registrados.
          </div>
        ) : (
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-border bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Invitado por</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-medium text-navy">{inv.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <Mail size={13} className="text-muted" />
                      {inv.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{inv.invitedBy || "—"}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {new Date(inv.createdAt).toLocaleDateString("es-CO")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}