"use client";

import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";

import plugInImg from "@/../public/EVpage/howto/plug_in.png";
import startChargingImg from "@/../public/EVpage/howto/start_charging.png";
import monitoringImg from "@/../public/EVpage/howto/monitoring.png";
import unplugImg from "@/../public/EVpage/howto/un_plug.png";

const STEPS = [
  {
    image: plugInImg,
    title: "Plug In",
    description:
      "Park your EV and connect the charger cable to your vehicle's charging port. The connector locks securely in place.",
    tip: "Make sure your vehicle is turned off before plugging in.",
  },
  {
    image: startChargingImg,
    title: "Start Charging",
    description:
      "Open the VoltHub app, scan the QR code on the charger, or tap your RFID card to initiate the charging session.",
    tip: "You can monitor charging progress in real-time from the app.",
  },
  {
    image: monitoringImg,
    title: "Charge & Monitor",
    description:
      "Your EV charges automatically. Track energy delivered, estimated time remaining, and cost through the app dashboard.",
    tip: "Fast chargers can deliver up to 80% charge in as little as 30 minutes.",
  },
  {
    image: unplugImg,
    title: "Unplug & Go",
    description:
      "Once charging is complete, the session stops automatically. Unplug the connector, return it to the holster, and you're ready to go.",
    tip: "The app sends a notification when your battery reaches your target charge level.",
  },
];

function FlowIndicator() {
  return (
    <div className="hidden lg:flex items-center justify-center gap-0 mb-2">
      {STEPS.map((step, index) => (
        <div key={step.title} className="flex items-center">
          {/* Step label */}
          <div className="flex items-center gap-2 px-3 py-1.5">
            <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {step.title}
            </span>
          </div>
          {/* Arrow between labels */}
          {index < STEPS.length - 1 && (
            <svg
              className="w-5 h-5 text-primary/60 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export function HowToCharge(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-8">
        <SectionHeading
          eyebrow="Getting Started"
          title="How to Charge Your EV"
          description="Charging your electric vehicle is quick and simple. Follow these steps at any VoltHub station."
        />

        {/* Upper flow index — step labels with arrows */}
        <FlowIndicator />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col"
            >
              {/* Step image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                {/* Flat separator */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200" />
              </div>

              {/* Mobile step number */}
              <div className="lg:hidden flex items-center gap-2 px-5 pt-4">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Step {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 pt-3 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {step.description}
                </p>

                {/* Tip — yellow-toned box */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    {step.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
