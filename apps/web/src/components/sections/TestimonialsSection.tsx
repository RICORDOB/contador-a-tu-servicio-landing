import { Quote, Star } from "lucide-react";
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
    <section id="testimonios" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">Testimonios</p>
          <h2 className="section-title font-display">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <article className="card-modern card-hover group relative h-full p-7">
                <span className="absolute right-6 top-6 text-emerald/15 transition group-hover:text-emerald/30">
                  <Quote size={40} />
                </span>
                <p className="relative text-sm leading-relaxed text-slate-700">
                  “{t.text}”
                </p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={15} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-display mt-4 font-semibold text-navy">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}