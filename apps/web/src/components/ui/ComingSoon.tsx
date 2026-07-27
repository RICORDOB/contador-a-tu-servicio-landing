import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald/10 text-emerald">
          <Construction size={28} />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-navy">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
        <p className="mt-4 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-navy">
          Próximamente
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-emerald hover:text-emerald-light"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}