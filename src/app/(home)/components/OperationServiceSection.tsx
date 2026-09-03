import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import {
  RiArrowRightLine,
  RiBankCardLine,
  RiDashboard3Line,
  RiSmartphoneLine,
} from "react-icons/ri";

const highlights = [
  {
    icon: RiSmartphoneLine,
    title: "Driver app",
    description: "Live on iOS and Android. QR, RFID, wallet, receipts.",
  },
  {
    icon: RiDashboard3Line,
    title: "Operator dashboard",
    description: "Revenue, sessions, uptime, exports. You see what we see.",
  },
  {
    icon: RiBankCardLine,
    title: "Monthly settlement",
    description: "Revenue less the agreed commission, with a line-by-line statement.",
  },
];

export default function OperationServiceSection() {
  return (
    <section className="section-spacing bg-gray-900 text-white">
      <LayoutContainer className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary font-semibold">
            EV charging operation
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Own the charger. We run the business.
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Malls, hotels, offices, condos and fleet depots earn charging revenue
            without hiring a charging team. VoltHub lists your station in the driver
            app, collects GCash and card payments, monitors every charger over OCPP
            and pays you monthly. From ₱1,500 per station per month, or connect a
            charger you already own.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <item.icon className="text-3xl text-secondary" />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/services/charging-operation"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            See operation plans
            <RiArrowRightLine />
          </Link>
          <Link
            href="/tools/ev-charger-roi-calculator"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Run the ROI calculator
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}
