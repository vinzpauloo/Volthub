import type { IconType } from "react-icons";

interface TrustBadge {
  name: string;
  icon: IconType;
}

interface TrustStripSectionProps {
  trustBadges: TrustBadge[];
}

export default function TrustStripSection({ trustBadges }: TrustStripSectionProps) {
  return (
    <div className="cr-trust">
      <div className="cr-trust-row">
        {trustBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.name} className="cr-trust-item">
              <Icon aria-hidden="true" />
              {badge.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
