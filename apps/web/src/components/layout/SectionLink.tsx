"use client";

import type { ReactNode } from "react";
import { useSectionNav } from "./SectionProvider";
import type { SectionId } from "@/lib/section-nav";

interface SectionLinkProps {
  section: SectionId;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export default function SectionLink({
  section,
  className,
  children,
  "aria-label": ariaLabel,
}: SectionLinkProps) {
  const { setActive } = useSectionNav();
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => setActive(section)}
    >
      {children}
    </button>
  );
}