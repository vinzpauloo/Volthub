import { IconType } from "react-icons";
import LayoutContainer from "@/components/layout/LayoutContainer";

interface TrustBadge {
  name: string;
  icon: IconType;
}

export default function TrustStripSection({
  trustBadges,
}: {
  trustBadges: TrustBadge[];
}) {
  return (
    <div className="relative z-[2] bg-[var(--cr-bg-elev)] border-y border-[var(--cr-line)]">
      <LayoutContainer className="py-5 flex flex-wrap items-center gap-x-9 gap-y-3.5">
        {trustBadges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.name}
              className={`relative flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wide text-[var(--cr-fg-dim)] ${
                i > 0
                  ? "before:content-[''] before:absolute before:-left-[18px] before:top-1/2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-[var(--cr-line-strong)]"
                  : ""
              }`}
            >
              <Icon className="text-base text-[var(--cr-brand-light)]" />
              {badge.name}
            </div>
          );
        })}
      </LayoutContainer>
    </div>
  );
}
