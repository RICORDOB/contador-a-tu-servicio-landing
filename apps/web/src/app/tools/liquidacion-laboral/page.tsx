import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import LiquidacionLaboralClient from "@/components/tools/liquida/LiquidacionLaboralClient";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Liquidación laboral",
  description:
    "Calcula la liquidación definitiva de un trabajador en Colombia: cesantías, intereses, prima, vacaciones, indemnización y sanción por mora. 100% en tu navegador, sin enviar datos.",
  alternates: { canonical: `${APP_URL.replace(/\/$/, "")}/tools/liquidacion-laboral` },
  openGraph: {
    title: "Liquidación laboral — Contador a tu Servicio",
    description:
      "Liquida cesantías, intereses, prima, vacaciones e indemnización con las normas vigentes y el salario mínimo de cada año.",
  },
};

export default function LiquidacionLaboralPage() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="chip">
          <ArrowLeft size={13} />
          Volver al inicio
        </Link>
        <p className="section-eyebrow mt-6">Herramienta gratuita</p>
        <h1 className="section-title font-display">Liquidación laboral</h1>
        <p className="section-sub max-w-2xl">
          Calcula la liquidación definitiva de un contrato de trabajo en Colombia:
          cesantías, intereses, prima, vacaciones, indemnización y sanción por
          mora. Con el salario mínimo vigente en cada año. Solo para fines
          orientativos.
        </p>
        <div className="mt-9">
          <LiquidacionLaboralClient />
        </div>
      </div>
    </section>
  );
}
