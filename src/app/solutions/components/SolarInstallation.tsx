"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiClipboardLine,
  RiRulerLine,
  RiToolsLine,
  RiPlugLine,
  RiCheckLine,
  RiCustomerService2Line,
} from "react-icons/ri";

const INSTALL_STEPS = [
  {
    number: "01",
    icon: RiClipboardLine,
    title: "Site Survey & Design",
    duration: "1–3 days",
    details: [
      "On-site roof inspection and structural assessment",
      "Shading analysis using solar pathfinder tools",
      "Electrical panel and wiring evaluation",
      "Custom system design and energy production estimate",
    ],
  },
  {
    number: "02",
    icon: RiRulerLine,
    title: "Permits & Approvals",
    duration: "1–4 weeks",
    details: [
      "Building permit application and processing",
      "Net metering application with local utility (grid-tied)",
      "HOA approval coordination (if applicable)",
      "Structural engineering sign-off for roof-mounted systems",
    ],
  },
  {
    number: "03",
    icon: RiToolsLine,
    title: "Panel & Mounting Installation",
    duration: "1–2 days",
    details: [
      "Roof preparation and waterproof flashing installation",
      "Mounting rail system secured to roof structure",
      "Solar panels mounted and aligned for optimal angle",
      "Grounding and lightning protection setup",
    ],
  },
  {
    number: "04",
    icon: RiPlugLine,
    title: "Electrical & Inverter Setup",
    duration: "1 day",
    details: [
      "Inverter installation near main electrical panel",
      "DC wiring from panels to inverter",
      "AC connection to electrical panel with safety disconnects",
      "Battery installation and BMS configuration (hybrid/off-grid)",
    ],
  },
  {
    number: "05",
    icon: RiCheckLine,
    title: "Testing & Commissioning",
    duration: "0.5 day",
    details: [
      "Full system test and performance verification",
      "Meter configuration and net metering activation",
      "Monitoring system setup and app connection",
      "Final inspection and system walkthrough with homeowner",
    ],
  },
  {
    number: "06",
    icon: RiCustomerService2Line,
    title: "After-Sales Support",
    duration: "Ongoing",
    details: [
      "24/7 remote system monitoring and diagnostics",
      "Annual preventive maintenance visits",
      "Performance guarantee tracking",
      "Priority support hotline for any issues",
    ],
  },
];

export function SolarInstallation(): React.ReactElement {
  return (
    <section className="section-spacing bg-white">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Installation"
          title="Solar Installation Process"
          description="A transparent look at how we take your solar project from concept to clean energy production."
        />

        <div className="max-w-4xl mx-auto w-full space-y-0">
          {INSTALL_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === INSTALL_STEPS.length - 1;

            return (
              <div key={step.number} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-primary/20 my-2" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}
                >
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="text-xl text-primary" />
                      <h3 className="text-lg font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full ml-auto">
                        {step.duration}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <svg
                            className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5"
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
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
