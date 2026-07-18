"use client";

import { useState } from "react";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiBatteryChargeLine,
  RiSunLine,
  RiPlugLine,
  RiCheckLine,
} from "react-icons/ri";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface PackageSpec {
  label: string;
  value: string;
}

interface PackageTier {
  kw: number;
  label: string;
  price: string;
  tagline: string;
  specs: PackageSpec[];
  popular?: boolean;
}

interface SystemTab {
  id: "hybrid" | "offgrid" | "gridtied";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  packages: PackageTier[];
}

const SYSTEM_TABS: SystemTab[] = [
  // -----------------------------------------------------------------------
  // HYBRID
  // -----------------------------------------------------------------------
  {
    id: "hybrid",
    label: "Hybrid",
    icon: RiBatteryChargeLine,
    description:
      "Grid-connected with battery backup. Use solar directly, store excess, and keep the grid for emergencies. Best for homes with frequent outages.",
    packages: [
      {
        kw: 5,
        label: "5kW Hybrid",
        price: "₱250,000 – ₱320,000",
        tagline: "Starter hybrid — essential backup",
        specs: [
          { label: "Solar Panels", value: "~12 × 415W panels" },
          { label: "Inverter", value: "5kW hybrid inverter" },
          { label: "Battery", value: "5–10 kWh LiFePO₄" },
          { label: "Daily Output", value: "~20–25 kWh" },
          { label: "Backup Power", value: "Lights, fridge, fans, WiFi" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 8,
        label: "8kW Hybrid",
        price: "₱380,000 – ₱480,000",
        tagline: "Mid-range — whole-home partial backup",
        specs: [
          { label: "Solar Panels", value: "~20 × 415W panels" },
          { label: "Inverter", value: "8kW hybrid inverter" },
          { label: "Battery", value: "10–15 kWh LiFePO₄" },
          { label: "Daily Output", value: "~32–40 kWh" },
          { label: "Backup Power", value: "+ TV, microwave, small AC" },
          { label: "Payback", value: "5–7 years" },
        ],
        popular: true,
      },
      {
        kw: 10,
        label: "10kW Hybrid",
        price: "₱480,000 – ₱600,000",
        tagline: "Full-home comfort with battery",
        specs: [
          { label: "Solar Panels", value: "~24 × 415W panels" },
          { label: "Inverter", value: "10kW hybrid inverter" },
          { label: "Battery", value: "15–20 kWh LiFePO₄" },
          { label: "Daily Output", value: "~40–50 kWh" },
          { label: "Backup Power", value: "+ 1–2 air conditioners" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 12,
        label: "12kW Hybrid",
        price: "₱580,000 – ₱720,000",
        tagline: "Large home — extended backup",
        specs: [
          { label: "Solar Panels", value: "~30 × 415W panels" },
          { label: "Inverter", value: "12kW hybrid inverter" },
          { label: "Battery", value: "20–25 kWh LiFePO₄" },
          { label: "Daily Output", value: "~48–60 kWh" },
          { label: "Backup Power", value: "+ multiple ACs, water pump" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 15,
        label: "15kW Hybrid",
        price: "₱720,000 – ₱900,000",
        tagline: "Large property — serious storage",
        specs: [
          { label: "Solar Panels", value: "~36 × 415W panels" },
          { label: "Inverter", value: "15kW hybrid inverter" },
          { label: "Battery", value: "25–30 kWh LiFePO₄" },
          { label: "Daily Output", value: "~60–75 kWh" },
          { label: "Backup Power", value: "Whole home + workshop" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
      {
        kw: 18,
        label: "18kW Hybrid",
        price: "₱860,000 – ₱1,050,000",
        tagline: "Maximum hybrid — near-full independence",
        specs: [
          { label: "Solar Panels", value: "~44 × 415W panels" },
          { label: "Inverter", value: "18kW hybrid inverter" },
          { label: "Battery", value: "30–40 kWh LiFePO₄" },
          { label: "Daily Output", value: "~72–90 kWh" },
          { label: "Backup Power", value: "Full home, all appliances" },
          { label: "Payback", value: "5–7 years" },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // OFF-GRID
  // -----------------------------------------------------------------------
  {
    id: "offgrid",
    label: "Off-Grid",
    icon: RiSunLine,
    description:
      "Completely independent from the grid. Oversized solar array and large battery bank power your home 24/7. Ideal for remote locations.",
    packages: [
      {
        kw: 5,
        label: "5kW Off-Grid",
        price: "₱350,000 – ₱450,000",
        tagline: "Essential off-grid cabin or tiny home",
        specs: [
          { label: "Solar Panels", value: "~12 × 415W panels" },
          { label: "Inverter", value: "5kW off-grid inverter" },
          { label: "Battery", value: "15–20 kWh LiFePO₄" },
          { label: "Daily Output", value: "~20–25 kWh" },
          { label: "Autonomy", value: "1–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 8,
        label: "8kW Off-Grid",
        price: "₱520,000 – ₱650,000",
        tagline: "Small family home independence",
        specs: [
          { label: "Solar Panels", value: "~20 × 415W panels" },
          { label: "Inverter", value: "8kW off-grid inverter" },
          { label: "Battery", value: "20–30 kWh LiFePO₄" },
          { label: "Daily Output", value: "~32–40 kWh" },
          { label: "Autonomy", value: "1–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
        popular: true,
      },
      {
        kw: 10,
        label: "10kW Off-Grid",
        price: "₱650,000 – ₱800,000",
        tagline: "Comfortable family home, full off-grid",
        specs: [
          { label: "Solar Panels", value: "~24 × 415W panels" },
          { label: "Inverter", value: "10kW off-grid inverter" },
          { label: "Battery", value: "30–40 kWh LiFePO₄" },
          { label: "Daily Output", value: "~40–50 kWh" },
          { label: "Autonomy", value: "1.5–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 12,
        label: "12kW Off-Grid",
        price: "₱780,000 – ₱950,000",
        tagline: "Large home with high energy demand",
        specs: [
          { label: "Solar Panels", value: "~30 × 415W panels" },
          { label: "Inverter", value: "12kW off-grid inverter" },
          { label: "Battery", value: "40–50 kWh LiFePO₄" },
          { label: "Daily Output", value: "~48–60 kWh" },
          { label: "Autonomy", value: "1.5–2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 15,
        label: "15kW Off-Grid",
        price: "₱950,000 – ₱1,150,000",
        tagline: "Large property — full independence",
        specs: [
          { label: "Solar Panels", value: "~36 × 415W panels" },
          { label: "Inverter", value: "15kW off-grid inverter" },
          { label: "Battery", value: "50–60 kWh LiFePO₄" },
          { label: "Daily Output", value: "~60–75 kWh" },
          { label: "Autonomy", value: "2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
      {
        kw: 18,
        label: "18kW Off-Grid",
        price: "₱1,100,000 – ₱1,350,000",
        tagline: "Estate-level off-grid power",
        specs: [
          { label: "Solar Panels", value: "~44 × 415W panels" },
          { label: "Inverter", value: "18kW off-grid inverter" },
          { label: "Battery", value: "60–80 kWh LiFePO₄" },
          { label: "Daily Output", value: "~72–90 kWh" },
          { label: "Autonomy", value: "2 days without sun" },
          { label: "Payback", value: "6–10 years" },
        ],
      },
    ],
  },

  // -----------------------------------------------------------------------
  // GRID-TIED
  // -----------------------------------------------------------------------
  {
    id: "gridtied",
    label: "Grid-Tied",
    icon: RiPlugLine,
    description:
      "The most cost-effective solar setup. Stay connected to the grid — use solar by day, grid by night, and export excess via net metering for bill credits.",
    packages: [
      {
        kw: 5,
        label: "5kW Grid-Tied",
        price: "₱150,000 – ₱200,000",
        tagline: "Best-value solar starter",
        specs: [
          { label: "Solar Panels", value: "~12 × 415W panels" },
          { label: "Inverter", value: "5kW grid-tie inverter" },
          { label: "Daily Output", value: "~20–25 kWh" },
          { label: "Monthly Savings", value: "~₱4,000 – ₱6,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 8,
        label: "8kW Grid-Tied",
        price: "₱240,000 – ₱320,000",
        tagline: "Mid-size home — serious savings",
        specs: [
          { label: "Solar Panels", value: "~20 × 415W panels" },
          { label: "Inverter", value: "8kW grid-tie inverter" },
          { label: "Daily Output", value: "~32–40 kWh" },
          { label: "Monthly Savings", value: "~₱6,500 – ₱9,500" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
        popular: true,
      },
      {
        kw: 10,
        label: "10kW Grid-Tied",
        price: "₱300,000 – ₱400,000",
        tagline: "Full-home solar coverage",
        specs: [
          { label: "Solar Panels", value: "~24 × 415W panels" },
          { label: "Inverter", value: "10kW grid-tie inverter" },
          { label: "Daily Output", value: "~40–50 kWh" },
          { label: "Monthly Savings", value: "~₱8,000 – ₱12,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 12,
        label: "12kW Grid-Tied",
        price: "₱360,000 – ₱480,000",
        tagline: "Large home with high daytime use",
        specs: [
          { label: "Solar Panels", value: "~30 × 415W panels" },
          { label: "Inverter", value: "12kW grid-tie inverter" },
          { label: "Daily Output", value: "~48–60 kWh" },
          { label: "Monthly Savings", value: "~₱10,000 – ₱14,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 15,
        label: "15kW Grid-Tied",
        price: "₱450,000 – ₱600,000",
        tagline: "Large property — maximum ROI",
        specs: [
          { label: "Solar Panels", value: "~36 × 415W panels" },
          { label: "Inverter", value: "15kW grid-tie inverter" },
          { label: "Daily Output", value: "~60–75 kWh" },
          { label: "Monthly Savings", value: "~₱12,000 – ₱18,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
      {
        kw: 18,
        label: "18kW Grid-Tied",
        price: "₱540,000 – ₱720,000",
        tagline: "Near-commercial scale for estates",
        specs: [
          { label: "Solar Panels", value: "~44 × 415W panels" },
          { label: "Inverter", value: "18kW grid-tie inverter" },
          { label: "Daily Output", value: "~72–90 kWh" },
          { label: "Monthly Savings", value: "~₱14,500 – ₱21,000" },
          { label: "Net Metering", value: "Export excess to grid" },
          { label: "Payback", value: "3–5 years" },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// What's Included (shared across all packages)
// ---------------------------------------------------------------------------

const WHATS_INCLUDED = [
  {
    image: "/aboutimages/solarpanels2.jpg",
    title: "Solar Panels",
    desc: "Tier-1 monocrystalline panels with 25-year performance warranty",
  },
  {
    image: "/aboutimages/inverter.png",
    title: "Inverter",
    desc: "Pure sine wave inverter with MPPT charge controller and Wi-Fi monitoring",
  },
  {
    image: "/HomeBanner/homebatt.png",
    title: "Battery",
    desc: "LiFePO₄ lithium batteries — 6,000+ cycle life, 10-year warranty (hybrid & off-grid)",
  },
  {
    image: "/aboutimages/mountin.jpg",
    title: "Mounting Hardware",
    desc: "Anodized aluminum rails, stainless steel fasteners, waterproof roof flashing",
  },
  {
    image: "/aboutimages/safety.jpg",
    title: "Safety & Protection",
    desc: "DC/AC surge protection, breakers, disconnects, grounding, and lightning arrestors",
  },
  {
    image: "/aboutimages/warrany.jpg",
    title: "Installation & Warranty",
    desc: "Professional installation, 5-year workmanship warranty, net metering assistance",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SolarPackagePricing(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<SystemTab["id"]>("hybrid");

  const currentTab = SYSTEM_TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Package Pricing"
          title="Custom-Made Solar Packages"
          description="Transparent pricing for our most popular solar setups. Every package is tailored to your roof, energy needs, and budget — these are guide prices for typical installations."
        />

        {/* ---- Tab Bar ---- */}
        <div className="flex justify-center w-full">
          <div className="inline-flex bg-white rounded-2xl border border-gray-200 p-1.5 gap-1 shadow-sm">
            {SYSTEM_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="text-lg" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Tab Description ---- */}
        {/* <p className="text-center text-gray-500 max-w-2xl mx-auto -mt-6">
          {currentTab.description}
        </p> */}

        {/* ---- Package Cards ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {currentTab.packages.map((pkg) => (
            <div
              key={pkg.label}
              className={`relative bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow ${
                pkg.popular
                  ? "border-primary/40 ring-2 ring-primary/20"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="text-center mb-5 mt-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {pkg.label}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{pkg.tagline}</p>
                <p className="text-2xl font-extrabold text-primary mt-3">
                  {pkg.price}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  estimated installed cost
                </p>
              </div>

              {/* Specs */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                {pkg.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-xs text-gray-500">{spec.label}</span>
                    <span className="text-xs font-semibold text-gray-800 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ---- What's Included ---- */}
        <div className="max-w-5xl mx-auto w-full">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            What&apos;s Included in Every Package
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHATS_INCLUDED.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- CTA ---- */}
        <p className="text-center text-sm text-gray-400">
          Prices are estimates for typical residential installations.{" "}
          <span className="font-semibold text-gray-600">
            Contact us for a free custom quote
          </span>{" "}
          tailored to your home, energy usage, and roof layout.
        </p>
      </LayoutContainer>
    </section>
  );
}
