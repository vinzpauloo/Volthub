"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiSunLine,
  RiBatteryChargeLine,
  RiPlugLine,
  RiHomeLine,
  RiBuildingLine,
  RiPlantLine,
} from "react-icons/ri";

const SOLAR_TYPES = [
  {
    icon: RiPlugLine,
    title: "Grid-Tied Solar",
    tagline: "Most Popular & Cost-Effective",
    description:
      "Connected to the utility grid, grid-tied systems let you use solar power during the day and draw from the grid at night. Excess energy can be exported via net metering for bill credits.",
    specs: [
      { label: "System Cost", value: "₱150K – ₱350K (5kW)" },
      { label: "Payback Period", value: "3–5 years" },
      { label: "Battery Required", value: "No" },
      { label: "Best For", value: "Areas with reliable grid power" },
    ],
  },
  {
    icon: RiBatteryChargeLine,
    title: "Hybrid Solar",
    tagline: "Grid Backup + Battery Storage",
    description:
      "Combines grid connection with battery storage. Use solar directly, store excess in batteries, and keep the grid as backup. Power through outages seamlessly.",
    specs: [
      { label: "System Cost", value: "₱250K – ₱600K (5kW + 10kWh)" },
      { label: "Payback Period", value: "5–7 years" },
      { label: "Battery Required", value: "Yes" },
      { label: "Best For", value: "Areas with frequent outages" },
    ],
  },
  {
    icon: RiSunLine,
    title: "Off-Grid Solar",
    tagline: "Complete Energy Independence",
    description:
      "Fully independent from the utility grid. Solar panels charge a battery bank that powers your home 24/7. Ideal for remote locations with no grid access.",
    specs: [
      { label: "System Cost", value: "₱350K – ₱800K+ (5kW + 20kWh)" },
      { label: "Payback Period", value: "6–10 years" },
      { label: "Battery Required", value: "Yes (larger capacity)" },
      { label: "Best For", value: "Remote areas with no grid access" },
    ],
  },
  {
    icon: RiBuildingLine,
    title: "Commercial Solar",
    tagline: "Scale for Business",
    description:
      "Large-scale rooftop or ground-mount systems for commercial and industrial facilities. Reduce operating costs and meet sustainability targets with dedicated monitoring.",
    specs: [
      { label: "System Cost", value: "₱3M – ₱20M+ (50-300kW)" },
      { label: "Payback Period", value: "3–6 years" },
      { label: "Battery Required", value: "Optional" },
      { label: "Best For", value: "Factories, malls, office buildings" },
    ],
  },
];

export function SolarTypes(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="System Types"
          title="Types of Solar Systems"
          description="Understand the different solar system configurations and find the right one for your needs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
          {SOLAR_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {type.title}
                    </h3>
                    <p className="text-sm text-secondary font-semibold">
                      {type.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {type.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-3">
                  {type.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-gray-400">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
