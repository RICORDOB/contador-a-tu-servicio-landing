import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin-auth";
import PanelShell from "@/components/admin/PanelShell";

export default async function ContadoraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const role = await requireRole("contadora");
  if (!role) {
    redirect("/contadora/login");
  }

  return <PanelShell role="contadora">{children}</PanelShell>;
}