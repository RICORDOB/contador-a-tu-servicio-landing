"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { SECTION_IDS, type SectionId } from "@/lib/section-nav";

interface SectionNavCtx {
  active: SectionId;
  setActive: (section: SectionId) => void;
}

const SectionNavContext = createContext<SectionNavCtx | null>(null);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0]);
  return (
    <SectionNavContext.Provider value={{ active, setActive }}>
      {children}
    </SectionNavContext.Provider>
  );
}

export function useSectionNav() {
  const ctx = useContext(SectionNavContext);
  if (!ctx) throw new Error("useSectionNav debe usarse dentro de SectionProvider");
  return ctx;
}