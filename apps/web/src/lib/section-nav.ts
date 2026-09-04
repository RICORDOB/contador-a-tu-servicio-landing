import type { LucideIcon } from "lucide-react";
import {
  Home,
  Briefcase,
  Zap,
  Workflow,
  Wrench,
  Calculator,
  Users,
  MessageCircle,
  FileSearch,
} from "lucide-react";

export const SECTION_IDS = [
  "inicio",
  "servicios",
  "automatizacion",
  "proceso",
  "herramientas",
  "calculadora",
  "exorenta",
  "nosotros",
  "contacto",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface SectionDef {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

export const SECTIONS: SectionDef[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "servicios", label: "Servicios", icon: Briefcase },
  { id: "automatizacion", label: "Automatización", icon: Zap },
  { id: "proceso", label: "Proceso", icon: Workflow },
  { id: "herramientas", label: "Herramientas", icon: Wrench },
  { id: "calculadora", label: "Calculadora", icon: Calculator },
  { id: "exorenta", label: "ExoRenta", icon: FileSearch },
  { id: "nosotros", label: "Nosotros", icon: Users },
  { id: "contacto", label: "Contacto", icon: MessageCircle },
];

export const isSectionId = (v: string): v is SectionId =>
  (SECTION_IDS as readonly string[]).includes(v);