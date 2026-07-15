"use client";

import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionHeading from "@/components/marketing/SectionHeading";
import {
  RiSpeedLine,
  RiShieldCheckLine,
  RiPlugLine,
  RiMoneyDollarCircleLine,
  RiArrowDownSLine,
  RiFlashlightLine,
} from "react-icons/ri";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What are the different types of EV chargers?",
    answer:
      "EV chargers come in three levels. Level 1 uses a standard 120V household outlet (slowest, 3-8 km range per hour). Level 2 uses a 240V connection found in homes and public stations (30-40 km range per hour). Level 3 (DC Fast Charging) delivers direct current at 50-350 kW for rapid charging — typically reaching 80% in 20-40 minutes.",
  },
  {
    question: "Which connector type does my EV use?",
    answer:
      "Most modern EVs in the Philippines use CCS2 (Combined Charging System Type 2) for DC fast charging. Japanese models (Nissan Leaf, older Mitsubishi) may use CHAdeMO. For AC charging, Type 2 (Mennekes) is the standard. VoltHub stations support both CCS2 and CHAdeMO connectors.",
  },
  {
    question: "How long does it take to charge an EV?",
    answer:
      "Charging time depends on your vehicle's battery capacity and the charger's power output. A 60 kW fast charger can add about 200-250 km of range in 30 minutes. A full charge on a Level 2 charger typically takes 4-8 hours. Fast charging from 20% to 80% usually takes 20-40 minutes on a DC fast charger.",
  },
  {
    question: "How much does it cost to charge?",
    answer:
      "VoltHub offers competitive pay-per-use pricing. DC fast charging typically costs ₱15-25 per kWh depending on location and time. A typical 30-minute fast charge session (adding ~25 kWh) costs approximately ₱375-625. Monthly subscription plans are also available for frequent users, offering discounted rates.",
  },
  {
    question: "Is fast charging bad for my EV battery?",
    answer:
      "Modern EVs are engineered to handle DC fast charging safely. While frequent fast charging may slightly accelerate battery degradation over many years, the impact is minimal with proper battery thermal management. Most manufacturers recommend using fast charging for road trips and relying on Level 2 charging for daily use to maximize battery longevity.",
  },
  {
    question: "Can any EV use a fast charger?",
    answer:
      "Most modern EVs support DC fast charging, but check your vehicle specifications. Some entry-level EVs and older plug-in hybrids may only support Level 1 or Level 2 AC charging. Your vehicle's maximum charging rate also matters — a car rated for 50 kW won't charge faster on a 150 kW station, but it is fully safe to use.",
  },
];

const CHARGING_LEVELS = [
  {
    level: "Level 1",
    icon: RiPlugLine,
    power: "1.4 – 1.9 kW",
    connector: "Standard 120V outlet",
    speed: "3–8 km range / hour",
    bestFor: "Overnight home charging",
  },
  {
    level: "Level 2",
    icon: RiSpeedLine,
    power: "3.3 – 22 kW",
    connector: "Type 2 (Mennekes)",
    speed: "30–40 km range / hour",
    bestFor: "Home, workplace, destination",
  },
  {
    level: "DC Fast",
    icon: RiFlashlightLine,
    power: "50 – 350 kW",
    connector: "CCS2 / CHAdeMO",
    speed: "200–300 km range / 30 min",
    bestFor: "Highway stops, quick top-ups",
  },
];

export function EVChargingLearning(): React.ReactElement {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="section-spacing bg-gray-50">
      <LayoutContainer className="flex-col space-y-16">
        {/* Charging Levels Overview */}
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Learn"
            title="EV Charging Learning Hub"
            description="Everything you need to know about EV charging — from charger types to costs and best practices."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHARGING_LEVELS.map((level) => {
              const Icon = level.icon;
              return (
                <div
                  key={level.level}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover-lift"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {level.level}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Power</span>
                      <span className="font-semibold text-gray-800">
                        {level.power}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Connector</span>
                      <span className="font-semibold text-gray-800">
                        {level.connector}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Speed</span>
                      <span className="font-semibold text-gray-800">
                        {level.speed}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                      <span className="text-gray-500">Best For</span>
                      <span className="font-semibold text-secondary">
                        {level.bestFor}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto w-full space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-500">
              Common questions about EV charging answered.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <RiArrowDownSLine
                    className={`text-xl text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "pb-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
