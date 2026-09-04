import { Quote, Star, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    name: "María García",
    role: "Propietaria, Restaurant El Urabá",
    text: "Contador a tu Servicio automatizó nuestro flujo de facturación y nunca más perdimos una fecha límite DIAN. El chatbot nos ahorra horas cada mes.",
    rating: 5,
  },
  {
    name: "Carlos López",
    role: "Contador independiente",
    text: "La gestión documental automatizada es un antes y un después. Mis clientes reciben sus documentos organizados sin esfuerzo manual.",
    rating: 5,
  },
  {
    name: "Ana María Vega",
    role: "CEO, Vega & Asociados SAS",
    text: "La automatización de alertas de vencimiento nos da tranquilidad total. Sabemos exactamente cuándo debemos cumplir cada obligación.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_85%_20%,rgba(5,150,105,0.1),transparent_40%),radial-gradient(circle_at_10%_80%,rgba(201,162,39,0.09),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow-light">
            <Sparkles size={13} />
            Testimonios
          </p>
          <h2 className="section-title-light font-display">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <article className="card-dark card-hover card-shimmer card-glow group relative h-full overflow-hidden p-7">
                <span className="absolute right-6 top-6 text-emerald/20 transition-all duration-500 group-hover:rotate-12 group-hover:text-emerald/40">
                  <Quote size={40} />
                </span>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-emerald-light text-xs font-bold uppercase text-white shadow-lg shadow-emerald/25 ring-2 ring-gold/30">
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <p className="relative mt-5 text-sm leading-relaxed text-slate-300">
                  “{t.text}”
                </p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={15} className="fill-gold text-gold transition-transform duration-300 group-hover:scale-110" />
                  ))}
                </div>
                <p className="font-display mt-4 font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}