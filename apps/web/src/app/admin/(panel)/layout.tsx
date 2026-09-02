import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin-auth";
import PanelShell from "@/components/admin/PanelShell";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const role = await requireRole("developer");
  if (!role) {
    redirect("/admin/login");
  }

  return <PanelShell role="developer">{children}</PanelShell>;
}