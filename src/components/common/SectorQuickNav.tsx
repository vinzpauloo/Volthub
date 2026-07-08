"use client";

import Link from "next/link";
import { Route } from "next";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";

const sectors: { label: string; href: Route }[] = [
  { label: "Residential", href: "/sectors/residential" },
  { label: "Commercial", href: "/sectors/commercial" },
  { label: "Industrial", href: "/sectors/industrial" },
  { label: "Rural Projects", href: "/sectors/rural-projects" },
];

export default function SectorQuickNav() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- client-mount detection */
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return (
    <div className="sticky top-[72px] z-40 bg-slate-50/95 backdrop-blur border-b border-slate-200 lg:hidden">
      <LayoutContainer className="px-3 md:px-4">
        <div className="py-2.5 md:py-3">
          <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 md:gap-3 min-w-max">
              {sectors.map((sector) => {
                const isActive = mounted && pathname.startsWith(sector.href);
                return (
                  <Link
                    key={sector.href}
                    href={sector.href}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {sector.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}

