"use client";

import PanelLogin from "@/components/admin/PanelLogin";

export default function AdminLoginPage() {
  return (
    <PanelLogin
      role="developer"
      title="Panel de desarrollador"
      subtitle="Control técnico del sistema"
      redirectTo="/admin"
    />
  );
}