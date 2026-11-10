"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LiquidacionLaboral = dynamic(() => import("./LiquidacionLaboral"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
      <Loader2 size={16} className="animate-spin" />
      Cargando…
    </div>
  ),
});

export default function LiquidacionLaboralClient() {
  return <LiquidacionLaboral />;
}
