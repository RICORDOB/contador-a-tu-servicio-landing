export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: "contabilidad",
    title: "Contabilidad integral",
    description:
      "Registro contable, estados financieros y cumplimiento normativo para que tu negocio crezca con orden.",
    icon: "calculator",
  },
  {
    id: "nomina",
    title: "Nómina y seguridad social",
    description:
      "Liquidación de nómina, PILA, parafiscales y reportes ante entidades de control.",
    icon: "users",
  },
  {
    id: "renta",
    title: "Declaración de renta",
    description:
      "Preparación y presentación de renta para personas naturales y jurídicas según calendario DIAN.",
    icon: "file-text",
  },
  {
    id: "dian",
    title: "Asesoría DIAN",
    description:
      "Acompañamiento en requerimientos, correcciones y planeación tributaria conforme al Estatuto Tributario.",
    icon: "shield",
  },
  {
    id: "ica",
    title: "ICA y tributos municipales",
    description:
      "Declaraciones de industria y comercio, retenciones y obligaciones ante alcaldías.",
    icon: "building",
  },
  {
    id: "constitucion",
    title: "Constitución de empresas",
    description:
      "Creación de sociedades, RUT, Cámara de Comercio y puesta en marcha contable.",
    icon: "briefcase",
  },
];

export const TOOLS = [
  {
    id: "simulador-sanciones",
    title: "Simulador de sanciones",
    description:
      "Estima sanciones por extemporaneidad según el Estatuto Tributario colombiano.",
    href: "/tools/simulador-sanciones",
    status: "live" as const,
  },
  {
    id: "calendario-dian",
    title: "Calendario tributario DIAN",
    description:
      "Consulta la fecha exacta de vencimiento de tu declaración de renta con los 2 últimos dígitos de tu NIT.",
    href: "/tools/calendario-dian",
    status: "live" as const,
  },
];