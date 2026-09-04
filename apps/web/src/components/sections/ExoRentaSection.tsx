import { ArrowRight, LockKeyhole, FileText, Layers, BellRing } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { EXORENTA_URL } from "@/lib/exorenta";

const features = [
  {
    icon: LockKeyhole,
    title: "Acceso por roles",
    description:
      "Clientes, contadores y administrador con permisos separados y aprobación de cuentas.",
  },
  {
    icon: FileText,
    title: "Consulta individual",
    description:
      "Informe de información exógena y facturación con análisis del reporte y descarga en .xls.",
  },
  {
    icon: Layers,
    title: "Consultas masivas",
    description:
      "Carga de plantilla para procesar varios documentos a la vez con su propio historial.",
  },
  {
    icon: BellRing,
    title: "Notificaciones",
    description:
      "Alertas push en el dispositivo cuando tu consulta termina o necesita tu atención.",
  },
];

export default function ExoRentaSection() {
  return (
    <section id="exorenta" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:28px_28px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal className="max-w-2xl">
              <span className="chip-dark">
                <LockKeyhole size={13} />
                Herramienta para clientes
              </span>
              <h2 className="section-title-light font-display mt-4">
                Consultas de información exógena DIAN
              </h2>
              <p className="section-sub-light">
                ExoRenta consulta la información exógena y la facturación de un
                contribuyente frente a la DIAN, analiza el reporte y concluye
                si la persona debe o no declarar, explicándote el porqué según
                los parámetros de la autoridad tributaria.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title} delay={(i % 2) * 100}>
                    <article className="card-dark card-hover card-shimmer card-glow group h-full overflow-hidden p-6">
                      <span className="icon-tile h-12 w-12">
                        <Icon size={22} />
                      </span>
                      <h3 className="font-display mt-4 flex items-center gap-2 font-semibold text-white">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">{f.description}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={180} className="lg:sticky lg:top-[150px] lg:self-start">
            <div className="card-dark relative overflow-hidden rounded-3xl p-6 sm:p-7">
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-emerald/20 blur-3xl" />
              <p className="font-display text-lg font-bold text-white">ExoRenta</p>
              <p className="mt-1 text-sm text-slate-400">
                Acceso a tu cuenta para realizar consultas de información exógena.
              </p>
              <ul className="mt-5 space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <FileText size={14} className="mt-0.5 shrink-0 text-emerald-light" />
                  Informe .xls de 3 hojas por consulta
                </li>
                <li className="flex items-start gap-2">
                  <LockKeyhole size={14} className="mt-0.5 shrink-0 text-emerald-light" />
                  Cuenta con aprobación del administrador
                </li>
                <li className="flex items-start gap-2">
                  <BellRing size={14} className="mt-0.5 shrink-0 text-emerald-light" />
                  Resultados con notificación push
                </li>
              </ul>
              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={EXORENTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-5 py-3 text-sm"
                >
                  Solicitar acceso
                  <ArrowRight size={15} />
                </a>
                <a
                  href={EXORENTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy px-5 py-3 text-sm"
                >
                  <LockKeyhole size={15} />
                  Iniciar sesión
                </a>
              </div>
              <p className="mt-4 text-center text-[11px] text-slate-500">
                Se abre ExoRenta en una pestaña nueva.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}