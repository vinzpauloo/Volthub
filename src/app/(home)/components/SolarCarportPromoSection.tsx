import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export default function SolarCarportPromoSection() {
  return (
    <div className="relative z-[2] bg-[var(--cr-bg-elev)] border-b border-[var(--cr-line)]">
      <div className="max-w-[1280px] mx-auto px-4 py-[22px] flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <b className="text-sm font-bold text-white">
            Make More of Your Charging Site.
          </b>
          <span className="text-[13px] text-[var(--cr-fg-dim)]">
            Add a solar carport to bring shade and on-site solar generation
            to your charging station.
          </span>
        </div>
        <Link
          href="/services/solar-installation"
          className="group inline-flex flex-none items-center gap-[7px] whitespace-nowrap text-[13px] font-bold text-[var(--cr-brand-light)]"
        >
          Explore Solar Carports
          <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
