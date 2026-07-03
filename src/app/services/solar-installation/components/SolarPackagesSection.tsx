"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";
import { RiCloseLine, RiCheckLine } from "react-icons/ri";

const packages = [
  {
    name: "Solar Street Lights",
    savings: "One-Time Purchase",
    price: "Hardware Only",
    detail: "No recurring fees — own your lights outright",
    subDetail: "5-12m poles · 50W–120W LED",
    features: [
      "Integrated & split street light models",
      "5m to 12m pole height options",
      "50W to 120W LED power range",
      "Professional installation included",
      "Standard manufacturer warranty",
      "Basic on-site training for staff",
    ],
    fees: [
      { label: "Commission Fee", value: "None — one-time hardware purchase" },
      { label: "Monthly Fee", value: "None — own the equipment outright" },
      { label: "Maintenance", value: "Optional service plans available" },
    ],
    popular: false,
  },
  {
    name: "Solar + Storage Bundle",
    savings: "Save up to 25%",
    price: "₱2,500",
    detail: "per kWh / month (leasing)",
    subDetail: "5% monitoring fee · 2% transaction fee",
    features: [
      "Full range of solar panels & inverters",
      "5kWh to 1800kWh battery storage options",
      "Admin dashboard with real-time monitoring",
      "Performance alerts & optimization",
      "Net metering setup & utility coordination",
      "Priority technical support & extended warranty",
    ],
    fees: [
      { label: "Commission Fee", value: "5% per energy transaction" },
      { label: "Monitoring Monthly", value: "₱500 / system / month" },
      { label: "App Transaction Fee", value: "2% per payment transaction" },
      { label: "Installation", value: "Included in upfront or lease terms" },
    ],
    popular: true,
  },
  {
    name: "Storage Only",
    savings: "Save up to 15%",
    price: "₱1,800",
    detail: "per kWh / month (leasing)",
    subDetail: "7% monitoring fee · 3% transaction fee",
    features: [
      "Compatible with existing solar installations",
      "5kWh to 1800kWh battery capacity range",
      "Mobile & fixed storage system options",
      "Remote monitoring & diagnostics",
      "Load management & smart scheduling",
      "Standard email & chat support",
    ],
    fees: [
      { label: "Commission Fee", value: "7% per energy transaction" },
      { label: "Monitoring Monthly", value: "₱750 / system / month" },
      { label: "App Transaction Fee", value: "3% per payment transaction" },
      { label: "Onboarding Fee", value: "₱15,000 one-time setup & integration" },
    ],
    popular: false,
  },
];

export default function SolarPackagesSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Discover Pricing
          </h2>
          <p className="text-gray-500">
            Choose the right plan for your solar energy needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 flex flex-col text-center h-full ${
                pkg.popular
                  ? "bg-amber-50 border-2 border-amber-400 shadow-lg scale-[1.03] z-10"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <p
                className={`text-sm font-semibold mb-1 ${
                  pkg.popular ? "text-amber-700" : "text-gray-500"
                }`}
              >
                {pkg.savings}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {pkg.name}
              </h3>

              <div className="mb-1">
                <span className="text-4xl font-bold text-gray-900">
                  {pkg.price}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{pkg.detail}</p>
              <p className="text-xs text-gray-400 mb-6">{pkg.subDetail}</p>

              <button
                onClick={() => setSelected(idx)}
                className={`block w-full py-3 rounded-xl font-semibold text-sm transition-all mt-auto ${
                  pkg.popular
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50"
                }`}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed">
          *Pricing is determined by your plan, location, and system specifications.
          Specific pricing and full terms are available during consultation. All fees subject to applicable taxes.
        </p>
      </LayoutContainer>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-900">
                {packages[selected].name}
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  What&apos;s Included
                </h4>
                <ul className="space-y-2.5">
                  {packages[selected].features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm">
                      <RiCheckLine className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Fees & Terms
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {packages[selected].fees.map((fee, fIdx) => (
                    <div key={fIdx}>
                      <div className="text-xs font-semibold text-gray-900">
                        {fee.label}
                      </div>
                      <div className="text-xs text-gray-500">{fee.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact?interest=solar-installation-quote"
                className="block w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm text-center hover:bg-gray-800 transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
