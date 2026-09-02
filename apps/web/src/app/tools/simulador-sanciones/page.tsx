import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import SancionesForm from "@/components/tools/SancionesForm";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Simulador de sanciones tributarias",
  description:
    "Estima tu sanción por extemporaneidad según los Arts. 641–643 del Estatuto Tributario colombiano. Calculadora gratuita para comerciantes y empresas.",
  alternates: { canonical: `${APP_URL.replace(/\/$/, "")}/tools/simulador-sanciones` },
  openGraph: {
    title: "Simulador de sanciones tributarias",
    description:
      "Calcula de forma gratuita tu sanción por declaración extemporánea según la normativa DIAN.",
  },
};

export default function SimuladorSancionesPage() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="chip"
        >
          <ArrowLeft size={13} />
          Volver al inicio
        </Link>
        <p className="section-eyebrow mt-6">Herramienta gratuita</p>
        <h1 className="section-title font-display">Simulador de sanciones</h1>
        <p className="section-sub max-w-2xl">
          Estima la sanción por extemporaneidad según el Estatuto Tributario
          colombiano (Arts. 641–643). Solo para fines orientativos.
        </p>
        <div className="mt-9">
          <SancionesForm />
        </div>
      </div>
    </section>
  );
}