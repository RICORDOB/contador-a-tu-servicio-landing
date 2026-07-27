import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CalendarioDianForm from "@/components/tools/CalendarioDianForm";

export const metadata = {
  title: "Calendario tributario DIAN",
  description:
    "Consulta la fecha de vencimiento de tu declaración de renta con los 2 últimos dígitos de tu NIT.",
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
          (año gravable 2024) con los 2 últimos dígitos de tu NIT o cédula.
        </p>
        <div className="mt-8">
          <CalendarioDianForm />
        </div>
      </div>
    </section>
  );
}