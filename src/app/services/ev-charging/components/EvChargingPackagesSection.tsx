"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";
import { RiCloseLine, RiCheckLine } from "react-icons/ri";

const packages = [
  {
    name: "Volthub Charger",
    savings: "One-Time Purchase",
    price: "Hardware Only",
    detail: "No recurring fees — own your charger outright",
    subDetail: "Use your own CSMS or management system",
    features: [
      "Full range of AC & DC chargers (7kW–400kW)",
      "Professional installation included",
      "Standard manufacturer warranty",
      "Basic on-site training for staff",
    ],
    fees: [
      { label: "Commission Fee", value: "None — one-time hardware purchase" },
      { label: "CSMS Monthly", value: "Not included — use your own system" },
      { label: "App Transaction Fee", value: "Not applicable — no app provided" },
    ],
    popular: false,
  },
  {
    name: "Volthub Charger + App",
    savings: "Save up to 20%",
    price: "₱1,500",
    detail: "per station / month",
    subDetail: "5% commission · 2.5% app transaction fee",
    features: [
      "Full range of AC & DC chargers (7kW–400kW)",
      "Professional installation & commissioning",
      "Admin dashboard with real-time monitoring",
      "Branded mobile app for your end users",
      "CSMS with OCPP 2.0 protocol support",
      "Priority technical support & extended warranty",
    ],
    fees: [
      { label: "Commission Fee", value: "5% per transaction" },
      { label: "CSMS Monthly", value: "₱1,500 / station / month (first 3 months waived)" },
      { label: "App Transaction Fee", value: "2.5% per user payment" },
      { label: "Payment Gateway", value: "Standard processor rates (~2.9% + ₱15)" },
    ],
    popular: true,
  },
  {
    name: "App Package Only",
    savings: "Save up to 10%",
    price: "₱2,000",
    detail: "per station / month",
    subDetail: "7% commission · ₱25,000 onboarding fee",
    features: [
      "CSMS dashboard with station monitoring",
      "Branded mobile app for your end users",
      "OCPP 2.0 integration with existing chargers",
      "Revenue management & automated billing",
      "Remote diagnostics & OTA firmware updates",
      "Standard email & chat support",
    ],
    fees: [
      { label: "Commission Fee", value: "7% per transaction" },
      { label: "CSMS Monthly", value: "₱2,000 / station / month" },
      { label: "App Transaction Fee", value: "3% per user payment" },
      { label: "Onboarding Fee", value: "₱25,000 one-time setup & integration" },
    ],
    popular: false,
  },
];

export default function EvChargingPackagesSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Operation Plans
          </h2>
          <p className="text-gray-500">
            Let VoltHub run your station on the VoltHub app, or own the hardware outright.{" "}
            <Link href="/services/charging-operation" className="text-primary font-semibold hover:underline">
              Full details on the charging operation page
            </Link>
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

        {/* Footnote */}
        <p className="text-center text-xs text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed">
          *Pricing is determined by your plan, location, and charger model. Specific pricing and full
          terms are available during consultation. All fees subject to applicable taxes.
        </p>
      </LayoutContainer>

      {/* Modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  What&apos;s Included
                </h4>
                <ul className="space-y-2.5">
                  {packages[selected].features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm">
                      <RiCheckLine className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fees & Terms */}
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

              {/* CTA */}
              <Link
                href="/contact?interest=ev-charging-quote"
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
