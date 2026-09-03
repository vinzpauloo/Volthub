import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { RiArrowRightLine } from "react-icons/ri";

export function SiteOwnerCta(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-900 text-white">
      <LayoutContainer className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary font-semibold">
            For site owners
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Want your parking on this map? VoltHub can run the station for you.
          </h2>
          <p className="text-gray-300">
            We supply or connect the chargers, list your site in the app, collect
            payments, monitor every charger and settle your revenue monthly. Plans
            from ₱1,500 per station per month.
          </p>
        </div>
        <Link
          href="/services/charging-operation"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors shrink-0"
        >
          See operation plans
          <RiArrowRightLine />
        </Link>
      </LayoutContainer>
    </section>
  );
}
