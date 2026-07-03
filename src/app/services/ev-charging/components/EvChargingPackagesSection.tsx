import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiChargingPile2Line,
  RiSmartphoneLine,
  RiComputerLine,
  RiCheckLine,
  RiInformationLine,
} from "react-icons/ri";
import Link from "next/link";

const packages = [
  {
    icon: RiChargingPile2Line,
    name: "Volthub Charger",
    tagline: "Hardware Only",
    description:
      "Purchase our EV charging equipment outright. Best for businesses that already have management software in place.",
    color: "blue",
    features: [
      "Full range of AC & DC chargers (7kW–400kW)",
      "Professional installation included",
      "Standard manufacturer warranty",
      "Basic on-site training for staff",
    ],
    fees: [
      { label: "Commission Fee", value: "One-time hardware purchase — no recurring commission" },
      { label: "CSMS Monthly", value: "Not included — use your own management system" },
      { label: "App Transaction Fee", value: "Not applicable — no app provided" },
    ],
    cta: "Get a Quote",
    ctaHref: "/contact?interest=ev-charging-quote&subject=charger-only",
    popular: false,
  },
  {
    icon: RiSmartphoneLine,
    name: "Volthub Charger + App",
    tagline: "Hardware & Software Bundle",
    description:
      "The complete solution — our charging equipment paired with the Volthub management platform and mobile app. Everything you need to launch and scale.",
    color: "green",
    features: [
      "Full range of AC & DC chargers (7kW–400kW)",
      "Professional installation & commissioning",
      "Admin dashboard with real-time monitoring",
      "Branded mobile app for your end users",
      "CSMS with OCPP 2.0 protocol support",
      "Priority technical support & extended warranty",
    ],
    fees: [
      { label: "Commission Fee", value: "5% per transaction processed through the platform" },
      { label: "CSMS Monthly", value: "₱1,500 / station / month (waived for first 3 months)" },
      { label: "App Transaction Fee", value: "2.5% per user payment transaction" },
      { label: "Payment Gateway", value: "Standard processor rates apply (~2.9% + ₱15)" },
    ],
    cta: "Get Started",
    ctaHref: "/contact?interest=ev-charging-quote&subject=charger-app-bundle",
    popular: true,
  },
  {
    icon: RiComputerLine,
    name: "App Package Only",
    tagline: "Software Platform",
    description:
      "Already have chargers? Connect them to the Volthub platform and unlock smart management, user app, and payment processing.",
    color: "purple",
    features: [
      "CSMS dashboard with station monitoring",
      "Branded mobile app for your end users",
      "OCPP 2.0 integration with existing chargers",
      "Revenue management & automated billing",
      "Remote diagnostics & OTA firmware updates",
      "Standard email & chat support",
    ],
    fees: [
      { label: "Commission Fee", value: "7% per transaction processed through the platform" },
      { label: "CSMS Monthly", value: "₱2,000 / station / month" },
      { label: "App Transaction Fee", value: "3% per user payment transaction" },
      { label: "Onboarding Fee", value: "₱25,000 one-time setup & integration fee" },
    ],
    cta: "Get Started",
    ctaHref: "/contact?interest=ev-charging-quote&subject=app-only",
    popular: false,
  },
] as const;

const colorMap: Record<string, { header: string; badge: string; btn: string; icon: string }> = {
  blue: {
    header: "bg-blue-600",
    badge: "bg-blue-100 text-blue-700",
    btn: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600",
  },
  green: {
    header: "bg-green-600",
    badge: "bg-green-100 text-green-700",
    btn: "bg-green-600 hover:bg-green-700",
    icon: "text-green-600",
  },
  purple: {
    header: "bg-purple-600",
    badge: "bg-purple-100 text-purple-700",
    btn: "bg-purple-600 hover:bg-purple-700",
    icon: "text-purple-600",
  },
};

export default function EvChargingPackagesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <LayoutContainer>
        <div className="text-center mb-16">
          <SectionHeading
            title="Packages & Pricing"
            description="Flexible plans designed for every stage of your EV charging business"
          />
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => {
            const colors = colorMap[pkg.color];
            return (
              <div
                key={idx}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${
                  pkg.popular ? "ring-2 ring-green-500 scale-[1.02]" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className={`${colors.header} text-white p-6 text-center`}>
                  <pkg.icon className="text-3xl mx-auto mb-2 text-white/90" />
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <p className="text-sm text-white/70 mt-1">{pkg.tagline}</p>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm">
                        <RiCheckLine className={`${colors.icon} mt-0.5 shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Fees */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <RiInformationLine className="text-gray-400 text-sm" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Fees & Terms
                      </span>
                    </div>
                    <div className="space-y-3">
                      {pkg.fees.map((fee, fIdx) => (
                        <div key={fIdx}>
                          <div className="text-xs font-medium text-gray-900">
                            {fee.label}
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed">
                            {fee.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={pkg.ctaHref}
                    className={`block w-full ${colors.btn} text-white py-3 rounded-xl font-semibold text-center text-sm transition-colors`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
