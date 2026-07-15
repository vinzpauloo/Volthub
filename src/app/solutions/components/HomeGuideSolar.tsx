"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiHomeLine,
  RiSunLine,
  RiBatteryChargeLine,
  RiFileListLine,
  RiToolsLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

const STEPS = [
  {
    icon: RiFileListLine,
    title: "1. Assess Your Home",
    description:
      "Evaluate your roof condition, orientation, and shading. South-facing roofs with minimal shade are ideal. Check your average monthly electricity consumption from past bills.",
    checklist: [
      "Roof age and structural integrity",
      "Monthly kWh usage from bills",
      "Available unshaded roof area",
      "Local building regulations",
    ],
  },
  {
    icon: RiSunLine,
    title: "2. Choose Your System",
    description:
      "Select between grid-tied, off-grid, or hybrid systems based on your energy needs, budget, and grid reliability in your area.",
    checklist: [
      "Grid-tied: lowest cost, no battery",
      "Hybrid: battery backup for outages",
      "Off-grid: complete energy independence",
      "Size based on consumption + future needs",
    ],
  },
  {
    icon: RiToolsLine,
    title: "3. Professional Installation",
    description:
      "VoltHub certified installers mount panels, wire the inverter, and connect to your electrical panel. Most residential installations complete in 1-3 days.",
    checklist: [
      "Structural mounting and waterproofing",
      "Inverter and electrical panel connection",
      "Net metering application (grid-tied)",
      "System testing and commissioning",
    ],
  },
  {
    icon: RiCheckDoubleLine,
    title: "4. Monitor & Save",
    description:
      "Track your energy production in real time via the VoltHub app. Monitor savings, consumption patterns, and system health from anywhere.",
    checklist: [
      "Real-time production monitoring",
      "Monthly savings reports",
      "Remote diagnostics and alerts",
      "Annual maintenance reminders",
    ],
  },
];

export function HomeGuideSolar(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Homeowner Guide"
          title="Complete Home Solar Guide"
          description="Everything you need to know about going solar — from assessment to installation and beyond."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover-lift"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-1.5 border-t border-gray-100 pt-3">
                  {step.checklist.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-gray-500 flex items-start gap-1.5"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
