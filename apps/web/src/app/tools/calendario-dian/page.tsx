import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import CalendarioDianForm from "@/components/tools/CalendarioDianForm";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Calendario tributario DIAN",
  description:
    "Consulta la fecha exacta de vencimiento de tu declaración de renta con los 2 últimos dígitos de tu NIT. Calendario DIAN 2025-2026 para contribuyentes en Turbo y Colombia.",
  alternates: { canonical: `${APP_URL.replace(/\/$/, "")}/tools/calendario-dian` },
  openGraph: {
    title: "Calendario tributario DIAN",
    description:
      "Fecha de vencimiento de tu declaración de renta según los 2 últimos dígitos de tu NIT. Gratis.",
  },
};

export default function CalendarioDianPage() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-emerald"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-navy">Calendario tributario DIAN</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Consulta la fecha exacta de vencimiento de tu declaración de renta
          (año gravable 2025) con los 2 últimos dígitos de tu NIT o cédula.
        </p>
        <div className="mt-8">
          <CalendarioDianForm />
        </div>
      </div>
    </section>
  );
}