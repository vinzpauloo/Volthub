"use client";

import { useState, createElement } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Image from "next/image";
import Link from "next/link";
import {
  RiHome4Line,
  RiBuilding2Line,
  RiCloseLine,
  RiCheckLine,
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

const chargers = [
  {
    icon: RiHome4Line,
    name: "Home Charger",
    subtitle: "Simple, reliable, plug-and-charge",
    description:
      "Designed for residential use — just plug in and charge. No app, no network, no complexity. Perfect for homeowners who want a straightforward charging experience at the best value.",
    image: "/Product/EV/59.png",
    features: homeFeatures,
    notIncluded: homeNotIncluded,
    hasPlatform: false,
    rotate: "-rotate-2",
    zIndex: "z-10",
  },
  {
    icon: RiBuilding2Line,
    name: "Business Charger",
    subtitle: "OCPP-enabled, smart, scalable",
    description:
      "Built for commercial and fleet use with full OCPP 2.0 protocol support. Connect to any CSMS platform, manage multiple stations remotely, process payments, and scale your charging network with confidence.",
    image: "/Product/EV/89.png",
    features: businessFeatures,
    notIncluded: [],
    hasPlatform: true,
    rotate: "rotate-2",
    zIndex: "z-0",
  },
];

export default function EvChargingTypesSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Choose Your Charger
          </h2>
          <p className="text-gray-500">
            Two distinct charger types built for different needs — find the right fit for your property
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-0 md:-space-x-8">
          {chargers.map((charger, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`${charger.rotate} ${charger.zIndex} group cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:z-20 overflow-hidden flex flex-col text-left`}
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                <Image
                  src={charger.image}
                  alt={charger.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl shrink-0">
                    <charger.icon className="text-xl text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {charger.name}
                    </h3>
                    <p className="text-xs text-gray-500">{charger.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                  {charger.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
                  <span>View Details</span>
                  <span>→</span>
                </span>
              </div>
            </button>
          ))}
        </div>
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
                  {createElement(chargers[selected].icon, { className: "text-xl text-gray-700" })}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {chargers[selected].name}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                {chargers[selected].description}
              </p>

              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  What&apos;s Included
                </h4>
                <ul className="space-y-2.5">
                  {chargers[selected].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <RiCheckLine className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              {chargers[selected].notIncluded.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Not Included
                  </h4>
                  <ul className="space-y-1.5">
                    {chargers[selected].notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Platform (Business only) */}
              {chargers[selected].hasPlatform && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Included Software Platform
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <RiComputerLine className="text-gray-500" />
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
                        <RiSmartphoneLine className="text-gray-500" />
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
                </div>
              )}

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
