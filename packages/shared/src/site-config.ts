export const SITE = {
  name: "Contador a tu Servicio",
  tagline: "Servicios contables, automatización e inteligencia artificial en Turbo, Antioquia",
  description:
    "Firma contable en Turbo, Antioquia. Contabilidad, nómina, declaración de renta, asesoría DIAN, automatización de procesos y asistencia con IA para empresas y personas naturales.",
  location: {
    city: "Turbo",
    department: "Antioquia",
    country: "Colombia",
    label: "Turbo, Antioquia",
  },
  contact: {
    email: "contacto@contadoratuservicio.com",
    phone: "+57 300 000 0000",
    whatsapp: "+57 300 000 0000",
    hours: "Lunes a viernes · 8:00 AM – 6:00 PM",
  },
  registration: {
    mode: "invitation-only" as const,
    message:
      "El portal de clientes es exclusivo. Tu contador te enviará una invitación por correo para acceder.",
  },
  automation: {
    tagline: "Automatiza tu contabilidad",
    description:
      "Herramientas inteligentes que liberan tu tiempo para enfocarte en lo que importa:",
  },
  ai: {
    tagline: "Asistencia inteligente",
    description:
      "Asistentes de IA que entienden tus necesidades contables y tributarias para darte respuestas precisas.",
  },
} as const;