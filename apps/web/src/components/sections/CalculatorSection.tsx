import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Calculator, CalendarDays, Scale, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import AnimatedCalculator from "@/components/ui/AnimatedCalculator";

const points = [
  "Sanciones por extemporaneidad según el Estatuto Tributario",
  "Fechas DIAN según los dos últimos dígitos de tu NIT",
  "Cálculos referenciales con UVT y tarifas vigentes",
];

const particles = [
  { c: "left-[8%] top-[24%] bg-emerald-light/70", d: "11s", del: "0s" },
  { c: "left-[22%] top-[72%] bg-gold/60", d: "14s", del: "2s" },
  { c: "left-[60%] top-[16%] bg-gold-light/60", d: "12s", del: "4s" },
  { c: "left-[82%] top-[64%] bg-emerald/60", d: "15s", del: "1s" },
];

export default function CalculatorSection() {
  return (
    <section id="calculadora" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:36px_36px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80">
        {particles.map((p, i) => (
          <span
            key={i}
            className={`particle h-1.5 w-1.5 rounded-full ${p.c}`}
            style={
              {
                "--p-dur": p.d,
                "--p-delay": p.del,
                "--p-x": "18px",
                "--p-opacity": "0.6",
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="chip-dark">
                <Calculator size={13} />
                Cálculo profesional
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="section-title-light font-display mt-5 text-3xl text-white sm:text-4xl lg:text-5xl">
                Tu situación tributaria,{" "}
                <span className="text-gradient-gold">calculada al instante</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="section-sub-light mt-5 max-w-xl leading-relaxed">
                Simulamos sanciones, fechas de vencimiento y estimaciones de
                impuestos con la normativa vigente. El motor se ejecuta en
                tiempo real, sin registros ni procesos manuales.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-6 space-y-2.5">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-light" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/simulador-sanciones" className="btn-gold px-6 py-3.5 text-sm">
                  <Scale size={16} />
                  Simular sanciones
                  <ArrowRight size={15} />
                </Link>
                <Link href="/tools/calendario-dian" className="btn-navy px-6 py-3.5 text-sm">
                  <CalendarDays size={16} />
                  Ver calendario DIAN
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <AnimatedCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}