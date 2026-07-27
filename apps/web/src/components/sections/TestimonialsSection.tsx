import { Quote } from "lucide-react";

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
    <section id="testimonios" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald">
            Testimonios
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="hover-lift rounded-2xl border border-border bg-slate-50 p-6"
            >
              <Quote size={24} className="text-emerald/40" />
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {t.text}
              </p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-emerald text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold text-navy">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}