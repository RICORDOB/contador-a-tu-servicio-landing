import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SancionesForm from "@/components/tools/SancionesForm";

export const metadata = {
  title: "Simulador de sanciones tributarias",
  description:
    "Estima sanciones por extemporaneidad según el Estatuto Tributario colombiano.",
};

export default function SimuladorSancionesPage() {
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
        <h1 className="mt-4 text-3xl font-bold text-navy">Simulador de sanciones</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Estima la sanción por extemporaneidad según el Estatuto Tributario
          colombiano (Arts. 641–643). Solo para fines orientativos.
        </p>
        <div className="mt-8">
          <SancionesForm />
        </div>
      </div>
    </section>
  );
}