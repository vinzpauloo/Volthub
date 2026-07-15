"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiPlugLine,
  RiSmartphoneLine,
  RiBatteryChargeLine,
  RiCheckLine,
} from "react-icons/ri";

const STEPS = [
  {
    number: 1,
    icon: RiPlugLine,
    title: "Plug In",
    description:
      "Park your EV and connect the charger cable to your vehicle's charging port. The connector locks securely in place.",
    tip: "Make sure your vehicle is turned off before plugging in.",
  },
  {
    number: 2,
    icon: RiSmartphoneLine,
    title: "Start Charging",
    description:
      "Open the VoltHub app, scan the QR code on the charger, or tap your RFID card to initiate the charging session.",
    tip: "You can monitor charging progress in real time from the app.",
  },
  {
    number: 3,
    icon: RiBatteryChargeLine,
    title: "Charge & Monitor",
    description:
      "Your EV charges automatically. Track energy delivered, estimated time remaining, and cost through the app dashboard.",
    tip: "Fast chargers can deliver up to 80% charge in as little as 30 minutes.",
  },
  {
    number: 4,
    icon: RiCheckLine,
    title: "Unplug & Go",
    description:
      "Once charging is complete, the session stops automatically. Unplug the connector, return it to the holster, and you're ready to go.",
    tip: "The app sends a notification when your battery reaches your target charge level.",
  },
];

export function HowToCharge(): React.ReactElement {
  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-12">
        <SectionHeading
          eyebrow="Getting Started"
          title="How to Charge Your EV"
          description="Charging your electric vehicle is quick and simple. Follow these steps at any VoltHub station."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover-lift relative"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step.number}
                </div>

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-3xl text-primary" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Tip */}
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
                  <p className="text-xs text-secondary font-medium flex items-start gap-1.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>{step.tip}</span>
                  </p>
                </div>

                {/* Connector */}
                {step.number < STEPS.length && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}
