"use client";

import { SECTIONS } from "@/lib/section-nav";
import { useSectionNav } from "./SectionProvider";

export default function SectionTabBar() {
  const { active, setActive } = useSectionNav();

  return (
    <div className="sticky top-[73px] z-40 border-y border-white/10 bg-navy/60 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center gap-2.5 sm:mx-auto">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            const variant = i % 2 === 0 ? "btn-shine-gold" : "btn-shine-navy";
            return (
              <button
                key={s.id}
                type="button"
                data-active={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(s.id)}
                className={`btn-shine ${variant}`}
              >
                <Icon size={14} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}