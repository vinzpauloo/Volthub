import Link from "next/link";
import type { Route } from "next";

export default function SolarCarportPromoSection() {
  return (
    <div className="cr-promo-band">
      <div className="cr-promo-row">
        <div className="cr-promo-text">
          <b>Make More of Your Charging Site.</b>
          <span>
            Add a solar carport to bring shade and on-site solar generation to your
            charging station.
          </span>
        </div>
        <Link className="cr-seg-link" href={"/services/solar-installation" as Route}>
          Explore Solar Carports &rarr;
        </Link>
      </div>
    </div>
  );
}
