"use client";

import PanelLogin from "@/components/admin/PanelLogin";

export default function ContadoraLoginPage() {
  return (
    <PanelLogin
      role="contadora"
      title="Panel de la contadora"
      subtitle="Gestión operativa de la firma"
      redirectTo="/contadora"
    />
  );
}