import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import Link from "next/link";
import {
  RiHome4Line,
  RiBuilding2Line,
  RiCheckLine,
  RiArrowRightLine,
  RiComputerLine,
  RiSmartphoneLine,
  RiBarChart2Line,
  RiChargingPile2Line,
  RiUserSettingsLine,
  RiMoneyDollarCircleLine,
  RiNotification3Line,
  RiMapPinUserLine,
  RiHistoryLine,
  RiQrCodeLine,
} from "react-icons/ri";

const adminFeatures = [
  { icon: RiBarChart2Line, title: "Real-Time Dashboard", desc: "Monitor all stations, energy usage, and revenue from a single dashboard." },
  { icon: RiChargingPile2Line, title: "Station Management", desc: "Configure pricing, manage access, push firmware updates, and control stations remotely." },
  { icon: RiUserSettingsLine, title: "User & Fleet Management", desc: "Manage user accounts, RFID cards, fleet charging schedules, and access permissions." },
  { icon: RiMoneyDollarCircleLine, title: "Revenue & Billing", desc: "Automated billing, transaction reports, revenue analytics, and payment reconciliation." },
];

const appFeatures = [
  { icon: RiMapPinUserLine, title: "Find & Navigate", desc: "Locate available charging stations nearby with real-time availability and turn-by-turn directions." },
  { icon: RiQrCodeLine, title: "Start & Pay", desc: "Scan QR code or tap RFID to start charging. Pay via card, mobile wallet, or subscription." },
  { icon: RiNotification3Line, title: "Smart Notifications", desc: "Get alerts when charging is complete, station becomes available, or for maintenance updates." },
  { icon: RiHistoryLine, title: "History & Insights", desc: "Track charging history, energy consumption, cost savings, and environmental impact over time." },
];

const homeFeatures = [
  "7kW AC charging — full charge in 4–8 hours",
  "No app or network setup required",
  "Simple plug-and-charge operation",
  "Compact wall-mounted design",
  "Weatherproof IP65 rated for indoor/outdoor",
  "Professional installation included",
];

const homeNotIncluded = [
  "No OCPP or network connectivity",
  "No remote monitoring or app control",
  "No payment processing capabilities",
];

const businessFeatures = [
  "7kW to 400kW — AC & DC options available",
  "OCPP 2.0 protocol for universal CSMS compatibility",
  "Remote monitoring, diagnostics & OTA updates",
  "RFID, QR code & mobile app payment support",
  "Load balancing & smart energy management",
  "Commercial-grade durability with extended warranty",
];

export default function EvChargingTypesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Choose Your Charger"
            description="Two distinct charger types built for different needs — find the right fit for your property"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Home Charger */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-xl shrink-0">
                <RiHome4Line className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Home Charger</h3>
                <p className="text-sm text-green-600 font-medium">Simple, reliable, plug-and-charge</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Designed for residential use — just plug in and charge. No app, no network, no complexity. Perfect for homeowners who want a straightforward charging experience.
            </p>

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">What's Included</h4>
            <ul className="space-y-2 mb-6 flex-1">
              {homeFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Not Included</h4>
              <ul className="space-y-1.5">
                {homeNotIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact?interest=ev-charging-quote&subject=home-charger"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:gap-3 transition-all"
            >
              <span>Get a Quote</span>
              <RiArrowRightLine />
            </Link>
          </div>

          {/* Business Charger */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl shrink-0">
                <RiBuilding2Line className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Business Charger</h3>
                <p className="text-sm text-blue-600 font-medium">OCPP-enabled, smart, scalable</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Built for commercial and fleet use with full OCPP 2.0 protocol support. Connect to any CSMS platform, manage multiple stations remotely, process payments, and scale your charging network.
            </p>

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Charger Features</h4>
            <ul className="space-y-2 mb-8">
              {businessFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <RiCheckLine className="text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Included Software Platform
            </h4>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <RiComputerLine className="text-gray-600" />
                  <h5 className="text-sm font-semibold text-gray-900">Admin Panel</h5>
                </div>
                <ul className="space-y-2.5">
                  {adminFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <RiCheckLine className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <RiSmartphoneLine className="text-gray-600" />
                  <h5 className="text-sm font-semibold text-gray-900">Mobile App</h5>
                </div>
                <ul className="space-y-2.5">
                  {appFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <RiCheckLine className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{f.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/contact?interest=ev-charging-quote&subject=business-charger"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
            >
              <span>Get a Quote</span>
              <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
