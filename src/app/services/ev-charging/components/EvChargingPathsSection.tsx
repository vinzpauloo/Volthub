import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import { RiArrowRightLine, RiCheckLine } from "react-icons/ri";

const paths = [
  {
    eyebrow: "For homes",
    title: "A fixed-price charger installation",
    description:
      "A 7 kW wall charger installed in one visit, with the price quoted before we arrive. Works with BYD, Tesla, MG, GAC, Nissan and every Type 2 EV sold in the Philippines.",
    points: [
      "Sparks 7 kW and 21 kW AC chargers",
      "Scheduling for off-peak charging",
      "Solar integration",
      "Licensed electricians, PEC-compliant",
    ],
    cta: "Get a home charger quote",
    href: "/contact?subject=quote&interest=ac-charger-installation",
  },
  {
    eyebrow: "For businesses",
    title: "Chargers you own, or a station we run",
    description:
      "Offices, malls, hotels, condos and fleets choose between buying chargers outright and letting VoltHub operate the station on the VoltHub app.",
    points: [
      "OCPP 1.6J AC and DC chargers up to 400 kW",
      "Driver app, payments and monitoring",
      "Monthly settlement of charging revenue",
      "Operation plans from ₱1,500 per station per month",
    ],
    cta: "See operation plans",
    href: "/services/charging-operation",
  },
] as const;

export default function EvChargingPathsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <SectionHeading
          title="Two ways to work with VoltHub"
          description="Pick the path that fits your property."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {paths.map((path) => (
            <div
              key={path.title}
              className="rounded-2xl bg-white border border-gray-200 p-8 flex flex-col"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-700 font-semibold">
                {path.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">{path.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{path.description}</p>
              <ul className="mt-5 space-y-2 text-sm flex-1">
                {path.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-gray-700">
                    <RiCheckLine className="text-green-600 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={path.href}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
              >
                {path.cta}
                <RiArrowRightLine />
              </Link>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
