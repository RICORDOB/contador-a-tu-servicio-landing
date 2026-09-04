"use client";

import type { ReactNode } from "react";
import { SECTION_IDS, type SectionId } from "@/lib/section-nav";
import { useSectionNav } from "./SectionProvider";

interface SectionsViewportProps {
  sections: Record<SectionId, ReactNode>;
}

export default function SectionsViewport({ sections }: SectionsViewportProps) {
  const { active } = useSectionNav();

  return (
    <>
      {SECTION_IDS.map((id) => (
        <div
          key={id}
          id={id}
          aria-hidden={id !== active}
          className={id === active ? "tab-panel-anim" : "hidden"}
        >
          {sections[id]}
        </div>
      ))}
    </>
  );
}