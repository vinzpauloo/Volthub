"use client";

import { useState, createElement } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Image from "next/image";
import Link from "next/link";
import {
  RiCloseLine,
  RiCheckLine,
  RiHomeLine,
  RiBuildingLine,
  RiPlantLine,
  RiPlugLine,
  RiBattery2Line,
  RiSunLine,
} from "react-icons/ri";

const systemTypes = [
  {
    icon: RiHomeLine,
    title: "Residential",
    subtitle: "Street Lights & Energy Storage",
    description:
      "Perfect for homes and small businesses. Our residential solar solutions include integrated street lights and mobile energy storage systems that provide reliable, off-grid power for daily use.",
    image: "/Product/SmartHome/SMP2.png",
    specs: ["5-30kWh Storage Systems", "3-5kW to 10kW rated power"],
    features: [
      "Solar street lights (5-12m poles)",
      "5-30kWh mobile energy storage",
      "Perfect for homes & small businesses",
      "3-5kW to 10kW rated power",
      "Professional installation included",
    ],
    ctaHref: "/contact",
    highlighted: false,
    rotate: "-rotate-2",
  },
  {
    icon: RiBuildingLine,
    title: "Commercial",
    subtitle: "40-261kWh Power Systems",
    description:
      "Built for businesses, resorts, and community facilities. Our commercial systems deliver reliable three-phase power with scalable battery capacity to keep your operations running smoothly.",
    image: "/Product/cabinet/30k.png",
    specs: ["Up to 110kW Rated Power", "Three-phase 400V/220V"],
    features: [
      "Small commercial & remote facilities",
      "Resorts, farms, barangay centers",
      "20kW to 110kW rated power",
      "40-261kWh battery capacity",
      "Perfect for businesses & communities",
    ],
    ctaHref: "/contact",
    highlighted: true,
    rotate: "rotate-0",
  },
  {
    icon: RiPlantLine,
    title: "Utility-Scale",
    subtitle: "466kWh+ Power Plants",
    description:
      "Large-scale solar power plants for town centers, island grids, and industrial parks. Our utility solutions deliver megawatt-level power with enterprise-grade reliability and support.",
    image: "/Product/cabinet/500kwh.png",
    specs: ["Up to 1MW Rated Power", "Island & industrial grids"],
    features: [
      "Town centers & island grids",
      "466kWh to 2700kWh capacity",
      "220kW to 1MW rated power",
      "Industrial parks & utilities",
      "Enterprise support package",
    ],
    ctaHref: "/contact",
    highlighted: false,
    rotate: "rotate-2",
  },
] as const;

export default function SolarSystemTypesSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <LayoutContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Solar Solutions for Every Need
          </h2>
          <p className="text-gray-500">
            From residential street lights to utility-scale power generation
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-0 md:-space-x-6">
          {systemTypes.map((system, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`${system.rotate} z-10 group cursor-pointer bg-white rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:z-20 overflow-hidden flex flex-col text-left ${
                system.highlighted
                  ? "border-2 border-amber-400"
                  : "border-gray-200"
              }`}
            >
              {system.highlighted && (
                <div className="absolute top-3 right-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-10">
                  Most Popular
                </div>
              )}

              <div className="relative h-40 bg-gray-50 overflow-hidden">
                <Image
                  src={system.image}
                  alt={system.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg shrink-0">
                    <system.icon className="text-lg text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {system.title}
                    </h3>
                    <p className="text-xs text-gray-500">{system.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {system.specs.map((spec, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-3">
                  {system.description}
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 group-hover:gap-2 transition-all">
                  <span>View Details</span>
                  <span>→</span>
                </span>
              </div>
            </button>
          ))}
        </div>
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
                  {createElement(systemTypes[selected].icon, { className: "text-xl text-gray-700" })}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {systemTypes[selected].title}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                {systemTypes[selected].description}
              </p>

              <div className="flex flex-wrap gap-2">
                {systemTypes[selected].specs.map((spec, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Setup Types */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Available Setup Types
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <RiPlugLine className="text-lg text-gray-500 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-900">On-Grid</div>
                    <div className="text-xs text-gray-400 mt-0.5">Grid-tied, no batteries</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <RiBattery2Line className="text-lg text-amber-500 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-900">Hybrid</div>
                    <div className="text-xs text-gray-400 mt-0.5">Grid + Battery</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <RiSunLine className="text-lg text-gray-500 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-900">Off-Grid</div>
                    <div className="text-xs text-gray-400 mt-0.5">Fully independent</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  All three setup types available — choose based on your location and energy goals
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  What&apos;s Included
                </h4>
                <ul className="space-y-2.5">
                  {systemTypes[selected].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <RiCheckLine className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={systemTypes[selected].ctaHref}
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
